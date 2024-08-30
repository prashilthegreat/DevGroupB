import React, { Suspense, useRef, useState } from 'react'; // Import React and necessary hooks
import { Canvas, useFrame } from '@react-three/fiber'; // Import Canvas and useFrame from @react-three/fiber
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three'; // Import THREE for blending

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#ffffff'
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending} // Additive blending for glowing effect
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='absolute inset-0 w-full h-full z-[-1]'>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{
          background: 'bg-gradient-to-b from-black via-[#cde2e6] to-black)',
          height: '100vh' // Ensure the canvas covers the viewport
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
