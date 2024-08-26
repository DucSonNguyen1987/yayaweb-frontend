import React from 'react';
import styles from './styles/OrderPayment.module.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../reducers/cart';
import Image from 'next/image';

function OrderSummary(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);

  return (
    <div className={styles.orderSummary}>
      <h2>Récapitulatif de votre commande</h2>
      <div className={styles.orderContent}>
        {cart && cart.items.map((item, i) => (
          <div className={styles.cartItem} key={i}>
            {item.images && (
              <Image 
                src={item.images[0]} 
                layout="fill" 
                objectFit='contain' 
                objectPosition='center' 
                alt={item.product.name} 
              />
            )}
            <div className={styles.itemDetails}>
              <span className={styles.itemName}>{item.product.name}</span>
              <span className={styles.itemOptions}>{item.product.options.volume.capacity}</span>
            </div>
            <div className={styles.itemQuantity}>
              <span>&times; {item.quantity}</span>
            </div>
            <FontAwesomeIcon 
              className={styles.itemIcons} 
              icon={faTrashCan} 
              onClick={() => dispatch(removeFromCart(item.product))} 
            />
            <span className={styles.itemPrice}>
              {(item.product.price + item.product.options.volume.price) * item.quantity}€
            </span>
          </div>
        ))}
      </div>
      <div className={styles.orderTotal}>
        <div className={styles.orderTotalLabel}>Total</div>
        <div className={styles.orderTotalPrice}>
          {cart && cart.total}€
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
