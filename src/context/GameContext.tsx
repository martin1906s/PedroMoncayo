import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type AgeCategory = 'ninos' | 'jovenes' | null

export interface Player {
  name: string
  customName: string | null
  character: string | null
  position: number
  points: number
  categoriesCompleted: Set<string>
  timeSpent: number // Time in seconds
}

export interface GameState {
  players: [Player, Player]
  currentTurn: 0 | 1
  winner: 0 | 1 | null
  ageCategory: AgeCategory
  seenQuestions: Set<number>
  gameStartTime: number | null
}

export interface GameContextType extends GameState {
  selectCharacter: (playerIndex: 0 | 1, character: string) => void
  setCustomName: (playerIndex: 0 | 1, customName: string) => void
  setTurn: (turn: 0 | 1) => void
  setStartingPlayer: (playerIndex: 0 | 1) => void
  addPoint: (playerIndex: 0 | 1) => void
  addCategoryPoint: (playerIndex: 0 | 1, category: string, timeTaken: number) => void
  setAgeCategory: (category: AgeCategory) => void
  reset: () => void
  startGame: () => void
  justReset: boolean
  showTurnModal: boolean
  setShowTurnModal: (show: boolean) => void
  markQuestionAsSeen: (questionId: number) => void
}

const GameContext = createContext<GameContextType | null>(null)

const defaultState: GameState = {
  players: [
    { 
      name: 'Jugador 1', 
      customName: null, 
      character: null, 
      position: 0, 
      points: 0, 
      categoriesCompleted: new Set(),
      timeSpent: 0
    },
    { 
      name: 'Jugador 2', 
      customName: null, 
      character: null, 
      position: 0, 
      points: 0, 
      categoriesCompleted: new Set(),
      timeSpent: 0
    },
  ],
  currentTurn: 0,
  winner: null,
  ageCategory: null,
  seenQuestions: new Set(),
  gameStartTime: null,
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>(defaultState)
  const [justReset, setJustReset] = useState(false)
  const [showTurnModal, setShowTurnModal] = useState(false)

  const startGame = useCallback(() => {
    setState(prev => ({ ...prev, gameStartTime: Date.now() }))
  }, [])

  const selectCharacter = useCallback((playerIndex: 0 | 1, character: string) => {
    setState((prevState) => {
      const newPlayers = [...prevState.players] as [Player, Player]
      newPlayers[playerIndex] = { ...newPlayers[playerIndex], character }
      return { ...prevState, players: newPlayers }
    })
  }, [])

  const setCustomName = useCallback((playerIndex: 0 | 1, customName: string) => {
    setState((prevState) => {
      const newPlayers = [...prevState.players] as [Player, Player]
      newPlayers[playerIndex] = { ...newPlayers[playerIndex], customName }
      return { ...prevState, players: newPlayers }
    })
  }, [])

  const setTurn = useCallback((turn: 0 | 1) => {
    setState((prevState) => ({ ...prevState, currentTurn: turn }))
  }, [])

  const setStartingPlayer = useCallback((playerIndex: 0 | 1) => {
    setState((prevState) => ({ ...prevState, currentTurn: playerIndex }))
  }, [])

  const markQuestionAsSeen = useCallback((questionId: number) => {
    setState((prevState) => ({
      ...prevState,
      seenQuestions: new Set([...prevState.seenQuestions, questionId])
    }))
  }, [])

  const addPoint = useCallback((playerIndex: 0 | 1) => {
    setState((prevState) => {
      const newPlayers = [...prevState.players] as [Player, Player]
      const currentPlayer = newPlayers[playerIndex]
      
      const newPoints = currentPlayer.points + 1
      const newPosition = Math.min(newPoints, 3)
      
      newPlayers[playerIndex] = { 
        ...currentPlayer, 
        points: newPoints,
        position: newPosition
      }
      
      // Winner logic will be handled better by categories
      return { ...prevState, players: newPlayers }
    })
  }, [])

  const addCategoryPoint = useCallback((playerIndex: 0 | 1, category: string, timeTaken: number) => {
    setState((prevState) => {
      const newPlayers = [...prevState.players] as [Player, Player]
      const currentPlayer = newPlayers[playerIndex]
      
      const newCategoriesCompleted = new Set(currentPlayer.categoriesCompleted)
      if (!newCategoriesCompleted.has(category)) {
        newCategoriesCompleted.add(category)
      }
      
      const newPoints = newCategoriesCompleted.size
      const newTimeSpent = currentPlayer.timeSpent + timeTaken
      
      newPlayers[playerIndex] = { 
        ...currentPlayer, 
        points: newPoints,
        categoriesCompleted: newCategoriesCompleted,
        timeSpent: newTimeSpent
      }

      const totalRequired = 8 // Total 8 categories now
      const isCurrentFinished = newCategoriesCompleted.size >= totalRequired
      const otherPlayerIndex = playerIndex === 0 ? 1 : 0
      const otherPlayer = newPlayers[otherPlayerIndex]
      const isOtherFinished = otherPlayer.categoriesCompleted.size >= totalRequired

      let winner: 0 | 1 | null = null

      if (isCurrentFinished) {
        if (isOtherFinished) {
          // Both finished, compare time
          winner = newTimeSpent < otherPlayer.timeSpent ? playerIndex : otherPlayerIndex
        } else {
          // First one to finish wins
          winner = playerIndex
        }
      } else if (isOtherFinished) {
        winner = otherPlayerIndex
      }
      
      return { ...prevState, players: newPlayers, winner }
    })
  }, [])

  const setAgeCategory = useCallback((category: AgeCategory) => {
    setState((prevState) => ({ ...prevState, ageCategory: category }))
  }, [])

  const reset = useCallback(() => {
    setState(defaultState)
    setJustReset(true)
    setShowTurnModal(false)
  }, [])

  const contextValue: GameContextType = {
    ...state,
    justReset,
    showTurnModal,
    setShowTurnModal,
    selectCharacter,
    setCustomName,
    setTurn,
    setStartingPlayer,
    addPoint,
    addCategoryPoint,
    setAgeCategory,
    reset,
    startGame,
    markQuestionAsSeen,
  }

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame debe usarse dentro de GameProvider')
  }
  return context
}