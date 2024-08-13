import React, { useState } from "react";
import styles from "../styles/MyJuiceCreator.module.css";

export const MyJuiceCreator = () => {
  const Ingredients = [
    { name: "Ananas", dosage: 10 },
    { name: "Pomme", dosage: 10 },
    { name: "Carotte", dosage: 10 },
    { name: "Gingembre", dosage: 2 },
    { name: "Curcuma", dosage: 1.5 },
  ];

  const [fill, setFill] = useState(0);

  const handleReset = () => {
    setFill(0);
  };

  const handleButtonPlusA = () => {
    if (fill < 100) {
      setFill(fill + 10);
    }
  };
  const handleButtonMinusA = () => {
    if (fill > 0) {
      setFill(fill - 10);
    }
  };

  
  const handleButtonPlusG = () => {
    if (fill < 100) {
      setFill(fill + 2);
    }
  };
  const handleButtonMinusG = () => {
    if (fill > 0) {
      setFill(fill - 2);
    }
  };
  
  
  
  
  
  
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.ingredientList}>
       
        <div className={styles.ingredient}>
          <p className={styles.ingredientName}>Ananas</p>
          <button className={styles.round_button} onClick={handleButtonPlusA}>+</button>
          <button className={styles.round_button} onClick={handleButtonMinusA}>-</button>
        </div>
      </div>
      <div className={styles.bottleContainer}>
        <div className={styles.bottle_bar}>
          <div
            className={styles.bottle_bar_fill}
            style={{ height: `${fill}%` }}
          >
            {" "}
          </div>
        </div>

        <div className={styles.fill_label}>{fill}%</div>
        <button className={styles.button} onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className={styles.ingredientList}>
        <div className={styles.ingredient}>
          <p className={styles.ingredientName}>Gingembre</p>
          <button className={styles.round_button}onClick={handleButtonPlusG}>+</button>
          <button className={styles.round_button}onClick={handleButtonMinusG}>-</button>
        </div>
      </div>
    </div>
  );
};
