import React, { useState } from 'react';
import styles from '../components/Order/styles/OrderPayment.module.css';
import OrderSummary from '../components/Order/OrderSummary';
import OrderDelivery from '../components/Order/OrderDelivery';
import OrderPaymentModes from '../components/Order/OrderPaymentModes';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../reducers/user";
import Button from '../components/shared/Button';
import { Input } from "antd";




function orderValidation(props) {
  console.log(props);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // States Login
  const [signInMail, setSignInMail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const openModalRegister = () => {
    props.toggleModalRegister();
  }
  
  const signIn = () => {
    console.log('commander signIn');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInMail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(`${signInMail} connected`, data);
          dispatch(login({ email: signInMail, data: data.data }));
          setSignInMail("");
          setSignInPassword("");
        }
      });
  };

  return (
    <div className={styles.orderPayment}>
      <h1>Finalisation de votre commande</h1>
      <OrderSummary />
      {!user.accessToken && (
        <div className={styles.orderNotConnected}>
          <div className={styles.registerSection}>
            <p>Pas encore de compte ?</p>
            <Button
              className={styles.footerButton}
              onClick={() => openModalRegister()}
              fontSize={'20px'}
            >
              Créer un compte
            </Button>
          </div>
          <div className={styles.registerSection}>
            <p className={styles.popovertitle}>J'ai déjà un compte</p>
            <Input
              className={styles.Input}
              type="text"
              placeholder=" Adresse Mail"
              id="signInMail"
              onChange={(e) => setSignInMail(e.target.value)}
              value={signInMail}
            />
            <Input
              className={styles.Input}
              type="password"
              placeholder="Mot de Passe"
              id="signInPassword"
              onChange={(e) => setSignInPassword(e.target.value)}
              value={signInPassword}
            />
            <Button
              className={styles.footerButton}
              onClick={() => signIn()}
              fontSize={'20px'}
            >
              Se connecter
            </Button>
          </div>
        </div>
      )}
      {user.accessToken && (
        <>
          <OrderDelivery />
          <OrderPaymentModes />
        </>
      )
      }
    </div>
  );
}

export default orderValidation;
