import React from "react";
import styles from "./SignUp.module.css";
import firstCircle from "../images/dotshorizontal.svg";

export const SignUp = () => {
  return (
    <div className={styles.mimenuSignUp1}>
      <b className={styles.mimenu}>Mimenu</b>
      <div className={styles.signUpParent}>
        <b className={styles.signUp}>Sign Up</b>
        <div className={styles.alreadyHaveAn}>Already have an account?</div>
        <div className={styles.logIn}>Log In</div>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <div className={styles.next}>Next</div>
        </div>
        <img className={styles.dotsHorizontalIcon} alt="" src={firstCircle} />
        <div className={styles.whatRoomAre}>What room are you in?</div>
        <div className={styles.rectangleGroup}>
          <div className={styles.groupItem} />
          <div className={styles.div}>29</div>
        </div>
      </div>
    </div>
  );
};
