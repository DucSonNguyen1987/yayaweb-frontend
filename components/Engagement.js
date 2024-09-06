import React from 'react';
import styles from '../styles/Engagement.module.css';

function Engagement({ title, description }) {
  return (
    <div className={styles.engagementContainer}>
      <p className={styles.engagementTitle}>{title}</p>
      <p className={styles.engagementDescription}>{description}</p>
    </div>
  );
}

export default Engagement;