import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context'
import { getQuestionCategories } from '../utils/questions'
import ModalPregunta from '../components/ModalPregunta'
import ModalGanador from '../components/ModalGanador'
import ModalTurno from '../components/ModalTurno'
import {
  CarIcon,
  BookIcon,
  DollarIcon,
  FlagIcon,
  CalculatorIcon,
  TrendingUpIcon,
  ShieldIcon,
  TargetIcon,
  SparklesIcon,
  UserIcon,
  ScaleIcon,
} from '../components/icons/Icons'

const characters = [
  { name: 'Oso A', image: '/images/osoA.png' },
  { name: 'Oso B', image: '/images/osoB.png' },
]

export default function PantallaPrincipal() {
  const navigate = useNavigate()
  const { 
    players, currentTurn, winner, addCategoryPoint, setTurn, 
    showTurnModal, setShowTurnModal, ageCategory, startGame, gameStartTime 
  } = useGame()
  
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [turnTimer, setTurnTimer] = useState(0)
  
  const currentPlayer = players[currentTurn]
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!ageCategory) navigate('/')
    if (!gameStartTime) startGame()
    setTimeout(() => setImagesLoaded(true), 1000)
  }, [ageCategory, navigate, gameStartTime, startGame])

  // Timer logic for the active player's turn
  useEffect(() => {
    if (modalOpen && !winner) {
      const start = Date.now()
      timerRef.current = window.setInterval(() => {
        setTurnTimer(Math.floor((Date.now() - start) / 1000))
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setTurnTimer(0)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [modalOpen, winner])

  if (!ageCategory) return null

  const questionCategories = getQuestionCategories(ageCategory)
  const categories = Object.entries(questionCategories)

  const theme = ageCategory === 'ninos' 
    ? { subtitle: 'Exploradores de Pedro Moncayo (6-12 años)', logo: '/images/logoConLetrasLatreales.png' }
    : { subtitle: 'Líderes de Pedro Moncayo (13-18 años)', logo: '/images/logoConLetrasLatreales.png' }

  const handleCategoryClick = (categoryKey: string) => {
    if (winner !== null) return
    if (currentPlayer.categoriesCompleted.has(categoryKey)) return
    setSelectedCategory(categoryKey)
    setModalOpen(true)
  }

  const handleAnswer = (isCorrect: boolean) => {
    // We add the points and the time taken during this specific question modal
    if (isCorrect && selectedCategory) {
      addCategoryPoint(currentTurn, selectedCategory, turnTimer)
    } else {
      // Even if incorrect, the turn passed
      // But we don't add time if incorrect? 
      // User said "If both do the categories well". 
      // I'll track time even for failed attempts to penalize slow thinking?
      // No, let's just add time taken during the session.
    }
    
    setTurn(currentTurn === 0 ? 1 : 0)
    setModalOpen(false)
    setSelectedCategory(null)
    setShowTurnModal(true)
  }

  const handleManualReset = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getCategoryIconComponent = (iconKey: string) => {
    switch (iconKey) {
      case 'flag':
        return FlagIcon
      case 'dollar':
        return DollarIcon
      case 'users':
        return UserIcon
      case 'leaf':
        return ShieldIcon
      case 'car':
        return CarIcon
      case 'book':
        return BookIcon
      case 'map':
        return TargetIcon
      case 'calculator':
        return CalculatorIcon
      case 'trending-up':
        return TrendingUpIcon
      case 'cpu':
        return ScaleIcon
      case 'star':
        return SparklesIcon
      default:
        return TargetIcon
    }
  }

  if (!imagesLoaded) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center app-background">
        <div className="text-center animate-pulse">
          <div className="spinner-border text-primary" style={{ width: '4rem', height: '4rem' }}></div>
          <p className="fw-bold fs-4 text-white mt-4">PREPARANDO TU AVENTURA...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-vh-100 p-2 p-md-4 position-relative overflow-hidden d-flex flex-column app-background">
      <div className="container-fluid mx-auto position-relative flex-grow-1 d-flex flex-column" style={{ maxWidth: '1400px', zIndex: 1 }}>
        <div className="text-center mb-3 animate-float">
          <img src={theme.logo} alt="Logo" className="img-fluid mx-auto mb-2" style={{ maxHeight: '110px', filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.5))' }} />
          <div className="d-inline-block px-4 py-1 rounded-full backdrop-blur-md border border-white/20 mb-2 shadow-2xl" style={{ backgroundColor: 'rgba(15,23,42,0.35)' }}>
            <div className="d-flex align-items-center gap-2">
              <span className="text-white small tracking-widest fw-black uppercase">{theme.subtitle}</span>
            </div>
          </div>
        </div>

        {/* Sponsors Pedro Moncayo */}
        <div className="mb-3">
          <div className="dark-glass-panel px-3 py-2 rounded-4 d-flex flex-wrap justify-content-center gap-3 border border-white border-opacity-10">
            <span className="text-uppercase small fw-bold opacity-80" style={{ color: '#111827' }}>Con el apoyo de:</span>
            <span className="badge bg-primary bg-opacity-80 fw-semibold" style={{ color: '#f9fafb' }}>GAD Municipal Pedro Moncayo</span>
            <span className="badge bg-success bg-opacity-80 fw-semibold" style={{ color: '#f9fafb' }}>Empresas locales</span>
            <span className="badge bg-info bg-opacity-80 fw-semibold" style={{ color: '#f9fafb' }}>Comunidad educativa</span>
          </div>
        </div>

        <div className="dark-glass-panel p-2 p-md-3 mb-3 border-white border-opacity-10 shadow-xl">
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-4">
              <div className={`p-2 rounded-3 text-center transition-all ${currentTurn === 0 && !winner ? 'glow-active border border-white/30' : 'opacity-80'}`} style={currentTurn === 0 && !winner ? { backgroundColor: 'rgba(15,23,42,0.45)', color: '#f9fafb' } : { color: '#111827' }}>
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <img src={characters.find(c => c.name === players[0].character)?.image || ''} alt="P1" style={{ maxHeight: '50px' }} />
                  <div className="text-start">
                    <span className="badge bg-purple-500 py-0 rounded-full text-[10px] mb-1">P1</span>
                    <h4 className="fs-6 fw-black mb-0">{players[0].customName || players[0].character}</h4>
                    <div className="d-flex gap-2 small opacity-70">
                      <span>Cat: {players[0].categoriesCompleted.size}/{categories.length}</span>
                      <span>⏱️ {formatTime(players[0].timeSpent)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 text-center">
              <div className="p-2 rounded-4 d-inline-block border border-white/10" style={{ backgroundColor: 'rgba(15,23,42,0.45)', color: '#f9fafb' }}>
                <span className="fw-black fs-5">VS</span>
                {modalOpen && <div className="text-accent animate-pulse" style={{ color: '#bbf7d0' }}>TIEMPO: {turnTimer}s</div>}
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className={`p-2 rounded-3 text-center transition-all ${currentTurn === 1 && !winner ? 'glow-active border border-white/30' : 'opacity-80'}`} style={currentTurn === 1 && !winner ? { backgroundColor: 'rgba(15,23,42,0.45)', color: '#f9fafb' } : { color: '#111827' }}>
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <div className="text-end">
                    <span className="badge bg-blue-500 py-0 rounded-full text-[10px] mb-1">P2</span>
                    <h4 className="fs-6 fw-black mb-0">{players[1].customName || players[1].character}</h4>
                    <div className="d-flex gap-2 small opacity-70 justify-content-end">
                      <span>⏱️ {formatTime(players[1].timeSpent)}</span>
                      <span>Cat: {players[1].categoriesCompleted.size}/{categories.length}</span>
                    </div>
                  </div>
                  <img src={characters.find(c => c.name === players[1].character)?.image || ''} alt="P2" style={{ maxHeight: '50px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8 CATEGORIES GRID */}
        <div className="row g-2 flex-grow-1 overflow-auto">
          {categories.map(([categoryKey, categoryInfo]) => {
            const completedByCurrent = currentPlayer.categoriesCompleted.has(categoryKey)
            const disabled = winner !== null || completedByCurrent

            const IconComponent = getCategoryIconComponent(categoryInfo.icon)

            return (
              <div key={categoryKey} className="col-6 col-md-3">
                <button
                  onClick={() => handleCategoryClick(categoryKey)}
                  disabled={disabled}
                  className={`w-100 h-100 michi-card text-start transition-all ${disabled ? 'opacity-60' : 'hover:scale-102 active:scale-95'} ${completedByCurrent ? 'border-success ring-2 ring-success ring-opacity-50' : ''}`}
                  style={{
                    background: completedByCurrent
                      ? 'linear-gradient(135deg, rgba(34,197,94,0.16), rgba(16,185,129,0.22))'
                      : 'linear-gradient(135deg, rgba(219,234,254,0.94), rgba(209,250,229,0.94))',
                    border: '1px solid rgba(148, 163, 184, 0.55)',
                    boxShadow: '0 18px 40px rgba(15,23,42,0.18)',
                  }}
                >
                  <div className="d-flex flex-column align-items-center gap-1 p-2 text-center h-100 justify-content-center">
                    <div className="position-relative mb-1">
                      {/* Icono circular usando componente SVG */}
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle border"
                        style={{
                          width: '64px',
                          height: '64px',
                          borderColor: completedByCurrent ? '#22c55e' : '#1d4ed8',
                          background: completedByCurrent
                            ? 'radial-gradient(circle at 30% 0%, rgba(187,247,208,1), rgba(16,185,129,0.9))'
                            : 'radial-gradient(circle at 30% 0%, rgba(191,219,254,1), rgba(59,130,246,0.9))',
                          boxShadow: '0 10px 25px rgba(15,23,42,0.4)',
                        }}
                      >
                        <IconComponent size={28} color="#f9fafb" />
                      </div>
                      {completedByCurrent && (
                        <div className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 shadow-lg translate-middle-x">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="w-100">
                      <h3
                        className="text-[11px] fw-black mb-0 uppercase tracking-tight"
                        style={{ color: '#0f172a', lineHeight: 1.3 }}
                      >
                        {categoryInfo.name}
                      </h3>
                    </div>
                  </div>
                </button>
              </div>
            )
          })}
        </div>

        <div className="d-flex gap-3 justify-content-center mt-3 mb-2">
          <button
            onClick={handleManualReset}
            className="btn btn-michi-secondary px-4 py-2 fw-black"
          >
            🔄 INICIO
          </button>
        </div>
      </div>

      <ModalPregunta isOpen={modalOpen} onClose={() => setModalOpen(false)} onAnswer={handleAnswer} category={selectedCategory} />
      <ModalTurno isOpen={showTurnModal} onClose={() => setShowTurnModal(false)} currentPlayer={players[currentTurn]} />
      {winner !== null && <ModalGanador isOpen={winner !== null} winner={players[winner]} />}
    </div>
  )
}
