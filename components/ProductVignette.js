// components/ProductVignette.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/ProductVignette.module.css';
import { useRouter } from 'next/router';

function ProductVignette(props) {
const router = useRouter();

  return (
    <div className={styles.vignette}>
      <Link href={`/product/${props.productId}`}>
        <img src={props.imgSrc} alt={props.name} className={styles.productImage} />
      </Link>
      <h3 className={styles.productName}>{props.name}</h3>
      <p className={styles.productPrice}>à partir de {props.price}€</p>
      <button 
        className={styles.addToCartButton} 
        onClick={() => router.push(`/product/${props.productId}`)}
      >
       Voir le produit
      </button>
    </div>
  );
}

export default ProductVignette;
