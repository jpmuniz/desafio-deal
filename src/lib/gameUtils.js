/** @typedef {'X'|'O'|null} Cell */
/** @typedef {Array<Cell>} Board */
/** @typedef {'X'|'O'} Player */

export const LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

/**
 * @param {Board} board
 * @returns {Player|null}
 */
export const checkWinner = (board) => {
  for (const [a,b,c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

/**
 * @param {Board} board
 * @returns {boolean}
 */
export const isDraw = (board) =>  board.every(Boolean) && !checkWinner(board);


/**
 * @param {Board} board
 * @returns {number}
 */
export const chooseAutoMove = (board) => {
  const order = [4,0,2,6,8,1,3,5,7]
  for (const i of order) {
    if (!board[i]) return i
  }
  return board.findIndex(c => !c)
}