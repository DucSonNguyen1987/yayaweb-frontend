// components/ProductVignette.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/ProductVignette.module.css';
import { useRouter } from 'next/router';
import Button from "./shared/Button";


function ProductVignette(props) {
  const router = useRouter();

  return (
    <div className={styles.vignette} onClick={() => router.push(`/product/${props.productId}`)}>
      {/* <Link href={`/product/${props.productId}`}> */}
        <img src={props.imgSrc} alt={props.name} className={styles.productImage} />
      {/* </Link> */}
      <h3 className={styles.productName}>{props.name}</h3>
      <p className={styles.productPrice}>à partir de {props.price}€</p>
      <Button 
        className={styles.addToCartButton} 
        onClick={() => router.push(`/product/${props.productId}`)}
        fontSize={'14px'}
      >
       Voir le produit
      </Button>
    </div>
  );
}

export default ProductVignette;
