// components/Product.js
import React, { useEffect, useState } from 'react';
import styles from '../styles/Product.module.css';
import Button from './shared/Button';
import { addToCart } from '../reducers/cart';
import { useDispatch } from 'react-redux';
 
function Product(props) {
  console.log(props);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  


  // fetch product data from backend when component mounts
  useEffect(() => {
    fetch('http://localhost:3000/products/product-info/'+productId)
      .then(response => response.json())
      .then(data => {
        if(data.result) {
          setProduct(data.product);
        } 
        setIsLoading(false);
      });
  }, [props]);

  const productId = props.id;
  console.log(productId);

  // sample data
  // const products = [
  //   {
  //     productId: 'beast-mode',
  //     name: 'Beast Mode',
  //     category: 'Super Jus',
  //     volume: '250ml',
  //     bottle: 'Verre',
  //     description: 'Réveillez la bête qui est en vous !!',
  //     price: 6,
  //     composition: [
  //       { name: 'Carotte', percentage: 40 },
  //       { name: 'Ananas', percentage: 30 },
  //       { name: 'Pomme', percentage: 20 },
  //       { name: 'Citron', percentage: 5 },
  //       { name: 'Gingembre', percentage: 2 },
  //       { name: 'Curcuma', percentage: 1 },
  //       { name: 'Piment', percentage: 1 },
  //       { name: 'Poivre', percentage: 1 }
  //     ],
  //     images: [
  //       'Bottles/BeastMode250.png',
  //       'Bottles/_DSC1873.png',
  //       'Bottles/Panier Fruits_DSC9384.jpg',
  //     ], 
  //     nutritionalInfo: []
  //   }
  // ];
  // const product = products.find(product => product.productId === props.id);
  // console.log('product', product);
          

  
  const addProductToCart = (id) => {
    console.log('addProductToCart', id);
    dispatch(addToCart({product, quantity: 1}));
  };

  // display loading (while retrieving product info)
  if(isLoading || !props) {
    return <div className={styles.loading}></div>;
  }

  if(!product) {
    // return <div>Product not found {productId}</div>
    return null;
  }

  return (
    <div className={styles.product}>
      {productId}
      <img src={props.imgSrc} alt={props.name} className={styles.productImage} />
      <h3 className={styles.productName}>{product.name}</h3>
      <p className={styles.productDescription}>{product.description}</p>
      <div className={styles.productFooter}>
        <span className={styles.productPrice}>{product.price} €</span>
        <Button onClick={() => addProductToCart(props.id)}>Ajouter au panier</Button>
      </div>
    </div>
  );
}

export default Product;
