import styles from "./loader.module.css"





const Loader = () => {
    return <>
        <section className={styles.loader}>
            <div>
            lol
            </div>
            <img src={require("./../../imgs/loaders/a (9).gif")}/>
        </section>
    </>
}

export default Loader;