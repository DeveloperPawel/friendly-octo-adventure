import React from "react";
import styles from "./Prep.module.css";
import personIcon from "../images/group-5803.svg";
import plusIcon from "../images/group-308.svg";
import littleRed from "../images/group-469.svg";
import greyButton from "../images/group-322.svg";
import redButton from "../images/group-323.svg";

export const Prep = () => {
  const bool = true;
  const button = (input) => {
    switch (input) {
      case "grey":
        return greyButton;

      case "red":
        return redButton;

      default:
        return plusIcon;
    }
  };
  return (
    <div className={styles.mimenuPrep}>
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
          <div className={styles.ingredientsParent}>
            <div className={styles.ingredients}>Ingredients</div>
            <div className={styles.groupParent1}>
              <div className={styles.rectangleParent6}>
                <div className={styles.groupChild9} />
                <div className={styles.rectangleParent1}>
                  <div className={styles.groupChild2} />
                  <div className={styles.beef}>Beef</div>
                </div>
              </div>
              <img className={styles.frameChild} alt="" src={plusIcon} />
            </div>
            <div className={styles.rectangleParent2}>
              <div className={styles.groupChild3} />
              <div className={styles.rectangleParent3}>
                <div className={styles.groupChild4} />
                <div className={styles.dairy}>Dairy</div>
                <img className={styles.groupIcon} alt="" src={littleRed} />
              </div>
              <div className={styles.rectangleParent4}>
                <div className={styles.groupChild5} />
                <div className={styles.wheat}>Wheat</div>
                <img
                  className={styles.groupChild6}
                  alt=""
                  src="../group-457.svg"
                />
              </div>
              <div className={styles.rectangleParent5}>
                <div className={styles.groupChild7} />
                <div className={styles.beef1}>Beef</div>
                <img
                  className={styles.groupChild8}
                  alt=""
                  src="../group-468.svg"
                />
              </div>
            </div>
          </div>
          <div className={styles.foodItemsParent}>
            <div className={styles.foodItems}>Food Items</div>
            {bool ? (
              <div className={styles.groupParent1}>
                <div className={styles.rectangleParent6}>
                  <div className={styles.groupChild9} />
                  <div className={styles.rectangleParent7}>
                    <div className={styles.groupChild10} />
                    <div className={styles.burger1}>Burger</div>
                  </div>
                </div>
                <img className={styles.frameChild} alt="" src={button("")} />
              </div>
            ) : (
              <div className={styles.rectangleParent6}>
                <div className={styles.buttonlessChild} />
                <div className={styles.rectangleParent7}>
                  <div className={styles.groupChild10} />
                  <div className={styles.burger}>Burger</div>
                </div>
              </div>
            )}
            <div className={styles.groupParent2}>
              {bool ? (
                <div className={styles.rectangleParent8}>
                  <div className={styles.groupChild11} />
                  <div className={styles.rectangleParent9}>
                    <div className={styles.groupChild7} />
                    <div className={styles.beef2}>Beef</div>
                    <img
                      className={styles.groupChild13}
                      alt=""
                      src={littleRed}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.groupParent3}>
                    <img
                      className={styles.frameInner}
                      alt=""
                      src={button("")}
                    />
                    <div className={styles.rectangleParent10}>
                      <div className={styles.groupChild14} />
                      <div className={styles.rectangleParent9}>
                        <div className={styles.groupChild7} />
                        <div className={styles.beef2}>Beef</div>
                        <img
                          className={styles.groupChild13}
                          alt=""
                          src={littleRed}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.groupParent3}>
                    <img
                      className={styles.frameInner}
                      alt=""
                      src={button("red")}
                    />
                    <div className={styles.rectangleParent10}>
                      <div className={styles.groupChild14} />
                      <div className={styles.rectangleParent11}>
                        <div className={styles.groupChild15} />
                        <div className={styles.burger}>Burger</div>
                      </div>
                      <div className={styles.rectangleParent12}>
                        <div className={styles.groupChild16} />
                        <div className={styles.bread}>Bread</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
