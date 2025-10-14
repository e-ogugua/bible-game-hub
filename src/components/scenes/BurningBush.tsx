import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Plane, Float } from '@react-three/drei';
import * as THREE from 'three';

export const BurningBush: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const bushRef = useRef<THREE.Group>(null);
  const fireRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Create particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = Math.random() * 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!isClient) return;

    if (bushRef.current) {
      bushRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      bushRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }

    if (fireRef.current) {
      fireRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      fireRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;

      // Animate individual fire spheres
      fireRef.current.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh;
        mesh.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4 + index) * 0.2);
      });
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      particlesRef.current.children.forEach((particle, index) => {
        const mesh = particle as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material && !Array.isArray(material)) {
          mesh.position.y += Math.sin(state.clock.elapsedTime * 2 + index) * 0.01;
          material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3 + index) * 0.2;
        }
      });
    }
  });

  // Don't render during SSR
  if (!isClient) {
    return null;
  }

  return (
    <group>
      {/* Enhanced ground with texture-like appearance */}
      <Plane args={[12, 12]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <meshStandardMaterial
          color="#8B4513"
          roughness={0.8}
          metalness={0.1}
        />
      </Plane>

      {/* Rocks and terrain */}
      <group>
        <Sphere args={[0.4, 8, 6]} position={[-2, -0.8, 1]}>
          <meshStandardMaterial color="#696969" roughness={0.9} />
        </Sphere>
        <Sphere args={[0.3, 8, 6]} position={[1.5, -0.9, -1]}>
          <meshStandardMaterial color="#808080" roughness={0.9} />
        </Sphere>
        <Sphere args={[0.2, 8, 6]} position={[-1, -0.95, -2]}>
          <meshStandardMaterial color="#696969" roughness={0.9} />
        </Sphere>
      </group>

      {/* Enhanced bush with more detail */}
      <group ref={bushRef} position={[0, 0, 0]}>
        <Sphere args={[0.9, 12, 8]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#1B4332" roughness={0.8} />
        </Sphere>
        <Sphere args={[0.7, 10, 7]} position={[0.3, 0.8, 0]}>
          <meshStandardMaterial color="#2D5A27" roughness={0.7} />
        </Sphere>
        <Sphere args={[0.8, 11, 8]} position={[-0.2, 0.3, 0.1]}>
          <meshStandardMaterial color="#1B4332" roughness={0.8} />
        </Sphere>
        <Sphere args={[0.4, 8, 6]} position={[0.1, 1.2, 0.2]}>
          <meshStandardMaterial color="#3A5F31" roughness={0.6} />
        </Sphere>

        {/* Leaves and branches */}
        <Sphere args={[0.15, 6, 4]} position={[0.6, 1.5, 0]}>
          <meshStandardMaterial color="#228B22" />
        </Sphere>
        <Sphere args={[0.12, 6, 4]} position={[-0.5, 1.3, 0.3]}>
          <meshStandardMaterial color="#32CD32" />
        </Sphere>
      </group>

      {/* Enhanced fire with multiple layers */}
      <group ref={fireRef} position={[0, 1, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere args={[0.4, 10, 8]}>
            <meshStandardMaterial
              color="#FF4500"
              emissive="#FF4500"
              emissiveIntensity={0.8}
              transparent
              opacity={0.9}
            />
          </Sphere>
        </Float>

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
          <Sphere args={[0.25, 8, 6]} position={[0.1, 0.2, 0]}>
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.6}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>

        <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.4}>
          <Sphere args={[0.2, 9, 7]} position={[-0.1, 0.1, 0.1]}>
            <meshStandardMaterial
              color="#FF6347"
              emissive="#FF6347"
              emissiveIntensity={0.7}
              transparent
              opacity={0.85}
            />
          </Sphere>
        </Float>

        {/* Inner bright core */}
        <Sphere args={[0.1, 6, 4]} position={[0, 0.3, 0]}>
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={1}
          />
        </Sphere>
      </group>

      {/* Floating ember particles */}
      <group ref={particlesRef}>
        {Array.from({ length: 50 }).map((_, i) => (
          <Sphere
            key={i}
            args={[0.02 + Math.random() * 0.03]}
            position={[
              particlePositions[i * 3],
              particlePositions[i * 3 + 1],
              particlePositions[i * 3 + 2]
            ]}
          >
            <meshStandardMaterial
              color="#FF6B35"
              emissive="#FF6B35"
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
            />
          </Sphere>
        ))}
      </group>

      {/* Enhanced lighting system */}
      <ambientLight intensity={0.4} color="#404040" />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
        color="#FFF8DC"
        castShadow
      />

      {/* Divine light from the bush */}
      <pointLight
        position={[0, 2, 0]}
        intensity={3}
        color="#FFD700"
        distance={8}
      />

      {/* Atmospheric glow */}
      <spotLight
        position={[0, 8, 0]}
        target-position={[0, 0, 0]}
        angle={0.6}
        intensity={2}
        color="#FFA500"
        penumbra={0.5}
      />

      {/* Rim lighting for dramatic effect */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
        color="#8B4513"
      />
    </group>
  );
};
