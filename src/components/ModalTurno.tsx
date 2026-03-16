import Modal from './ui/Modal'

interface ModalTurnoProps {
  isOpen: boolean
  onClose: () => void
  currentPlayer: {
    name: string
    customName: string | null
    character: string | null
    points: number
    categoriesCompleted: Set<string>
  }
}

const characters = [
  { name: 'Oso A', image: '/images/osoA.png' },
  { name: 'Oso B', image: '/images/osoB.png' },
]

export default function ModalTurno({ isOpen, onClose, currentPlayer }: ModalTurnoProps) {
  const getCharacterImage = (name: string | null | undefined) => {
    if (!name) return null
    const found = characters.find(c => c.name === name)
    return found?.image || null
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      className="modal-md"
    >
      <div className="michi-modal animate-in zoom-in duration-300 max-w-md mx-auto overflow-hidden d-flex flex-column" style={{ maxHeight: '90vh' }}>
        
        {/* Header Compacto */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-center border-bottom border-white border-opacity-10">
          <h2 className="fs-3 fw-black mb-0 uppercase tracking-widest italic" style={{ color: '#f9fafb' }}>Turno de Acción</h2>
        </div>
        
        <div className="p-4 flex-grow-1 d-flex flex-column justify-content-center">
          
          <div className="text-center mb-4">
             <div className="d-inline-block position-relative mb-3">
                <div className="position-absolute top-50 start-50 translate-middle w-32 h-32 bg-blue-500 opacity-20 blur-3xl rounded-circle animate-pulse"></div>
                <div className="bg-white bg-opacity-5 p-3 rounded-4 border border-white border-opacity-20 backdrop-blur-md shadow-2xl position-relative z-10">
                   <img 
                     src={getCharacterImage(currentPlayer.character) || ''} 
                     alt="Michi" 
                     className="img-fluid animate-float"
                     style={{ maxHeight: '120px' }}
                   />
                </div>
             </div>
             
             <h3 className="display-5 fw-black mb-1 uppercase tracking-tighter italic" style={{ color: '#111827' }}>
               {currentPlayer.customName || currentPlayer.character}
             </h3>
             <div className="badge px-4 py-2 rounded-full border tracking-widest fw-black small uppercase" style={{ backgroundColor: 'rgba(219,234,254,0.95)', borderColor: 'rgba(148,163,184,0.7)', color: '#111827' }}>
                {currentPlayer.points} Puntos • {currentPlayer.categoriesCompleted.size}/6 Categorías
             </div>
          </div>

          <div className="dark-glass-panel p-4 mb-4 border-blue-500 border-opacity-20">
             <p className="fs-5 mb-0 text-center italic" style={{ color: '#111827' }}>
               "Es tu momento de demostrar cuánto sabes. ¡Selecciona una categoría para continuar!"
             </p>
          </div>

          <button
            onClick={onClose}
            className="btn btn-michi-primary py-3 fs-3 shadow-lg glow-active uppercase italic fw-black"
          >
            ¡LISTO PARA JUGAR!
          </button>
        </div>
      </div>
    </Modal>
  )
}