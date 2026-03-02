import './App.css'
import { useState } from 'react'
import principles from "../datos/TGS.json"
import MenuPrincipios from './components/MenuPrincipios.jsx'
import MenuExplicacion from './components/MenuExplicacion.jsx'
import MyCanvas from './components/MyCanvas.jsx'

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentPrinciple = principles[activeIndex]

  return (
    <div className='app' >
      <MenuPrincipios principles={principles} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <div className='canva' >
        <MyCanvas />
        <div style={{ position: 'absolute', top: 20, left: 20, pointerEvents: 'none' }}>
          <h1 style={{ margin: 0, fontSize: '24px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {currentPrinciple.title}
          </h1>
        </div>
      </div>
      <MenuExplicacion currentPrinciple={currentPrinciple} />
    </div>
  )
}

export default App
