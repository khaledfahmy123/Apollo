import './../fonts/Enixe.ttf';
import styles from "./App.module.css";
import React, { useState, Suspense } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "./loader/loader"
import Start from "./start/start"
import useSound from "use-sound"
import audio from "./../sound/sound1.mp3"

const Track = React.lazy(() => import("./tabs/track/track"))
const Timeline = React.lazy(() => import("./tabs/timline/timeline"))



const toDeg = (val) => (val / (Math.PI * 2)) * 360;

const tabs = [
  <Suspense fallback={<Loader/>}>
    <Track />
  </Suspense>,
  <Suspense fallback={<Loader/>}>
    <Timeline />
  </Suspense>,
];

function App() {
  const [tab, setTab] = useState(0);
  const [play, {stop}] = useSound(audio, {volume: 0.5});
  const swipeHandler = (e) => {
    if (e.target.id == "right") {
      setTab((prev) => (prev + 1 < tabs.length ? prev + 1 : prev));
    }
    if (e.target.id == "left") {
      setTab((prev) => (prev - 1 > -1 ? prev - 1 : prev));
    }
  };

  return (
    <>
      <button
        id="right"
        className={`${styles.swipe} ${styles.left} ${(tab === 1) ? styles.hide : ""}`}
        onClick={swipeHandler}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button
        id="left"
        className={`${styles.swipe} ${styles.right} ${(tab === 0) ? styles.hide : ""}`}
        onClick={swipeHandler}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {<Start play={play}/>}
      {tabs[tab]}
    </>
  );
}

export default App;
