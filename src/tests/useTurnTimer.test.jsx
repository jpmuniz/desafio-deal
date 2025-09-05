import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { useTurnTimer } from '../hooks/useTurnTimer' 


const TestTimer = ({ seconds = 5, enabled = true, onExpire, resetDeps = [] }) => {
  const { secondsLeft, isActive, reset } = useTurnTimer({ 
    seconds, 
    enabled, 
    onExpire, 
    resetDeps 
  })
  
  return (
    <div>
      <div data-testid="seconds-left">{secondsLeft}</div>
      <div data-testid="is-active">{isActive.toString()}</div>
      <button data-testid="reset-btn" onClick={reset}>Reset</button>
    </div>
  )
}

describe('hook de controle de tempo por turno', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  
  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('iniciar o jogo da velha com tempo correto', () => {
    const onExpire = vi.fn()
    render(<TestTimer seconds={3} onExpire={onExpire} />)
    
    expect(screen.getByTestId('seconds-left')).toHaveTextContent('3')
  })

  it('deve fazer countdown corretamente', async () => {
    const onExpire = vi.fn()
    render(<TestTimer seconds={3} onExpire={onExpire} />)
    
    expect(screen.getByTestId('seconds-left')).toHaveTextContent('3')
    
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('seconds-left')).toHaveTextContent('2')
    
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('seconds-left')).toHaveTextContent('1')
  })

  it('Se o jogador não agir deve chamar onExpire após tempo esgotar', async () => {
    const onExpire = vi.fn()
    render(<TestTimer seconds={2} onExpire={onExpire} />)
    
    await act(async () => {
      vi.advanceTimersByTime(2000)
    })
    
    expect(onExpire).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('seconds-left')).toHaveTextContent('0')
  })

  it('reinicia o contador para o valor inicial quando resetDeps muda', async () => {
    const onExpire = vi.fn()
    const { rerender } = render(<TestTimer seconds={3} onExpire={onExpire} resetDeps={['player1']} />)
    
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('seconds-left')).toHaveTextContent('2')
    
    rerender(<TestTimer seconds={3} onExpire={onExpire} resetDeps={['player2']} />)
    expect(screen.getByTestId('seconds-left')).toHaveTextContent('3')
  })

  it('deve reiniciar o contador para o valor inicial ao clicar no botão Zerar Placar', async () => {
    const onExpire = vi.fn()
    render(<TestTimer seconds={3} onExpire={onExpire} />)
    
    await act(async () => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.getByTestId('seconds-left')).toHaveTextContent('1')
    
    await act(async () => {
      screen.getByTestId('reset-btn').click()
    })
    
    expect(screen.getByTestId('seconds-left')).toHaveTextContent('3')
  })
})