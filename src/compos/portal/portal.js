import ReactDom from "react-dom";
import styles from "./portal.module.css";

const dialogs = document.getElementById("dialog");
dialogs.className = styles.dialog;

const Portal = (props) => {
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay}>{props.children}</div>
    </>,
    dialogs
  );
};

export default Portal;
