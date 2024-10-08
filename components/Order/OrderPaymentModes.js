import React, {useEffect,useState} from 'react';
import styles from './styles/OrderPayment.module.css'; 
import Button from '../shared/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcPaypal, faCcStripe } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import api from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
// import { loadStripe} from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { Modal } from 'antd';

const preventDefault = f => e => {
  e.preventDefault()
  f(e)
}

// const stripePromise= loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);


// console.log("stripePromise",stripePromise)


function OrderPaymentModes(props) {
// state ouverture/fermeture modal de message
const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.value);
  const user = useSelector((state) => state.user.value);


useEffect(()=>{
 // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if(query.get('success')){
      console.log('Order placed! You will receive an email confirmation');
    }

    if (query.get('canceled')){
      console.log('Order Canceled -- continue to shop around and checkout when you’re ready. ');
      setOpen(true);
    }

},[])

// fonction ouverture/fermeture modal
const showModal = () => {
  setOpen(!open);
};




  const handlePaymentStripe = async (e) => {
    console.log('handlePaymentStripe', e);

    // fake date, TODO get real date from delivery choices
    const today = new Date();
    const dateParts = cart.deliveryDate.split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
    const deliveryDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    console.log(deliveryDate);

    // add user info to delivery address
    const deliveryAddress = { ...user.address[0] };
    deliveryAddress.civility = user.gender === 'male' ? 'M.' : user.gender === 'female' ? 'Mme' : user.gender;
    deliveryAddress.firstName = user.firstName;
    deliveryAddress.lastName = user.lastName;
    // TODO : add instructions, billing address?

    // construct order data object
    const orderData = {
      items: cart.items,
      customer_email: user.email,
      deliveryDate,
      deliveryTime: cart.deliveryTime,
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
      // requete post vers le backend /create-checkout-session avec en data orderData
      const responseSession = await api.post('/create-checkout-session', { ...orderData, orderId: data.data.orderId });
      const dataSession = responseSession.data.data;
      console.log(dataSession, dataSession.url);
      router.push(dataSession.url);
    } else {
      console.error('Order confirmation failed', data);
    }



  };

  let oopsModalContent = (
    <Modal
    open={open}
    title = "Ooops, il y a eu un problème..."
    onOk={showModal}
    >
      <h4>Le paiement n'a pas abouti... Try again...</h4>
    </Modal>
  )
  console.log('cart.deliveryDate', cart.deliveryDate);
  console.log('cart.deliveryTime', cart.deliveryTime);
  return (
    <div className={styles.orderPaymentProceed}>
      <h2>Paiement</h2>
      <div className={styles.orderPaymentModes}>
        <Button backgroundColor='var(--yaya-third)' color='#FFFF' onClick={handlePaymentStripe} disabled={!cart.deliveryDate || !cart.deliveryTime}>
          <FontAwesomeIcon icon={faCreditCard} /> 
          <p>Stripe</p>
        </Button>
        {oopsModalContent}
      </div>
    </div>
    

  );
}

export default OrderPaymentModes;
