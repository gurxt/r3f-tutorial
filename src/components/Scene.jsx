import { AccumulativeShadows, BakeShadows, ContactShadows, MeshReflectorMaterial, OrbitControls, RandomizedLight, Sky, SoftShadows, useHelper } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { Perf } from "r3f-perf"
import { useRef } from "react"
import * as THREE from "three"

export default function Scene() {
  const cube = useRef()
  const sphere = useRef()
  const directionalLight = useRef()

  useFrame(({ clock }) => {
    cube.current.rotation.y += 0.01;
    cube.current.position.x = 2 + Math.sin(clock.elapsedTime)
  })

  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  const { color, opacity, blur } = useControls('contract shadows', {
    color: '#000000',
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 }
  })

  const { sunPosition } = useControls('sky', {
    sunPosition: { value: [1, 2, 3] }
  })

  return (
    <>
    <OrbitControls makeDefault />
    <Perf position="bottom-left" />
    {/* 
    <SoftShadows frustum={3.75} size={50} near={9.5} samples={17} rings={11} />
    <AccumulativeShadows 
      position={[0, -0.99, 0]}
      scale={10}
      color="#316d39"
      opacity={0.8}
      frames={100}
      temporal
    >
      <RandomizedLight
        amount={8}
        radius={1}
        ambient={0.5}
        intensity={1}
        position={[1, 2, 3]} 
        bias={0.001}
      />
    </AccumulativeShadows>
    */}

    <ContactShadows 
      position={[0, -0.99, 0]}
      scale={10}
      resolution={512}
      color={color}
      opacity={opacity}
      blur={blur}
      far={5}
      frames={1000}
    />

    <directionalLight 
      ref={directionalLight} 
      position={sunPosition} 
      intensity={1.2} 
      castShadow 
      shadow-mapSize={[1024, 1024]}
      shadow-camera-near={1}
      shadow-camera-far={10}
      shadow-camera-top={5}
      shadow-camera-right={5}
      shadow-camera-bottom={-5}
      shadow-camera-left={-5}
    />
    <ambientLight intensity={0.5} />

    <Sky sunPosition={sunPosition} />

    <mesh castShadow ref={sphere} position-x={-2}>
      <sphereGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>

    <mesh castShadow ref={cube} position-x={2}>
      <boxGeometry />
      <meshStandardMaterial color="purple" />
    </mesh>

    <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-1} scale={10}>
      <planeGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
    </>
  )
}

