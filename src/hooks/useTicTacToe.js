import { useEffect, useMemo, useState } from 'react'
import { checkWinner, isDraw, chooseAutoMove } from '../lib/gameUtils'

const STORAGE_KEY = 'ttt_scores_session_v1'

/** @typedef {'X'|'O'} Player */

const useTicTacToe = () => {
  /** @type {Array<('X'|'O'|null)>} */
  const [board, setBoard] = useState(Array(9).fill(null))
  /** @type {Player} */
  const [player, setPlayer] = useState(/** @type {Player} */('X'))
  const [winner, setWinner] = useState(/** @type {Player|null} */(null))
  const [draw, setDraw] = useState(false)
  const targetWins = 11

  const [scores, setScores] = useState(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : { X: 0, O: 0, draws: 0 }
    } catch {
      return { X: 0, O: 0, draws: 0 }
    }
  })

  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(scores)) } catch {}
  }, [scores])

  useEffect(() => {
    const winner = checkWinner(board)
    if (winner) {
      setWinner(winner)
      setScores(score => ({ ...score, [winner]: score[winner] + 1 }))
      return
    }
    if (isDraw(board)) {
      setDraw(true)
      setScores(score => ({ ...score, draws: score.draws + 1 }))
    }
  }, [board])

  const status = useMemo(() => {
    if (winner) return 'won'
    if (draw) return 'draw'
    if (scores.X >= targetWins || scores.O >= targetWins) return 'matchOver'
    return 'playing'
  }, [winner, draw, scores])

  const matchWinner = useMemo(() => {
    if (scores.X >= targetWins) return 'X'
    if (scores.O >= targetWins) return 'O'
    return null
  }, [scores])

  const internalPlace = (i) => {
    setBoard(prev => {
      if (prev[i]) return prev
      const next = prev.slice()
      next[i] = player
      return next
    })
  }

  /**
   * @param {number} number
   */
  const playAt = (number) => {
    if (status !== 'playing') return
    if (board[number]) return
    internalPlace(number)
    setPlayer(p => (p === 'X' ? 'O' : 'X'))
  }

  
  const autoPlay = () => {
    if (status !== 'playing') return
    const i = chooseAutoMove(board)
    if (i >= 0) {
      internalPlace(i)
      setPlayer(p => (p === 'X' ? 'O' : 'X'))
    }
  }

  
  const nextRound = () => {
    setBoard(Array(9).fill(null))
    setPlayer('X')
    setWinner(null)
    setDraw(false)
  }

  
  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 })
    nextRound()
  }

  return {
    board,
    player,
    status,
    winner,
    draw,
    scores,
    targetWins,
    matchWinner,
    playAt,
    autoPlay,
    nextRound,
    resetScores
  }
}

export { useTicTacToe }