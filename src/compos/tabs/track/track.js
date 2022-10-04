import React, { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Moon } from "./compos/moon/moon";
import { Earth } from "./compos/earth/earth";
import { Env } from "./compos/env/env";
import DateTimePicker from "react-datetime-picker";
import styles from "./track.module.css";

const toDeg = (val) => (val / (Math.PI * 2)) * 360;

const Track = () => {
  const [date, setDate] = useState(new Date());
  const [counter, setCounter] = useState(0);

  console.log(date);

  const jumpTo = () => {
    let now = new Date();
    let dif = (date - now) % (93 * 60);
    setCounter(Math.abs(dif * 30));
  };

  return (
    <>
      <button onClick={jumpTo} className={styles.btn}>
        Explore
      </button>
      <div className={styles.date_parent}>
        <DateTimePicker
          value={date}
          className={styles.date}
          onChange={setDate}
        />
      </div>
      <Canvas>
        <Env />
        <Earth />
        <Moon pivot={[0, 0, 0]} obj_position={[1.2, 0, 0]} counter={counter} />
        <OrbitControls makeDefault />
      </Canvas>
    </>
  );
};



export default Track;