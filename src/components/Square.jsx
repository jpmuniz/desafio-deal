import React from 'react'

/**
 * @param {{ value: 'X'|'O'|null, onClick: ()=>void, disabled?: boolean, index:number }} props
 */
const Square = ({ value, onClick, disabled=false, index }) => {
  const label = value
    ? `Casa ${index + 1}: ${value}`
    : `Casa ${index + 1}: vazia`
  return (
    <button
      className={'square ' + (!value ? 'empty' : '')}
      role="gridcell"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      data-testid={`square-${index}`}
    >
      {value && <span className={value === 'X' ? 'symbol-x' : 'symbol-o'}>{value}</span>}
    </button>
  )
}

export { Square }
