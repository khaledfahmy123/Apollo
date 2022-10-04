import { useState } from "react";
import Slider from "@mui/material/Slider";
import styles from "./timline.module.css";
import { SliderComp } from "./compos/slider/slider";
import { Content } from "./compos/content/content";

const Timeline = () => {
  const [year, setYear] = useState(2000);

  const yearChange = (val) => {
    console.log(val);
    setYear(val);
  };

  return (
    <>
      <section className={styles.main}>
        <SliderComp yearChange={yearChange} />
        <Content year={year} />
      </section>
    </>
  );
};


export default Timeline;