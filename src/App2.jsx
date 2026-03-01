import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, Html, Float } from '@react-three/drei'
import * as THREE from 'three'
import data from "../datos/TGS.json"
import Tomato_plant_diagram from '../public/tomato_plant_diagram/Tomato_plant_diagram'
import Tomato_plant from '../public/tomato_plant/Tomato_plant'
import Dead_plant from '../public/dead_plant/Dead_plant'

const principles = data

function SmartModel({ type, isActive, position, rotation, scale }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()

    const targetScale = isActive ? scale * 1.1 : scale
    const targetY = isActive ? position[1] + Math.sin(t) * 0.1 : position[1]

    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.1)

    if (!isActive) {
      ref.current.rotation.y += 0.002
    } else {
      ref.current.rotation.y = rotation[1]
    }
  })

  const ModelComponent = type === 'diagram' ? Tomato_plant_diagram
    : type === 'dead' ? Dead_plant
      : Tomato_plant

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <ModelComponent />
      {isActive && (
        <Html position={[0, 2, 0]} center distanceFactor={10}>
          <div style={{
            background: 'rgba(0,0,0,0.7)',
            color: '#4ade80',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            pointerEvents: 'none'
          }}>
            MODELO ACTIVO
          </div>
        </Html>
      )}
    </group>
  )
}

function App2() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentPrinciple = principles[activeIndex]

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#1a1a1a', color: 'white', fontFamily: 'sans-serif' }}>

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

      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <OrbitControls makeDefault />

          <SmartModel
            type="diagram"
            isActive={currentPrinciple.modelFocus === 'diagram'}
            scale={0.5}
            position={[-1.2, 0, 0]}
            rotation={[0, Math.PI, 0]}
          />

          <SmartModel
            type="live"
            isActive={currentPrinciple.modelFocus === 'live'}
            position={[0, -0.4, 0]}
            rotation={[1.6, Math.PI, 3]}
            scale={2.5}
          />

          <SmartModel
            type="dead"
            isActive={currentPrinciple.modelFocus === 'dead'}
            scale={0.01}
            position={[1.2, -0.4, 0]}
            rotation={[0, Math.PI, 0]}
          />

          <Environment preset="sunset" />
        </Canvas>

        <div style={{ position: 'absolute', top: 20, left: 20, pointerEvents: 'none' }}>
          <h1 style={{ margin: 0, fontSize: '24px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {currentPrinciple.title}
          </h1>
        </div>
      </div>

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

    </div>
  )
}

export default App2
