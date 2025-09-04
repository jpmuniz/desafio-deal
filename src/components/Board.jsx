import React from 'react'
import { Square } from './Square.jsx'

/**
 * @param {{ board: Array<'X'|'O'|null>, onPlay: (index:number)=>void, disabled?: boolean }} props
 */
const Board = ({ board, onPlay, disabled=false }) => {
  return (
    <div className="grid" role="grid" aria-label="Jogo da velha">
      {board.map((cell, i) => (
        <Square
          key={i}
          value={cell}
          onClick={() => onPlay(i)}
          disabled={disabled || Boolean(cell)}
          index={i}
        />
      ))}
    </div>
  )
}

export { Board }