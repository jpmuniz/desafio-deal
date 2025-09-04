import { useEffect, useMemo, useState } from 'react'
import { checkWinner, isDraw, chooseAutoMove } from '../lib/gameUtils'

const STORAGE_KEY = 'ttt_scores_session_v1'

const useTicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [player, setPlayer] = useState('X')
  const [winner, setWinner] = useState(null)
  const [draw, setDraw] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
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
   if (!gameStarted) return 'waitingToStart' 
   if (winner) return 'won'
   if (draw) return 'draw'
   if (scores.X >= targetWins || scores.O >= targetWins) return 'matchOver'
   return 'playing'
  }, [gameStarted, winner, draw, scores])

  const matchWinner = useMemo(() => {
    if (scores.X >= targetWins) return 'X'
    if (scores.O >= targetWins) return 'O'
    return null
  }, [scores])

  const playAt = (number) => {
    if (status !== 'playing' && status !== 'waitingToStart') return
    if (board[number]) return
    
    if (!gameStarted) setGameStarted(true)
    
    setBoard(prev => {
      if (prev[number]) return prev
      const next = prev.slice()
      next[number] = player
      return next
    })
    
    setPlayer(prev => prev === 'X' ? 'O' : 'X')
  }

  const autoPlay = () => {
    if (status !== 'playing') return
    const i = chooseAutoMove(board)
    if (i >= 0) {
      playAt(i) 
    }
    setPlayer(player === 'X' ? 'O' : 'X')
  }

  const nextRound = () => {
   setBoard(Array(9).fill(null))
   setPlayer('X')
   setWinner(null)
   setDraw(false)
   setGameStarted(false)
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