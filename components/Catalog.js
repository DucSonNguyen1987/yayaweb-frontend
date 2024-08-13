// components/Catalog.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Catalog.module.css';

function Catalog() {
  return (
    <div className={styles.catalog}>
      <div className={styles.range}>
        <h2>Nos Super Jus</h2>
        <img src="/icons/logo.png" alt="Nos Super Jus" />
        <Link href="/products/nos-super-jus">
          <button className={styles.viewProductsButton}>Voir les produits</button>
        </Link>
      </div>

      <div className={styles.range}>
        <h2>Nos Infusions</h2>
        <img src="/icons/logo.png" alt="Nos Infusions" />
        <Link href="/products/nos-infusions">
          <button className={styles.viewProductsButton}>Voir les produits</button>
        </Link>
      </div>

      <div className={styles.range}>
        <h2>Nos Spicy Shots</h2>
        <img src="/icons/logo.png" alt="Nos Spicy Shots" />
        <Link href="/products/nos-spicy-shots">
          <button className={styles.viewProductsButton}>Voir les produits</button>
        </Link>
      </div>
    </div>
  );
}

export default Catalog;


