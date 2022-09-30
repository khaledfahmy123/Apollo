import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Portal from "./../../../../portal/portal";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";

const toRad = (val) => 2*Math.PI * val /360

var data = require("./../coords2.json");
  // console.log(data);

  // * -1/6371


const Obj = () => {
  const obj = useRef();
  useFrame(()=>{
    obj.current.rotation.z = toRad(15);
    obj.current.rotation.y = toRad(35);
    obj.current.rotation.x = toRad(-20);
  })
  const model = useGLTF(require("./../../../../../assets/models/ISS_stationary.glb"))
  return <primitive object={model.scene} scale={0.001} ref={obj}/>
}

export const Moon = (props) => {

  let i = 0;
  var step = 0.02;
  const moon = useRef();
  const cam = useRef();
  const iss = useRef();
  useFrame((state) => {
    iss.current.position.x = -1*data[i][0]
    iss.current.position.z = data[i][1]
    iss.current.position.y = data[i][2]


    cam.current.position.x = -1*data[i][0] -0.3
    cam.current.position.z = data[i][1]
    cam.current.position.y = data[i][2]
    
    i++;
  });

  
  return (
    <>
      <mesh position={props.pivot} ref={moon}>
        <PerspectiveCamera makeDefault position={[1.2, 1.1, 1.1]} ref={cam}></PerspectiveCamera>
        <mesh position={[1.1, 1, 1]} ref={iss} scale={1}
        castShadow>
          {/* <sphereGeometry args={[0.01, 32, 32]} castShadow /> */}
          <Obj />
          <meshStandardMaterial color={"hotpink"} />
        </mesh>
      </mesh>
    </>
  );
};


