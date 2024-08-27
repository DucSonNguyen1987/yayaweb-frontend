import React from 'react';
import styles from '../styles/Concept.module.css';
import Shop from '../components/Shop';


function ShopPage() {
  return (
    <div className={styles.orderPayment}>
      <h1>Les gammes de produits</h1>
      <Shop />
    </div>
  );
}

export default ShopPage;

// // src/pages/ShopPage.js



// import React, { useState, useEffect } from 'react';

// const ShopPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3000/products/categories')
//       .then(response => response.json())
//       .then(data => setCategories(data))
//       .catch(error => console.error('Failed to load categories:', error));
//   }, []);

//   useEffect(() => {
//     if (selectedCategory) {
//       fetch(`http://localhost:3000/products/category/${selectedCategory}`)
//         .then(response => response.json())
//         .then(data => setProducts(data))
//         .catch(error => console.error('Failed to load products:', error));
//     }
//   }, [selectedCategory]);

//   return (
//     <div>
//       <h1>Shop</h1>
//       <div>
//         {categories.map(category => (
//           <button key={category} onClick={() => setSelectedCategory(category)}>
//             {category}
//           </button>
//         ))}
//       </div>
//       <div>
//         {products.map(product => (
//           <div key={product._id}>
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p>Price: {product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopPage;
