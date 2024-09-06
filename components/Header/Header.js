import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, signUp } from "../../reducers/user";
import { useRouter } from 'next/router';
import Button from '../shared/Button';



import styles from "./styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";





import { Input, Modal, Popover } from "antd";

import Image from "next/image";
import Link from "next/link";
import { removeFromCart } from "../../reducers/cart";

function Header(props) {

  const router = useRouter();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);
  console.log(cart);
  // State Modal
  const [open, setOpen] = useState(false);

  //state Popover Cart
  const [popover, setPopover] = useState(false);

  //State popover Shop
  const [shopPopover, setShopPopover] = useState(false);

  // States Login
  const [signInMail, setSignInMail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [Connected, setConnected] = useState(false);

  // States Sign Up
  const [gender, setGender] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [isPending, setIsPending] = useState(false);

  // State pour lister les erreurs dans le form
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // console.log('HEADER useEffect', props.open);
    if(props.open) {
      setOpen(true);
    }
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const showPop = () => {
    setPopover(true);
  };

  // Check la validité de l'email renseignée
  const isValidEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  // check si le numéro de tel fait 10 chiffres
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Check le password (>8 caractères, au moins 1 Maj, et 1 min, 1 caractère spécial)
  const isValidPassword = (password) => {
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

  // user majeur ?
  const isValidAge = (age) => {
    return parseInt(age) >= 18;
  };

  // messages en cas d'erreur(s)
  const validateForm = () => {
    let newErrors = {};

    if (!gender) {
      newErrors.gender = " Votre civilité est requise ";
    }
    if (!firstName) {
      newErrors.firstName = " Votre prénom est requis ";
    }
    if (!lastName) {
      newErrors.lastName = " Votre nom est requis ";
    }
    if (!age) {
      newErrors.age = " Votre age est requis ";
    } else if (!isValidAge(age)) {
      newErrors.age = "Vous devez être majeur";
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = " Votre téléphone est requis ";
    } else if (!isValidPhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "Votre numéro doit comporter 10 chiffres";
    }

    if (!email) {
      newErrors.email = " Votre adresse mail est requise ";
    } else if (!isValidEmail(email)) {
      newErrors.email = " Votre adresse mail est invalide";
    }

    if (!password) {
      newErrors.password = " Un Mot de passe est requis ";
    } else if (!isValidPassword(password)) {
      newErrors.password =
        "Votre mot de pass doit comporter au moins 8 caractères et au moins 1 scaractère spécial, 1 chiffre, 1 majuscule et 1 minuscule";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = " Votre civilité est requise ";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "les Mots de passes doivent être identiques";
    }
    if (!streetNumber) {
      newErrors.streetNumber = " Votre numéro de rue est requis ";
    }
    if (!streetName) {
      newErrors.streetName = " Votre nom de voie est requis ";
    }
    if (!zipCode) {
      newErrors.zipCode = " Votre code postal est requis ";
    }
    if (!city) {
      newErrors.city = " Votre ville est requise ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log("errors", errors);

  const handleRegister = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    const userAddress = { streetName, streetNumber, zipCode, city };

    const userData = {
      gender,
      firstName,
      lastName,
      age,
      phoneNumber,
      email,
      password,
      address: [userAddress],
    };

    if (isValid) {
      setIsPending(true);

      console.log("userData isValid", userData);

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("new user added", data);
          setIsPending(false);
          dispatch(login({ email: email, data: data.data }));
          setOpen(false);
          setConnected(true);
        });
    } else {
      console.log("Form validation failed");
    }

    // setLoading(true);
  };

  const handleCancel = () => {
    // console.log('handleCancel', props.open);
    if(props.open) props.toggleModalRegister();
    setOpen(false);
  };

  // Modal Register
  let modalContent = (
    <Modal
      open={open}
      title="Créer un compte"
      onOk={handleRegister}
      onCancel={handleCancel}
      footer={[
          <Button
            className={styles.footerButton}
            key="Retour"
            fontSize={'14px'}
            minWidth={'100px'}
            backgroundColor={'white'}
            color={'var(--yaya-prime)'}
            onClick={handleCancel}
            >
            {" "}
            Retour
          </Button>,
          <Button
            className={styles.footerButton}
            key="submit"
            fontSize={'14px'}
            minWidth={'100px'}
            onClick={handleRegister}
          >
            S'inscrire
          </Button>
      ]}
    >
      <form className={styles.SignUpForm} onSubmit={handleRegister}>
        <div className={styles.infoContainer}>
          <div className={styles.infoSection}>
            <p className={styles.popovertitle}> Informations personnelles</p>
            <div>
              <select
                className={styles.select}
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Civilité</option>
                <option value="male">Monsieur</option>
                <option value="female">Madame</option>
                <option value="other">Autre</option>
              </select>
              {errors.gender && (
                <div className={styles.error}>{errors.gender}</div>
              )}
            </div>

            <div>
              <input
                className={styles.Input}
                type="text"
                required
                name="lastName"
                value={lastName}
                placeholder="Nom"
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.firstName && (
                <div className={styles.error}>{errors.firstName}</div>
              )}
            </div>

            <div>
              <input
                className={styles.Input}
                type="text"
                required
                name="firstName"
                value={firstName}
                placeholder="Prénom"
                onChange={(e) => setfirstName(e.target.value)}
              />
              {errors.lastName && (
                <div className={styles.error}>{errors.lastName}</div>
              )}
            </div>

            <div>
              <input
                className={styles.Input}
                type="number"
                required
                name="age"
                value={age}
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
              />
              {errors.age && <div className={styles.error}>{errors.age}</div>}
            </div>

            <div>
              <input
                className={styles.Input}
                type="text"
                required
                name="phoneNumber"
                value={phoneNumber}
                placeholder="Téléphone"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && (
                <div className={styles.error}>{errors.phoneNumber}</div>
              )}
            </div>

            <div>
              <input
                className={styles.Input}
                type="text"
                required
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className={styles.error}>{errors.email}</div>
              )}
            </div>
          </div>

          <div className={styles.addressSection}>
            <p className={styles.popovertitle}> Adresse</p>
            <div className={styles.addressFields}>
              <div>
                <input
                  className={styles.Input}
                  type="text"
                  required
                  name="streetNumber"
                  value={streetNumber}
                  placeholder="N°"
                  onChange={(e) => setStreetNumber(e.target.value)}
                />
                {errors.streetNumber && (
                  <div className={styles.error}>{errors.streetNumber}</div>
                )}
              </div>

              <div>
                <input
                  className={styles.Input}
                  type="text"
                  required
                  name="streetName"
                  value={streetName}
                  placeholder="Nom de Rue"
                  onChange={(e) => setStreetName(e.target.value)}
                />
                {errors.streetName && (
                  <div className={styles.error}>{errors.streetName}</div>
                )}
              </div>

              <div>
                <input
                  className={styles.Input}
                  type="text"
                  required
                  name="zipCode"
                  value={zipCode}
                  placeholder="Code Postal"
                  onChange={(e) => setZipCode(e.target.value)}
                />
                {errors.zipCode && (
                  <div className={styles.error}>{errors.zipCode}</div>
                )}
              </div>

              <div>
                <input
                  className={styles.Input}
                  type="text"
                  required
                  name="city"
                  value={city}
                  placeholder="Ville"
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && (
                  <div className={styles.error}>{errors.city}</div>
                )}
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
                required
                name="password"
                value={password}
                placeholder="Mot de Passe"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className={styles.error}>{errors.password}</div>
              )}
            </div>
            <div>
              <input
                className={styles.Input}
                type="password"
                required
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirmer Mot de Passe"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <div className={styles.error}>{errors.confirmPassword}</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );

  const handleConnection = () => {
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
          setConnected(true);
          setSignInMail("");
          setSignInPassword("");
          setOpen(false);
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    setConnected(false);
  };

  let popoverUserContent;

  // arrondir à 1 décimale
  const roundTo = (num, precision) => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  };

  // Popover Account
  if (!user.accessToken) {
    popoverUserContent = (
      <div className={styles.popoverUserContent}>
        <div className={styles.registerContainer}>
          <div className={styles.registerSection}>
            <p className={styles.popovertitle}>Pas de compte ?</p>
            <Button
              className={styles.button}
              id="register"
              fontSize={'14px'}
              onClick={() => {
                setOpen(true);
              }}
            >
              S'inscrire
            </Button>
          </div>
          <div className={styles.registerSection}>
            <p className={styles.popovertitle}>Se Connecter!</p>
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
              className={styles.button}
              id="login"
              fontSize={'14px'}
              onClick={() => handleConnection()}
            >
              Se Connecter
            </Button>
          </div>

        </div>
        </div>
);
  }

    if (!user.accessToken) {
  popoverUserContent = (
    <div className={styles.popoverUserContent}>
      <div className={styles.registerContainer}>
        <div className={styles.registerSection}>
          <p className={styles.popovertitle}>Pas de compte ?</p>
          <Button
            className={styles.button}
            id="register"
            fontSize={'14px'}
            onClick={() => {
              setOpen(true);
            }}
          >
            S'inscrire
          </Button>
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
          <Button
            className={styles.button}
            id="register"
            fontSize={'14px'}
            onClick={() => handleConnection()}
          >
            Se Connecter
          </Button>
          
        </div>
      </div>
    </div>
  )
  } else if (user.accessToken) {
    popoverUserContent = (
      <div className={styles.logoutSection}>
        <p className={styles.popovertitle}> Bonjour {user.firstName},</p>
        <Link href="/account">
          <span className={styles.linkPop}>Mon Compte</span>
        </Link>
        <Link href="/orders">
          <span className={styles.linkPop}>Mon historique</span>
        </Link>
        <button className={styles.buttonPop} onClick={() => handleLogout()}>
          Se déconnecter
        </button>
      </div>
    )
  }

  
  const getProductImageUrlByOption = (item) => {
    const foundImageIndex = item.product.images.findIndex(image => image !== '' && (image.productOptions && image.productOptions.volume && item.product.options.volume.capacity === image.productOptions.volume.capacity));
    return (foundImageIndex !== -1) ? item.product.images[foundImageIndex].url : item.product.images[0].url;
  }

   const cartItems = cart.items.map((item, i) => {
      return (
        <div className={styles.popoverCartItem} key={i}>
          <span className={styles.popoverCartItemImage}>
            {item.product.images && (
              <Image 
                src={getProductImageUrlByOption(item)} 
                width='18px' 
                height='18px' 
                alt={item.product.name} 
              />
            )}
            {!item.product.images && item.product.category === 'MYJUICE' && (
              <div className={styles.itemMyJuice}>
                <Image 
                  src={'/icons/logo.png'} 
                  width='12px' 
                  height='12px' 
                  alt={item.product.name} 
                />
              </div>
            )}
            </span>
          <span className={styles.popoverCartItemName}>{item.product.name}</span>
          <span className={styles.popoverCartItemVolume}>{item.product.options.volume.capacity}</span>
          <span className={styles.popoverCartItemPrice}>{(item.product.price * item.product.options.volume.priceMultiplier).toFixed(2)}€</span>
          <span className={styles.popoverCartItemQuantity}>&times; {item.quantity}</span>
          <FontAwesomeIcon className={styles.headerIcons} icon={faTrashCan} onClick={() => dispatch(removeFromCart(item.product))}/>
        </div>
      );
   });
   
  let popoverCartContent;

  let TotalCart = (cart.total).toFixed(2);

  // Popover Panier
  popoverCartContent = (
    <div className={styles.popoverCartContent}>
      {!cartItems.length && (
        <p className={styles.popoverCartText}>Votre panier est vide</p>
      )}
      {cartItems}
      <p>Total : {TotalCart} €</p>
      {(cartItems.length > 0) && <Button onClick={() => router.push('/commander')} fontSize='18px'>Commander</Button>}
    </div>
  );

  //Popover Shop Menu
  let shopMenuPopoverContent = (
    <div className={styles.popoverShopContent}>
      <Link href="/shop">
        <span className={styles.link}>Nos Jus</span>
      </Link>
      <Link href="/myjuice">
        <span className={styles.link}>MYJUICE</span>
      </Link>
    </div>
  );
  

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <img className={styles.logo} src={"/icons/logo.png"} alt="Logo" />
        </Link>
      </div>

      <div className={styles.linkContainer}>
        <Link href="/concept">
          <span className={styles.link}>Concept</span>
        </Link>
        <div>
          <Popover
            className={styles.popover}
            content={shopMenuPopoverContent}
            placement="bottom"
            trigger="hover"
          >
            <span className={styles.link}>Shop</span>
          </Popover>
        </div>
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
          <span className={styles.headerIcons}><FontAwesomeIcon icon={faUser} /></span>
        </Popover>

        <Popover
          content={popoverCartContent}
          className={styles.popover}
          trigger="click"
        >
          <span className={styles.headerIcons}><FontAwesomeIcon icon={faCartShopping} /></span>
        </Popover>
      </div>

      {modalContent}
    </header>
  );
}

export default Header;
