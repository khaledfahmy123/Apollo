import styles from "./content.module.css";
import { Object } from "../object/object.js";

export const Content = (props) => {
  return (
    <>
      <section className={styles.main}>
        <main className={styles.canv}>
          {props.year === 2000 && (
            <img
              src={require("./../../../../../imgs/2000.jpg")}
              className={styles.img}
            />
          )}
          {props.year === 2005 && (
            <img
              src={require("./../../../../../imgs/2005.jpg")}
              className={styles.img}
            />
          )}
          {props.year === 2010 && (
            <img
              src={require("./../../../../../imgs/2010.webp")}
              className={styles.img}
            />
          )}
          {props.year === 2015 && (
            <img
              src={require("./../../../../../imgs/2015.jpg")}
              className={styles.img}
            />
          )}
          {props.year === 2020 && <Object />}
        </main>
      </section>
    </>
  );
};
