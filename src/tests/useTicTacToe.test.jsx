import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { App } from '../App.jsx'

describe('hook que gerencia comportamento do jogo da velha', () => {
  beforeEach(() => {
    cleanup()
  })

  it('deve alternar jogadores corretamente', () => {
    const { container } = render(<App />)
    
    const statusElement = container.querySelector('.status')
    expect(statusElement).toHaveTextContent('')
    
    const sq0 = screen.getByTestId('square-0')
    fireEvent.click(sq0)
    
    expect(sq0).toHaveTextContent('X')
    
    expect(screen.getByText(/Vez de:/)).toBeInTheDocument()
    expect(screen.getByText(/Vez de:/).textContent).toContain('O')
    
    const sq1 = screen.getByTestId('square-1')
    fireEvent.click(sq1)
    
    expect(sq1).toHaveTextContent('O')
    expect(screen.getByText(/Vez de:/).textContent).toContain('X')
  })

  it('deve bloquear jogadas em casas ocupadas', () => {
    render(<App />)
    
    const sq0 = screen.getByTestId('square-0')
    
    fireEvent.click(sq0)
    expect(sq0).toHaveTextContent('X')
    
    expect(screen.getByText(/Vez de:/).textContent).toContain('O')
    
    fireEvent.click(sq0)
    
    expect(sq0).toHaveTextContent('X')
    expect(screen.getByText(/Vez de:/).textContent).toContain('O')
  })

  it('deve bloquear jogadas após fim do jogo', () => {
    render(<App />)
    
    fireEvent.click(screen.getByTestId('square-0')) 
    fireEvent.click(screen.getByTestId('square-3')) 
    fireEvent.click(screen.getByTestId('square-1')) 
    fireEvent.click(screen.getByTestId('square-4')) 
    fireEvent.click(screen.getByTestId('square-2')) 
    
    expect(screen.getByText(/Vencedor da partida:/)).toBeInTheDocument()
    
    const emptySquare = screen.getByTestId('square-5')
    fireEvent.click(emptySquare)
    
    expect(emptySquare).toHaveTextContent('')
  })

  it('deve resetar jogo ao clicar no botão que tem o texto "Próxima partida"', () => {
    render(<App />)
    
    fireEvent.click(screen.getByTestId('square-0'))
    fireEvent.click(screen.getByTestId('square-1'))
    
    expect(screen.getByTestId('square-0')).toHaveTextContent('X')
    expect(screen.getByTestId('square-1')).toHaveTextContent('O')
    
    expect(screen.getByText(/Vez de:/)).toBeInTheDocument()
    
    fireEvent.click(screen.getByText('Próxima partida'))
    
    for (let i = 0; i < 9; i++) {
      expect(screen.getByTestId(`square-${i}`)).toHaveTextContent('')
    }
    
    expect(screen.queryByText(/Vez de:/)).not.toBeInTheDocument()
  })
})