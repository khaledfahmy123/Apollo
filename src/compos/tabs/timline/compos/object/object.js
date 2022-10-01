import * as THREE from "three";
import { Mesh, SphereGeometry } from "three";
import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, useFBX } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Stars, OrbitControls } from "@react-three/drei";


const Obj = () => {
  // const fbx = useLoader(GLTFLoader, "./lol2.glb");
  console.log("start");
  // const gltf = useGLTF('https://thinkuldeep.com/modelviewer/Astronaut.glb')
  const gltf = useGLTF(require("./../../../../../assets/models/ISS_stationary.glb"))
  console.log(gltf);
  console.log("lol");
  return (<primitive object={gltf.scene} scale={0.08} />)

  // return <primitive object={fbx.scene.children[0]} />
};

export const Object = (props) => {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas shadows>
          <pointLight position={[10, 10, 10]} />
          <Obj />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </>
  );
};
