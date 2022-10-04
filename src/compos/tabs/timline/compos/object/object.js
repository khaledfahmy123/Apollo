import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { OrbitControls, Stars } from "@react-three/drei";

const Obj = () => {
  const gltf = useGLTF(
    require("./../../../../../assets/models/ISS_stationary.glb")
  );
  return <primitive object={gltf.scene} scale={0.08} />;
};

export const Object = (props) => {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas>
          <pointLight position={[10, 10, 10]} />
          <Obj />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </>
  );
};
