
// pages/products/[category].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductVignette from '../../components/ProductVignette';
import styles from '../../styles/ProductsPage.module.css';

function CategoryProductsPage() {
  const router = useRouter();
  const { category } = router.query;
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Converts URL slugs to display format
  const formatCategory = (cat) => {
    return cat.split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
  };

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        setAllProducts(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allProducts.length > 0 && category) {
      const formattedCategory = formatCategory(category);
      const filtered = allProducts.filter(prod => prod.category === formattedCategory);
      setFilteredProducts(filtered);
    }
  }, [category, allProducts]);

  const handleAddToCart = (id) => {
    console.log(`Adding product ${id} to cart`);
    // Further implementation needed here
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!filteredProducts.length) {
    return <p>No products found in this category.</p>;
  }

  return (
    <div className={styles.productsPage}>
      <h1>Products in: {formatCategory(category)}</h1>
      <div className={styles.productsGrid}>
        {filteredProducts.map(product => (
          <ProductVignette
            key={product._id}
            {...product}
            imgSrc={product.images[0]?.url || '/no-image.png'}
            // price={product.price}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryProductsPage;

// // pages/products/[category].js
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import ProductVignette from '../../components/ProductVignette';
// import styles from '../../styles/ProductsPage.module.css';

// function CategoryProductsPage() {
//   const router = useRouter();
//   const { category } = router.query;
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Function to format category string from URL to match database format
//   const formatCategory = (cat) => {
//     return cat.split('-')
//               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//               .join(' ');
//   };

//   useEffect(() => {
//     // Fetch all products when the component mounts
//     fetch('http://localhost:3000/products')  // Adjust URL as needed
//       .then(response => response.json())
//       .then(data => {
//         setAllProducts(data);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//         setIsLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     // Filter products based on the formatted category when products or category changes
//     if (allProducts.length > 0 && category) {
//       const formattedCategory = formatCategory(category);
//       const filtered = allProducts.filter(prod => prod.category === formattedCategory);
//       setFilteredProducts(filtered);
//     }
//   }, [category, allProducts]);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (!filteredProducts.length) {
//     return <p>No products found in this category.</p>;
//   }

//   return (
//     <div className={styles.productsPage}>
//       <h1>Products in: {formatCategory(category)}</h1>
//       <div className={styles.productsGrid}>
//         {filteredProducts.map(product => (
//           <ProductVignette key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CategoryProductsPage;
