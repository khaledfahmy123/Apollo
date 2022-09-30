import styles from "./App.module.css";
import React, { useRef, useState } from "react";
import {Track} from "./tabs/track/track";
import { Timeline } from "./tabs/timline/timeline";
import {Canv} from "./tabs/test/canv"

const toDeg = (val) => val/(Math.PI * 2) * 360


function App() {
  return (
    <>
    {/* <Track /> */}
    <Timeline />
    {/* <iframe src="https://www.heavens-above.com/ISS_3D.aspx" style={{width: "100%", height: "100%"}} allowfullscreen/> */}
    {/* <Canv /> */}
    </>
  );
}

export default App;
