import Modal from './ui/Modal'
import { SwordIcon } from './icons/Icons'

interface ModalInicioJuegoProps {
  isOpen: boolean
  onSelect: (playerIndex: 0 | 1) => void
  players: Array<{
    name: string
    customName: string | null
    character: string | null
    position: number
    points: number
  }>
}

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

export default function ModalInicioJuego({ isOpen, onSelect, players }: ModalInicioJuegoProps) {
  const getCharacterImage = (name: string | null | undefined) => {
    if (!name) return null
    const found = characters.find(c => c.name === name)
    return found?.image || null
  }

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="">
      <div className="michi-modal animate-in zoom-in duration-300 max-w-2xl mx-auto overflow-hidden d-flex flex-column" style={{ maxHeight: '90vh' }}>
        
        {/* Header Compacto */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 text-center border-bottom border-white border-opacity-10">
          <h2 className="fs-3 fw-black text-white mb-0 uppercase tracking-widest">¿Quién inicia el Duelo?</h2>
        </div>
        
        <div className="p-4 flex-grow-1 d-flex flex-column justify-content-center">
          <p className="text-white text-opacity-60 text-center mb-4 fs-6">El destino lo deciden ustedes. Seleccionen al primer Michi en batalla.</p>
          
          <div className="row g-4 justify-content-center">
            {players.map((player, idx) => (
              <div key={idx} className="col-12 col-md-6">
                 <button
                   onClick={() => onSelect(idx as 0 | 1)}
                   className={`
                     w-100 michi-card p-4 d-flex flex-column align-items-center justify-content-center transition-all duration-300
                     hover:bg-opacity-20 hover:scale-105 border-2
                     ${idx === 0 ? 'border-primary border-opacity-30' : 'border-secondary border-opacity-30'}
                   `}
                   style={{ minHeight: '220px' }}
                 >
                    <div className="position-relative mb-3">
                       <div className={`position-absolute top-50 start-50 translate-middle w-20 h-20 blur-2xl opacity-20 ${idx === 0 ? 'bg-primary' : 'bg-secondary'}`}></div>
                       <img 
                         src={getCharacterImage(player.character) || ''} 
                         alt="Avatar" 
                         className="position-relative z-10 animate-float"
                         style={{ maxHeight: '100px' }}
                       />
                    </div>
                    
                    <div className="text-center">
                       <span className={`badge px-3 py-1 rounded-full text-xs mb-2 ${idx === 0 ? 'bg-primary' : 'bg-secondary'}`}>JUGADOR {idx + 1}</span>
                       <h4 className="fw-black text-white mb-1 uppercase tracking-tighter">
                         {player.customName || player.character}
                       </h4>
                    </div>

                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                       <SwordIcon size={24} className={idx === 0 ? 'text-primary' : 'text-secondary'} />
                    </div>
                 </button>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
             <div className="d-inline-flex align-items-center gap-2 px-4 py-2 bg-white bg-opacity-5 rounded-full border border-white border-opacity-10">
                <span className="text-white opacity-40 small tracking-widest uppercase">Prepárense para aprender</span>
             </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}