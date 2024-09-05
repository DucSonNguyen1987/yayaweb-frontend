import React, { useState } from 'react';
import styles from './styles/OrderPayment.module.css'; 
import { useSelector } from 'react-redux';
import DeliverySchedule from './DeliverySchedule';

function OrderDelivery(props) {
  const user = useSelector((state) => state.user.value);

  // States Sign Up
  const [gender, setGender] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setfirstName] = useState("");
  
  // State pour lister les erreurs dans le form
  const [errors, setErrors] = useState([]);

  console.log(props.order);
  const deliveryAddress = props.order ? props.order.deliveryAddress : user.accessToken ? {
    civility: user.gender === 'male' ? 'M.' : user.gender === 'female' ? 'Mme' : user.gender,
    firstName: user.firstName,
    lastName: user.lastName,
    streetNumber: user.address[0].streetNumber,
    streetName: user.address[0].streetName,
    zipCode: user.address[0].zipCode,
    city: user.address[0].city,
  } : null;

  return (
    <div className={styles.orderDelivery}>
      <h2>Livraison</h2>
      <div className={props.order && props.order.orderDate && styles.orderDeliveryDetails}>

      <DeliverySchedule order={ props.order || null }/>
      <h3>Adresse de livraison</h3>
      {props.order && props.order.orderDate &&
        <div className={styles.orderDeliveryAddress}>
          <span className={styles.userField}>{deliveryAddress.civility}</span> <span className={styles.userField}>{deliveryAddress.firstName}</span> <span className={styles.userField}>{deliveryAddress.lastName}</span><br />
          <span className={styles.userField}>{deliveryAddress.streetNumber}</span> <span className={styles.userField}>{deliveryAddress.streetName}</span><br />
          <span className={styles.userField}>{deliveryAddress.zipCode}</span> <span className={styles.userField}>{deliveryAddress.city}</span>
        </div>
      }
      </div>
      {!props.order && deliveryAddress && (
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
      {!props.order && !deliveryAddress && (
        <div className={styles.userDeliveryAddress}>
          <div className={styles.userCivility}>
            <span className={styles.userLabel}>Civilité</span>
              <select
                className={styles.select}
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Civilité</option>
                <option value="male">Monsieur</option>
                <option value="female">Madame</option>
                <option value="other">Autre</option>
              </select>
          </div>
          <div className={styles.userFirstName}>
            <span className={styles.userLabel}>Prénom</span>
            
            {/* <span className={styles.userField}>{deliveryAddress.firstName}</span> */}
          </div>
          <div className={styles.userLastName}>
            <span className={styles.userLabel}>Nom</span><div>
              <input
                className={styles.Input}
                type="text"
                required
                name="lastName"
                value={lastName}
                placeholder="Nom"
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.firstName && (
                <div className={styles.error}>{errors.firstName}</div>
              )}
            </div>
            {/* <span className={styles.userField}>{deliveryAddress.lastName}</span> */}
          </div>
          <div className={styles.userStreetNumber}>
            <span className={styles.userLabel}>N°</span>
            {/* <span className={styles.userField}>{deliveryAddress.streetNumber}</span> */}
          </div>
          <div className={styles.userStreetName}>
            <span className={styles.userLabel}>Voie (rue, boulevard...)</span>
            {/* <span className={styles.userField}>{deliveryAddress.streetName}</span> */}
          </div>
          <div className={styles.userZipCode}>
            <span className={styles.userLabel}>Code Postal</span>
            {/* <span className={styles.userField}>{deliveryAddress.zipCode}</span> */}
          </div>
          <div className={styles.userCity}>
            <span className={styles.userLabel}>Ville</span>
            {/* <span className={styles.userField}>{deliveryAddress.city}</span> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDelivery;
