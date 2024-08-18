// pages/products/[range].js
import React from 'react';
import { useRouter } from 'next/router';
import ProductVignette from '../../components/ProductVignette';
import styles from '../../styles/ProductsPage.module.css';

function ProductsPage() {
  const router = useRouter();
  const { range } = router.query;

  // Sample products data
  const products = [
    { id: 1, name: 'Super Jus 1', imgSrc: '/icons/logo.png', price: 19.99, description: 'Un jus naturelleemnt dynamisant', range: 'nos-super-jus' },
    { id: 2, name: 'Super Jus 2', imgSrc: '/icons/logo.png', price: 29.99, description: 'Un jus naturelleemnt dynamisant', range: 'nos-super-jus' },
    { id: 3, name: 'Infusion 1', imgSrc: '/icons/logo.png', price: 9.99, description: 'Un jus naturelleemnt dynamisant', range: 'nos-infusions' },
    { id: 4, name: 'Spicy Shot 1', imgSrc: '/icons/logo.png', price: 4.99, description: 'Un jus naturelleemnt dynamisant', range: 'nos-spicy-shots' },
    // Add more products
  ];

  // Filter products based on the selected range
  const filteredProducts = products.filter(product => product.range === range);

  const handleAddToCart = (id) => {
    console.log(`Add product with id ${id} to cart`);
  };

  return (
    <div className={styles.productsPage}>
      <h1>Produits de gamme :  {range.replace(/-/g, ' ')}</h1>
      <div className={styles.productsGrid}>
        {filteredProducts.map(product => (
          <ProductVignette
            key={product.id}
            id={product.id}
            name={product.name}
            imgSrc={product.imgSrc}
            price={product.price}
            description={product.description}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
