import React from "react";
import styles from "./Patients.module.css";
import personIconDark from "../images/person-icon-dark.svg";
import personIconLight from "../images/person-icon-light.svg";

export const Patients = () => {
  return (
    <div className={styles.mimenuPatients}>
      <div className={styles.frameParent}>
        <div className={styles.mimenuWrapper}>
          <b className={styles.mimenu}>Mimenu</b>
        </div>
        <div className={styles.groupWrapper}>
          <div className={styles.groupParent}>
            <div className={styles.rectangleParent}>
              <div className={styles.groupChild} />
              <div className={styles.logout}>Logout</div>
            </div>
            <img className={styles.groupItem} alt="" src="../group-5804.svg" />
          </div>
        </div>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.outerContainerFrame}>
          <div className={styles.frameContainer}>
            <div className={styles.groupContainer}>
              <img
                className={styles.frameChild}
                alt=""
                src="../group-3327.svg"
              />
              <div className={styles.provider}>Provider</div>
              <div className={styles.provider}># of Patients</div>
            </div>
            <div className={styles.frameDiv}>
              <img className={styles.frameItem} alt="" src={personIconDark} />
              <div className={styles.primaryLabel}>Provider 01</div>
              <div className={styles.secondaryLabel}>12</div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.groupParent1}>
              <img className={styles.frameItem} alt="" src={personIconLight} />
              <div className={styles.primaryLabel}>Provider 02</div>
              <div className={styles.secondaryLabel}>10</div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.frameDiv}>
              <img className={styles.frameItem} alt="" src={personIconDark} />
              <div className={styles.primaryLabel}>Provider 03</div>
              <div className={styles.secondaryLabel}>5</div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.frameDiv}>
              <img className={styles.frameItem} alt="" src={personIconDark} />
              <div className={styles.primaryLabel}>Provider 04</div>
              <div className={styles.secondaryLabel}>7</div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.frameDiv}>
              <img className={styles.frameItem} alt="" src={personIconDark} />
              <div className={styles.primaryLabel}>Provider 05</div>
              <div className={styles.secondaryLabel}>11</div>
            </div>
          </div>
        </div>
        <div className={styles.outerContainerFrame}>
          <div className={styles.frameContainer}>
            <div className={styles.groupContainer}>
              <img
                className={styles.frameChild}
                alt=""
                src="../group-3327.svg"
              />
              <div className={styles.provider}>Patient</div>
            </div>
            <div className={styles.frameDiv}>
              <img className={styles.frameItem} alt="" src={personIconDark} />
              <div className={styles.primaryLabel}>R12 B1A</div>
              <div className={styles.secondaryLabel}>12</div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.groupParent1}>
              <img className={styles.frameItem} alt="" src={personIconLight} />
              <div className={styles.primaryLabel}>R12 B1A</div>
              <div className={styles.secondaryLabel}>10</div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.frameDiv}>
              <img className={styles.frameItem} alt="" src={personIconDark} />
              <div className={styles.primaryLabel}>R12 B1A</div>
              <div className={styles.secondaryLabel}>5</div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.groupParent1}>
              <img className={styles.frameItem} alt="" src={personIconLight} />
              <div className={styles.primaryLabel}>R12 B1A</div>
              <div className={styles.secondaryLabel}>10</div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.groupParent1}>
              <img className={styles.frameItem} alt="" src={personIconLight} />
              <div className={styles.primaryLabel}>R12 B1A</div>
              <div className={styles.secondaryLabel}>10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
