import React from "react";
import styles from "./Login.module.css";

export const Login = () => {
  return (
    <div className={styles.mimenuLogin}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <b className={styles.mimenu}>MiMenu</b>
      </div>
      <div className={styles.loginContainer}>
        <b className={styles.logIn}>Log In</b>
        <div className={styles.dontAlreadyHave}>
          Don’t already have an account?
        </div>
        <div className={styles.createAnAccount}>Create an account</div>
        <div className={styles.forgotPassword}>Forgot Password</div>
        <div className={styles.input}>
          <div className={styles.inputItem} />
          <div className={styles.email}>Email</div>
          <div className={styles.emailAddressWrapper}>
            <div className={styles.emailAddress}>Email Address</div>
          </div>
        </div>
        <div className={styles.input1}>
          <div className={styles.inputItem} />
          <div className={styles.emailAddressWrapper}>
            <div className={styles.emailAddress}>Password</div>
          </div>
        </div>
        <div className={styles.rectangleGroup}>
          <div className={styles.groupItem} />
          <div className={styles.login}>Login</div>
        </div>
      </div>
    </div>
  );
};
