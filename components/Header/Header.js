import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../reducers/user";

import styles from "./styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faEnvelope,
  faKey,
  faLocationCrosshairs,
  faCakeCandles,
} from "@fortawesome/free-solid-svg-icons";
import SignUpPopup from "./Components/SignUpPopup";
import SignUp from "./Components/SignUp";

import { Input, Modal, Popover, Button } from "antd";
import Link from "next/link";

function Header() {
  //   const dispatch = useDisaptch();
  //   const user = useSelector((state) => state.user.value);
  //   const cart = useSelector ((state)=> state.cart.value);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signInMail, setSignInMail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  
  
  const [formData, setformData] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    streetNumber: "",
    streetName: "",
    zipCode: "",
    city: "",
  });

  const showModal = () => {
    setOpen(true);
  };

const [errors, setErrors]= useState ([]);

const isValidEmail = (email)=>{
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

const isValidPhoneNumber = (phoneNumber)=>{
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test (phoneNumber);
}

const isValidPassword = (password)=> {
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password)
    );
};

const isValidAge = (age) => {
  return parseInt(age) >= 18;
};

  const validateForm= ()=>{
    let newErrors = {};

    if(!formData.gender){
      newErrors.gender = " Votre civilité est requise "
    }
    if(!formData.firstName){
      newErrors.firstName = " Votre prénom est requis "
    }
    if(!formData.lastName){
      newErrors.lastName = " Votre nom est requis "
    }
    if(!formData.age){
      newErrors.age = " Votre age est requis "
    }else if (!isValidAge(formData.age)) {
      newErrors.age = "Vous devez être majeur"
    }
    if(!formData.phoneNumber){
      newErrors.phoneNumber = " Votre téléphone est requis "
    }else if (!isValidPhoneNumber(formData.phoneNumber)){
      newErrors.phoneNumber = "Votre numéro doit comporter 10 chiffres"
    }

    if(!formData.email){
      newErrors.email = " Votre adresse mail est requise "
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = " Votre adresse mail est invalide"
    }

    if(!formData.password){
      newErrors.password = " Un Mot de passe est requis "
    } else if(!isValidPassword(formData.password)){
      newErrors.password = "Votre mot de pass doit comporter au moins 8 caractères et au moins 1 scaractère spécial, 1 chiffre, 1 majuscule et 1 minuscule";
    }
    if(!formData.confirmPassword){
      newErrors.confirmPassword = " Votre civilité est requise "
    }else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "les Mots de passes doivent être identiques";
    }
    if(!formData.streetNumber){
      newErrors.streetNumber = " Votre numéro de rue est requis "
    }
    if(!formData.streetName){
      newErrors.streetName = " Votre nom de voie est requis "
    }
    if(!formData.zipCode){
      newErrors.zipCode = " Votre code postal est requis "
    }
    if(!formData.city){
      newErrors.city = " Votre ville est requise "
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length ===0;
  }

  console.log(errors);

  const handleOk = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if(isValid){
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
    } else {
       console.log("Form validation failed")
    }

    setLoading(true);
    
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange =(e) =>{
    const {name, value}= e.target;

    setformData ({
      ...formData, [name]: value,
    })

  }

  let modalContent = (
    <Modal
      open={open}
      title="Créer un compte"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <div className={styles.footer}>
          <button className={styles.footerButton} key="Retour" onClick={handleCancel}>
            {" "}
            Retour
          </button>
          <button className={styles.footerButton} key="submit" onClick={handleOk}>
            S'inscrire
          </button>
        </div>,
      ]}
    >
      <form className={styles.SingUpForm} onSubmit={handleOk}>
        <div className={styles.infoContainer}>
          <div className={styles.infoSection}>
            <p className={styles.popovertitle}> Informations personnelles</p>
            <div>
              <select className={styles.select} name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Civilité</option>
                <option value="male">Monsieur</option>
                <option value="female">Madame</option>
                <option value="other">Autre</option>
              </select>
              {errors.gender && <div className={styles.error}>{errors.gender}</div>}
            </div>

            <div>
              <input
                className={styles.Input}
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Nom"
                onChange={handleChange}
              />
               {errors.firstName && <div className={styles.error}>{errors.firstName}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="Prénom"
                onChange={handleChange}

              />
              {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="number"
                name="age"
                value={formData.age}
                placeholder="Age"
                onChange={handleChange}
              />
               {errors.age && <div className={styles.error}>{errors.age}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="Téléphone"
                onChange={handleChange}
              />
               {errors.phoneNumber && <div className={styles.error}>{errors.phoneNumber}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                
              />
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>
          </div>

          <div className={styles.addressSection}>
            <p className={styles.popovertitle}> Adresse</p>
            <div className={styles.addressFields}>
            <div>
              <input
              className={styles.Input}
                type="text"
                name="streetNumber"
                value={formData.streetNumber}
                placeholder="N°"
                onChange={handleChange}
                
              />
              {errors.streetNumber && <div className={styles.error}>{errors.streetNumber}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                name="streetName"
                value={formData.streetName}
                placeholder="Nom de Rue"
                onChange={handleChange}
                
              />
              {errors.streetName && <div className={styles.error}>{errors.streetName}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                name="zipCode"
                value={formData.zipCode}
                placeholder="Code Postal"
                onChange={handleChange}
                
              />
              {errors.zipCode && <div className={styles.error}>{errors.zipCode}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                name="city"
                value={formData.city}
                placeholder="Ville"
                onChange={handleChange}
              />
              {errors.city && <div className={styles.error}>{errors.city}</div>}

            </div>
            </div>
          
          </div>
        </div>

        <div className={styles.passwordSection}>
          <p className={styles.popovertitle}> Mot de Passe</p>

          <div className={styles.passwordFields}>
          <div>
            <input
            className={styles.Input}
              type="password"
              name="password"
              value={formData.password}
              placeholder="Mot de Passe"
              onChange={handleChange}
             
            />
             {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>
          <div>
            <input
            className={styles.Input}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirmer Mot de Passe"
              onChange={handleChange}
              
            />
            {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
          </div>
          </div>
          
        </div>
      </form>
    </Modal>
  );

  const handleRegister = () => {
   
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
            onClick={() => {
              setOpen(true);
            }}
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
          <img className={styles.logo} src={"logo.png"} alt="Logo" />
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

      {modalContent}
    </header>
  );
}

export default Header;
