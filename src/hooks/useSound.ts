import { useRef, useCallback } from 'react';

interface SoundOptions {
  volume?: number;
  loop?: boolean;
}

export const useSound = () => {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const playSound = useCallback((soundPath: string, options: SoundOptions = {}) => {
    try {
      // Si ya existe una instancia del sonido, la reutilizamos
      if (!audioRefs.current[soundPath]) {
        audioRefs.current[soundPath] = new Audio(soundPath);
        // Configurar para carga lazy
        audioRefs.current[soundPath].preload = 'none'; // Cambiar a 'none' para no precargar
      }

      const audio = audioRefs.current[soundPath];
      
      // Configurar opciones
      audio.volume = options.volume || 0.3;
      audio.loop = options.loop || false;
      
      // Reiniciar el audio si ya está reproduciéndose
      audio.currentTime = 0;
      
      // Reproducir con manejo de errores mejorado
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Sonido reproducido correctamente
        }).catch(() => {
          // Intentar cargar el audio primero
          audio.load();
        });
      }
    } catch (error) {
      // Error silencioso para no afectar la experiencia
    }
  }, []);

  const stopSound = useCallback((soundPath: string) => {
    if (audioRefs.current[soundPath]) {
      audioRefs.current[soundPath].pause();
      audioRefs.current[soundPath].currentTime = 0;
    }
  }, []);

  const stopAllSounds = useCallback(() => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, []);

  return {
    playSound,
    stopSound,
    stopAllSounds
  };
};
