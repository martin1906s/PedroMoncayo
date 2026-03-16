import { Link } from 'react-router-dom'
import { useGame } from '../context'
import { TrophyIcon } from '../components/icons/Icons'

const characters = [
  { name: 'Oso A', image: '/images/osoA.png' },
  { name: 'Oso B', image: '/images/osoB.png' },
 ]

export default function Resultado() {
  const { players, winner, reset, ageCategory } = useGame()

  const gameFinished = winner !== null
  const winnerPlayer = gameFinished ? players[winner] : null

  const getCharacterImage = (name: string | null | undefined) => {
    if (!name) return null
    const found = characters.find(c => c.name === name)
    return found?.image || null
  }

  const getThemeColors = () => {
    return {
      primary: '#1d4ed8',
      secondary: '#10b981',
      gradient: 'from-[#1d4ed8] to-[#0ea5e9]',
      bg: 'bg-white',
      title: gameFinished ? '¡MISIÓN CUMPLIDA!' : 'ESTADO DEL JUEGO',
      logo: '/images/logoConLetrasLatreales.png',
    }
  }

  const theme = getThemeColors()

  const handleRestart = () => {
    reset()
  }

  return (
    <div className="min-vh-100 py-5 app-background position-relative overflow-hidden">
      <div className="container position-relative" style={{ zIndex: 10, maxWidth: '1100px' }}>
        <div className="text-center mb-5 animate-float">
          <img src={theme.logo} alt="Logo" className="img-fluid mb-4" style={{ maxHeight: '130px', filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.5))' }} />
          <h1 className="display-2 fw-black text-primary mb-2">{theme.title}</h1>
          <p className="fs-4 text-slate-700 opacity-80 fw-medium uppercase tracking-widest">{ageCategory}</p>
        </div>

        {gameFinished && winnerPlayer && (
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-8">
              <div className="michi-card p-5 text-center shadow-2xl overflow-hidden position-relative">
                <div className="mb-4 animate-in zoom-in duration-1000">
                  <img
                    src="/images/Todos los Gatos/Biomas-web/Gato_Tesoro[1].png"
                    alt="Victory"
                    className="img-fluid mx-auto"
                    style={{ maxHeight: '250px', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
                  />
                </div>
                <h2 className="display-4 fw-black text-slate-900 mb-3">
                  ¡VALOR EXTRAORDINARIO!
                </h2>
                <p className="fs-2 text-gradient-purple fw-black mb-5">
                  {winnerPlayer.customName || winnerPlayer.character} ha conquistado el universo financiero
                </p>

                <div className="d-flex justify-content-center gap-4 align-items-center mb-5">
                  <div className="p-4 rounded-4 border border-slate-200 bg-slate-50">
                    <img src="/images/Todos los Gatos/Logo/moneda vector.png" alt="coin" className="mb-2" style={{ width: '40px' }} />
                    <h4 className="fs-2 fw-black text-slate-900 mb-0">{winnerPlayer.points * 100}</h4>
                    <span className="text-slate-600 fw-bold">Puntos</span>
                  </div>
                  <div className="p-4 rounded-4 border border-slate-200 bg-slate-50">
                    <TrophyIcon size={40} className="text-accent mb-2" />
                    <h4 className="fs-2 fw-black text-slate-900 mb-0">{winnerPlayer.categoriesCompleted.size}</h4>
                    <span className="text-slate-600 fw-bold">Metas</span>
                  </div>
                </div>

                <div className="row g-4 text-center">
                  {players.map((player, idx) => (
                    <div key={idx} className="col-12 col-md-6">
                      <div className={`p-4 rounded-4 border ${idx === winner ? 'border-primary bg-slate-50' : 'border-slate-200 bg-slate-100'}`}>
                        <img
                          src={getCharacterImage(player.character) || ''}
                          alt="Avatar"
                          className="w-20 h-20 mx-auto mb-3 object-fit-contain"
                        />
                        <h5 className="text-slate-900 fw-black mb-1">{player.customName || player.character}</h5>
                        <span className="text-slate-600 fw-bold">Puesto {idx === winner ? '1º' : '2º'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="d-flex flex-wrap gap-4 justify-content-center animate-in slide-in-from-bottom duration-500 mt-5">
          <button
            onClick={handleRestart}
            className="btn btn-michi-primary px-5 py-4 fs-3 shadow-premium"
          >
            ¡JUGAR DE NUEVO!
          </button>
          <Link
            to="/"
            onClick={handleRestart}
            className="btn btn-outline-secondary px-5 py-4 fs-3 rounded-5"
            style={{ borderColor: '#1d4ed8', color: '#1d4ed8', backgroundColor: 'transparent' }}
          >
            CAMBIAR MODO
          </Link>
        </div>
      </div>
    </div>
  )
}
