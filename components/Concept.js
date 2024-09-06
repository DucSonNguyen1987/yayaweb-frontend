// components/Concept.js
import React from "react";
import styles from "../styles/Concept.module.css";

function Concept(props) {
  return (
    
      

      <div
        className={`${styles.concept} ${props.reverse ? styles.reverse : ""}`}
      >
        <img
          src={props.imgSrc}
          alt={props.title}
          className={styles.conceptImage}
        />
        <div className={styles.conceptDetails}>
          <h2 className={styles.conceptTitle}>{props.title}</h2>
          <p className={styles.conceptDescription}>{props.description}</p>
        </div>
      </div> 
  
  );
}

export default Concept;
