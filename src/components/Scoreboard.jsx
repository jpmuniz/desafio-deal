import React from 'react'

/**
 * @param {{ scores: {X:number, O:number, draws:number}, target:number }} props
 */
const Scoreboard = ({ scores, target }) => (
    <div className="scoreboard" aria-label="Placar">
      <div className="score">
        <div><strong>X</strong><span className="badge">até {target}</span></div>
        <div style={{fontSize: 24}}>{scores.X}</div>
      </div>
      <div className="score">
        <div><strong>Empates</strong></div>
        <div style={{fontSize: 24}}>{scores.draws}</div>
      </div>
      <div className="score">
        <div><strong>O</strong><span className="badge">até {target}</span></div>
        <div style={{fontSize: 24}}>{scores.O}</div>
      </div>
    </div>
)

export { Scoreboard }
