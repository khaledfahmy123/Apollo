import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Portal from "./../../../../portal/portal";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";

const toRad = (val) => (2 * Math.PI * val) / 360;

var data = require("./../coords5.json");
var matrix = require("./../coords6.json");
console.log(data);

// * -1/6371

const Obj = () => {
  const obj = useRef();
  useFrame(() => {
    obj.current.rotation.z = toRad(15);
    obj.current.rotation.y = toRad(35);
    obj.current.rotation.x = toRad(-20);
  });
  const model = useGLTF(
    require("./../../../../../assets/models/ISS_stationary.glb")
  );
  return <primitive object={model.scene} scale={0.001} ref={obj} />;
};

export const Moon = (props) => {
  let i = props.counter;
  var step = 0.02;
  const moon = useRef();
  const cam = useRef();
  const iss = useRef();
  useFrame((state) => {
    iss.current.position.x = -1 * data[Math.floor((i) / 2)][0];
    iss.current.position.z = data[Math.floor((i) / 2)][1];
    iss.current.position.y = data[Math.floor((i) / 2)][2];

    // // if(i%600 === 0){
      // iss.current.rotation.x = (matrix[i][0][0]**2 + matrix[i][1][0]**2 + matrix[i][2][0]**2 )**0.5
      // iss.current.rotation.y = (matrix[i][0][1]**2 + matrix[i][1][1]**2 + matrix[i][2][1]**2 )**0.5
      // iss.current.rotation.z = (matrix[i][0][2]**2 + matrix[i][1][2]**2 + matrix[i][2][2]**2 )**0.5
    // }

    i++;
  });

  const mat = (val) => {
    var matrix = new THREE.Matrix4(); // create once and reuse it

    matrix.set(
      val[0][0],
      val[0][1],
      val[0][2],
      0,
      val[1][0],
      val[1][1],
      val[1][2],
      0,
      val[2][0],
      val[2][1],
      val[2][2],
      0,
      0,
      0,
      0,
      1
    );

    return matrix
  };

  return (
    <>
      <mesh position={props.pivot} ref={moon}>
        <PerspectiveCamera
          makeDefault
          position={[1.2, 1.1, 1.1]}
          ref={cam}
        ></PerspectiveCamera>
        <mesh position={[1.1, 1, 1]} ref={iss} scale={1} castShadow>
          <Obj />
          <meshStandardMaterial color={"hotpink"} />
        </mesh>
      </mesh>
    </>
  );
};
