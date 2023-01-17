import React from "react";
import styles from "./Patient.module.css";

export const Patient = () => {
  return (
    <div className={styles.mimenuPatientHome}>
      <div className={styles.ellipseParent}>
        <img className={styles.groupItem} alt="" src="../ellipse-3.svg" />
        <img className={styles.userIcon} alt="" src="../user.svg" />
        <div className={styles.room10Bed}>Room 10, Bed 2A</div>
      </div>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.search}>Search</div>
        <img className={styles.searchIcon} alt="" src="../search2.svg" />
      </div>
      <div className={styles.allButtton}>
        <div className={styles.allButttonChild} />
        <div className={styles.all}>All</div>
      </div>
      <div className={styles.breakfastButton}>
        <div className={styles.breakfastChild} />
        <div className={styles.all}>Breakfast</div>
      </div>
      <div className={styles.dinnerButton}>
        <div className={styles.dinnerChild} />
        <div className={styles.all}>Dinner</div>
      </div>
      <div className={styles.lunchButton}>
        <div className={styles.lunchChild} />
        <div className={styles.all}>Lunch</div>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.rectangleGroup}>
          <div className={styles.frameChild} />
          <img className={styles.frameItem} alt="" />
          <div className={styles.breakfast}>Breakfast</div>
        </div>
        <div className={styles.burgerParent}>
          <div className={styles.burger}>
            <div className={styles.burgerChild} />
            <img
              className={styles.burgerItem}
              alt=""
              src="../rectangle-405@2x.png"
            />
            <div className={styles.yogurtParfait}>Yogurt Parfait</div>
            <div className={styles.vanillaYogurtTopped}>
              Vanilla yogurt topped with sweet strawberries
            </div>
          </div>
          <div className={styles.burger}>
            <div className={styles.burgerChild} />
            <img
              className={styles.burgerItem}
              alt=""
              src="../rectangle-403@2x.png"
            />
            <div className={styles.yogurtParfait}>Pancakes</div>
            <div className={styles.vanillaYogurtTopped}>
              Warm fluffy pancakes served with warm syrup
            </div>
          </div>
        </div>
        <div className={styles.rectangleGroup}>
          <div className={styles.frameChild} />
          <img className={styles.frameItem} alt="" />
          <div className={styles.breakfast}>Lunch</div>
        </div>
        <div className={styles.burgerParent}>
          <div className={styles.burger}>
            <div className={styles.burgerChild} />
            <img
              className={styles.burgerItem}
              alt=""
              src="../rectangle-402@2x.png"
            />
            <div className={styles.yogurtParfait}>Ham Sandwich</div>
            <div className={styles.vanillaYogurtTopped}>
              Ham sandwich served on toasted bread
            </div>
          </div>
          <div className={styles.burger}>
            <div className={styles.burgerChild} />
            <img
              className={styles.burgerItem}
              alt=""
              src="../rectangle-404@2x.png"
            />
            <div className={styles.yogurtParfait}>House Tacos</div>
            <div className={styles.vanillaYogurtTopped}>
              Beef tacos served on a warm corn shell topped with tomatoes
            </div>
          </div>
        </div>
        <div className={styles.rectangleGroup}>
          <div className={styles.frameChild} />
          <img className={styles.frameItem} alt="" />
          <div className={styles.breakfast}>Dinner</div>
        </div>
        <div className={styles.burgerContainer}>
          <div className={styles.burger}>
            <div className={styles.burgerChild4} />
            <img
              className={styles.burgerItem}
              alt=""
              src="../rectangle-40@2x.png"
            />
            <div className={styles.yogurtParfait}>Amazing Burger</div>
            <div className={styles.statusParent}>
              <div className={styles.status}>Status:</div>
              <div className={styles.completed}>Completed</div>
            </div>
            <div className={styles.chuckBurgerEgg}>
              Chuck burger, egg, American Cheese between two buns
            </div>
          </div>
          <div className={styles.burger5}>
            <div className={styles.burgerChild} />
            <img
              className={styles.burgerItem}
              alt=""
              src="../rectangle-401@2x.png"
            />
            <div className={styles.yogurtParfait}>Salad</div>
            <div className={styles.vanillaYogurtTopped}>
              Salad with tomatoes, lettuce, and chicken
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
