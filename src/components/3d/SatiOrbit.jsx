"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, Lightformer, MeshTransmissionMaterial, RoundedBox, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const cardPositions = [
  [-3.35, 1.75, -0.4],
  [3.35, 1.25, -0.8],
  [-3.15, -1.65, -1.05],
  [3.15, -1.75, -0.25],
  [0.2, 2.85, -1.7],
];

function SceneController({ paused, reducedMotion }) {
  useFrame((state) => {
    if (paused || reducedMotion) return;
    const scroll = typeof window === "undefined" ? 0 : Math.min(window.scrollY / 900, 1);
    const { camera, pointer } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.34, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.2 - scroll * 0.18, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8.1 + scroll * 0.5, 0.03);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Core({ paused, reducedMotion }) {
  const group = useRef(null);
  const light = useRef(null);

  useFrame((state, delta) => {
    if (paused || reducedMotion || !group.current) return;
    group.current.rotation.y += delta * 0.14;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    if (light.current) {
      light.current.position.x = state.pointer.x * 3;
      light.current.position.y = 2 + state.pointer.y * 2;
    }
  });

  return (
    <group ref={group}>
      <pointLight ref={light} position={[2, 3, 4]} intensity={28} color="#7581ff" distance={13} />
      <pointLight position={[-3, -2, 2]} intensity={20} color="#cfff72" distance={10} />
      <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={reducedMotion ? 0 : 0.18} floatIntensity={reducedMotion ? 0 : 0.35}>
        <mesh>
          <icosahedronGeometry args={[1.35, 3]} />
          <MeshTransmissionMaterial
            backside
            thickness={0.7}
            chromaticAberration={0.06}
            anisotropy={0.25}
            distortion={0.16}
            distortionScale={0.2}
            temporalDistortion={reducedMotion ? 0 : 0.08}
            roughness={0.08}
            transmission={0.96}
            ior={1.35}
            color="#9ba4ff"
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.25, 0]}>
          <torusGeometry args={[1.82, 0.035, 12, 96]} />
          <meshStandardMaterial color="#cfff72" emissive="#cfff72" emissiveIntensity={1.8} metalness={0.6} roughness={0.25} />
        </mesh>
        <mesh rotation={[0.65, 0.1, 0.25]}>
          <torusGeometry args={[2.28, 0.018, 10, 96]} />
          <meshStandardMaterial color="#6e79ff" emissive="#4c5cff" emissiveIntensity={2.4} metalness={0.8} roughness={0.18} />
        </mesh>
        <mesh rotation={[-0.45, 0.7, 0.2]}>
          <torusGeometry args={[2.72, 0.012, 10, 96]} />
          <meshBasicMaterial color="#f5f5ef" transparent opacity={0.52} />
        </mesh>
        <Html transform center distanceFactor={6.2} position={[0, 0, 1.38]}>
          <div className="orbit-brand-face" aria-label="Sati Tech brand core">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/sati-tech-logo.jpeg" alt="Sati Tech logo" />
          </div>
        </Html>
      </Float>
    </group>
  );
}

function ProjectSatellite({ project, position, index, paused, reducedMotion }) {
  const ref = useRef(null);
  const color = ["#DED9FF", "#CFFF72", "#92a0ff", "#f1dfb9", "#bde8dc"][index % 5];

  useFrame((state) => {
    if (!ref.current || paused || reducedMotion) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.55 + index) * 0.09;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.28 + index) * 0.05;
  });

  return (
    <group ref={ref} position={position} rotation={[0.05, index % 2 ? -0.14 : 0.14, index % 2 ? 0.04 : -0.04]}>
      <RoundedBox args={[2.15, 1.38, 0.09]} radius={0.11} smoothness={4}>
        <meshStandardMaterial color="#fdfdfa" metalness={0.12} roughness={0.46} />
      </RoundedBox>
      <mesh position={[0, 0.48, 0.06]}>
        <planeGeometry args={[1.94, 0.17]} />
        <meshBasicMaterial color="#151515" />
      </mesh>
      <mesh position={[0, -0.04, 0.061]}>
        <planeGeometry args={[1.92, 0.78]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Html transform center distanceFactor={7.7} position={[0, -0.02, 0.09]}>
        <div className="orbit-project-card" aria-hidden="true">
          <span>0{index + 1} / {project?.industry || "Digital"}</span>
          <strong>{project?.title || "Sati Tech project"}</strong>
          <small>{project?.technologies?.[0] || project?.language || "Web experience"}</small>
        </div>
      </Html>
    </group>
  );
}

function OrbitScene({ projects, paused, reducedMotion }) {
  const satellites = useMemo(() => projects.slice(0, 5), [projects]);
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#ffffff" />
      <fog attach="fog" args={["#0b0e14", 9, 16]} />
      <SceneController paused={paused} reducedMotion={reducedMotion} />
      <Core paused={paused} reducedMotion={reducedMotion} />
      {satellites.map((project, index) => (
        <ProjectSatellite
          key={project.id || project.repoName || index}
          project={project}
          position={cardPositions[index]}
          index={index}
          paused={paused}
          reducedMotion={reducedMotion}
        />
      ))}
      <Sparkles count={reducedMotion ? 28 : 105} scale={[9, 7, 5]} size={1.55} speed={reducedMotion || paused ? 0 : 0.24} opacity={0.65} color="#dce0ff" />
      <Environment resolution={64}>
        <Lightformer intensity={5} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[8, 8, 1]} color="#eef0ff" />
        <Lightformer intensity={3} rotation-y={Math.PI / 2} position={[-4, 0, 1]} scale={[5, 5, 1]} color="#6875ff" />
        <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[4, 0, 1]} scale={[4, 4, 1]} color="#cfff72" />
      </Environment>
    </>
  );
}

export function SceneFallback({ projects = [] }) {
  return (
    <div className="orbit-fallback" aria-label="Sati Orbit project constellation">
      <div className="orbit-fallback-ring" />
      <div className="orbit-fallback-core">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/sati-tech-logo.jpeg" alt="Sati Tech logo" />
      </div>
      {projects.slice(0, 3).map((project, index) => (
        <div key={project.id || project.repoName || index} className={`orbit-fallback-card orbit-fallback-card-${index + 1}`}>
          <span>0{index + 1}</span>
          <strong>{project.title}</strong>
          <small>{project.industry}</small>
        </div>
      ))}
    </div>
  );
}

export default function SatiOrbit({ projects = [] }) {
  const [mode, setMode] = useState("pending");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const decide = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
      const canvas = document.createElement("canvas");
      const webgl = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
      setMode(reduced || mobile || !webgl ? "fallback" : "canvas");
    };
    const frame = window.requestAnimationFrame(decide);
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (mode !== "canvas") return <SceneFallback projects={projects} />;

  return (
    <div className="sati-orbit-canvas" aria-label="Interactive Sati Orbit 3D experience">
      <Canvas camera={{ position: [0, 0, 8.1], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <OrbitScene projects={projects} paused={hidden} reducedMotion={false} />
      </Canvas>
    </div>
  );
}
