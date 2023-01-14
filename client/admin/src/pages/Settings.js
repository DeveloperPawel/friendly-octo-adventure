import React from "react";

export const Settings = () => {
  return (
    <div className={styles.mimenuSettings}>
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
            <img className={styles.groupItem} alt="" src="../group-5801.svg" />
          </div>
        </div>
      </div>
      <div className={styles.mimenuSettingsInner}>
        <div className={styles.frameWrapper}>
          <div className={styles.restrictionParent}>
            <div className={styles.restriction}>Restriction</div>
            <div className={styles.groupContainer}>
              <div className={styles.rectangleGroup}>
                <div className={styles.groupInner} />
                <div className={styles.rectangleContainer}>
                  <div className={styles.rectangleDiv} />
                  <div className={styles.regular}>Regular</div>
                </div>
              </div>
              <img
                className={styles.frameChild}
                alt=""
                src="../group-304.svg"
              />
            </div>
            <div className={styles.groupDiv}>
              <div className={styles.groupChild1} />
              <div className={styles.rectangleParent1}>
                <div className={styles.groupChild2} />
                <div className={styles.regular1}>Regular</div>
                <img
                  className={styles.groupIcon}
                  alt=""
                  src="../group-443.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.frameDiv}>
        <div className={styles.homeParent}>
          <div className={styles.home}>Home</div>
          <img className={styles.homeIcon} alt="" src="../home.svg" />
        </div>
        <div className={styles.patientsParent}>
          <div className={styles.home}>Patients</div>
          <img className={styles.homeIcon} alt="" src="../3users.svg" />
        </div>
        <div className={styles.dayParent}>
          <div className={styles.home}>Day</div>
          <img className={styles.homeIcon} alt="" src="../sun.svg" />
        </div>
        <div className={styles.settingsParent}>
          <div className={styles.home}>Settings</div>
          <img className={styles.homeIcon} alt="" src="../settings.svg" />
        </div>
      </div>
    </div>
  );
};
