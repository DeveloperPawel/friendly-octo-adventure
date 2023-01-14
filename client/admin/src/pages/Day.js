import React from "react";
import styles from "./Day.module.css";

export const Day = () => {
  return (
    <div className={styles.mimenuDay}>
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
            <img className={styles.groupItem} alt="" src="../group-5802.svg" />
          </div>
        </div>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.groupContainer}>
          <div className={styles.rectangleGroup}>
            <div className={styles.groupInner} />
            <div className={styles.day}>Day</div>
          </div>
          <div className={styles.rectangleGroup}>
            <div className={styles.rectangleDiv} />
            <div className={styles.prep}>Prep</div>
          </div>
        </div>
        <div className={styles.frameContainer}>
          <div className={styles.breakfastParent}>
            <div className={styles.breakfast}>Breakfast</div>
            <div className={styles.frameDiv}>
              <div className={styles.groupDiv}>
                <div className={styles.groupChild1} />
                <div className={styles.rectangleParent1}>
                  <div className={styles.groupChild2} />
                  <div className={styles.oatmeal}>Oatmeal</div>
                </div>
              </div>
              <img
                className={styles.frameChild}
                alt=""
                src="../group-305.svg"
              />
            </div>
            <div className={styles.rectangleParent2}>
              <div className={styles.groupChild3} />
              <div className={styles.rectangleParent3}>
                <div className={styles.groupChild4} />
                <div className={styles.eggs}>Eggs</div>
                <img
                  className={styles.groupIcon}
                  alt=""
                  src="../group-444.svg"
                />
              </div>
              <div className={styles.rectangleParent4}>
                <div className={styles.groupChild5} />
                <div className={styles.yogurt}>Yogurt</div>
                <img
                  className={styles.groupChild6}
                  alt=""
                  src="../group-455.svg"
                />
              </div>
              <div className={styles.rectangleParent5}>
                <div className={styles.groupChild7} />
                <div className={styles.oatmeal1}>Oatmeal</div>
                <img
                  className={styles.groupChild8}
                  alt=""
                  src="../group-464.svg"
                />
              </div>
            </div>
          </div>
          <div className={styles.breakfastParent}>
            <div className={styles.breakfast}>Lunch</div>
            <div className={styles.frameDiv}>
              <div className={styles.groupDiv}>
                <div className={styles.groupChild1} />
                <div className={styles.rectangleParent7}>
                  <div className={styles.groupChild10} />
                  <div className={styles.peanutButterAnd}>
                    Peanut Butter and jelly
                  </div>
                </div>
              </div>
              <img
                className={styles.frameChild}
                alt=""
                src="../group-306.svg"
              />
            </div>
            <div className={styles.rectangleParent2}>
              <div className={styles.groupChild3} />
              <div className={styles.rectangleParent9}>
                <div className={styles.groupChild12} />
                <div className={styles.hamAndCheese}>Ham and Cheese</div>
                <img
                  className={styles.groupChild13}
                  alt=""
                  src="../group-456.svg"
                />
              </div>
              <div className={styles.rectangleParent10}>
                <div className={styles.groupChild7} />
                <div className={styles.pbAndJ}>PB and J</div>
                <img
                  className={styles.groupChild15}
                  alt=""
                  src="../group-465.svg"
                />
              </div>
            </div>
          </div>
          <div className={styles.breakfastParent}>
            <div className={styles.breakfast}>Dinner</div>
            <div className={styles.frameDiv}>
              <div className={styles.groupDiv}>
                <div className={styles.groupChild1} />
                <div className={styles.rectangleParent12}>
                  <div className={styles.groupChild17} />
                  <div className={styles.amazingBurger}>Amazing Burger</div>
                </div>
              </div>
              <img
                className={styles.frameChild}
                alt=""
                src="../group-307.svg"
              />
            </div>
            <div className={styles.rectangleParent2}>
              <div className={styles.groupChild3} />
              <div className={styles.rectangleParent14}>
                <div className={styles.groupChild19} />
                <div className={styles.amazingBurger1}>Amazing Burger</div>
                <img
                  className={styles.groupChild20}
                  alt=""
                  src="../group-466.svg"
                />
              </div>
              <div className={styles.rectangleParent15}>
                <div className={styles.groupChild21} />
                <div className={styles.salad}>Salad</div>
                <img
                  className={styles.groupChild22}
                  alt=""
                  src="../group-467.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.groupParent3}>
        <div className={styles.homeParent}>
          <div className={styles.home}>Home</div>
          <img className={styles.homeIcon} alt="" src="../home1.svg" />
        </div>
        <div className={styles.patientsParent}>
          <div className={styles.home}>Patients</div>
          <img className={styles.homeIcon} alt="" src="../3users1.svg" />
        </div>
        <div className={styles.dayParent}>
          <div className={styles.home}>Day</div>
          <img className={styles.homeIcon} alt="" src="../sun1.svg" />
        </div>
        <div className={styles.patientsParent}>
          <div className={styles.home}>Settings</div>
          <img className={styles.homeIcon} alt="" src="../settings1.svg" />
        </div>
      </div>
    </div>
  );
};
