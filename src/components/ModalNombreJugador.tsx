import { useState } from 'react'
import Modal from './ui/Modal'

type ModalNombreJugadorProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (nombre: string) => void
  playerNumber: number
  characterName: string
  characterImage?: string
}

export default function ModalNombreJugador({ 
  isOpen, 
  onClose, 
  onConfirm, 
  playerNumber, 
  characterName,
  characterImage 
}: ModalNombreJugadorProps) {
  const [nombre, setNombre] = useState('')

  const handleConfirm = () => {
    if (nombre.trim()) {
      onConfirm(nombre.trim())
      setNombre('')
      onClose()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="michi-modal animate-in zoom-in duration-300 max-w-lg mx-auto overflow-hidden d-flex flex-column" style={{ maxHeight: '90vh' }}>
        {/* Header Compacto */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 text-center border-bottom border-white border-opacity-10">
          <h2 className="fs-3 fw-black text-white mb-0 uppercase tracking-widest">Personalizar Michi</h2>
        </div>
        
        <div className="p-4 flex-grow-1 d-flex flex-column justify-content-center">
           {/* Avatar Preview más pequeño */}
           {characterImage && (
             <div className="text-center mb-3">
               <div className="d-inline-block position-relative">
                  <div className="position-absolute top-50 start-50 translate-middle w-32 h-32 bg-primary opacity-20 blur-2xl rounded-circle animate-pulse"></div>
                  
                  <div className="position-relative z-10 p-2 bg-white bg-opacity-5 rounded-4 border border-white border-opacity-20 backdrop-blur-md shadow-2xl">
                    <img 
                      src={characterImage} 
                      alt={characterName}
                      className="img-fluid animate-float"
                      style={{ maxHeight: '100px', width: 'auto' }}
                    />
                    <div className="position-absolute bottom-0 start-50 translate-middle-x mb-n2">
                       <span className="badge bg-primary px-3 py-1 rounded-full shadow-lg border border-white border-opacity-20 fs-7">
                         {characterName}
                       </span>
                    </div>
                  </div>
               </div>
             </div>
           )}
           
           {/* Input Section */}
           <div className="text-center mb-4">
              <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                 <div className={`w-2 h-2 rounded-circle ${playerNumber === 1 ? 'bg-primary' : 'bg-secondary'}`}></div>
                 <h6 className="text-white fw-black mb-0 uppercase tracking-widest small text-opacity-70">JUGADOR {playerNumber}</h6>
              </div>
              
              <div className="position-relative">
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escribe tu nombre..."
                  className="michi-input w-100 text-center fs-4 fw-bold py-3"
                  autoFocus
                  maxLength={20}
                  autoComplete="off"
                />
              </div>
              <p className="text-white opacity-40 mt-2 small mb-0">
                 Máximo 20 caracteres • {20 - nombre.length} restantes
              </p>
           </div>

           {/* Actions */}
           <div className="row g-3">
             <div className="col-5">
               <button
                 onClick={onClose}
                 className="btn bg-white/5 text-white w-100 py-2 rounded-4 hover:bg-white/10 transition-all border border-white/10 backdrop-blur-md fw-black small tracking-widest"
               >
                 CANCELAR
               </button>
             </div>
             <div className="col-7">
               <button
                 onClick={handleConfirm}
                 disabled={!nombre.trim()}
                 className="btn btn-michi-primary w-100 py-2 shadow-lg fs-6"
               >
                 ¡LISTO!
               </button>
             </div>
           </div>
        </div>
      </div>
    </Modal>
  )
}