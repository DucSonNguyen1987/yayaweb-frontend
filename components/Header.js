import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";

import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Monogramme 2.0 Orange.png";
import LoginPopup from "./LoginPopup";


import { Input, Modal, Popover } from "antd";
import Link from "next/link";

function Header() {
  //   const dispatch = useDisaptch();
  //   const user = useSelector((state) => state.user.value);
  //   const cart = useSelector ((state)=> state.cart.value);

  const [seen, setSeen]= useState(false)
  const [signInMail, setSignInMail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleRegister = () => {
    fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mail: signUpMail,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ mail: signUpMail, token: data.token }));
          setSignUpMail("");
          setSignUpPassword("");
          setIsModalVisible(false);
        }
      });
  };

  const handleConnection = () => {
    fetch("http://localhost:3000/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mail: signInMail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ mail: signInMail, token: data.token }));
          setSignInMail("");
          setSignInPassword("");
          setIsModalVisible(false);
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  let popoverUserContent;

  //   if (!user.token) {
  popoverUserContent = (
    <div ClassName={styles.popoverUserContent}>
      <div className={styles.registerContainer}>
        <div className={styles.registerSection}>
          <p className={styles.popovertitle}>Pas de compte ?</p>
          <button
            className={styles.button}
            id="register"
            onClick={() => handleRegister()}
          >
            S'inscrire
          </button>
         
        </div>
        <div className={styles.registerSection}>
          <p className={styles.popovertitle}>Se Connecter</p>
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
          <button
            className={styles.button}
            id="register"
            onClick={() => handleConnection()}
          >
            Se Connecter
          </button>
        </div>
      </div>
    </div>
  );
  //   } else if(user.token){
  //       popoverUserContent = (
  //           <div className ={styles.logoutSection}>
  //               <p> Bonjour {user.firstName}</p>
  //               <Link href="/account">
  //               <span className={styles.link}>Mon Compte</span>
  //               </Link>
  //               <Link href ="/orders">
  //               <span className={styles.link}>Mon historique</span>
  //               </Link>
  //               <button onClick={()=>handleLogout()}>Se déconnecter</button>
  //           </div>
  //       )
  //    }

  let popoverCartContent;

  popoverCartContent = (
    <div className={styles.popoverCartContent}>
      <p className={styles.popoverCartText}>Votre panier est vide</p>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
        <img
          src="Monogramme 2.0 Orange.png"
          alt="Logo"
        />
        </Link>
        
      </div>

      <div className={styles.linkContainer}>
        <Link href="/concept">
          <span className={styles.link}>Concept</span>
        </Link>
        <Link href="/shop">
          <span className={styles.link}>Shop</span>
        </Link>
        <Link href="/contact">
          <span className={styles.link}>Contact</span>
        </Link>
      </div>

      <div className={styles.iconsContainer}>
        <Popover
          content={popoverUserContent}
          className={styles.popover}
          trigger="click"
        >
          <FontAwesomeIcon className={styles.headerIcons} icon={faUser} />
        </Popover>

        <Popover
          content={popoverCartContent}
          className={styles.popover}
          trigger="click"
        >
          <FontAwesomeIcon
            className={styles.headerIcons}
            icon={faCartShopping}
          />
        </Popover>
      </div>
    </header>
  );
}

export default Header;
