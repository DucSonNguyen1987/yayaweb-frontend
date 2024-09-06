// components/Catalog.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Catalog.module.css';

function Shop() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Assuming you have an endpoint to fetch category data
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Failed to load categories", error));
  }, []);

  return (
    <div className={styles.catalog}>
      {categories.map((category, index) => (
        <div key={index} className={styles.range}>
          <h2>{category}</h2>
          <div className={styles.cadre}>
          <img className={styles.image} src={`/Bottles/${category}.png`} alt={category} />
          </div>
          <Link href={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`}>
            <button className={styles.viewProductsButton}>Voir les produits</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Shop;
