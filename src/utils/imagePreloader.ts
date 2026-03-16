// Utilidad para precargar imágenes críticas
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

export const preloadImages = async (srcs: string[]): Promise<void> => {
  try {
    await Promise.all(srcs.map(src => preloadImage(src)))
  } catch (error) {
    console.warn('Error precargando imágenes:', error)
  }
}

// Imágenes críticas que deben cargarse primero
export const CRITICAL_IMAGES = [
  '/images/logo-solo-warmi.png',
  '/images/chica-runner-deportista.jpg',
  '/images/chica-pensante.jpg',
  '/images/chica-senalando.jpg',
  '/images/chica-stands.jpg',
  '/images/Chica-Pasaporte.png',
  '/images/Chica-fit.jpg',
]

// Precargar imágenes críticas al inicio
export const preloadCriticalImages = () => {
  // Usar requestIdleCallback si está disponible, sino setTimeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => preloadImages(CRITICAL_IMAGES))
  } else {
    setTimeout(() => preloadImages(CRITICAL_IMAGES), 1)
  }
}
