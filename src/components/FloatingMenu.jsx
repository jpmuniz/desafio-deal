import React, { useState } from 'react'

const FloatingMenu = ({ theme, setColor, resetTheme }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="floating-menu">
      <button
        className="menu-trigger"
        aria-label="Abrir menu de personalização"
        onClick={() => setOpen(o => !o)}
      >⚙</button>

      {open && (
        <div className="menu-panel" role="dialog" aria-label="Personalização de cores">
          <div style={{fontWeight: 700}}>Personalize o tema</div>
          <div className="color-row">
            <label>Fundo</label>
            <input type="color" value={theme.bg} onChange={e => setColor('bg', e.target.value)} />
          </div>
          <div className="color-row">
            <label>Tabuleiro</label>
            <input type="color" value={theme.board} onChange={e => setColor('board', e.target.value)} />
          </div>
          <div className="color-row">
            <label>Linhas</label>
            <input type="color" value={theme.lines} onChange={e => setColor('lines', e.target.value)} />
          </div>
          <div className="color-row">
            <label>Cor do X</label>
            <input type="color" value={theme.x} onChange={e => setColor('x', e.target.value)} />
          </div>
          <div className="color-row">
            <label>Cor do O</label>
            <input type="color" value={theme.o} onChange={e => setColor('o', e.target.value)} />
          </div>
          <div className="color-row">
            <label>Texto</label>
            <input type="color" value={theme.text} onChange={e => setColor('text', e.target.value)} />
          </div>

          <button className="btn" onClick={resetTheme} aria-label="Restaurar tema">
            Restaurar padrão
          </button>
        </div>
      )}
    </div>
  )
}

export { FloatingMenu }
