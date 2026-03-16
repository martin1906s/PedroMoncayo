import Modal from './ui/Modal'
import { SaveIcon, GamepadIcon, RefreshIcon } from './icons/Icons'

interface GameDetectedModalProps {
  isOpen: boolean
  onStartNew: () => void
  onClose: () => void
}

export default function GameDetectedModal({ isOpen, onStartNew, onClose }: GameDetectedModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="michi-modal animate-in zoom-in duration-300 max-w-md mx-auto overflow-hidden d-flex flex-column" style={{ maxHeight: '90vh' }}>
        
        {/* Header Premium */}
        <div className="bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] p-3 text-center border-bottom border-white border-opacity-10">
          <h2 className="fs-3 fw-black text-white mb-0 uppercase tracking-widest">Partida Detectada</h2>
        </div>
        
        <div className="p-4 flex-grow-1 d-flex flex-column justify-content-center">
             <div className="text-center mb-4">
             <div className="d-inline-block position-relative mb-3">
                <div className="position-absolute top-50 start-50 translate-middle w-24 h-24 bg-blue-500 opacity-20 blur-2xl rounded-circle animate-pulse"></div>
                <div className="p-4 rounded-circle backdrop-blur-md border border-white border-opacity-20 position-relative z-10" style={{ backgroundColor: 'rgba(15,23,42,0.55)' }}>
                   <SaveIcon size={48} className="text-white" />
                </div>
             </div>
             <p className="text-white opacity-80 fs-5 fw-medium">
                ¡Tienes una aventura en curso! ¿Quieres retomarla o prefieres empezar de cero?
             </p>
          </div>

          <div className="d-grid gap-3">
             <button
               onClick={onClose}
               className="btn btn-michi-primary py-3 fs-4 shadow-lg glow-active"
             >
                <GamepadIcon size={24} className="me-2" />
                CONTINUAR DUELO
             </button>

             <button
               onClick={onStartNew}
               className="btn btn-michi-secondary py-3 fs-5"
             >
                <RefreshIcon size={20} className="me-2" />
                NUEVA PARTIDA
             </button>

             <button
               onClick={onClose}
               className="btn bg-transparent text-[#1f2933] text-opacity-60 py-2 fs-6 hover:text-opacity-100 transition-all uppercase tracking-widest fw-black"
             >
                CANCELAR
             </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
