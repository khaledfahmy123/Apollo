import React, { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Moon } from "./compos/moon/moon";
import { Earth } from "./compos/earth/earth";
import { Env } from "./compos/env/env";
import Portal from "./../../portal/portal";


const toDeg = (val) => val/(Math.PI * 2) * 360


export const Track = () => {
  const [pos, setPos] = useState([-10, 45, 20]);
  const x = useRef();
  const y = useRef();
  const z = useRef();

  const posHandler = (newPos) => {
    console.log("lol");
    setPos(newPos)
  }



  // useThree(({camera}) => {
  //   camera.rotation.set(0, 0, 0);
  // });


  return (
    <>
    <Portal>
      <button onClick={posHandler}>Click me now</button>
      <input type="number" ref={x}/>
      {/* <input type="number" ref={y}/> */}
      {/* <input type="number" ref={z}/> */}
    </Portal>
    <Canvas camera={{ fov: 75, position: pos}}>
      <Env />
      <Earth />
      <Moon pivot={[0, 0, 0]} obj_position={[1.2, 0, 0]} posHandler={posHandler}/>
      <OrbitControls makeDefault />
    </Canvas>
    </>
  );
}

