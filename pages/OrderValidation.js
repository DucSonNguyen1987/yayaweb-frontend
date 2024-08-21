
import { useEffect, useState } from 'react';
import OrderSummary from '../components/OrderSummary';
import DeliveryAddress from '../components/DeliveryAddress';
import DeliverySchedule from '../components/DeliverySchedule';
import styles from '../styles/ValidationPage.module.css';

function OrderValidation() {
  const [address, setAddress] = useState('');
  const [items, setItems] = useState([
    { id: 1, name: 'Produit 1', quantity: 2, price: 19.99 },
    { id: 2, name: 'Produit 2', quantity: 1, price: 9.99 },
  ]);

  useEffect(() => {
    const userId = 'user-id';

    fetch(`/api/user/${userId}/address`)
      .then(response => response.json())
      .then(data => {
        if (data.address) {
          setAddress(data.address);
        }
      })
      .catch(error => {
        console.error('Error fetching address:', error);
      });
  }, []);

  const handleEditAddress = () => {
    console.log('Edit address clicked');
  };

  const handlePlaceOrder = () => {
    console.log('Order placed');
  };

  return (
    <div className={styles.validationPage}>
      <OrderSummary items={items} />
      <DeliveryAddress address={address} onEditAddress={handleEditAddress} />
      <DeliverySchedule />
      <button onClick={handlePlaceOrder} className={styles.placeOrderButton}>
        Confirmer la commande
      </button>
    </div>
  );
}

export default OrderValidation;
