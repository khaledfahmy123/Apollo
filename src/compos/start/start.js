import styles from "./start.module.css";
import React, { useRef } from "react";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const Start = (props) => {
  const start_section = useRef();
  const continueHandler = () => {
    start_section.current.style.opacity = 0;
    setTimeout(() => {
      start_section.current.style.display = "none";
      props.play();
    }, 400);
  };
  return (
    <>
      <section ref={start_section} className={styles.container}>
        <div className={styles.logo}>APOLLO</div>
        {/* <button>Continue</button> */}
          <Button
            variant="outlined"
            className={styles.btn}
            onClick={continueHandler}
            style={{ fontSize: '23px', borderColor: "#15F3FF", color: "#15F3FF" }}
          >
            Cintinue
          </Button>
      </section>
    </>
  );
};

export default Start;
