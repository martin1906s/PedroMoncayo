import Modal from './ui/Modal'

const characters = [
  { name: 'Oso A', image: '/images/osoA.png' },
  { name: 'Oso B', image: '/images/osoB.png' },
]

interface ModalGanadorProps {
  isOpen: boolean
  winner: { name: string; customName: string | null; character: string | null; position: number; points: number; timeSpent: number } | undefined
}

export default function ModalGanador({ isOpen, winner }: ModalGanadorProps) {
  if (!winner) return null

  const charImg = characters.find(c => c.name === winner.character)?.image

  const handleReset = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} 
      title=""
      className="modal-xl"
      dismissible={false}
    >
      <div className="michi-modal overflow-hidden p-0 border-0 d-flex flex-column" style={{ maxHeight: '90vh' }}>
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-2 w-full" />
        
        <div className="p-4 p-md-5 flex-grow-1 d-flex flex-column justify-content-center position-relative overflow-hidden bg-white">
            <div className="text-center position-relative z-10 w-100 mx-auto" style={{ maxWidth: '800px' }}>
              <div className="mb-4 animate-bounce">
                 <div className="d-inline-block position-relative">
                    <div className="position-absolute top-50 start-50 translate-middle w-32 h-32 bg-yellow-400 opacity-20 blur-3xl rounded-circle"></div>
                    <img 
                      src={charImg || ''} 
                      alt="Ganador" 
                      className="position-relative z-10 img-fluid"
                      style={{ maxHeight: '200px' }}
                    />
                 </div>
              </div>

              <div className="mb-4">
                 <h2 className="fs-1 fw-black text-white mb-1 uppercase tracking-tighter italic">¡VICTORIA TOTAL!</h2>
                 <h3 className="display-4 fw-black text-gradient-purple mb-2">{winner.customName || winner.character}</h3>
                 <div className="d-flex justify-content-center gap-2 mt-2">
                    <span className="fs-3 fw-black text-white px-4 py-2 bg-white bg-opacity-10 rounded-full">🏆 8 CATEGORÍAS</span>
                    <span className="fs-3 fw-black text-accent px-4 py-2 bg-white bg-opacity-10 rounded-full">⏱️ {formatTime(winner.timeSpent)}</span>
                 </div>
              </div>

              <div className="d-grid gap-2 max-w-sm mx-auto mt-4">
                 <button
                   onClick={handleReset}
                   className="btn btn-michi-primary py-3 fs-4 shadow-premium uppercase fw-black"
                 >
                    VOLVER AL INICIO
                 </button>
              </div>
            </div>
        </div>
      </div>
    </Modal>
  )
}
