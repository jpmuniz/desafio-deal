import { useEffect, useRef, useState } from 'react'

/**
 * @param {object} opts
 * @param {number} [opts.seconds=5] 
 * @param {boolean} [opts.enabled=true] 
 * @param {() => void} opts.onExpire 
 * @param {any[]} [opts.resetDeps=[]] 
 */
const useTurnTimer = ({ seconds = 5, enabled = true, onExpire, resetDeps = [] }) => {
  const [left, setLeft] = useState(seconds)
  const intervalRef = useRef(null)
  const callbackRef = useRef(onExpire)
  
  callbackRef.current = onExpire

  useEffect(() => {
    if (!enabled && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setLeft(seconds) 
    }
  }, [enabled, seconds])

  useEffect(() => {
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (enabled) {
      setLeft(seconds)
      
      intervalRef.current = setInterval(() => {
        setLeft(prev => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
            if (callbackRef.current) callbackRef.current()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      setLeft(seconds)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [enabled, seconds, ...resetDeps])

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setLeft(seconds)
    
    if (enabled) {
      intervalRef.current = setInterval(() => {
        setLeft(prev => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
            if (callbackRef.current) callbackRef.current()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  return { 
    secondsLeft: left, 
    reset,
    isActive: enabled && left > 0 && intervalRef.current !== null
  }
}

export { useTurnTimer }