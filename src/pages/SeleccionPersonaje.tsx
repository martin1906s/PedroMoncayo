import { useNavigate, Navigate } from 'react-router-dom'
import { useGame } from '../context'
import { useState, useEffect, useRef } from 'react'
import GameDetectedModal from '../components/GameDetectedModal'
import ModalNombreJugador from '../components/ModalNombreJugador'
import { MasksIcon, UserIcon, GraduationCapIcon } from '../components/icons/Icons'

const characters = [
  { name: 'Oso A', image: '/images/osoA.png', loading: 'eager' as const },
  { name: 'Oso B', image: '/images/osoB.png', loading: 'eager' as const },
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
        primary: '#1d4ed8',
        bgGradient: 'bg-mesh-purple',
        title: 'Elige tu compañero',
        subtitle: 'Aventura cooperativa para niños (6-12 años)',
        IconComponent: UserIcon,
      }
    } else {
      return {
        primary: '#0ea5e9',
        bgGradient: 'bg-mesh-purple',
        title: 'Selecciona tu avatar',
        subtitle: 'Desafío financiero para jóvenes (13-18 años)',
        IconComponent: GraduationCapIcon,
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
    <div
      className="min-vh-100 py-4 position-relative overflow-hidden d-flex flex-column app-background"
    >
      <div className="container position-relative py-2 flex-grow-1" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="text-center mb-4 animate-in slide-in-from-top duration-700">
          <img
            src="/images/logoConLetrasLatreales.png"
            alt="Pedro Moncayo"
            className="img-fluid mx-auto mb-2"
            style={{ maxHeight: '80px', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))' }}
          />
          <h1 className="fs-3 fw-black mb-1 tracking-tight text-uppercase" style={{ color: theme.primary }}>
            {theme.title}
          </h1>
          <div className="d-inline-flex align-items-center gap-2 px-4 py-1 rounded-full border border-slate-200 shadow-sm" style={{ background: 'linear-gradient(90deg, rgba(29,78,216,0.05), rgba(16,185,129,0.05))' }}>
            <theme.IconComponent size={20} className="text-[#1f2937]" />
            <span className="small fw-semibold" style={{ color: '#1f2937' }}>
              {theme.subtitle}
            </span>
          </div>
        </div>

        <div
          className="row g-3 mb-3 justify-content-center align-items-stretch rounded-4 shadow-sm"
          style={{ background: 'linear-gradient(135deg, rgba(219,234,254,0.96), rgba(209,250,229,0.96))', padding: '1.25rem' }}
        >
          {/* Player 1 */}
          <div className="col-12 col-md-5">
            <div className={`michi-card h-100 border-2 transition-all duration-500 overflow-hidden ${currentPlayer === 0 ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-slate-200'}`}>
              <div className="py-2 text-center border-bottom border-slate-200" style={{ backgroundColor: '#1d4ed8' }}>
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
                      <div className="px-4 py-1 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: 'rgba(219,234,254,0.96)' }}>
                        <span className="fs-6 fw-bold" style={{ color: '#0f172a' }}>{label}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center opacity-60">
                      <MasksIcon size={60} className="mb-2" color="#1d4ed8" />
                      <p className="small fw-bold mb-0" style={{ color: '#0f172a' }}>SELECCIONA HÉROE</p>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-1 d-flex align-items-center justify-content-center">
            <div className="fs-4 fw-black opacity-70" style={{ color: '#1d4ed8' }}>VS</div>
          </div>

          {/* Player 2 */}
          <div className="col-12 col-md-5">
            <div className={`michi-card h-100 border-2 transition-all duration-500 overflow-hidden ${currentPlayer === 1 ? 'border-secondary ring-2 ring-secondary ring-opacity-20' : 'border-slate-200'}`}>
              <div className="py-2 text-center border-bottom border-slate-200" style={{ backgroundColor: '#10b981' }}>
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
                      <div className="px-4 py-1 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: 'rgba(209,250,229,0.96)' }}>
                        <span className="fs-6 fw-bold" style={{ color: '#0f172a' }}>{label}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center opacity-60">
                      <MasksIcon size={60} className="mb-2" color="#10b981" />
                      <p className="small fw-bold mb-0" style={{ color: '#0f172a' }}>SELECCIONA HÉROE</p>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>

        <div
          className="glass-panel py-3 overflow-hidden position-relative mb-3"
          style={{ background: 'linear-gradient(135deg, #e0f2fe, #dcfce7)' }}
        >
          <h5 className="text-center fw-black mb-3 uppercase tracking-widest small" style={{ color: '#1f2937' }}>
            {players[currentPlayer].character ? 'AVATAR SELECCIONADO' : `TURNO DE: ${currentPlayer === 0 ? 'JUGADOR 1' : 'JUGADOR 2'}`}
          </h5>
          <div className="d-flex justify-content-center gap-3">
            {characters.map((character, index) => {
              const isTaken = players[0].character === character.name || players[1].character === character.name
              const isCurrentSelect = players[currentPlayer].character === character.name

              return (
                <button
                  key={character.name}
                  onClick={() => handleCharacterSelect(character.name)}
                  onMouseEnter={() => currentPlayer === 0 ? setHoveredIndexP1(index) : setHoveredIndexP2(index)}
                  onMouseLeave={() => currentPlayer === 0 ? setHoveredIndexP1(null) : setHoveredIndexP2(null)}
                  disabled={isTaken || !!players[currentPlayer].character}
                  className={`michi-card p-2 d-flex flex-column align-items-center justify-content-center ${isCurrentSelect ? 'border-primary ring-2 ring-primary ring-opacity-20 scale-105' : ''} ${isTaken && !isCurrentSelect ? 'grayscale opacity-40 cursor-not-allowed' : ''}`}
                  style={{ width: '140px', height: '140px' }}
                >
                  <div className="position-relative mb-2">
                    <div className={`position-absolute top-50 start-50 translate-middle w-16 h-16 rounded-circle blur-xl opacity-20 ${isCurrentSelect ? 'bg-primary' : 'bg-mesh-purple'}`}></div>
                    <img src={character.image} alt={character.name} className="w-20 h-20 object-fit-contain position-relative z-10" />
                  </div>
                  <div className="text-center">
                    <h6 className="fw-black mb-0 uppercase tracking-tighter" style={{ fontSize: '0.8rem', color: '#0f172a' }}>{character.name}</h6>
                    {isTaken && !isCurrentSelect && (
                      <span className="badge bg-success bg-opacity-70 py-0 rounded-full" style={{ fontSize: '0.6rem' }}>USADO</span>
                    )}
                  </div>
                </button>
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
