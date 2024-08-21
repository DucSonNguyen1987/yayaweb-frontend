import React from 'react';
import styles from '../styles/OrderPayment.module.css';
import OrderSummary from '../components/Order/OrderSummary';
import OrderDelivery from '../components/Order/OrderDelivery';
import OrderPaymentModes from '../components/Order/OrderPaymentModes';

function orderValidation() {
  return (
    <div className={styles.orderPayment}>
      <h1>Finalisation de votre commande</h1>
      <OrderSummary />
      <OrderDelivery />
      <OrderPaymentModes />
    </div>
  );
}

export default orderValidation;
