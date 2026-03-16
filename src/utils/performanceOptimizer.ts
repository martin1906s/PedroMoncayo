// Utilidades de optimización de performance

// Debounce optimizado
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle optimizado
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// RequestAnimationFrame optimizado para animaciones
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    if (rafId) return
    
    rafId = requestAnimationFrame(() => {
      func(...args)
      rafId = null
    })
  }
}

// Lazy execution - ejecutar cuando el navegador esté idle
export function idleCallback(callback: () => void, timeout = 2000): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, 1)
  }
}

// Memoización simple
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Batch updates para React
export function batchUpdates(updates: Array<() => void>): void {
  requestAnimationFrame(() => {
    updates.forEach(update => update())
  })
}

// Detectar si el dispositivo es de bajo rendimiento
export function isLowEndDevice(): boolean {
  // Verificar memoria disponible
  const memory = (navigator as any).deviceMemory
  if (memory && memory < 4) return true
  
  // Verificar número de cores
  const cores = navigator.hardwareConcurrency
  if (cores && cores < 4) return true
  
  // Verificar conexión
  const connection = (navigator as any).connection
  if (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    return true
  }
  
  return false
}

// Optimizar renderizado con will-change
export function optimizeElement(element: HTMLElement, properties: string[]): void {
  element.style.willChange = properties.join(', ')
  
  // Limpiar después de la animación
  setTimeout(() => {
    element.style.willChange = 'auto'
  }, 1000)
}

// Preconnect a dominios externos
export function preconnect(urls: string[]): void {
  urls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = url
    document.head.appendChild(link)
  })
}

// Prefetch de recursos
export function prefetch(urls: string[]): void {
  urls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    document.head.appendChild(link)
  })
}

// Medición de performance
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map()
  
  start(label: string): void {
    this.marks.set(label, performance.now())
  }
  
  end(label: string): number {
    const start = this.marks.get(label)
    if (!start) return 0
    
    const duration = performance.now() - start
    this.marks.delete(label)
    
    // Solo en desarrollo
    try {
      if (import.meta.env.DEV) {
        console.log(`⚡ ${label}: ${duration.toFixed(2)}ms`)
      }
    } catch {
      // Silenciar error
    }
    
    return duration
  }
  
  measure(label: string, fn: () => void): number {
    this.start(label)
    fn()
    return this.end(label)
  }
}

export const perfMonitor = new PerformanceMonitor()
