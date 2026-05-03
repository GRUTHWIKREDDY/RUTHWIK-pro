import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface SkillCardProps {
  title: string;
  index: number;
  scrollOffset: number;
}

export function SkillCard({ title, index, scrollOffset }: SkillCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    
    // The "Bodak" effect: fan out and rotate based on scroll
    // scrollOffset is normalized 0 to 1 for the specific section
    const spreadX = 1.3;
    const targetRotationY = (index - 1) * 0.15 + (scrollOffset * 0.2);
    const targetPosZ = index * 0.5 - (scrollOffset * 1.5);
    const targetPosX = (index - 1) * spreadX * Math.min(scrollOffset, 1.2);

    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetPosZ, 0.1);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetPosX, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
      <RoundedBox
        ref={meshRef}
        args={[2, 3, 0.1]}
        radius={0.05}
        smoothness={4}
      >
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.1}
          transmission={0.5}
          thickness={1}
        />
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.2}
          color="#00ff9d"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t64vPa_rphvV-m_K_p643_N98Kz8.woff"
          maxWidth={1.8}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      </RoundedBox>
    </Float>
  );
}
