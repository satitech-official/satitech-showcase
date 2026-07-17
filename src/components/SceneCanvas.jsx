import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function seededValue(index, salt) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

function ParticleField({ color = '#77f7d2', count = 90 }) {
  const points = useRef()
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      const radius = 3 + seededValue(index, 1) * 4
      const angle = seededValue(index, 2) * Math.PI * 2
      data[index * 3] = Math.cos(angle) * radius
      data[index * 3 + 1] = (seededValue(index, 3) - 0.5) * 5
      data[index * 3 + 2] = Math.sin(angle) * radius
    }
    return data
  }, [count])

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.025
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.026} transparent opacity={0.52} sizeAttenuation />
    </points>
  )
}

function HeroCore() {
  const group = useRef()
  const ring = useRef()

  useFrame((state, delta) => {
    if (!group.current || !ring.current) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.18, 0.035)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -state.pointer.x * 0.12, 0.035)
    ring.current.rotation.z -= delta * 0.16
  })

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.32} floatIntensity={0.48}>
        <mesh>
          <icosahedronGeometry args={[1.2, 5]} />
          <meshPhysicalMaterial color="#6f7cff" roughness={0.18} metalness={0.2} transmission={0.28} thickness={1.2} transparent opacity={0.9} />
        </mesh>
        <mesh scale={0.64}>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshStandardMaterial color="#77f7d2" emissive="#2ecba2" emissiveIntensity={1.4} wireframe />
        </mesh>
      </Float>
      <mesh ref={ring} rotation={[1.05, 0.22, 0]}>
        <torusGeometry args={[1.78, 0.025, 16, 180]} />
        <meshBasicMaterial color="#77f7d2" transparent opacity={0.72} />
      </mesh>
      <mesh rotation={[0.2, 0.3, 0.7]}>
        <torusGeometry args={[2.12, 0.012, 12, 180]} />
        <meshBasicMaterial color="#ff77b7" transparent opacity={0.42} />
      </mesh>
      {[0, 1, 2].map((item) => (
        <Float key={item} speed={1.1 + item * 0.25} floatIntensity={0.8}>
          <mesh position={[-2.15 + item * 2.1, item === 1 ? 1.75 : -1.3, -0.8 + item * 0.3]} scale={0.12 + item * 0.025}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={item === 1 ? '#ff77b7' : '#77f7d2'} emissive={item === 1 ? '#ff2b91' : '#2ecba2'} emissiveIntensity={0.8} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function CommerceModel({ color, intensity }) {
  const model = useRef()
  useFrame((state, delta) => {
    if (!model.current) return
    model.current.rotation.y += delta * 0.16
    model.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08
  })

  return (
    <group ref={model} rotation={[0.08, -0.45, -0.08]}>
      <RoundedBox args={[2.35, 1.36, 0.52]} radius={0.2} smoothness={5}>
        <meshPhysicalMaterial color={color} roughness={0.2} metalness={0.62} clearcoat={1} clearcoatRoughness={0.14} />
      </RoundedBox>
      <RoundedBox args={[1.72, 0.87, 0.035]} radius={0.12} smoothness={4} position={[0, 0, 0.28]}>
        <meshStandardMaterial color="#07101a" roughness={0.14} metalness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0, 0.31]}>
        <torusGeometry args={[0.3, 0.025, 16, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.55 + intensity * 0.004} />
      </mesh>
      <mesh position={[0.94, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.28, 48]} />
        <meshStandardMaterial color="#d8e1ef" metalness={0.95} roughness={0.16} />
      </mesh>
    </group>
  )
}

function Tree({ position, color }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.055, 0.075, 0.5, 12]} /><meshStandardMaterial color="#6f4a32" /></mesh>
      <mesh position={[0, 0.68, 0]}><coneGeometry args={[0.32, 0.8, 18]} /><meshStandardMaterial color={color} roughness={0.82} /></mesh>
    </group>
  )
}

function RealEstateModel({ color, mode }) {
  const group = useRef()
  const isNight = mode === 'Night'
  useFrame((state) => {
    if (group.current) group.current.rotation.y = -0.38 + Math.sin(state.clock.elapsedTime * 0.25) * 0.08
  })

  return (
    <group ref={group} position={[0, -0.55, 0]}>
      <RoundedBox args={[3.4, 0.18, 2.65]} radius={0.12} smoothness={4} position={[0, -0.08, 0]}>
        <meshStandardMaterial color="#28332e" roughness={0.92} />
      </RoundedBox>
      <RoundedBox args={[2.28, 1.35, 1.55]} radius={0.08} smoothness={4} position={[0, 0.68, 0]}>
        <meshStandardMaterial color="#e8e3d8" roughness={0.72} />
      </RoundedBox>
      <RoundedBox args={[1.08, 0.76, 0.86]} radius={0.05} smoothness={3} position={[0.68, 1.63, -0.15]}>
        <meshStandardMaterial color="#d8d4c9" roughness={0.72} />
      </RoundedBox>
      <mesh position={[0.68, 2.08, -0.15]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.86, 0.48, 4]} />
        <meshStandardMaterial color={color} metalness={0.16} roughness={0.55} />
      </mesh>
      {[-0.65, 0, 0.65].map((x) => (
        <RoundedBox key={x} args={[0.36, 0.48, 0.035]} radius={0.025} smoothness={2} position={[x, 0.75, 0.795]}>
          <meshStandardMaterial color={isNight ? '#ffd476' : '#78cfff'} emissive={isNight ? '#ffb84d' : '#2a82a5'} emissiveIntensity={isNight ? 1.8 : 0.35} />
        </RoundedBox>
      ))}
      <RoundedBox args={[0.34, 0.72, 0.04]} radius={0.03} smoothness={2} position={[0.88, 0.43, 0.8]}>
        <meshStandardMaterial color="#5b3d31" roughness={0.62} />
      </RoundedBox>
      <Tree position={[-1.38, 0.08, 0.62]} color="#3fb078" />
      <Tree position={[1.34, 0.08, -0.68]} color="#2e8a65" />
    </group>
  )
}

function HospitalityModel({ color, intensity }) {
  const group = useRef()
  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.08
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.05 - 0.4
  })

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      <mesh scale={[1.45, 0.18, 1.45]}><cylinderGeometry args={[1, 1.05, 0.32, 64]} /><meshPhysicalMaterial color="#f2eadc" roughness={0.26} clearcoat={0.45} /></mesh>
      <mesh position={[0, 0.18, 0]} scale={[0.88, 0.11, 0.88]}><cylinderGeometry args={[1, 1, 0.25, 64]} /><meshStandardMaterial color="#f4c462" roughness={0.74} /></mesh>
      {[0, 1, 2, 3, 4].map((item) => {
        const angle = (item / 5) * Math.PI * 2
        return (
          <Float key={item} speed={1.2 + item * 0.1} floatIntensity={0.25}>
            <mesh position={[Math.cos(angle) * 0.62, 0.38 + (item % 2) * 0.09, Math.sin(angle) * 0.62]} scale={0.24 + item * 0.015}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshStandardMaterial color={item % 2 ? color : '#71a95a'} roughness={0.68} emissive={color} emissiveIntensity={intensity * 0.004} />
            </mesh>
          </Float>
        )
      })}
      <mesh position={[0, 0.46, 0]} scale={[0.37, 0.22, 0.37]}><sphereGeometry args={[1, 32, 20]} /><meshStandardMaterial color="#cf563f" roughness={0.58} /></mesh>
      <mesh position={[0, -0.42, 0]} scale={[1.95, 0.06, 1.95]}><cylinderGeometry args={[1, 1, 0.3, 64]} /><meshStandardMaterial color="#2d1716" roughness={0.86} /></mesh>
    </group>
  )
}

function SaasModel({ color, intensity }) {
  const group = useRef()
  const bars = useRef([])
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y = -0.36 + Math.sin(state.clock.elapsedTime * 0.28) * 0.12
    bars.current.forEach((bar, index) => {
      if (!bar) return
      const target = 0.55 + (Math.sin(state.clock.elapsedTime * (0.7 + index * 0.08) + index) + 1) * 0.48
      bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, target * (0.65 + intensity / 150), delta * 2.4)
    })
  })

  return (
    <group ref={group} position={[0, -0.68, 0]}>
      <RoundedBox args={[3.6, 0.12, 2.4]} radius={0.1} smoothness={3}>
        <meshPhysicalMaterial color="#10182b" roughness={0.3} metalness={0.5} clearcoat={0.6} />
      </RoundedBox>
      {Array.from({ length: 8 }, (_, index) => {
        const height = 0.7 + (index % 4) * 0.28
        return (
          <RoundedBox
            key={index}
            ref={(element) => { bars.current[index] = element }}
            args={[0.28, height, 0.28]}
            radius={0.06}
            smoothness={3}
            position={[-1.35 + index * 0.39, height * 0.5 + 0.13, 0.15 + Math.sin(index) * 0.38]}
          >
            <meshStandardMaterial color={index % 2 ? color : '#58e6ff'} emissive={index % 2 ? color : '#1ba4bb'} emissiveIntensity={0.45} roughness={0.26} metalness={0.5} />
          </RoundedBox>
        )
      })}
      <mesh position={[0, 1.35, -0.36]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.28, 0.026, 14, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.62} />
      </mesh>
    </group>
  )
}

function EventModel({ color, intensity }) {
  const rings = useRef()
  useFrame((state, delta) => {
    if (rings.current) {
      rings.current.rotation.z += delta * 0.18
      rings.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.18
    }
  })

  return (
    <group position={[0, -0.62, 0]}>
      <RoundedBox args={[3.2, 0.3, 2]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#171020" roughness={0.4} metalness={0.72} />
      </RoundedBox>
      <group ref={rings} position={[0, 1.35, -0.35]}>
        {[0, 1, 2].map((item) => (
          <mesh key={item} rotation={[Math.PI / 2 + item * 0.35, item * 0.45, 0]}>
            <torusGeometry args={[0.62 + item * 0.32, 0.055 - item * 0.009, 16, 100]} />
            <meshStandardMaterial color={item === 1 ? '#8a5cff' : color} emissive={item === 1 ? '#6935d4' : color} emissiveIntensity={0.5 + intensity * 0.01} />
          </mesh>
        ))}
      </group>
      {[-1.15, 1.15].map((x) => (
        <mesh key={x} position={[x, 1.4, 0]} rotation={[0, 0, x > 0 ? -0.26 : 0.26]}>
          <coneGeometry args={[0.42, 2.8, 32, 1, true]} />
          <meshBasicMaterial color={color} transparent opacity={0.07 + intensity * 0.0015} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function BrandModel({ color, intensity }) {
  const knot = useRef()
  const satellites = useRef()
  useFrame((state, delta) => {
    if (knot.current) {
      knot.current.rotation.x += delta * 0.16
      knot.current.rotation.y += delta * 0.22
    }
    if (satellites.current) satellites.current.rotation.y = state.clock.elapsedTime * 0.18
  })

  return (
    <group>
      <Float speed={1.4} floatIntensity={0.55}>
        <mesh ref={knot}>
          <torusKnotGeometry args={[0.9, 0.25, 180, 24, 2, 3]} />
          <meshPhysicalMaterial color={color} roughness={0.14} metalness={0.5} clearcoat={1} emissive={color} emissiveIntensity={intensity * 0.006} />
        </mesh>
      </Float>
      <group ref={satellites}>
        {[0, 1, 2, 3].map((item) => {
          const angle = (item / 4) * Math.PI * 2
          return (
            <mesh key={item} position={[Math.cos(angle) * 1.85, Math.sin(angle * 1.7) * 0.65, Math.sin(angle) * 1.85]} scale={0.13 + item * 0.018}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color={item % 2 ? '#77f7d2' : color} emissive={color} emissiveIntensity={0.65} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

function EducationModel({ color, intensity }) {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = -0.28 + Math.sin(state.clock.elapsedTime * 0.32) * 0.12
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.04 - 0.28
  })

  return (
    <group ref={group} position={[0, -0.28, 0]}>
      <RoundedBox args={[2.7, 0.15, 1.65]} radius={0.08} smoothness={4} position={[-0.08, -0.12, 0]} rotation={[0, 0.12, -0.06]}>
        <meshPhysicalMaterial color="#f5f0df" roughness={0.48} clearcoat={0.25} />
      </RoundedBox>
      <RoundedBox args={[2.7, 0.15, 1.65]} radius={0.08} smoothness={4} position={[0.08, 0.08, 0]} rotation={[0, -0.12, 0.06]}>
        <meshStandardMaterial color={color} roughness={0.38} metalness={0.12} />
      </RoundedBox>
      <mesh position={[0, 0.48, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5 + intensity * 0.008} roughness={0.22} />
      </mesh>
      {[0, 1, 2].map((item) => (
        <Float key={item} speed={1.1 + item * 0.18} floatIntensity={0.38}>
          <RoundedBox
            args={[0.42, 0.58 + item * 0.18, 0.18]}
            radius={0.05}
            smoothness={3}
            position={[-1.05 + item * 1.05, 0.48 + item * 0.08, -0.44]}
          >
            <meshStandardMaterial color={item === 1 ? '#4f7cff' : color} emissive={color} emissiveIntensity={0.16} roughness={0.3} />
          </RoundedBox>
        </Float>
      ))}
      <mesh position={[0, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.02, 12, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.34} />
      </mesh>
    </group>
  )
}

function FitnessModel({ color, intensity }) {
  const group = useRef()
  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.11
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.055 - 0.15
  })

  return (
    <group ref={group} position={[0, -0.15, 0]} rotation={[0.05, -0.35, -0.08]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 3.4, 32]} />
        <meshStandardMaterial color="#dce3eb" metalness={0.92} roughness={0.18} />
      </mesh>
      {[-1.28, -1.02, 1.02, 1.28].map((x, index) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[index % 3 === 0 ? 0.64 : 0.52, index % 3 === 0 ? 0.64 : 0.52, 0.22, 48]} />
          <meshPhysicalMaterial color={index % 2 ? '#20242d' : color} roughness={0.3} metalness={0.52} clearcoat={0.7} emissive={color} emissiveIntensity={intensity * 0.003} />
        </mesh>
      ))}
      <mesh position={[0, -0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.42, 0.045, 16, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.46} />
      </mesh>
      <mesh position={[0, -0.76, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.38, 64]} />
        <meshBasicMaterial color="#101218" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function HealthcareModel({ color, intensity }) {
  const group = useRef()
  const pulse = useRef()
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.42) * 0.2
    if (pulse.current) {
      pulse.current.rotation.z += delta * 0.18
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.06
      pulse.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.2} floatIntensity={0.38}>
        <group rotation={[0.05, -0.18, 0.08]}>
          <RoundedBox args={[0.62, 2.45, 0.5]} radius={0.14} smoothness={5}>
            <meshPhysicalMaterial color={color} roughness={0.2} metalness={0.2} clearcoat={1} emissive={color} emissiveIntensity={intensity * 0.005} />
          </RoundedBox>
          <RoundedBox args={[2.45, 0.62, 0.5]} radius={0.14} smoothness={5}>
            <meshPhysicalMaterial color={color} roughness={0.2} metalness={0.2} clearcoat={1} emissive={color} emissiveIntensity={intensity * 0.005} />
          </RoundedBox>
        </group>
      </Float>
      <mesh ref={pulse} rotation={[1.05, 0.2, 0.1]}>
        <torusGeometry args={[1.68, 0.025, 14, 150]} />
        <meshBasicMaterial color="#4e8cff" transparent opacity={0.72} />
      </mesh>
      {[0, 1, 2].map((item) => (
        <mesh key={item} position={[-1.72 + item * 1.72, item === 1 ? 1.55 : -1.18, -0.35]} scale={0.11 + item * 0.025}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color={item === 1 ? '#ffffff' : color} emissive={color} emissiveIntensity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

function TravelModel({ color, intensity }) {
  const globe = useRef()
  const orbit = useRef()
  useFrame((_, delta) => {
    if (globe.current) globe.current.rotation.y += delta * 0.13
    if (orbit.current) orbit.current.rotation.z -= delta * 0.24
  })

  return (
    <group>
      <Float speed={1.15} floatIntensity={0.34}>
        <mesh ref={globe}>
          <sphereGeometry args={[1.25, 48, 32]} />
          <meshPhysicalMaterial color="#163f66" roughness={0.3} metalness={0.2} clearcoat={0.65} transparent opacity={0.82} />
        </mesh>
        <mesh scale={1.01}>
          <sphereGeometry args={[1.25, 24, 16]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.33 + intensity * 0.002} />
        </mesh>
      </Float>
      <group ref={orbit} rotation={[0.72, 0.18, 0.16]}>
        <mesh>
          <torusGeometry args={[1.76, 0.025, 14, 160]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
        <mesh position={[1.76, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[0.24, 0.5, 0.24]}>
          <coneGeometry args={[0.3, 0.8, 4]} />
          <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={0.35} />
        </mesh>
      </group>
      <mesh rotation={[Math.PI / 2, 0.35, 0]}>
        <torusGeometry args={[1.52, 0.012, 12, 150]} />
        <meshBasicMaterial color="#8b6dff" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function JewelleryModel({ color, intensity }) {
  const jewel = useRef()
  const rings = useRef()
  useFrame((state, delta) => {
    if (jewel.current) {
      jewel.current.rotation.y += delta * 0.2
      jewel.current.rotation.x = 0.18 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (rings.current) rings.current.rotation.y -= delta * 0.11
  })

  return (
    <group>
      <Float speed={1.25} floatIntensity={0.48}>
        <mesh ref={jewel} scale={[1.1, 1.42, 1.1]}>
          <octahedronGeometry args={[1, 2]} />
          <meshPhysicalMaterial color={color} roughness={0.08} metalness={0.35} transmission={0.28} thickness={1.5} clearcoat={1} emissive={color} emissiveIntensity={intensity * 0.004} />
        </mesh>
      </Float>
      <group ref={rings} rotation={[1.12, 0.1, 0.15]}>
        <mesh>
          <torusGeometry args={[1.72, 0.07, 18, 180]} />
          <meshPhysicalMaterial color="#f2d487" metalness={0.9} roughness={0.16} clearcoat={1} />
        </mesh>
        {[0, 1, 2].map((item) => {
          const angle = (item / 3) * Math.PI * 2
          return (
            <mesh key={item} position={[Math.cos(angle) * 1.72, Math.sin(angle) * 1.72, 0]} scale={0.12}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color={item === 1 ? '#c58cff' : color} emissive={color} emissiveIntensity={0.6} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

function SportsModel({ color, intensity }) {
  const group = useRef()
  const ball = useRef()
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y = -0.3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.12
    if (ball.current) {
      ball.current.rotation.x += delta * 0.6
      ball.current.rotation.y += delta * 0.8
      ball.current.position.y = 0.48 + Math.abs(Math.sin(state.clock.elapsedTime * 1.1)) * 0.38
    }
  })

  return (
    <group ref={group} position={[0, -0.56, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.25, 0.82, 1]}>
        <torusGeometry args={[1.36, 0.16, 20, 120]} />
        <meshStandardMaterial color="#dce5eb" roughness={0.46} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.48, 0.92, 1]}>
        <circleGeometry args={[1, 64]} />
        <meshStandardMaterial color="#1f7548" roughness={0.88} />
      </mesh>
      {[0.42, 0.78].map((radius) => (
        <mesh key={radius} position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.48, 0.92, 1]}>
          <ringGeometry args={[radius - 0.012, radius, 64]} />
          <meshBasicMaterial color="#d7f7df" transparent opacity={0.48} />
        </mesh>
      ))}
      <mesh ref={ball} position={[0, 0.48, 0]} scale={0.4}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#f8fbff" roughness={0.42} metalness={0.12} emissive={color} emissiveIntensity={intensity * 0.0025} />
      </mesh>
      <mesh position={[0, 1.42, -0.62]}>
        <torusGeometry args={[0.66, 0.02, 12, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.64} />
      </mesh>
    </group>
  )
}

function DemoModel({ type, color, intensity, mode }) {
  const props = { color, intensity, mode }
  if (type === 'commerce') return <CommerceModel {...props} />
  if (type === 'real-estate') return <RealEstateModel {...props} />
  if (type === 'hospitality') return <HospitalityModel {...props} />
  if (type === 'saas') return <SaasModel {...props} />
  if (type === 'events') return <EventModel {...props} />
  if (type === 'education') return <EducationModel {...props} />
  if (type === 'fitness') return <FitnessModel {...props} />
  if (type === 'healthcare') return <HealthcareModel {...props} />
  if (type === 'travel') return <TravelModel {...props} />
  if (type === 'jewellery') return <JewelleryModel {...props} />
  if (type === 'sports') return <SportsModel {...props} />
  return <BrandModel {...props} />
}

export function SceneCanvas({ hero = false, type = 'brands', color = '#77f7d2', secondary = '#6f7cff', intensity = 65, mode = '', interactive = true }) {
  const night = mode === 'Night' || mode === 'Midnight'
  return (
    <Canvas
      camera={{ position: hero ? [0, 0, 6] : [0, 0.7, 5.6], fov: hero ? 42 : 43 }}
      dpr={[1, 1.55]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={night ? 0.38 : 0.72} />
      <directionalLight position={[4, 5, 5]} intensity={1.2 + intensity * 0.008} color="#ffffff" />
      <pointLight position={[-4, 2, 2]} intensity={1.4} color={color} />
      <pointLight position={[4, -1, -2]} intensity={1.1} color={secondary} />
      <ParticleField color={color} count={hero ? 120 : 64} />
      {hero ? <HeroCore /> : <DemoModel type={type} color={color} intensity={intensity} mode={mode} />}
      {!hero && interactive ? <OrbitControls enablePan={false} minDistance={3.8} maxDistance={7.2} autoRotate autoRotateSpeed={0.55} /> : null}
    </Canvas>
  )
}
