import React from 'react';
import styles from './styles/OrderPayment.module.css'; 
import Button from '../shared/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcPaypal, faCcStripe, faCreditCard } from '@fortawesome/free-brands-svg-icons';

function OrderPaymentModes(props) {
  const handlePaymentCreditCard = () => {
    console.log('handlePaymentCreditCard');
  };
  
  const handlePaymentStripe = () => {
    console.log('handlePaymentStripe');
  };
  
  const handlePaymentPayPal = () => {
    console.log('handlePaymentPayPal');
  };

  return (
    <div className={styles.orderPaymentProceed}>
      <h2>Paiement</h2>
      <div className={styles.orderPaymentModes}>
        <Button backgroundColor='var(--yaya-third)' color='#FFF' onClick={handlePaymentCreditCard}>
          <FontAwesomeIcon icon={faCreditCard} /> Carte Bleue
        </Button>
        <Button backgroundColor='var(--yaya-third)' color='#FFF' onClick={handlePaymentStripe}>
          <FontAwesomeIcon icon={faCcStripe} /> Stripe
        </Button>
        <Button backgroundColor='var(--yaya-third)' color='#FFF' onClick={handlePaymentPayPal}>
          <FontAwesomeIcon icon={faCcPaypal} /> Paypal
        </Button>
      </div>
    </div>
  );
}

export default OrderPaymentModes;
