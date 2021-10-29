import React from "react";
import styles from "./BodyContainer.module.css";

function BodyContainer({ children }) {
  return <div className={styles.body__box}>{children}</div>;
}

export default BodyContainer;
