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
    ? { gradient: 'from-[#1d4ed8] to-[#0ea5e9]', bg: 'bg-mesh-purple' }
    : { gradient: 'from-[#0ea5e9] to-[#10b981]', bg: 'bg-mesh-purple' }

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
        const baseQuestion = pool[randomIndex]

        // Barajar posiciones de respuesta para que la correcta no siempre esté en la misma posición
        const indices = baseQuestion.options.map((_, idx) => idx)
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[indices[i], indices[j]] = [indices[j], indices[i]]
        }
        const shuffledOptions = indices.map((idx) => baseQuestion.options[idx])
        const newCorrectIndex = indices.indexOf(baseQuestion.correctAnswer)

        const shuffledQuestion: Question = {
          ...baseQuestion,
          options: shuffledOptions,
          correctAnswer: newCorrectIndex,
        }

        setQuestion(shuffledQuestion)
        markQuestionAsSeen(baseQuestion.id)
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
      // Mostrar mensaje de acierto y cerrar automáticamente luego de 2 segundos
      setShowContinue(true)
      setTimeout(() => {
        onAnswer(true)
        onClose()
      }, 2000)
    } else {
      // Mostrar mensaje de error y cerrar automáticamente luego de 2 segundos
      setShowContinue(true)
      setTimeout(() => {
        onAnswer(false)
        onClose()
      }, 2000)
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
               <span className="fs-6 fw-black uppercase tracking-widest opacity-80 mb-2 d-block" style={{ color: '#111827' }}>
                 {categoryInfo?.name}
               </span>
               <h3 className="fs-2 fw-black leading-tight mb-0" style={{ color: '#111827' }}>
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
                        
                        let cardClass = "bg-mesh-purple text-[#0f172a] hover:bg-opacity-90 shadow-md border-transparent"
                        if (showResult) {
                           if (isCorrectOption) cardClass = "bg-success border-white scale-102 shadow-lg text-white"
                           else if (isSelected) cardClass = "bg-danger border-white scale-98 opacity-90 text-white"
                           else cardClass = "bg-mesh-purple border-white border-opacity-5 opacity-40 text-[#0f172a]/50"
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
             <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center animate-in zoom-in duration-300" style={{ zIndex: 100, backdropFilter: 'blur(10px)', background: 'rgba(15,23,42,0.55)' }}>
               <div className="michi-card text-center px-4 px-md-5 py-4 py-md-5" style={{ maxWidth: '640px', borderRadius: '1.75rem' }}>
                 <div className="d-flex flex-column align-items-center mb-3">
                   <div
                     className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                     style={{
                       width: '80px',
                       height: '80px',
                       background: 'radial-gradient(circle at 30% 0%, rgba(254,242,242,1), rgba(239,68,68,0.9))',
                       boxShadow: '0 18px 45px rgba(127,29,29,0.55)',
                     }}
                   >
                     <span className="fw-black" style={{ fontSize: '2.5rem', color: '#f9fafb' }}>!</span>
                   </div>
                   <h3 className="fs-1 fw-black mb-1" style={{ color: '#111827', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                     ¡CUIDADO!
                   </h3>
                   <p className="mb-0" style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
                     respuesta incorrecta
                   </p>
                 </div>
                 <div
                   className="px-3 px-md-4 py-3 rounded-4"
                   style={{
                     background: 'linear-gradient(135deg, rgba(219,234,254,0.95), rgba(209,250,229,0.95))',
                     border: '1px solid rgba(148,163,184,0.6)',
                   }}
                 >
                   <p className="fs-6 mb-0" style={{ color: '#111827' }}>
                     {question.explanation || 'Las cooperativas se basan en solidaridad, ayuda mutua y participación democrática.'}
                   </p>
                 </div>
               </div>
             </div>
            )}

            {showContinue && isCorrect === true && (
             <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center animate-in zoom-in duration-300" style={{ zIndex: 100, backdropFilter: 'blur(10px)', background: 'rgba(15,23,42,0.55)' }}>
               <div className="michi-card text-center px-4 px-md-5 py-4 py-md-5" style={{ maxWidth: '640px', borderRadius: '1.75rem' }}>
                 <div className="d-flex flex-column align-items-center mb-3">
                   <div
                     className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                     style={{
                       width: '80px',
                       height: '80px',
                       background: 'radial-gradient(circle at 30% 0%, rgba(240,253,250,1), rgba(16,185,129,0.95))',
                       boxShadow: '0 18px 45px rgba(6,95,70,0.55)',
                     }}
                   >
                     <span className="fw-black" style={{ fontSize: '2.5rem', color: '#ecfdf5' }}>✓</span>
                   </div>
                   <h3 className="fs-1 fw-black mb-1" style={{ color: '#111827', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                     ¡GENIAL!
                   </h3>
                   <p className="mb-0" style={{ color: '#16a34a', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
                     +100 puntos
                   </p>
                 </div>
                 <div
                   className="px-3 px-md-4 py-3 rounded-4"
                   style={{
                     background: 'linear-gradient(135deg, rgba(240,253,250,0.98), rgba(224,242,254,0.98))',
                     border: '1px solid rgba(74,222,128,0.7)',
                   }}
                 >
                   <p className="fs-6 mb-0" style={{ color: '#064e3b' }}>
                     ¡Sigue así! Cada respuesta correcta te acerca a dominar la educación financiera.
                   </p>
                 </div>
               </div>
             </div>
            )}
        </div>
      </div>
    </Modal>
  )
}
