import React from "react";
import styles from "./Header.module.css";

function Header({ children }) {
  return <div className={styles.header}>{children}</div>;
}

export default Header;
