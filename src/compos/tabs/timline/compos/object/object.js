import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { OrbitControls, Stars } from "@react-three/drei";

const Obj = () => {
  const obj = useRef();
  useFrame(() => {
    obj.current.rotation.y += 0.001;
  });
  const gltf = useGLTF(
    require("./../../../../../assets/models/ISS_stationary.glb")
  );
  return <primitive ref={obj} object={gltf.scene} scale={0.08} />;
};

export const Object = (props) => {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas camera={{ position: [1, 1, 8] }}>
          <color attach="background" args={["black"]} />
          <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
          <pointLight position={[10, 10, 10]} />
          <Obj />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </>
  );
};
