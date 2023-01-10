import React from "react";
import styles from "./ProviderHome.module.css";
import image1 from "../images/group-58010.svg";
import image2 from "../images/group-3347.svg";
import image3 from "../images/group-3348.svg";
import image4 from "../images/group-579.svg";
import remove from "../images/remove.svg";
import patient from "../images/patient.svg";
import search from "../images/search1.svg";
import providerIcon from "../images/group-17.svg";

export const ProviderHome = () => {
  return (
    <div className={styles.mimenuProviderHome}>
      <div className={styles.frameParent}>
        <div className={styles.searchChild} />
        <div className={styles.search}>Search</div>
        <img className={styles.searchIcon} alt="" src={search} />
        <div className={styles.mimenuWrapper}>
          <b className={styles.mimenu}>Mimenu</b>
        </div>
        <div className={styles.groupWrapper}>
          <div className={styles.groupParent}>
            <div className={styles.rectangleParent}>
              <div className={styles.groupChild} />
              <div className={styles.logout}>Logout</div>
            </div>
            <img className={styles.groupItem} alt="" src={image1} />
          </div>
        </div>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.rectangleGroup}>
          <div className={styles.frameChild} />
          <img className={styles.frameItem} alt="" src={image2} />
          <div className={styles.patient}>Patient</div>
        </div>
        <div className={styles.groupContainer}>
          <div className={styles.rectangleWrapper}>
            <div className={styles.groupInner} />
          </div>
          <img className={styles.frameInner} alt="" src={image3} />
          <div className={styles.r10B1a}>R11 B1B</div>
          <div className={styles.breakfast}>Breakfast</div>
          <img className={styles.removeIcon} alt="" src={remove} />
          <div className={styles.breakfast}>Lunch</div>
          <img className={styles.removeIcon} alt="" src={remove} />
          <div className={styles.lunch}>Dinner</div>
        </div>
        <div className={styles.lineDiv} />
        <div className={styles.frameChild7} />
        <img className={styles.frameChild8} alt="" src={patient} />
      </div>
      <img className={styles.providerHomeChild} alt="" src={providerIcon} />
      <div className={styles.provider01}>Provider 01</div>
    </div>
  );
};
