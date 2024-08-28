import React from 'react';
import styles from './styles/OrderPayment.module.css'; 
import Button from '../shared/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcPaypal, faCcStripe } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import api from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';


function OrderPaymentModes(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const user = useSelector((state) => state.user.value);

  const handlePaymentCreditCard = async () => {
    console.log('handlePaymentCreditCard');

    // fake date, TODO get real date from delivery choices
    const today = new Date();
    const twoDaysAfter = new Date(today.setDate(today.getDate() + 2));
    console.log(twoDaysAfter);

    // add user info to delivery address
    const deliveryAddress = user.address[0];
    deliveryAddress.civility = user.gender === 'male' ? 'M.' : user.gender === 'female' ? 'Mme' : user.gender;
    deliveryAddress.firstName = user.firstName;
    deliveryAddress.lastName = user.lastName;
    // TODO : add instructions, billing address?

    // construct order data object
    const orderData = {
      items: cart.items,
      deliveryDate: twoDaysAfter,
      deliveryAddress,
      total: cart.total,
    };
    // send post request to backend
    const response = await api.post('/order-confirm', {
      method: 'post',
      data: orderData,
    });
    const data = response.data;
    console.log('/order-confirm data', data);
    if(data.result) {
      console.log('Order confirmed', data.data);
    } else {
      console.error('Order confirmation failed', data);
    }

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
