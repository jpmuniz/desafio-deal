import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ttt_theme_v1'

const DEFAULTS = {
  bg: '#0f172a',
  board: '#1f2937',
  lines: '#334155',
  x: '#38bdf8',
  o: '#f472b6',
  text: '#e2e8f0'
}


const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS
    } catch {
      return DEFAULTS
    }
  })

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--bg', theme.bg)
    root.style.setProperty('--board', theme.board)
    root.style.setProperty('--lines', theme.lines)
    root.style.setProperty('--x', theme.x)
    root.style.setProperty('--o', theme.o)
    root.style.setProperty('--text', theme.text)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
    } catch {}
  }, [theme])

  const setColor = (key, value) => {
    setTheme(prev => ({ ...prev, [key]: value }))
  }

  const resetTheme = () => setTheme(DEFAULTS)

  return { theme, setColor, resetTheme }
}

export { useTheme }