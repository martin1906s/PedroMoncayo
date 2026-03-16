// Utilidad para optimizar carga de imágenes con lazy loading inteligente
import { useEffect, useState } from 'react'

interface ImageCache {
  [key: string]: HTMLImageElement
}

class ImageOptimizer {
  private cache: ImageCache = {}
  private loadingQueue: Set<string> = new Set()
  private observer: IntersectionObserver | null = null

  constructor() {
    // Crear IntersectionObserver para lazy loading
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              const src = img.dataset.src
              if (src && !img.src) {
                this.loadImage(src).then((loadedImg) => {
                  img.src = loadedImg.src
                  img.classList.remove('lazy-loading')
                  img.classList.add('lazy-loaded')
                })
                this.observer?.unobserve(img)
              }
            }
          })
        },
        {
          rootMargin: '50px', // Cargar 50px antes de que sea visible
          threshold: 0.01
        }
      )
    }
  }

  // Precargar imágenes críticas
  async preloadCritical(urls: string[]): Promise<void> {
    const promises = urls.map(url => this.loadImage(url))
    await Promise.all(promises)
  }

  // Cargar imagen con caché
  async loadImage(url: string): Promise<HTMLImageElement> {
    // Si ya está en caché, retornar inmediatamente
    if (this.cache[url]) {
      return Promise.resolve(this.cache[url])
    }

    // Si ya está cargando, esperar
    if (this.loadingQueue.has(url)) {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (this.cache[url]) {
            clearInterval(checkInterval)
            resolve(this.cache[url])
          }
        }, 50)
      })
    }

    // Marcar como cargando
    this.loadingQueue.add(url)

    return new Promise((resolve, reject) => {
      const img = new Image()
      
      img.onload = () => {
        this.cache[url] = img
        this.loadingQueue.delete(url)
        resolve(img)
      }

      img.onerror = () => {
        this.loadingQueue.delete(url)
        reject(new Error(`Failed to load image: ${url}`))
      }

      // Optimizaciones de carga
      img.decoding = 'async'
      img.loading = 'lazy'
      img.src = url
    })
  }

  // Observar elemento para lazy loading
  observe(element: HTMLImageElement): void {
    if (this.observer) {
      this.observer.observe(element)
    }
  }

  // Limpiar caché
  clearCache(): void {
    this.cache = {}
  }

  // Obtener tamaño de caché
  getCacheSize(): number {
    return Object.keys(this.cache).length
  }
}

// Singleton
export const imageOptimizer = new ImageOptimizer()

// Hook para React
export const useImagePreload = (urls: string[]) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    imageOptimizer.preloadCritical(urls).then(() => {
      setLoaded(true)
    })
  }, [urls])

  return loaded
}
