// components/OrderSummary.js
import React from 'react';
import styles from './OrderSummary.module.css';

function OrderSummary(props) {
  // Calculate the total price of the order
  const totalPrice = props.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.orderSummary}>
      <h2>Votre commande</h2>
      <ul>
        {props.items.map((item) => (
          <li key={item.id}>
            <span className={styles.productName}>{item.name}</span> -{' '}
            <span className={styles.productQuantity}>
              {item.quantity} x €{item.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.totalPrice}>Totale: €{totalPrice.toFixed(2)}</p>
    </div>
  );
}

export default OrderSummary;

