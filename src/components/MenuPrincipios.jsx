function MenuPrincipios({principles, activeIndex, setActiveIndex}) {
  return (
    <div style={{ width: '250px', overflowY: 'auto', borderRight: '1px solid #333', background: '#222' }}>
      <h3 style={{ padding: '20px', margin: 0, borderBottom: '1px solid #333' }}>Principios TGS</h3>
      {principles.map((p, index) => (
        <button
          key={p.id}
          onClick={() => setActiveIndex(index)}
          style={{
            width: '100%',
            padding: '15px 20px',
            background: activeIndex === index ? '#333' : 'transparent',
            color: activeIndex === index ? '#4ade80' : '#aaa',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            borderBottom: '1px solid #2a2a2a',
            transition: 'all 0.2s'
          }}
        >
          {p.title}
        </button>
      ))}
    </div>

  )
}

export default MenuPrincipios
