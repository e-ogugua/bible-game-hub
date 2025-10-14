import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Plane } from '@react-three/drei';
import * as THREE from 'three';

export const GoliathScene: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const davidRef = useRef<THREE.Group>(null);
  const goliathRef = useRef<THREE.Group>(null);
  const stoneRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useFrame((state) => {
    if (!isClient) return;

    if (davidRef.current) {
      davidRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (goliathRef.current) {
      goliathRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    if (stoneRef.current) {
      const time = state.clock.elapsedTime;
      stoneRef.current.position.x = Math.sin(time * 3) * 2;
      stoneRef.current.position.y = 2 + Math.sin(time * 2) * 0.5;
      stoneRef.current.position.z = Math.cos(time * 3) * 2;
    }
  });

  // Don't render during SSR
  if (!isClient) {
    return null;
  }

  return (
    <group>
      {/* Battlefield ground */}
      <Plane args={[15, 15]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#8B7355" />
      </Plane>

      {/* Rocks and terrain */}
      <group>
        <Sphere args={[0.8, 8, 6]} position={[-3, 0, 2]}>
          <meshStandardMaterial color="#696969" />
        </Sphere>
        <Sphere args={[0.6, 8, 6]} position={[2.5, 0.2, -1]}>
          <meshStandardMaterial color="#808080" />
        </Sphere>
        <Sphere args={[0.4, 8, 6]} position={[-1.5, 0.1, -3]}>
          <meshStandardMaterial color="#696969" />
        </Sphere>
      </group>

      {/* David (small figure) */}
      <group ref={davidRef} position={[-2, 0, 0]}>
        <Cylinder args={[0.1, 0.1, 1.2]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Cylinder>
        <Sphere args={[0.15]} position={[0, 1.3, 0]}>
          <meshStandardMaterial color="#D2B48C" />
        </Sphere>
        {/* Simple sling */}
        <Box args={[0.02, 0.02, 0.3]} position={[0.2, 1.1, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>
      </group>

      {/* Goliath (large figure) */}
      <group ref={goliathRef} position={[2, 0, 0]}>
        <Cylinder args={[0.3, 0.3, 3]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Cylinder>
        <Sphere args={[0.25]} position={[0, 3.3, 0]}>
          <meshStandardMaterial color="#D2B48C" />
        </Sphere>
        {/* Helmet */}
        <Sphere args={[0.28]} position={[0, 3.4, 0]}>
          <meshStandardMaterial color="#B87333" />
        </Sphere>
        {/* Armor */}
        <Box args={[0.6, 0.8, 0.1]} position={[0, 2.2, -0.1]}>
          <meshStandardMaterial color="#B87333" />
        </Box>
        {/* Spear */}
        <Cylinder args={[0.02, 0.02, 2]} position={[0.5, 2.5, 0]} rotation={[0, 0, -0.3]}>
          <meshStandardMaterial color="#8B4513" />
        </Cylinder>
        <Sphere args={[0.05]} position={[0.7, 3.2, 0]}>
          <meshStandardMaterial color="#C0C0C0" />
        </Sphere>
      </group>

      {/* Flying stone */}
      <mesh ref={stoneRef} position={[0, 2, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
    </group>
  );
};
