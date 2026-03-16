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
      description: 'Descubre el mundo cooperativo y tus primeras finanzas.',
      IconComponent: UserIcon,
      gradient: 'from-[#1d4ed8] to-[#0ea5e9]',
      accentColor: 'text-[#1d4ed8]',
      image: '/avatars/oso-a.svg'
    },
    {
      id: 'jovenes' as const,
      title: 'JÓVENES',
      subtitle: '13 - 18 años',
      description: 'Retos sobre cooperativismo, comunidad y futuro financiero.',
      IconComponent: GraduationCapIcon,
      gradient: 'from-[#0ea5e9] to-[#10b981]',
      accentColor: 'text-[#10b981]',
      image: '/avatars/oso-b.svg'
    }
  ]

  return (
    <div className="min-vh-100 py-4 app-background position-relative overflow-hidden d-flex align-items-center">
      <div className="container position-relative" style={{ zIndex: 10, maxWidth: '1100px' }}>

        <div className="text-center mb-4 animate-float">
          <div className="d-flex justify-content-center mb-3">
            <img
              src="/images/logoConLetrasLatreales.png"
              alt="MichiMoney Pedro Moncayo"
              className="img-fluid"
              style={{ maxHeight: '110px', filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.5))' }}
            />
          </div>
          <div className="d-inline-block px-4 py-1 rounded-full border border-slate-200 mb-2 shadow-sm" style={{ background: 'linear-gradient(90deg, rgba(29,78,216,0.06), rgba(16,185,129,0.06))' }}>
            <span className="fw-bold" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1d4ed8' }}>
              Un universo de aprendizaje cooperativo
            </span>
          </div>
        </div>

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
                    w-100 p-0 border-0 text-start transition-all duration-500 position-relative group rounded-4
                    ${isSelected ? 'scale-105 shadow-2xl' : 'hover:scale-105 active:scale-95'}
                    ${isOtherSelected ? 'opacity-30 blur-sm grayscale pointer-events-none' : ''}
                  `}
                  style={{
                    background: isSelected
                      ? `linear-gradient(135deg, rgba(29,78,216,0.18), rgba(16,185,129,0.18))`
                      : `linear-gradient(135deg, rgba(29,78,216,0.12), rgba(16,185,129,0.12))`,
                    padding: '1px'
                  }}
                >
                  {/* Inner white card unificada */}
                  <div className="michi-card p-3 p-md-4 position-relative z-10">
                    {/* Badge y Icono */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="p-2 rounded-3 border border-slate-200" style={{ backgroundColor: 'rgba(219,234,254,0.9)' }}>
                        <category.IconComponent size={24} className="text-[#1f2937]" />
                      </div>
                      <div className="px-3 py-1 rounded-full border border-white/10 backdrop-blur-md" style={{ backgroundColor: 'rgba(191,219,254,0.2)' }}>
                         <span className={`small fw-black uppercase tracking-tighter ${category.accentColor}`}>
                           {category.subtitle}
                         </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="mb-2">
                       <h3 className="fs-1 fw-black mb-0 italic tracking-tighter uppercase" style={{ color: '#0f172a' }}>
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
                       
                       <div className="p-2 px-3 rounded-4 border border-slate-200 flex-grow-1 shadow-sm" style={{ backgroundColor: 'rgba(219,234,254,0.92)' }}>
                          <p className="small mb-0 leading-tight italic" style={{ fontSize: '0.85rem', color: '#0f172a' }}>
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