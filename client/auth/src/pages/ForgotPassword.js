import React from "react";
import styles from "./ForgotPassword.module.css";

export const ForgotPassword = () => {
  return (
    <div className={styles.mimenuForgotPass}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <b className={styles.mimenu}>MiMenu</b>
      </div>
      <b className={styles.forgotPassword}>Forgot Password</b>
      <div className={styles.alreadyHaveAn}>Already have an account?</div>
      <div className={styles.login}>Login</div>
      <div className={styles.input}>
        <div className={styles.emailAddressWrapper}>
          <div className={styles.emailAddress}>Email Address</div>
        </div>
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.groupItem} />
        <div className={styles.submit}>Submit</div>
      </div>
    </div>
  );
};
