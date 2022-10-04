import styles from "./loader.module.css";

const Loader = () => {
  return (
    <>
      <section className={styles.loader}>
        {/* <img src={require("./../../imgs/loaders/a (9).gif")}/> */}
        <div class={styles["lds-ring"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.txt}>Loading...</div>
      </section>
    </>
  );
};

export default Loader;
