// components/Product.js
import React from 'react';
import styles from '../styles/Product.module.css';

function Product(props) {
  return (
    <div className={styles.product}>
      <img src={props.imgSrc} alt={props.name} className={styles.productImage} />
      <h3 className={styles.productName}>{props.name}</h3>
      <p className={styles.productDescription}>{props.description}</p>
      <div className={styles.productFooter}>
        <span className={styles.productPrice}>${props.price}</span>
        <button 
          className={styles.addToCartButton}
          onClick={() => props.onAddToCart(props.id)}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

export default Product;
