import React from 'react';
import styles from './DeliveryAddress.module.css';

function DeliveryAddress({ address, onEditAddress }) {
  return (
    <div className={styles.deliveryAddress}>
      <h2>Adresse de livraison</h2>
      <p>{address}</p>
      <button onClick={onEditAddress} className={styles.editAddressButton}>
        Modifier
      </button>
    </div>
  );
}

export default DeliveryAddress;
