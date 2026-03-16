import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Visualizador de bundle (solo en análisis)
    ...(process.env.ANALYZE ? [visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })] : [])
  ],
  
  build: {
    // Optimización de chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separar vendor chunks grandes
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor'
            }
            if (id.includes('bootstrap') || id.includes('@popperjs')) {
              return 'bootstrap'
            }
            if (id.includes('howler')) {
              return 'audio'
            }
            // Otros vendors en un chunk separado
            return 'vendor'
          }
          // Separar páginas en chunks individuales
          if (id.includes('/pages/')) {
            const page = id.split('/pages/')[1].split('.')[0]
            return `page-${page}`
          }
          // Separar componentes grandes
          if (id.includes('/components/Modal')) {
            return 'modals'
          }
        },
        // Optimizar nombres de archivos
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Optimizar tamaño de chunks
    chunkSizeWarningLimit: 500,
    // Minificación con esbuild (más rápido que terser)
    minify: 'esbuild',
    // Configuración de target para mejor compatibilidad
    target: 'es2015',
    // CSS code splitting
    cssCodeSplit: true,
    // Source maps solo en desarrollo
    sourcemap: false,
    // Optimizar assets
    assetsInlineLimit: 4096, // Inline assets < 4kb
  },
  
  // Optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'bootstrap',
      'howler'
    ],
    // Excluir dependencias que no necesitan optimización
    exclude: []
  },
  
  // Server config para desarrollo
  server: {
    hmr: {
      overlay: false
    }
  },
  
  // Optimizaciones de preview
  preview: {
    port: 4173,
    strictPort: true
  },
  
  // Configuración de CSS
  css: {
    devSourcemap: false
  }
})
