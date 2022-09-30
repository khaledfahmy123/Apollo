import React, { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import {CameraHelper} from "three"




export const Canv = () => {



  return (
    <>
    <Canvas camera={{ fov: 75, position: [2, 2, 2]}}>
    <pointLight
        color="#f6f3ea"
        position={[-2, 0, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
    <mesh>
        <sphereGeometry args={[0.2, 32, 32]} castShadow/>
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
      <OrbitControls makeDefault />
    </Canvas>
    </>
  );
}

