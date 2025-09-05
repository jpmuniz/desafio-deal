import { describe, it, expect } from 'vitest'
import { checkWinner, isDraw, chooseAutoMove } from '../lib/gameUtils'

describe('Regras pura do jogo', () => {
  it('deve detecta vencedor da partida', () => {
    const board = ['X','X','X', null,null,null, null,null,null]
    expect(checkWinner(board)).toBe('X')
  })

  it('deve detecta empate da partida', () => {
    const board = ['X','O','X','X','O','O','O','X','X']
    expect(isDraw(board)).toBe(true)
  })

  it('auto move prioriza centro do tabuleiro', () => {
    const board = [null,null,null,null,null,null,null,null,null]
    expect(chooseAutoMove(board)).toBe(4)
  })
})