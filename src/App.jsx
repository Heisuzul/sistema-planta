import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Canvas} from '@react-three/fiber'
import {Environment, OrbitControls} from '@react-three/drei'
import Tomato_plant_diagram from '../public/tomato_plant_diagram/Tomato_plant_diagram'
import Tomato_plant from '../public/tomato_plant/Tomato_plant'
import Dead_plant from '../public/dead_plant/Dead_plant'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Canvas camera={{ position: [0, 0, 2.7], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Tomato_plant_diagram 
          scale={0.5}
          position={[-1.2, 0, 0]}
          rotation={[0, Math.PI, 0]}
        />
        <Tomato_plant
          scale={2.3}
          position={[0, -0.4, 0]}
          rotation={[1.6, Math.PI, 3]}
         />
        <Dead_plant
          scale={0.01}
          position={[1.2, -0.4, 0]}
          rotation={[0, Math.PI, 0]}
         />
      </Suspense>
      <Environment preset="sunset" />
     </Canvas>
    </>
  )
}

export default App
