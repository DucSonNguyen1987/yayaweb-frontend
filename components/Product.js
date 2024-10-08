// components/Product.js
import React, { useEffect, useState } from "react";
import styles from "../styles/Product.module.css";
import Button from "./shared/Button";
import Image from "next/image";
import { addToCart } from "../reducers/cart";
import { useDispatch } from "react-redux";
import { Flex, Radio, InputNumber, Carousel } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Banner from "./shared/Banner";
import { useRouter } from "next/router";

function Product(props) {
  const router = useRouter();
  console.log(props);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [volume, setVolume] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // fetch product data from backend when component mounts
  useEffect(() => {
    if (productId) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/product-info/` +
          productId
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setProduct(data.product);
            setVolume(data.product.volumes[0]);
          }
          setIsLoading(false);
        });
    }
  }, [props]);

  const productId = props.id;
  console.log(productId);

  const onChangeVolume = (e) => {
    console.log(`radio checked:${e.target.value}`, e.target.value.capacity);
    setVolume(e.target.value);
  };

  const onChangeQuantity = (value) => {
    setQuantity(value);
  };

  const addProductToCart = (id) => {
    console.log("addProductToCart", id);
    const options = { volume };
    dispatch(addToCart({ product: { ...product, options }, quantity }));
  };

  // display loading (while retrieving product info)
  if (isLoading || !props) {
    return <div className={styles.loading}></div>;
  }

  if (!product) {
    // return <div>Product not found {productId}</div>
    return null;
  }

  console.log("product", product);

  const productImages = product.images.filter(
    (image, i) =>
      (image !== "" && !image.productOptions) ||
      (image.productOptions &&
        image.productOptions.volume &&
        volume.capacity === image.productOptions.volume.capacity)
  );
  console.log("productImages", productImages);

  const productBenefits = [];
  product.composition.forEach((element, i) => {
    const ingredientBenefits = element.ingredient
      ? element.ingredient?.benefits
      : null;
    if (ingredientBenefits) {
      // console.log(ingredientBenefits);
      ingredientBenefits.forEach((ingredientBenefit, j) => {
        const foundBenefit = productBenefits.findIndex(
          (productBenefit, i) => productBenefit.benefit === ingredientBenefit
        );
        if (foundBenefit !== -1) {
          productBenefits[foundBenefit].weight += element.percentage;
        } else {
          productBenefits.push({
            benefit: ingredientBenefit,
            weight: element.percentage,
          });
        }
      });
    }
  });
  // sort benefits by weight
  productBenefits.sort((a, b) => (a.weight < b.weight ? 1 : -1));
  console.log(productBenefits);

  return (
    <div className={styles.productPage}>
      <div className={styles.productContainer}>
        <div className={styles.Carousel}>
          <div className={styles.images}>
            {productImages.length > 0 && (
              <Carousel
                className={styles.caroussel}
                arrows
                infinite={false}
                draggable={true}
              >
                {productImages.map((image, i) => (
                  <div
                    className={styles.productImage}
                    key={"productImage-" + i}
                  >
                    <Image
                      src={image.url}
                      key={i}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center"
                      priority={true}
                    />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </div>

        <div className={styles.productDetails}>
          <h1 className={styles.productName}>{product.name}</h1>
          <div className={styles.productDescription}>{product.description}</div>
          <div className={styles.productIngredients}>
            Ingrédients :{" "}
            {product.composition
              .sort(({ percentage: a }, { percentage: b }) => b - a)
              .map((ingredient) => ingredient.name)
              .join(", ")}
            .
          </div>
          <div className={styles.productNutritionInfo}>
            <span className={styles.productBenefitsTitle}>
              Bienfaits nutritionnels
            </span>
            <p className={styles.productBenefits}>
              {productBenefits.map((productBenefit, i) => (
                <span
                  className={styles.productBenefitsTitle}
                  key={i}
                  style={{
                    fontSize:
                      productBenefits.length - i < 11
                        ? 11
                        : productBenefits.length - i,
                  }}
                >
                  {productBenefit.benefit}
                </span>
              ))}
            </p>
          </div>
          <div className={styles.productVolume}>
            <span>Volume</span>
            <Flex vertical gap="middle">
              <Radio.Group
                onChange={onChangeVolume}
                defaultValue={product.volumes[0]}
              >
                {product.volumes.map((volume, i) => (
                  <Radio.Button value={volume} key={i}>
                    {volume.capacity}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Flex>
          </div>
          <div className={styles.productQuantity}>
            <span>Quantité</span>
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              onChange={onChangeQuantity}
            />
          </div>
          <div className={styles.productPrice}>
            {product.price * volume.priceMultiplier * quantity} €
          </div>
          <Button
            className={styles.productButton}
            onClick={() => addProductToCart(props.id)}
            fontSize={"20px"}
            minWidth={"250px"}
          >
            Ajouter au panier
          </Button>
        </div>

        
      </div>
      <Banner color={'white'}>
          <h2 className={styles.bannerTitle}>Vous ne trouvez pas votre bonheur ?<br /><br />Avec MYJUICE</h2>
          <Button 
            backgroundColor={'white'} 
            color={'var(--yaya-prime)'} 
            minWidth={'250px'} 
            fontSize={'20px'}
            onClick={() => router.push('/myjuice')}
          >Créer votre jus</Button>
        </Banner>
    </div>
  );
}

export default Product;
