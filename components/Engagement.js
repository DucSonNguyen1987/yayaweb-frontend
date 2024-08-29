import React from 'react';
import styles from '../styles/Engagement.module.css';

function Engagement({ title, description }) {
  return (
    <div className={styles.engagementContainer}>
      <h2 className={styles.engagementTitle}>{title}</h2>
      <p className={styles.engagementDescription}>{description}</p>
    </div>
  );
}

export default Engagement;