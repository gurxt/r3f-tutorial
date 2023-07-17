import { Float, Html, MeshReflectorMaterial, OrbitControls, PivotControls, Text, TransformControls } from "@react-three/drei"
import { useRef } from "react"

export default function Scene() {
  const cube = useRef()
  const sphere = useRef()

  return (
    <>
    <OrbitControls makeDefault />

    <directionalLight position={[1, 2, 3]} intensity={1.2} />
    <ambientLight intensity={0.5} />

    <mesh ref={cube} position-x={-2}>
      <sphereGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
    <TransformControls object={cube} />

    <PivotControls fixed={true} scale={100} lineWidth={4} depthTest={false} anchor={[0, 0, 0]}>
      <mesh ref={sphere} position-x={2}>
        <boxGeometry />
        <meshStandardMaterial color="purple" />
        <Html 
          wrapperClass="label" 
          position={[ 1, 1, 0 ]} 
          distanceFactor={6}
          occlude={[sphere]}
          center
        >
          This is a cube.
        </Html>
      </mesh>
    </PivotControls>

    <Float speed={0.5} floatIntensity={0.2}>
      <Text 
        fontSize={2}
        scale-z={10}
        position={[0, 1, -2]}
        rotation-x={-Math.PI / 3}
      >
        I LOVE R3F
        <meshNormalMaterial />
      </Text>
    </Float>

    <mesh rotation-x={-Math.PI / 2} position-y={-1} scale={10}>
      <planeGeometry />
      <MeshReflectorMaterial 
        color="grey" 
        resolution={512} 
        blur={[1000, 1000]}
        mixBlur={0}
        mirror={0.8}
      />
    </mesh>
    </>
  )
}

