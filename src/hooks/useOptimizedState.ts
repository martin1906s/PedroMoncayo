import { useState, useCallback, useRef, useEffect } from 'react'
import { debounce } from '../utils/performanceOptimizer'

// Hook para estado con debounce automático
export function useDebouncedState<T>(
  initialValue: T,
  delay: number = 300
): [T, T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)
  
  const debouncedSetValue = useRef(
    debounce((newValue: T) => {
      setDebouncedValue(newValue)
    }, delay)
  ).current
  
  const handleSetValue = useCallback((newValue: T) => {
    setValue(newValue)
    debouncedSetValue(newValue)
  }, [debouncedSetValue])
  
  return [value, debouncedValue, handleSetValue]
}

// Hook para prevenir re-renders innecesarios
export function useShallowMemo<T>(value: T): T {
  const ref = useRef<T>(value)
  
  if (JSON.stringify(ref.current) !== JSON.stringify(value)) {
    ref.current = value
  }
  
  return ref.current
}

// Hook para ejecutar efectos solo cuando cambian valores específicos
export function useDeepCompareEffect(
  callback: () => void | (() => void),
  dependencies: any[]
): void {
  const ref = useRef<any[]>(dependencies)
  
  if (JSON.stringify(ref.current) !== JSON.stringify(dependencies)) {
    ref.current = dependencies
  }
  
  useEffect(callback, ref.current)
}

// Hook para lazy loading de componentes
export function useLazyComponent<T>(
  loader: () => Promise<{ default: T }>,
  delay: number = 0
): T | null {
  const [component, setComponent] = useState<T | null>(null)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      loader().then(module => {
        setComponent(module.default)
      })
    }, delay)
    
    return () => clearTimeout(timer)
  }, [loader, delay])
  
  return component
}

// Hook para detectar visibilidad del elemento
export function useInView(
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): boolean {
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      options
    )
    
    observer.observe(element)
    
    return () => {
      observer.disconnect()
    }
  }, [ref, options])
  
  return isInView
}

// Hook para memoizar callbacks costosos
export function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: any[]
): T {
  const callbackRef = useRef<T>(callback)
  
  useEffect(() => {
    callbackRef.current = callback
  }, [callback, ...deps])
  
  return useCallback((...args: any[]) => {
    return callbackRef.current(...args)
  }, []) as T
}
