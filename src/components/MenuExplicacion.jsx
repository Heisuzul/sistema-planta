function MenuExplicacion({currentPrinciple}) {
  return (
    <div style={{ width: '350px', borderLeft: '1px solid #333', background: '#222', padding: '30px', overflowY: 'auto' }}>
      <h2 style={{ color: '#4ade80', marginTop: 0 }}>{currentPrinciple.title}</h2>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#fff' }}>Concepto:</h4>
        <p style={{ lineHeight: '1.6', color: '#ccc' }}>{currentPrinciple.description}</p>
      </div>

      <div style={{ background: '#333', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#fff' }}>Aplicación en la Planta:</h4>
        <p style={{ lineHeight: '1.6', fontSize: '14px', color: '#ddd' }}>{currentPrinciple.detail}</p>
      </div>

      <div style={{ marginTop: '30px', fontSize: '12px', color: '#666' }}>
        <p>Modelo 3D destacado: <strong>{currentPrinciple.modelFocus.toUpperCase()}</strong></p>
      </div>
    </div>
  )
}

export default MenuExplicacion
