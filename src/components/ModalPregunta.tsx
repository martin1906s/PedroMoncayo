import { useState, useEffect } from 'react'
import { getQuestionCategories, type Question } from '../utils/questions'
import { useGame } from '../context'
import Modal from './ui/Modal'

export default function ModalPregunta({ isOpen, onClose, onAnswer, category }: any) {
  const { ageCategory, seenQuestions, markQuestionAsSeen } = useGame()
  const [question, setQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showContinue, setShowContinue] = useState(false)

  const theme = ageCategory === 'ninos' 
    ? { gradient: 'from-[#7C3AED] to-[#C026D3]', bg: 'bg-mesh-purple' }
    : { gradient: 'from-[#0EA5E9] to-[#2DD4BF]', bg: 'bg-slate-900' }

  useEffect(() => {
    if (isOpen && category && ageCategory) {
      const questionCategories = getQuestionCategories(ageCategory)
      const categoryQuestions = questionCategories[category]?.questions || []
      
      // Filter questions that haven't been seen yet
      const availableQuestions = categoryQuestions.filter(q => !seenQuestions.has(q.id))
      
      // If all questions were seen, reset for this category or just pick any (failsafe)
      const pool = availableQuestions.length > 0 ? availableQuestions : categoryQuestions
      
      if (pool.length > 0) {
        const randomIndex = Math.floor(Math.random() * pool.length)
        const selectedQ = pool[randomIndex]
        setQuestion(selectedQ)
        markQuestionAsSeen(selectedQ.id)
      }
      
      setSelectedAnswer(null)
      setIsCorrect(null)
      setShowContinue(false)
    }
  }, [isOpen, category, ageCategory])

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || !question) return

    setSelectedAnswer(answerIndex)
    const correct = answerIndex === question.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setTimeout(() => {
        onAnswer(true)
        onClose()
      }, 2000)
    } else {
      setTimeout(() => setShowContinue(true), 1000)
    }
  }

  const handleContinue = () => {
    if (isCorrect !== null) {
      onAnswer(isCorrect)
      onClose()
    }
  }

  if (!question || !category || !ageCategory) return null

  const categoryInfo = getQuestionCategories(ageCategory)[category]

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} 
      title=""
      className="modal-xl"
      dismissible={false}
    >
      <div className={`michi-modal overflow-hidden p-0 border-0 ${theme.bg} d-flex flex-column`} style={{ maxHeight: '90vh' }}>
        <div className={`bg-gradient-to-r ${theme.gradient} h-2 w-full`} />
        
        <div className="p-3 p-md-4 flex-grow-1 d-flex flex-column justify-content-center overflow-hidden">
            <div className="text-center mb-4">
               <span className="fs-6 fw-black text-white uppercase tracking-widest opacity-70 mb-2 d-block">{categoryInfo?.name}</span>
               <h3 className="fs-2 fw-black text-white leading-tight mb-0">
                 {question.text}
               </h3>
            </div>

            <div className="row justify-content-center g-3 overflow-hidden">
               <div className="col-12 col-lg-8">
                  <div className="d-grid gap-2">
                     {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index
                        const isCorrectOption = index === question.correctAnswer
                        const showResult = selectedAnswer !== null
                        
                        let cardClass = "bg-white text-[#0f172a] hover:bg-opacity-90 shadow-md border-transparent"
                        if (showResult) {
                           if (isCorrectOption) cardClass = "bg-success border-white scale-102 shadow-lg text-white"
                           else if (isSelected) cardClass = "bg-danger border-white scale-98 opacity-90 text-white"
                           else cardClass = "bg-white bg-opacity-20 border-white border-opacity-5 opacity-40 text-[#0f172a]/50"
                        }

                        return (
                         <button
                           key={index}
                           onClick={() => handleAnswer(index)}
                           disabled={selectedAnswer !== null}
                           className={`btn text-center p-3 p-md-3 rounded-4 border-2 transition-all duration-500 ${cardClass}`}
                         >
                           <span className="fs-5 fw-black text-inherit uppercase">{option}</span>
                         </button>
                     )})}
                  </div>
               </div>
            </div>

            {showContinue && isCorrect === false && (
             <div className="position-absolute top-0 start-0 w-100 h-100 dark-glass-panel d-flex align-items-center justify-content-center animate-in zoom-in duration-300" style={{ zIndex: 100 }}>
               <div className="text-center p-4">
                 <div className="mb-3 animate-bounce">
                    <img src="/images/Todos los Gatos/Gatos nuevos/Gato triste.png" alt="Ups" style={{ maxHeight: '120px' }} />
                 </div>
                 <h3 className="fs-1 fw-black text-white mb-2">¡CUIDADO!</h3>
                 <div className="bg-white bg-opacity-10 p-3 rounded-4 backdrop-blur-md mb-4 max-w-sm mx-auto border border-white border-opacity-10">
                    <p className="fs-6 text-white mb-0">{question.explanation || "¡Inténtalo de nuevo!"}</p>
                 </div>
                 <button onClick={handleContinue} className="btn btn-michi-primary px-4 py-3 fs-5 shadow-premium">VOLVER AL TABLERO</button>
               </div>
             </div>
            )}

            {isCorrect && (
             <div className="position-absolute top-0 start-0 w-100 h-100 dark-glass-panel d-flex align-items-center justify-content-center animate-in zoom-in duration-300" style={{ zIndex: 100 }}>
               <div className="text-center p-4">
                 <div className="mb-3 animate-float">
                    <img src="/images/Todos los Gatos/Gatos nuevos/Gato Celebrando (salto).png" alt="Genial" style={{ maxHeight: '120px' }} />
                 </div>
                 <h3 className="fs-1 fw-black text-white mb-2">¡GENIAL!</h3>
                 <div className="d-flex justify-content-center align-items-center gap-2">
                    <img src="/images/Todos los Gatos/Logo/moneda vector.png" alt="Coin" className="animate-spin" style={{ width: '30px' }} />
                    <span className="fs-3 fw-black text-accent">+100 PUNTOS</span>
                 </div>
               </div>
             </div>
            )}
        </div>
      </div>
    </Modal>
  )
}
