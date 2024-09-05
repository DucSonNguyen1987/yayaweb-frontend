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
  console.log(props.order);
  const order = props.order ? props.order : cart;
  console.log('order summary', order);


  const getProductImageUrlByOption = (item) => {
    const foundImageIndex = item.product.images.findIndex(image => image !== '' && (image.productOptions && image.productOptions.volume && item.product.options.volume.capacity === image.productOptions.volume.capacity));
    return (foundImageIndex !== -1) ? item.product.images[foundImageIndex].url : item.product.images[0].url;
  }

  return (
    <div className={styles.orderSummary}>
      <h2>Récapitulatif de votre commande</h2>
      <div className={styles.orderContent}>
        {order && order.items.map((item, i) => (
          <div className={styles.cartItem} key={i}>
            {item.product.images && (
              <Image 
                src={getProductImageUrlByOption(item)} 
                width='100px' 
                height='100px' 
                alt={item.product.name} 
              />
            )}
            {item.product.image && (
              <Image 
                src={item.product.image} 
                width='100px' 
                height='100px' 
                alt={item.product.name} 
              />
            )}
            {!item.product.images && item.product.category === 'MYJUICE' && (
              <div className={styles.itemMyJuice}>
                <Image 
                  src={'/icons/logo.png'} 
                  width='40px' 
                  height='40px' 
                  alt={item.product.name} 
                />
                <span>MyJuice</span>
              </div>
            )}
            <div className={styles.itemDetails}>
              <span className={styles.itemName}>{item.product.name}</span>
              <span className={styles.itemOptions}>{item.product.options.volume.capacity}</span>
            </div>
            <div className={styles.itemQuantity}>
              <span>&times; {item.quantity}</span>
            </div>
            {!order.orderDate && <FontAwesomeIcon 
              className={styles.itemIcons} 
              icon={faTrashCan} 
              onClick={() => dispatch(removeFromCart(item.product))} 
            />}
            <span className={styles.itemPrice}>
              {((item.product.price * item.product.options.volume.priceMultiplier) * item.quantity).toFixed(2)}€
            </span>
          </div>
        ))}
      </div>
      <div className={styles.orderTotal}>
        <div className={styles.orderTotalLabel}>Total</div>
        <div className={styles.orderTotalPrice}>
          {order && order.total.toFixed(2)}€
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
