import { useGame } from '../context'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserIcon, GraduationCapIcon } from '../components/icons/Icons'

export default function SeleccionCategoria() {
  const { setAgeCategory } = useGame()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<'ninos' | 'jovenes' | null>(null)

  const handleCategorySelect = (category: 'ninos' | 'jovenes') => {
    setSelectedCategory(category)
    setAgeCategory(category)

    setTimeout(() => {
      navigate('/personajes')
    }, 1000)
  }

  const categories = [
    {
      id: 'ninos' as const,
      title: 'NIÑOS',
      subtitle: '6 - 12 años',
      description: 'Descubre Pedro Moncayo, su naturaleza y sus finanzas básicas.',
      IconComponent: UserIcon,
      gradient: 'from-[#1d4ed8] to-[#0ea5e9]',
      accentColor: 'text-[#1d4ed8]',
      image: '/avatars/oso-a.svg'
    },
    {
      id: 'jovenes' as const,
      title: 'JÓVENES',
      subtitle: '13 - 18 años',
      description: 'Retos sobre emprendimiento local, comunidad y futuro sostenible.',
      IconComponent: GraduationCapIcon,
      gradient: 'from-[#0ea5e9] to-[#10b981]',
      accentColor: 'text-[#10b981]',
      image: '/avatars/oso-b.svg'
    }
  ]

  return (
    <div className="min-vh-100 py-3 bg-[#0f172a] position-relative overflow-hidden d-flex align-items-center">
      {/* Mesh Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none">
        <div className="position-absolute bg-purple-600 blur-[120px] rounded-circle opacity-20" style={{ width: '600px', height: '600px', top: '-10%', left: '-10%' }}></div>
        <div className="position-absolute bg-blue-600 blur-[120px] rounded-circle opacity-20" style={{ width: '600px', height: '600px', bottom: '-10%', right: '-10%' }}></div>
      </div>

      <div className="container position-relative" style={{ zIndex: 10 }}>

        {/* Epic Header */}
        <div className="text-center mb-4 animate-float">
          <div className="d-flex justify-content-center mb-2">
            <img
              src="/favicon.svg"
              alt="MichiMoney Pedro Moncayo"
              className="img-fluid"
              style={{ maxHeight: '70px', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))' }}
            />
          </div>
          <div className="bg-white/5 d-inline-block px-4 py-1 rounded-full border border-white/20 mb-2 backdrop-blur-xl shadow-2xl">
            <div className="d-flex align-items-center gap-2">
              <img src="/images/Todos los Gatos/Logo/moneda vector.png" alt="Coin" style={{ width: '20px' }} />
              <span className="text-white fs-6 tracking-widest fw-black uppercase">Un Universo de Aprendizaje</span>
              <img src="/images/Todos los Gatos/Logo/moneda vector.png" alt="Coin" style={{ width: '20px' }} />
            </div>
          </div>
        </div>

        {/* Category Duo */}
        <div className="row g-3 justify-content-center">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id
            const isOtherSelected = selectedCategory !== null && !isSelected

            return (
              <div key={category.id} className="col-12 col-md-6 col-lg-5">
                <button
                  onClick={() => handleCategorySelect(category.id)}
                  disabled={selectedCategory !== null}
                  className={`
                    w-100 dark-glass-panel p-0 border-0 text-start transition-all duration-500 position-relative group
                    ${isSelected ? 'scale-105 shadow-2xl ring-4 ring-white/20' : 'hover:scale-105 active:scale-95'}
                    ${isOtherSelected ? 'opacity-30 blur-sm grayscale pointer-events-none' : ''}
                  `}
                  style={{ 
                    background: isSelected 
                      ? `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))` 
                      : 'rgba(255, 255, 255, 0.02)' 
                  }}
                >
                  {/* Decorative Header */}
                  <div className={`h-1 bg-gradient-to-r ${category.gradient} opacity-80`} />
                  
                  <div className="p-3 p-md-4 position-relative z-10">
                    {/* Badge y Icono */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="bg-white/10 p-2 rounded-3 backdrop-blur-md border border-white/20">
                        <category.IconComponent size={24} className="text-white" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                         <span className={`small fw-black uppercase tracking-tighter ${category.accentColor}`}>
                           {category.subtitle}
                         </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="mb-2">
                       <h3 className={`fs-1 fw-black mb-0 text-white italic tracking-tighter uppercase text-shadow-lg`}>
                         {category.title}
                       </h3>
                    </div>

                    {/* Character & Description Row - Space Optimized */}
                    <div className="d-flex align-items-center gap-3 mb-4 position-relative">
                       <div className="position-relative">
                          <div className={`position-absolute top-50 start-50 translate-middle w-24 h-24 blur-3xl opacity-20 bg-gradient-to-r ${category.gradient} animate-pulse`}></div>
                          <img 
                            src={category.image} 
                            alt={category.title} 
                            className="img-fluid animate-float position-relative z-10" 
                            style={{ 
                              maxHeight: '100px',
                              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' 
                            }}
                          />
                       </div>
                       
                       <div className="bg-white/5 p-2 px-3 rounded-4 border border-white/10 backdrop-blur-sm flex-grow-1 shadow-inner">
                          <p className="small text-white text-opacity-90 mb-0 leading-tight italic" style={{ fontSize: '0.85rem' }}>
                            "{category.description}"
                          </p>
                       </div>
                    </div>

                    {/* Action Button Style - Compact */}
                    <div className={`
                      w-100 py-3 rounded-3 fs-5 fw-black tracking-widest text-center transition-all duration-300
                      ${isSelected 
                        ? 'bg-success text-white shadow-lg pulse-glow' 
                        : `bg-gradient-to-r ${category.gradient} text-white shadow-xl hover:scale-105 group-hover:brightness-110`
                      }
                    `}>
                      {isSelected ? '¡LISTO!' : '¡COMENZAR!'}
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className={`position-absolute bottom-0 end-0 w-12 h-12 bg-gradient-to-tl ${category.gradient} opacity-10`} style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}