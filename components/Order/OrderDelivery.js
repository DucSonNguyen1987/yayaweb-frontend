// Order/components/OrderDelivery.js
import React from 'react';
import styles from './styles/OrderPayment.module.css';
import { useSelector } from 'react-redux';

function OrderDelivery(props) {
  const user = useSelector((state) => state.user.value);

  return (
    <div className={styles.orderDelivery}>
      <h2>Livraison</h2>
      <h3>Créneau de livraison</h3>
      <p>...</p>
      <h3>Adresse de livraison</h3>
      {user.address && (
        <div className={styles.userDeliveryAddress}>
          <div className={styles.userFirstName}>
            <span className={styles.userLabel}>Prénom</span>
            <span className={styles.userField}>{user.firstName}</span>
          </div>
          <div className={styles.userLastName}>
            <span className={styles.userLabel}>Nom</span>
            <span className={styles.userField}>{user.lastName}</span>
          </div>
          <div className={styles.userStreetNumber}>
            <span className={styles.userLabel}>N°</span>
            <span className={styles.userField}>{user.address[0].streetNumber}</span>
          </div>
          <div className={styles.userStreetName}>
            <span className={styles.userLabel}>Voie (rue, boulevard...)</span>
            <span className={styles.userField}>{user.address[0].streetName}</span>
          </div>
          <div className={styles.userZipCode}>
            <span className={styles.userLabel}>Code Postal</span>
            <span className={styles.userField}>{user.address[0].zipCode}</span>
          </div>
          <div className={styles.userCity}>
            <span className={styles.userLabel}>Ville</span>
            <span className={styles.userField}>{user.address[0].city}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDelivery;
