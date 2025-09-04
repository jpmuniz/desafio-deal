import React from 'react'
import { Board } from './components/Board.jsx'
import { Scoreboard } from './components/Scoreboard.jsx'
import { FloatingMenu }from './components/FloatingMenu.jsx'
import { useTicTacToe } from './hooks/useTicTacToe.js'
import { useTurnTimer } from './hooks/useTurnTimer.js'
import { useTheme } from './hooks/useTheme.js'

const App = () => {
  const game = useTicTacToe()
  const { theme, setColor, resetTheme } = useTheme()

  const timer = useTurnTimer({
  seconds: 5,
  enabled: game.status === 'playing',
  onExpire: () => game.autoPlay(),
  resetDeps: [game.player]
})

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="title">Jogo da Velha</div>
          <div className="subtitle"> Placar até 11</div>
        </div>
        <div className="row">
          <div className="timer" aria-live="polite" aria-atomic="true">
            ⏱️ Tempo: {timer.secondsLeft}s
          </div>
          <button className="btn" onClick={game.nextRound} aria-label="Próxima partida">
            Próxima partida
          </button>
          <button className="btn" onClick={game.resetScores} aria-label="Zerar placar">
            Zerar placar
          </button>
        </div>
      </header>

      <section className="panel">
        <div className="row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
          <div className={"status " + (game.status === 'won' ? 'win' : game.status === 'draw' ? 'draw' : game.status === 'matchOver' ? 'match' : '')}>
            {game.status === 'playing' && <>Vez de: <strong className={game.player === 'X' ? 'symbol-x' : 'symbol-o'}>{game.player}</strong></>}
            {game.status === 'won' && <>Vencedor da partida: <strong className={game.winner === 'X' ? 'symbol-x' : 'symbol-o'}>{game.winner}</strong></>}
            {game.status === 'draw' && <>Empate</>}
            {game.status === 'matchOver' && <>Campeão da série (11): <strong className={game.matchWinner === 'X' ? 'symbol-x' : 'symbol-o'}>{game.matchWinner}</strong></>}
          </div>
          <Scoreboard scores={game.scores} target={game.targetWins} />
        </div>
      </section>

      <main className="panel" aria-label="Tabuleiro do jogo">
        <Board
         board={game.board}
         onPlay={game.playAt}
         disabled={['won', 'draw', 'matchOver'].includes(game.status)}
        />
    </main>

      <FloatingMenu theme={theme} setColor={setColor} resetTheme={resetTheme} />
    </div>
  )
}

export { App }
