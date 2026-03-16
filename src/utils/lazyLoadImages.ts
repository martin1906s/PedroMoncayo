// Utilidad para lazy loading de imágenes con Intersection Observer
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = img.dataset.src
          
          if (src) {
            img.src = src
            img.removeAttribute('data-src')
            observer.unobserve(img)
          }
        }
      })
    }, {
      rootMargin: '50px' // Cargar imágenes 50px antes de que sean visibles
    })

    // Observar todas las imágenes con data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img)
    })
  }
}

// Hook para usar en componentes React
export const useLazyLoadImages = () => {
  if (typeof window !== 'undefined') {
    setupLazyLoading()
  }
}
