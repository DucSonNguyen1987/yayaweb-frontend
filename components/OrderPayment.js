
import { useEffect, useState } from 'react';
import styles from './Order/styles/OrderPayment.module.css';
import Button from './shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcPaypal, faCcStripe } from '@fortawesome/free-brands-svg-icons';

import {
  faCreditCard,
  faCartShopping,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";

const OrderPayment = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const cart = useSelector((state) => state.cart.value);
    // console.log(user);
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
        <div className={styles.orderPayment}>
            <h1>Finalisation de votre commande</h1>
            <div className={styles.orderSummary}>
                <h2>Récapitulatif de votre commande</h2>
                <div className={styles.orderContent}>
                    {cart && cart.items.map((item, i) => {
                            return (
                            <div className={styles.cartItem} key={i}>
                                {item.images && <Image src={item.images[0]} layout="fill" objectFit='contain' objectPosition='center' />}
                                <div className={styles.itemDetails}>
                                    <span className={styles.itemName}>{item.product.name}</span>
                                    <span className={styles.itemOptions}>{item.product.options.volume.capacity}</span>
                                </div>
                                <div className={styles.itemQuantity}>
                                    <span>&times; {item.quantity}</span>
                                </div>
                                <FontAwesomeIcon className={styles.itemIcons} icon={faTrashCan} onClick={() => dispatch(removeFromCart(item.product))}/>
                                <span className={styles.itemPrice}>{(item.product.price+item.product.options.volume.price)*item.quantity}€</span>
                            </div>
                            );
                    })}
                </div>
                <div className={styles.orderTotal}>
                    <div className={styles.orderTotalLabel}>Total</div>
                    <div className={styles.orderTotalPrice}>
                        {cart && cart.total}€
                    </div>
                </div>
            </div>
            <div className={styles.orderDelivery}>
                <h2>Livraison</h2>
                <h3>Créneau de livraison</h3>
                <p>...</p>
                <h3>Adresse de livraison</h3>
                {user.address && (
                        <div className={styles.userDeliveryAdresss}>
                            <div className={styles.userFirstName}>
                                <span className={styles.userLabel}>Prénom</span>
                                <span className={styles.userField}>{user.firstName}</span>
                            </div>
                            <div className={styles.userLastName}>
                                <span className={styles.userLabel}>Nom</span>
                                <span className={styles.userField}>{user.lastName}</span>
                            </div>
                            <div className={styles.userStreetNumber}>
                                <span className={styles.userLabel}>N°</span>
                                <span className={styles.userField}>{user.address[0].streetNumber}</span>
                            </div>
                            <div className={styles.userStreetName}>
                                <span className={styles.userLabel}>Voie (rue, boulevard...)</span>
                                <span className={styles.userField}>{user.address[0].streetName}</span>
                            </div>
                            <div className={styles.userZipCode}>
                                <span className={styles.userLabel}>Code Postal</span>
                                <span className={styles.userField}>{user.address[0].zipCode}</span>
                            </div>
                            <div className={styles.userCity}>
                                <span className={styles.userLabel}>Ville</span>
                                <span className={styles.userField}>{user.address[0].city}</span>
                            </div>
                        </div>
                )}
            </div>
            <div className={styles.orderPaymentProceed}>
                <h2>Paiement</h2>
                <div className={styles.orderPaymentModes}>
                    <Button backgroundColor='var(--yaya-third)' color='#FFF' onClick={() => handlePaymentCreditCard()}><FontAwesomeIcon icon={faCreditCard} /> Carte Bleue</Button>
                    <Button backgroundColor='var(--yaya-third)' color='#FFF' onClick={() => handlePaymentStripe()}><FontAwesomeIcon icon={faCcStripe} /> Stripe</Button>
                    <Button backgroundColor='var(--yaya-third)' color='#FFF' onClick={() => handlePaymentPayPal()}><FontAwesomeIcon icon={faCcPaypal} /> Paypal?</Button>
                </div>
            </div>
        </div>
    )
}

export default OrderPayment