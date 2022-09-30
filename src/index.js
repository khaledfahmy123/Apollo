import React from "react";
import ReactDOM from "react-dom/client";
import styles from "./compos/App.module.css";
import App from "./compos/App"

const rootDom = document.getElementById("root");
rootDom.className = styles.root;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
