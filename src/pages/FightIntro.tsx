import { useGame } from '../context'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalInicioJuego from '../components/ModalInicioJuego'

const characters = [
  { name: 'Oso A', image: '/images/osoA.png' },
  { name: 'Oso B', image: '/images/osoB.png' },
]

export default function FightIntro() {
  const { players, setStartingPlayer } = useGame()
  const navigate = useNavigate()
  const [showStartModal, setShowStartModal] = useState(false)

  const getCharacterImage = (name: string | null | undefined) => {
    if (!name) return null
    const found = characters.find(c => c.name === name)
    return found?.image || null
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowStartModal(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const player1 = players[0]
  const player2 = players[1]

  const handleStartPlayerSelection = (playerIndex: 0 | 1) => {
    setStartingPlayer(playerIndex)
    setShowStartModal(false)
    setTimeout(() => {
      navigate('/tablero')
    }, 300)
  }

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden app-background">
      <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-center position-relative z-10 p-2">
        
        <div className="text-center mb-3 animate-in slide-in-from-top duration-1000">
           <span className="badge px-4 py-1 rounded-full text-primary fw-bold mb-2 border border-primary border-opacity-20 small" style={{ backgroundColor: 'rgba(219,234,254,0.95)' }}>MISIÓN MICHI-MONEY</span>
           <h1 className="display-4 fw-black text-primary tracking-tighter uppercase italic mb-0">
             ENFRENTAMIENTO
           </h1>
        </div>

        <div className="row g-2 w-100 mb-3 align-items-center" style={{ maxWidth: '1200px' }}>
          {/* Jugador 1 */}
          <div className="col-12 col-md-5">
            <div className="text-center animate-in slide-in-from-left duration-700">
              <div
                className="michi-card overflow-hidden mb-2 d-flex align-items-center justify-content-center p-3 border-primary border-opacity-40"
                style={{ height: '220px' }}
              >
                <img 
                  src={getCharacterImage(player1.character) || ''}
                  alt={player1.character || 'Avatar'}
                  className="img-fluid animate-float"
                  style={{ maxHeight: '180px', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))' }}
                />
              </div>
              <p className="small text-primary fw-black mb-0 tracking-widest">JUGADOR 1</p>
              <h2 className="fs-1 fw-black text-slate-900 mb-0">
                {player1.customName || player1.character}
              </h2>
            </div>
          </div>

          {/* VS Centerpiece */}
          <div className="col-12 col-md-2 text-center">
             <div className="position-relative d-inline-block">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center shadow-2xl border border-primary border-opacity-30 animate-in zoom-in duration-500"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'radial-gradient(circle at 30% 0%, rgba(219,234,254,1), rgba(59,130,246,0.9))'
                  }}
                >
                  <span className="fs-2 fw-black text-primary italic">VS</span>
                </div>
             </div>
          </div>

          {/* Jugador 2 */}
          <div className="col-12 col-md-5">
            <div className="text-center animate-in slide-in-from-right duration-700">
              <div
                className="michi-card overflow-hidden mb-2 d-flex align-items-center justify-content-center p-3 border-secondary border-opacity-40"
                style={{ height: '220px' }}
              >
                <img 
                  src={getCharacterImage(player2.character) || ''}
                  alt={player2.character || 'Avatar'}
                  className="img-fluid animate-float"
                  style={{ maxHeight: '180px', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))' }}
                />
              </div>
              <p className="small text-secondary fw-black mb-0 tracking-widest">JUGADOR 2</p>
              <h2 className="fs-1 fw-black text-slate-900 mb-0">
                {player2.customName || player2.character}
              </h2>
            </div>
          </div>
        </div>

        <div className="text-center mt-2">
           <div className="px-5 py-2 rounded-full border border-primary border-opacity-20 d-flex align-items-center gap-3 shadow-sm" style={{ backgroundColor: 'rgba(219,234,254,0.9)' }}>
              <div className="spinner-border text-primary spinner-border-sm" role="status"></div>
              <p className="fs-6 text-slate-900 fw-bold mb-0 italic tracking-wide">BUSCANDO OPONENTE...</p>
           </div>
        </div>
      </div>

      {/* Modal para seleccionar jugador inicial */}
      {showStartModal && (
        <ModalInicioJuego
          isOpen={showStartModal}
          onSelect={handleStartPlayerSelection}
          players={players}
        />
      )}
    </div>
  )
}
