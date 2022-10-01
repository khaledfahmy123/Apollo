import { useState, useRef } from "react";
import Slider from "@mui/material/Slider";
import styles from "./slider.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const finalTheme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        mark: {
          //   color: "red",
          //   width: "20px",
          //   transform: "translateX(-50%)",
        },
        markLabel: {
          color: "#00bcd4",
          fontSize: "22px",
        },
      },
    },
  },
});

export const SliderComp = (props) => {
  const sliderHandler = (e) => {
    props.yearChange(e.target.value);
  };

  let vals = [
    { value: 2000, label: "2000" },
    { value: 2005, label: "2005" },
    { value: 2010, label: "2010" },
    { value: 2015, label: "2015" },
    { value: 2020, label: "2020" },
  ];
  return (
    <>
      <div className={styles.slider_cont}>
        <ThemeProvider theme={finalTheme}>
          <Slider
            aria-label="Temperature"
            defaultValue={1}
            valueLabelDisplay="auto"
            step={5}
            marks={vals}
            min={2000}
            max={2020}
            onChange={sliderHandler}
            sx={{
              "& .MuiSlider-markLabel": {
                color: "#00bcd4",
                fontSize: "22px",
              },
            }}
          />
        </ThemeProvider>
      </div>
    </>
  );
};
