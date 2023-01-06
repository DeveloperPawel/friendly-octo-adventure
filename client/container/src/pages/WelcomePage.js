import React from "react";
import styles from "./WelcomePage.module.css";
import circle from "../images/ellipse-1.svg";

export const WelcomePage = () => {
  return (
    <div className={styles.mimenuWelcome}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <img className={styles.vector} alt="" src={circle} />
        <b className={styles.mimenu}>MiMenu</b>
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.groupItem} />
        <div className={styles.login}>Login</div>
      </div>
      <div className={styles.rectangleContainer}>
        <div className={styles.groupInner} />
        <div className={styles.signup}>SignUp</div>
      </div>
    </div>
  );
};
