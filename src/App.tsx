import { Route, Routes, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './index.css'

// Lazy loading de páginas para code splitting
const SeleccionCategoria = lazy(() => import('./pages/SeleccionCategoria'))
const SeleccionPersonaje = lazy(() => import('./pages/SeleccionPersonaje'))
const FightIntro = lazy(() => import('./pages/FightIntro'))
const PantallaPrincipal = lazy(() => import('./pages/PantallaPrincipal'))
const Resultado = lazy(() => import('./pages/Resultado'))

const LoadingFallback = () => (
  <div className="min-vh-100 d-flex align-items-center justify-content-center bg-[#0f172a]">
    <div className="text-center animate-pulse">
      <div className="spinner-border mb-4" role="status" style={{ width: '4rem', height: '4rem', color: '#7C3AED', borderWidth: '0.4em' }}>
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="fw-black fs-4 text-gradient-purple tracking-widest uppercase">Cargando Universo...</p>
    </div>
  </div>
)

export default function App() {
  return (
    <div className="min-vh-100">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<SeleccionCategoria />} />
          <Route path="/personajes" element={<SeleccionPersonaje />} />
          <Route path="/fight-intro" element={<FightIntro />} />
          <Route path="/tablero" element={<PantallaPrincipal />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/preguntas" element={<Navigate to="/tablero" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}
