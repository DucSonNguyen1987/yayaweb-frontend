import React from 'react';
import styles from "../styles/MyJuiceCreator.module.css";

export const MyJuice = () => {
  return (
    <div className ={styles.mainContainer}>
      <div className = {styles.bottle-bar}> progress bar</div>
        <div className = {styles.bottle-bar-fill}> 50%</div>
    </div>
  )
};
