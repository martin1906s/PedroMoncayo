import { type ReactNode, type MouseEvent, useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
  adjustForNavbar?: boolean
  dismissible?: boolean
}

export default function Modal({ isOpen, onClose, children, className = '', adjustForNavbar = false, dismissible = true }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (dismissible && e.target === e.currentTarget) onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      className={`position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 p-md-4 ${adjustForNavbar ? 'pt-5' : ''}`}
      style={{ 
        zIndex: 1050,
        background: 'linear-gradient(to bottom right, rgba(0,0,0,0.8), rgba(88,28,135,0.5), rgba(0,0,0,0.8))',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div
        role="document"
        onClick={(e) => e.stopPropagation()}
        className={`w-100 overflow-auto modal-scrollable ${className}`}
        style={{ 
          maxWidth: '1200px', 
          maxHeight: '90vh',
          position: 'relative',
          zIndex: 1,
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none' /* IE y Edge */
        }}
      >
        {children}
      </div>
      
      <style>{`
        .modal-scrollable::-webkit-scrollbar {
          display: none; /* Chrome, Safari y Opera */
        }
      `}</style>
    </div>
  )
}
