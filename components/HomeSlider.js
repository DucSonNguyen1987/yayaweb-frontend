import React from 'react';
import styles from '../styles/HomeSlider.module.css'; // Create this CSS module file

const HomeSection = () => {
    return (
        <section className={styles.homeSection}>
            <div className={styles.overlay}></div>
            <div className={styles.contentContainer}>
                <img src="YAYA_logo_white.png" alt="YAYA SPICY JUICE" className={styles.logo} />
                <p className={styles.subtitle}>[SPICY JUICE]</p>
                
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <img src="/images/snowflake.png" alt="Cold Pressed" className={styles.icon} />
                        <p>Des jus pressés à froid</p>
                    </div>
                    <div className={styles.feature}>
                        <img src="/images/fire.png" alt="Spicy" className={styles.icon} />
                        <p>Épicés</p>
                    </div>
                    <div className={styles.feature}>
                        <img src="/images/lightning.png" alt="Untreated" className={styles.icon} />
                        <p>Non traités</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeSection;
