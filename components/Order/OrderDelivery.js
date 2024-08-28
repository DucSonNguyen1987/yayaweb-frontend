import React from 'react';
import styles from './styles/OrderPayment.module.css'; 
import { useSelector } from 'react-redux';

function OrderDelivery(props) {
  const user = useSelector((state) => state.user.value);

  console.log(props.order);
  const deliveryAddress = props.order ? props.order.deliveryAddress : {
    civility: user.gender === 'male' ? 'M.' : user.gender === 'female' ? 'Mme' : user.gender,
    firstName: user.firstName,
    lastName: user.lastName,
    streetNumber: user.address[0].streetNumber,
    streetName: user.address[0].streetName,
    zipCode: user.address[0].zipCode,
    city: user.address[0].city,
  };

  return (
    <div className={styles.orderDelivery}>
      <h2>Livraison</h2>
      <h3>Créneau de livraison</h3>
      <p>...</p>
      <h3>Adresse de livraison</h3>
      {deliveryAddress && (
        <div className={styles.userDeliveryAddress}>
          <div className={styles.userCivility}>
            <span className={styles.userLabel}>Civilité</span>
            <span className={styles.userField}>{deliveryAddress.civility}</span>
          </div>
          <div className={styles.userFirstName}>
            <span className={styles.userLabel}>Prénom</span>
            <span className={styles.userField}>{deliveryAddress.firstName}</span>
          </div>
          <div className={styles.userLastName}>
            <span className={styles.userLabel}>Nom</span>
            <span className={styles.userField}>{deliveryAddress.lastName}</span>
          </div>
          <div className={styles.userStreetNumber}>
            <span className={styles.userLabel}>N°</span>
            <span className={styles.userField}>{deliveryAddress.streetNumber}</span>
          </div>
          <div className={styles.userStreetName}>
            <span className={styles.userLabel}>Voie (rue, boulevard...)</span>
            <span className={styles.userField}>{deliveryAddress.streetName}</span>
          </div>
          <div className={styles.userZipCode}>
            <span className={styles.userLabel}>Code Postal</span>
            <span className={styles.userField}>{deliveryAddress.zipCode}</span>
          </div>
          <div className={styles.userCity}>
            <span className={styles.userLabel}>Ville</span>
            <span className={styles.userField}>{deliveryAddress.city}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDelivery;
