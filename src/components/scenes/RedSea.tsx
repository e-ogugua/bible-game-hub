import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

export const RedSea: React.FC = () => {
  const waterRef = useRef<THREE.Mesh>(null);
  const leftWallRef = useRef<THREE.Mesh>(null);
  const rightWallRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (leftWallRef.current && rightWallRef.current) {
      const time = state.clock.elapsedTime;
      leftWallRef.current.position.x = -2 + Math.sin(time * 0.3) * 0.5;
      rightWallRef.current.position.x = 2 - Math.sin(time * 0.3) * 0.5;
    }
  });

  return (
    <group>
      {/* Ocean floor */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Plane>

      {/* Water surface */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} ref={waterRef}>
        <meshStandardMaterial
          color="#1E90FF"
          transparent
          opacity={0.8}
          roughness={0}
          metalness={0.1}
        />
      </Plane>

      {/* Parted water walls */}
      <Box ref={leftWallRef} args={[0.5, 8, 10]} position={[-2, 2, 0]}>
        <meshStandardMaterial
          color="#1E90FF"
          transparent
          opacity={0.9}
          roughness={0}
        />
      </Box>

      <Box ref={rightWallRef} args={[0.5, 8, 10]} position={[2, 2, 0]}>
        <meshStandardMaterial
          color="#1E90FF"
          transparent
          opacity={0.9}
          roughness={0}
        />
      </Box>

      {/* Path through the sea */}
      <Plane args={[3, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
        <meshStandardMaterial color="#F4A460" />
      </Plane>

      {/* Underwater lighting */}
      <pointLight position={[0, -1, 0]} intensity={0.5} color="#4682B4" />
      <ambientLight intensity={0.3} />

      {/* Surface reflections */}
      <pointLight position={[0, 3, 0]} intensity={1} color="#87CEEB" />
    </group>
  );
};
