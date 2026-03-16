import { Link } from 'react-router-dom'
import { useGame } from '../context'
import { TrophyIcon } from '../components/icons/Icons'

const characters = [
  { name: 'Michi Aventurero', image: '/images/Todos los Gatos/Biomas-web/Gato _ Explorador.png' },
  { name: 'Michi Nauta', image: '/images/Todos los Gatos/Biomas-web/Michinauta.png' },
  { name: 'Michi Frío', image: '/images/Todos los Gatos/Biomas-web/GATO bioma hielo.png' },
  { name: 'Michi Volcánico', image: '/images/Todos los Gatos/Biomas-web/Gato_Bioma Lava.png' },
  { name: 'Michi Mágico', image: '/images/Todos los Gatos/Biomas-web/Gato_Bioma Fantasia.png' },
  { name: 'Michi Minero', image: '/images/Todos los Gatos/Biomas-web/Gato _ Bioma Minero.png' },
  { name: 'Michi Desértico', image: '/images/Todos los Gatos/Biomas-web/Gato_Bioma Desierto.png' },
  { name: 'Michi Galáctico', image: '/images/Todos los Gatos/Biomas-web/Gato_Bioma Espacial.png' },
  { name: 'Michicanico', image: '/images/Todos los Gatos/Biomas-web/Gato_bioma industrial.png' },
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
    if (ageCategory === 'ninos') {
      return {
        primary: '#C026D3',
        secondary: '#10B981',
        gradient: 'from-[#7C3AED] to-[#C026D3]',
        bg: 'bg-mesh-purple',
        title: gameFinished ? '¡MISIÓN CUMPLIDA!' : 'ESTADO DEL JUEGO',
        logo: '/images/Todos los Gatos/Logo/logo vector.png'
      }
    } else {
      return {
        primary: '#0EA5E9',
        secondary: '#F43F5E',
        gradient: 'from-[#0EA5E9] to-[#2DD4BF]',
        bg: 'bg-slate-900',
        title: gameFinished ? '¡LEYENDA FINANCIERA!' : 'ESTADO DEL JUEGO',
        logo: '/images/Todos los Gatos/Logo/logo vector.png'
      }
    }
  }

  const theme = getThemeColors()

  const handleRestart = () => {
    reset()
  }

  return (
    <div className={`min-vh-100 py-5 ${theme.bg} position-relative overflow-hidden`}>
      {/* Decorative Orbs */}
      <div className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none opacity-20">
        <div className="position-absolute bg-primary blur-[120px] rounded-circle" style={{ width: '600px', height: '600px', top: '-10%', left: '-10%' }}></div>
        <div className="position-absolute bg-secondary blur-[120px] rounded-circle" style={{ width: '600px', height: '600px', bottom: '-10%', right: '-10%' }}></div>
      </div>

      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="text-center mb-5 animate-float">
          <img src={theme.logo} alt="Logo" className="img-fluid mb-4" style={{ maxHeight: '100px' }} />
          <h1 className="display-2 fw-black text-white mb-2">{theme.title}</h1>
          <p className="fs-4 text-white opacity-70 fw-medium uppercase tracking-widest">{ageCategory}</p>
        </div>

        {gameFinished && winnerPlayer && (
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-8">
              <div className="dark-glass-panel p-5 text-center border-white border-opacity-20 shadow-2xl overflow-hidden position-relative">
                <div className="mb-4 animate-in zoom-in duration-1000">
                  <img
                    src="/images/Todos los Gatos/Biomas-web/Gato_Tesoro[1].png"
                    alt="Victory"
                    className="img-fluid mx-auto"
                    style={{ maxHeight: '250px', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
                  />
                </div>
                <h2 className="display-4 fw-black text-white mb-3">
                  ¡VALOR EXTRAORDINARIO!
                </h2>
                <p className="fs-2 text-gradient-purple fw-black mb-5">
                  {winnerPlayer.customName || winnerPlayer.character} ha conquistado el universo financiero
                </p>

                <div className="d-flex justify-content-center gap-4 align-items-center mb-5">
                  <div className="bg-white bg-opacity-10 p-4 rounded-4 backdrop-blur-md">
                    <img src="/images/Todos los Gatos/Logo/moneda vector.png" alt="coin" className="mb-2" style={{ width: '40px' }} />
                    <h4 className="fs-2 fw-black text-white mb-0">{winnerPlayer.points * 100}</h4>
                    <span className="text-white opacity-50 fw-bold">Puntos</span>
                  </div>
                  <div className="bg-white bg-opacity-10 p-4 rounded-4 backdrop-blur-md">
                    <TrophyIcon size={40} className="text-accent mb-2" />
                    <h4 className="fs-2 fw-black text-white mb-0">{winnerPlayer.categoriesCompleted.size}</h4>
                    <span className="text-white opacity-50 fw-bold">Metas</span>
                  </div>
                </div>

                <div className="row g-4 text-center">
                  {players.map((player, idx) => (
                    <div key={idx} className="col-12 col-md-6">
                      <div className={`p-4 rounded-4 ${idx === winner ? 'bg-white bg-opacity-20 border-2 border-primary' : 'bg-white bg-opacity-5'}`}>
                        <img
                          src={getCharacterImage(player.character) || ''}
                          alt="Avatar"
                          className="w-20 h-20 mx-auto mb-3 object-fit-contain"
                        />
                        <h5 className="text-white fw-black mb-1">{player.customName || player.character}</h5>
                        <span className="text-white opacity-50 fw-bold">Puesto {idx === winner ? '1º' : '2º'}</span>
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
            className="btn bg-white bg-opacity-10 text-white px-5 py-4 fs-3 rounded-5 hover:bg-opacity-20 transition-all border border-white border-opacity-10"
          >
            CAMBIAR MODO
          </Link>
        </div>
      </div>
    </div>
  )
}
