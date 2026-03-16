import { useNavigate, Navigate } from 'react-router-dom'
import { useGame } from '../context'
import { useState, useEffect, useRef } from 'react'
import GameDetectedModal from '../components/GameDetectedModal'
import ModalNombreJugador from '../components/ModalNombreJugador'
import { MasksIcon, UserIcon, GraduationCapIcon } from '../components/icons/Icons'

const characters = [
  { name: 'Oso A', image: '/avatars/oso-a.svg', loading: 'eager' as const },
  { name: 'Oso B', image: '/avatars/oso-b.svg', loading: 'eager' as const },
]

export default function SeleccionPersonaje() {
  const navigate = useNavigate()
  const { players, selectCharacter, setCustomName, reset, justReset, ageCategory } = useGame()
  const [currentPlayer, setCurrentPlayer] = useState<0 | 1>(0)
  const [showGameDetectedModal, setShowGameDetectedModal] = useState(false)
  const [showNameModal, setShowNameModal] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')
  const [hoveredIndexP1, setHoveredIndexP1] = useState<number | null>(null)
  const [hoveredIndexP2, setHoveredIndexP2] = useState<number | null>(null)

  const hasCheckedModal = useRef(false)

  useEffect(() => {
    if (hasCheckedModal.current) return
    if (justReset) {
      hasCheckedModal.current = true
      return
    }

    const hasAnyData = Boolean(
      players[0].character ||
      players[1].character ||
      players[0].position > 0 ||
      players[1].position > 0
    )

    if (hasAnyData) {
      setShowGameDetectedModal(true)
    }

    hasCheckedModal.current = true
  }, [players, justReset])

  if (!ageCategory) {
    return <Navigate to="/" replace />
  }

  const getThemeColors = () => {
    if (ageCategory === 'ninos') {
      return {
        primary: '#C026D3',
        bgGradient: 'bg-mesh-purple',
        title: '¡ELIGE TU COMPAÑERO!',
        subtitle: 'Iniciando misión para Exploradores (6-12 años)',
        IconComponent: UserIcon
      }
    } else {
      return {
        primary: '#0EA5E9',
        bgGradient: 'bg-slate-950',
        title: '¡SELECCIONA TU AVATAR!',
        subtitle: 'Preparando arena para Líderes (13-18 años)',
        IconComponent: GraduationCapIcon
      }
    }
  }

  const theme = getThemeColors()

  const getCharacterImage = (name: string | null | undefined) => {
    if (!name) return null
    const found = characters.find(c => c.name === name)
    return found?.image || null
  }

  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character)
    setShowNameModal(true)
  }

  const handleNameConfirm = (nombre: string) => {
    selectCharacter(currentPlayer, selectedCharacter)
    setCustomName(currentPlayer, nombre)
    if (currentPlayer === 0) setCurrentPlayer(1)
  }

  const handleCloseModal = () => setShowGameDetectedModal(false)

  const canContinue = players[0].character && players[1].character

  useEffect(() => {
    if (canContinue) {
      const timer = setTimeout(() => {
        navigate('/fight-intro')
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [canContinue, navigate])

  return (
    <div className="min-vh-100 py-2 bg-[#000000] position-relative overflow-hidden d-flex align-items-center">
      <div className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none opacity-20">
        <div className="position-absolute bg-primary blur-3xl rounded-circle" style={{ width: '400px', height: '400px', top: '-10%', left: '-5%' }}></div>
        <div className="position-absolute bg-secondary blur-3xl rounded-circle" style={{ width: '400px', height: '400px', bottom: '-10%', right: '-5%' }}></div>
      </div>

      <div className="container position-relative py-2" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="text-center mb-3 animate-in slide-in-from-top duration-700">
          <img
            src="/favicon.svg"
            alt="Pedro Moncayo"
            className="img-fluid mx-auto mb-2"
            style={{ maxHeight: '60px', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))' }}
          />
          <h1 className="fs-3 fw-black text-white mb-1 tracking-tight uppercase">{theme.title}</h1>
          <div className="bg-white/5 d-inline-block px-4 py-1 rounded-full backdrop-blur-md border border-white/10 mb-2 shadow-2xl">
            <div className="d-flex align-items-center gap-2">
              <span className="text-white fs-6 tracking-widest fw-black uppercase">{theme.subtitle}</span>
            </div>
          </div>
        </div>

        {/* Hero Preview */}
        <div className="row g-3 mb-3 justify-content-center align-items-stretch">
          {/* Player 1 */}
          <div className="col-12 col-md-5">
            <div className={`dark-glass-panel h-100 border-2 transition-all duration-500 overflow-hidden ${currentPlayer === 0 ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-white border-opacity-10'}`}>
              <div className="bg-primary bg-opacity-20 py-2 text-center border-bottom border-white border-opacity-10">
                <h4 className="mb-0 fw-black text-white uppercase tracking-widest small">Jugador 1</h4>
              </div>
              <div className="p-2 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '130px' }}>
                {(() => {
                  const hovered = hoveredIndexP1
                  const selectedImg = getCharacterImage(players[0].character)
                  const src = hovered !== null ? characters[hovered].image : selectedImg
                  const label = hovered !== null ? characters[hovered].name : (players[0].customName || players[0].character || '¿QUIÉN ERES?')

                  return src ? (
                    <div className="animate-in fade-in zoom-in duration-300">
                      <div className="position-relative mb-2">
                        <div className="bg-primary w-24 h-24 rounded-circle position-absolute top-50 start-50 translate-middle opacity-20 blur-2xl"></div>
                        <img src={src} alt={label} className="w-24 h-24 object-fit-contain position-relative z-10 animate-float" />
                      </div>
                      <div className="bg-white/10 px-4 py-1 rounded-full border border-white/20 backdrop-blur-md">
                        <span className="fs-6 fw-bold text-white text-gradient-purple">{label}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center opacity-40">
                      <MasksIcon size={60} className="text-white mb-2" />
                      <p className="small fw-bold text-white mb-0">SELECCIONA HÉROE</p>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-1 d-flex align-items-center justify-content-center">
            <div className="text-white fs-4 fw-black opacity-30">VS</div>
          </div>

          {/* Player 2 */}
          <div className="col-12 col-md-5">
            <div className={`dark-glass-panel h-100 border-2 transition-all duration-500 overflow-hidden ${currentPlayer === 1 ? 'border-secondary ring-2 ring-secondary ring-opacity-20' : 'border-white border-opacity-10'}`}>
              <div className="bg-secondary bg-opacity-20 py-2 text-center border-bottom border-white border-opacity-10">
                <h4 className="mb-0 fw-black text-white uppercase tracking-widest small">Jugador 2</h4>
              </div>
              <div className="p-2 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '130px' }}>
                {(() => {
                  const hovered = hoveredIndexP2
                  const selectedImg = getCharacterImage(players[1].character)
                  const src = hovered !== null ? characters[hovered].image : selectedImg
                  const label = hovered !== null ? characters[hovered].name : (players[1].customName || players[1].character || '¿QUIÉN ERES?')

                  return src ? (
                    <div className="animate-in fade-in zoom-in duration-300">
                      <div className="position-relative mb-2">
                        <div className="bg-secondary w-24 h-24 rounded-circle position-absolute top-50 start-50 translate-middle opacity-20 blur-2xl"></div>
                        <img src={src} alt={label} className="w-24 h-24 object-fit-contain position-relative z-10 animate-float" />
                      </div>
                      <div className="bg-white/10 px-4 py-1 rounded-full border border-white/20 backdrop-blur-md">
                        <span className="fs-6 fw-bold text-white text-gradient-blue">{label}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center opacity-40">
                      <MasksIcon size={60} className="text-white mb-2" />
                      <p className="small fw-bold text-white mb-0">SELECCIONA HÉROE</p>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="dark-glass-panel py-3 bg-opacity-20 overflow-hidden position-relative mb-3">
          <h5 className="text-center fw-black text-white mb-3 uppercase tracking-widest small">
            {players[currentPlayer].character ? 'AVATAR SELECCIONADO' : `TURNO DE: ${currentPlayer === 0 ? 'JUGADOR 1' : 'JUGADOR 2'}`}
          </h5>
          <div className="animate-marquee">
            {[...characters, ...characters].map((character, index) => {
              const realIndex = index % characters.length
              const isTaken = players[0].character === character.name || players[1].character === character.name
              const isCurrentSelect = players[currentPlayer].character === character.name

              return (
                <div key={`${character.name}-${index}`} className="px-2">
                  <button
                    onClick={() => handleCharacterSelect(character.name)}
                    onMouseEnter={() => currentPlayer === 0 ? setHoveredIndexP1(realIndex) : setHoveredIndexP2(realIndex)}
                    onMouseLeave={() => currentPlayer === 0 ? setHoveredIndexP1(null) : setHoveredIndexP2(null)}
                    disabled={isTaken || !!players[currentPlayer].character}
                    className={`michi-card p-2 d-flex flex-column align-items-center justify-content-center ${isCurrentSelect ? 'border-primary ring-2 ring-primary ring-opacity-20 scale-105 bg-primary bg-opacity-20' : ''} ${isTaken && !isCurrentSelect ? 'grayscale opacity-40 cursor-not-allowed' : ''}`}
                    style={{ width: '120px', height: '130px' }}
                  >
                    <div className="position-relative mb-2">
                       <div className={`position-absolute top-50 start-50 translate-middle w-16 h-16 rounded-circle blur-xl opacity-20 ${isCurrentSelect ? 'bg-primary' : 'bg-white'}`}></div>
                       <img src={character.image} alt={character.name} className="w-20 h-20 object-fit-contain position-relative z-10" />
                    </div>
                    <div className="text-center">
                       <h6 className="fw-black text-white mb-0 uppercase tracking-tighter" style={{ fontSize: '0.7rem' }}>{character.name}</h6>
                       {isTaken && !isCurrentSelect && <span className="badge bg-danger bg-opacity-50 py-0 rounded-full" style={{ fontSize: '0.6rem' }}>OCUPADO</span>}
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Automatic progress - No button needed */}

        <GameDetectedModal isOpen={showGameDetectedModal} onClose={handleCloseModal} onStartNew={reset} />
        <ModalNombreJugador
          isOpen={showNameModal}
          onClose={() => setShowNameModal(false)}
          onConfirm={handleNameConfirm}
          playerNumber={currentPlayer + 1}
          characterName={selectedCharacter}
          characterImage={getCharacterImage(selectedCharacter) || undefined}
        />
      </div>
    </div>
  )
}
