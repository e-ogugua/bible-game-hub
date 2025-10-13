import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Plane } from '@react-three/drei';
import * as THREE from 'three';

export const GoliathScene: React.FC = () => {
  const davidRef = useRef<THREE.Group>(null);
  const goliathRef = useRef<THREE.Group>(null);
  const stoneRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
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

  return (
    <group>
      {/* Battlefield ground */}
      <Plane args={[15, 15]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#8B7355" />
      </Plane>

      {/* David (small figure) */}
      <group ref={davidRef} position={[-3, 0, 0]}>
        <Cylinder args={[0.3, 0.3, 1.2]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Cylinder>
        <Sphere args={[0.25]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#FDBCB4" />
        </Sphere>
      </group>

      {/* Goliath (large figure) */}
      <group ref={goliathRef} position={[3, 3, 0]}>
        <Cylinder args={[0.8, 0.8, 3]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#654321" />
        </Cylinder>
        <Sphere args={[0.5]} position={[0, 3.5, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Sphere>
        {/* Armor */}
        <Box args={[1.2, 0.8, 0.1]} position={[0, 2, 0.3]}>
          <meshStandardMaterial color="#C0C0C0" />
        </Box>
        {/* Helmet */}
        <Sphere args={[0.4]} position={[0, 3.5, 0]}>
          <meshStandardMaterial color="#696969" />
        </Sphere>
      </group>

      {/* Flying stone */}
      <Sphere ref={stoneRef} args={[0.1]}>
        <meshStandardMaterial color="#8B7355" />
      </Sphere>

      {/* Sling */}
      <group position={[-2.8, 1, 0]}>
        <Cylinder args={[0.02, 0.02, 0.8]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#8B4513" />
        </Cylinder>
      </group>

      {/* Battlefield lighting */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <ambientLight intensity={0.4} />
    </group>
  );
};
