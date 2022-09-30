import styles from "./App.module.css";
import React, { useRef, useState } from "react";
import { Track } from "./tabs/track/track";
import { Timeline } from "./tabs/timline/timeline";
import { Canv } from "./tabs/test/canv";
import Portal from "./portal/portal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const toDeg = (val) => (val / (Math.PI * 2)) * 360;

const tabs = [<Track />, <Timeline />];





function App() {
  const [tab, setTab] = useState(0);

  const swipeHandler = (e) => {
    console.log(e.target);
  
    if (e.target.id == "right"){
      setTab(prev => (prev + 1) < tabs.length ? prev + 1: prev)
    }
    if (e.target.id == "left"){
      setTab(prev => (prev - 1) > -1 ? prev - 1: prev)
    }
  }
  return (
    <>
      <button
        id="right"
        className={`${styles.swipe} ${styles.left}`}
        onClick={swipeHandler}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button
        id="left"
        className={`${styles.swipe} ${styles.right}`}
        onClick={swipeHandler}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {tabs[tab]}
      {/* <Track /> */}
      {/* <Timeline /> */}
      {/* <iframe src="https://www.heavens-above.com/ISS_3D.aspx" style={{width: "100%", height: "100%"}} allowfullscreen/> */}
      {/* <Canv /> */}
    </>
  );
}

export default App;
