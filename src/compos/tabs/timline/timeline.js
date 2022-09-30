import {useState} from "react";
import Slider from "@mui/material/Slider";
import styles from "./timline.module.css";
import {SliderComp} from "./compos/slider/slider"
import {Content} from "./compos/content/content"



export const Timeline = () => {
  const [year, setYear] = useState(1990)

  const yearChange = (val) => {
    console.log(val);
  }

  let vals = [
    { value: 0, label: "lol" },
    { value: 1, label: "lol" },
  ];
  return (
    <>
      <section className={styles.main}>
        <SliderComp yearChange={yearChange}/>
        <Content />
      </section>
    </>
  );
};
