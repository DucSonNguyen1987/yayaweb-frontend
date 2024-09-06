import React from 'react';
import styles from '../styles/Concept.module.css';
import Shop from '../components/Shop';
import Catalog from "../components/Catalog";

function ShopPage() {
  return (
    <div className={styles.orderPayment}>
      <h1>Les gammes de produits</h1>
      <Shop />
    </div>
  );
}

export default ShopPage;
