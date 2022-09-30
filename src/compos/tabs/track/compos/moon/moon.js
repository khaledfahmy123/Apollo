import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Portal from "./../../../../portal/portal";
import { PerspectiveCamera } from "@react-three/drei";

export const Moon = (props) => {
  var step = 0.02;
  const moon = useRef();
  const cam = useRef();
  const moonObj = useRef();
  useFrame((state) => {
    // console.log(moon.current.rotation.y%(2*Math.PI));
    moon.current.rotation.y += 2 * Math.PI/(3600*1.5);
    moonObj.current.rotation.x += 0.02;
    // posHandler();
  });

  const posHandler = () => {
    let x = moonObj.current.position.x;
    let y = moonObj.current.position.y;
    let z = moonObj.current.position.z;
    console.log([x, y, z]);
    // props.posHandler();
  };

  return (
    <>
      <mesh position={props.pivot} ref={moon}>
        <PerspectiveCamera makeDefault position={[1.2, 1, 2]}></PerspectiveCamera>
        <mesh position={[1.008, 1, 1]} ref={moonObj} scale={1}
        castShadow>
          <sphereGeometry args={[0.01, 32, 32]} castShadow />
          <meshStandardMaterial color={"hotpink"} />
        </mesh>
      </mesh>
    </>
  );
};


