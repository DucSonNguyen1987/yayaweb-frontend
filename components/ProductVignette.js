// components/ProductVignette.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/ProductVignette.module.css';

function ProductVignette(props) {
  return (
    <div className={styles.vignette}>
      <Link href={`/products/${props.id}`}>
        <img src={props.imgSrc} alt={props.name} className={styles.productImage} />
      </Link>
      <h3 className={styles.productName}>{props.name}</h3>
      <p className={styles.productPrice}>{props.price}€</p>
      <button 
        className={styles.addToCartButton} 
        onClick={() => props.onAddToCart(props.id)}
      >
        Ajouter au panier
      </button>
      <Link href={`/products/${props.id}`}>
        <a className={styles.productLink}>Voir le détail</a>
      </Link>
    </div>
  );
}

export default ProductVignette;
