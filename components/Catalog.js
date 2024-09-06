// components/Catalog.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Catalog.module.css';
import Button from "./shared/Button";
import { useRouter } from 'next/router';

function Catalog() {
  const router = useRouter();
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
        <div key={index} className={styles.range} onClick={() => router.push(`/products/${category.toLowerCase().replace(/\s+/g, '-')}`)}>
          <h2>{category}</h2>
          <div className={styles.cadre}>
            <img className={styles.image} src={`/Bottles/${category}.png`} alt={category} />
          </div>
          <Button
            className={styles.viewProductsButton} 
            onClick={() => router.push(`/products/${category.toLowerCase().replace(/\s+/g, '-')}`)}
            fontSize={'14px'}
          >Voir les produits</Button>
          {/* <Link href={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`}>
            <button className={styles.viewProductsButton}>Voir les produits</button>
          </Link> */}
        </div>
      ))}
    </div>
  );
}

export default Catalog;




// // components/Catalog.js
// import React from 'react';
// import Link from 'next/link';
// import styles from '../styles/Catalog.module.css';

// function Catalog() {
//   return (
//     <div className={styles.catalog}>
//       <div className={styles.range}>
//         <h2>Nos Super Jus</h2>
//         <img src="/icons/logo.png" alt="Nos Super Jus" />
//         <Link href="/products/nos-super-jus">
//           <button className={styles.viewProductsButton}>Voir les produits</button>
//         </Link>
//       </div>

//       <div className={styles.range}>
//         <h2>Nos Infusions</h2>
//         <img src="/icons/logo.png" alt="Nos Infusions" />
//         <Link href="/products/nos-infusions">
//           <button className={styles.viewProductsButton}>Voir les produits</button>
//         </Link>
//       </div>

//       <div className={styles.range}>
//         <h2>Nos Spicy Shots</h2>
//         <img src="/icons/logo.png" alt="Nos Spicy Shots" />
//         <Link href="/products/nos-spicy-shots">
//           <button className={styles.viewProductsButton}>Voir les produits</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Catalog;


