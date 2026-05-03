import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ScrollControls, useScroll } from '@react-three/drei';
import { FloatingNeuralNode } from './FloatingNeuralNode';
import { SkillCard } from './SkillCard';
import { useState } from 'react';
import * as THREE from 'three';

function SceneContent() {
  const scroll = useScroll();
  const [offset, setOffset] = useState(0);

  useFrame((state) => {
    setOffset(scroll.offset);
    
    // Base camera position
    let targetZ = 8;
    
    // Zoom in during the SkillCard section 
    if (scroll.offset > 0.1 && scroll.offset < 0.9) {
      // Calculate a zoom factor that peaks at the center of the section
      const progress = (scroll.offset - 0.1) / 0.8;
      // Using a sine wave for smooth zoom in and out
      const zoomFactor = Math.sin(progress * Math.PI);
      targetZ = 8 - (zoomFactor * 2); // Zoom in by moving closer (from Z=8 to Z=6)
    }
    
    // Smoothly interpolate the camera position
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#9d00ff" />
      
      <group position={[0, 0, 0]}>
        {/* Only show hero at the top */}
        {offset < 0.25 && <FloatingNeuralNode />}
      </group>

      <group position={[0, 0, 0]}>
        {/* Show cards as we scroll down */}
        {offset > 0.2 && offset < 0.9 && (
          <>
            <SkillCard title="AI & AUTOMATION\n(LLMs, RAG, MAKE.COM)" index={0} scrollOffset={(offset - 0.2) * 2} />
            <SkillCard title="CORE ENGINEERING\n(PYTHON, JS, SQL)" index={1} scrollOffset={(offset - 0.2) * 2} />
            <SkillCard title="HARDWARE & IOT\n(ZIGBEE, SMART HOME)" index={2} scrollOffset={(offset - 0.2) * 2} />
          </>
        )}
      </group>
      
      <Environment preset="night" />
    </>
  );
}

export function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
        <ScrollControls pages={4} damping={0.1}>
          <SceneContent />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
