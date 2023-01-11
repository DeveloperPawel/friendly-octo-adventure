import React from "react";
import styles from "./AdminHome.module.css";
import image01 from "../images/group-58011.svg";
import image02 from "../images/group-3353.svg";
import image03 from "../images/group-3354.svg";
import image04 from "../images/group-3355.svg";
import image05 from "../images/group-3356.svg";
import image06 from "../images/group-3357.svg";
import image07 from "../images/group-3358.svg";
import home from "../images/home4.svg";
import user from "../images/3users4.svg";
import sun from "../images/sun4.svg";
import settings from "../images/settings4.svg";
import check from "../images/check.svg";
import search from "../images/search.svg";

export const AdminHome = () => {
  return (
    <div className={styles.mimenuHome}>
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
            <img className={styles.groupItem} alt="" src={image01} />
          </div>
        </div>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.groupContainer}>
          <div className={styles.allButton}>
            <div className={styles.allButttonChild} />
            <div className={styles.all}>All</div>
          </div>
          <div className={styles.rectangleContainer}>
            <div className={styles.rectangleDiv} />
            <div className={styles.breakfast}>Breakfast</div>
          </div>
          <div className={styles.groupDiv}>
            <div className={styles.groupChild1} />
            <div className={styles.lunch}>Lunch</div>
          </div>
          <div className={styles.rectangleParent1}>
            <div className={styles.groupChild2} />
            <div className={styles.dinner}>Dinner</div>
          </div>
        </div>
        <div className={styles.checkboxGroup}>
          <div className={styles.mainCheckbox}>
            <div className={styles.mainCheckboxChild} />
            <div className={styles.patientItem} />
            <img className={styles.checkIcon} alt="" src={check} />
          </div>
          <div className={styles.rectangleParent3}>
            <div className={styles.groupChild5} />
            <div className={styles.ordered}>Ordered</div>
          </div>
          <div className={styles.rectangleParent4}>
            <div className={styles.groupChild6} />
            <div className={styles.inProgress}>In-Progress</div>
          </div>
          <div className={styles.rectangleParent5}>
            <div className={styles.groupChild7} />
            <div className={styles.complete}>Complete</div>
          </div>
        </div>
        <div className={styles.rectangleParent6}>
          <div className={styles.frameChild} />
          <img className={styles.frameItem} alt="" src={image02} />
          <div className={styles.patient}>Patient</div>
          <div className={styles.entree}>Entree</div>
          <div className={styles.patient}>Status</div>
        </div>
        <div className={styles.groupParent1}>
          <div className={styles.rectangleWrapper}>
            <div className={styles.groupChild8} />
          </div>
          <img className={styles.frameInner} alt="" src={image03} />
          <div className={styles.r10B1a}>R10 B1A</div>
          <div className={styles.patientLabel}>
            <span>R</span>
            <span className={styles.span}>21</span>
            <span> B</span>
            <span className={styles.span}>2A</span>
          </div>
          <div className={styles.amazingBurger}>Amazing Burger</div>
          <div className={styles.statusLabel}>Ordered</div>
        </div>
        <div className={styles.lineDiv} />
        <div className={styles.groupParent2}>
          <div className={styles.rectangleWrapper}>
            <div className={styles.groupChild8} />
          </div>
          <img className={styles.frameInner} alt="" src={image04} />
          <div className={styles.r10B1a}>R11 B1B</div>
          <div className={styles.patientLabel}>
            <span>R</span>
            <span className={styles.span}>21</span>
            <span> B</span>
            <span className={styles.span}>2A</span>
          </div>
          <div className={styles.longerText}>Peanut Butter and Jelly</div>
          <div className={styles.statusLabel}>In-Progress</div>
        </div>
        <div className={styles.lineDiv} />
        <div className={styles.completeParent}>
          <div className={styles.rectangleWrapper}>
            <div className={styles.groupChild8} />
          </div>
          <img className={styles.frameInner} alt="" src={image05} />
          <div className={styles.r10B1a}>R12 B1A</div>
          <div className={styles.patientLabel}>
            <span>R</span>
            <span className={styles.span}>21</span>
            <span> B</span>
            <span className={styles.span}>2A</span>
          </div>
          <div className={styles.amazingBurger}>Salad</div>
          <div className={styles.r10B1a}>Ordered</div>
        </div>
      </div>
      <div className={styles.groupParent6}>
        <div className={styles.homeParent}>
          <div className={styles.home}>Home</div>
          <img className={styles.homeIcon} alt="" src={home} />
        </div>
        <div className={styles.patientsParent}>
          <div className={styles.home}>Patients</div>
          <img className={styles.patientsIcon} alt="" src={user} />
        </div>
        <div className={styles.dayParent}>
          <div className={styles.home}>Day</div>
          <img className={styles.dayIcon} alt="" src={sun} />
        </div>
        <div className={styles.settingsParent}>
          <div className={styles.home}>Settings</div>
          <img className={styles.settingsIcon} alt="" src={settings} />
        </div>
      </div>
    </div>
  );
};
