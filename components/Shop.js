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
          <img src="/icons/logo.png" alt={category} />
          <Link href={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`}>
            <button className={styles.viewProductsButton}>Voir les produits</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Shop;




// import React, { useState, useEffect } from 'react';

// const ShopPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories`)
//       .then(response => response.json())
//       .then(data => {
//         setCategories(data);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedCategory) {
//       fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/category/${selectedCategory}`)
//         .then(response => response.json())
//         .then(data => {
//           setProducts(data);
//         })
//         .catch(error => {
//           console.error('Error fetching products:', error);
//         });
//     }
//   }, [selectedCategory]);

//   return (
//     <div>
//       <h1>Shop</h1>
//       <div>
//         {categories.map((category, index) => (
//           <button key={index} onClick={() => setSelectedCategory(category)}>
//             {category}
//           </button>
//         ))}
//       </div>
//       <div>
//         {products.map((product, index) => (
//           <div key={index}>
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopPage;
