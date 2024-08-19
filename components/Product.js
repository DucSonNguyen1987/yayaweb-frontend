// components/Product.js
import React, { useEffect, useState } from 'react';
import styles from '../styles/Product.module.css';
import Button from './shared/Button';
import Image from 'next/image';
import { addToCart } from '../reducers/cart';
import { useDispatch } from 'react-redux';
import { Flex, Radio, InputNumber, Carousel } from 'antd';


 
function Product(props) {
  console.log(props);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [volume, setVolume] = useState(null);
  const [quantity, setQuantity] = useState(1);
  


  // fetch product data from backend when component mounts
  useEffect(() => {
    fetch('http://localhost:3000/products/product-info/'+productId)
      .then(response => response.json())
      .then(data => {
        if(data.result) {
          setProduct(data.product);
          setVolume(data.product.volumes[0]);
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
          
  const onChangeVolume = (e) => {
    console.log(`radio checked:${e.target.value}`);
    setVolume(e.target.value);
  };

  const onChangeQuantity = (value) => {
    setQuantity(value);
  };
  
  const addProductToCart = (id) => {
    console.log('addProductToCart', id);
    const options = { volume };
    dispatch(addToCart({product: {...product, options}, quantity}));
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
    <div className={styles.productContainer}>
      <div className={styles.images}>
        <Carousel arrows infinite={false} draggable={true}>
          {product.images.map((image, i) => (
              <div className={styles.productImage}>
                <Image src={image} key={i} layout="fill" objectFit='contain' objectPosition='center' />
              </div>
            )
          )}
        </Carousel>
      </div>
      <div className={styles.productDetails}>
        <h1 className={styles.productName}>{product.name}</h1>
        <div className={styles.productDescription}>{product.description}</div>
        <div className={styles.productIngredients}>Ingrédients : {product.composition.sort(({amount:a}, {amount:b}) => b-a).map(ingredient => ingredient.name).join(', ')}.</div>
        <div className={styles.productNutritionInfo}>Bienfaits nutritionnels : ...</div>
        <div className={styles.productVolume}>
          <span>Volume</span>
          <Flex vertical gap="middle">
            <Radio.Group onChange={onChangeVolume} defaultValue={product.volumes[0]}>
            {product.volumes.map((volume,i) => <Radio.Button value={volume}>{volume.capacity}</Radio.Button>)}
            </Radio.Group>
          </Flex>
        </div>
        <div className={styles.productQuantity}>
          <span>Quantité</span>
          <InputNumber min={1} max={10} defaultValue={1} onChange={onChangeQuantity} />
        </div>
        <div className={styles.productPrice}>{(product.price + volume.price) * quantity} €</div>
        <Button onClick={() => addProductToCart(props.id)}>Ajouter au panier</Button>
      </div>
    </div>
  );
}

export default Product;
