import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";

import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartSshopping,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import { Input, Modal } from "antd";
import Link from "next/link";

function Header() {
  const dispatch = useDisaptch();
  const user = useSelector((state) => state.user.value);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signUpMail, setSignUpMail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
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


  const handleConnection = ()=>{
    fetch("http://localhost:3000/user/signin",{
        method: "POST",
        headers : { "Content-Type": "application/json" },
        body : JSON.stringify({
            mail: signInMail,
            password: signInPassword,
        }),
    })
    .then ((response)=> response.json())
    .then((data)=>{
        if (data.result){
            dispatch(login({mail: signInMail, token : data.token}));
            setSignInMail("");
            setSignInPassword("");
            setIsModalVisible(false);
        }
    });
  }

  const handleLogoout = ()=> {
    dispatch(logout());
  }

  const showModal= () =>{
    setIsModalVisible(!isModalVisible);
  }


  let modalContent;
  if (!user.isConnected) {
    modalContent = (
        <div className={styles.registerContainer}>
            <div className={styles.registerSection}>
                <p>S'inscrire</p>
                <input
                type = "text"
                placeholder =" Adresse Mail"
                id="signUpMail"
                onChange={(e)=> setSignUpMail(e.target.value)}
                value={signUpMail}         
                />
                <input 
                type="password"
                placeholder="Mot de Passe"
                id="signUpPassword"
                onChange={(e)=> setSignUpPassword(e.target.value)}
                value={signUpPassword}
                />
                <button id="register" onClick={()=>handleRegister()}>
                S'inscrire
                </button>
            </div>
            <div className= {styles.registerSection}>
                <p>Se Connecter</p>
                <input
                type = "text"
                placeholder =" Adresse Mail"
                id="signInMail"
                onChange={(e)=> setSignInMail(e.target.value)}
                value={signInMail}         
                />
                <input 
                type="password"
                placeholder="Mot de Passe"
                id="signInPassword"
                onChange={(e)=> setSignInPassword(e.target.value)}
                value={signInPassword}
                />
                <button id="register" onClick={()=>handleConnection()}>
                Se Connecter
                </button>

            </div>
        </div>
    );
  }

  let userSection; 
  if(user.token){
    userSection= (
        <div className= {styles.logoutSection}>
            <p>Bonjour, {user.firstname} / </p>
            <button onClick={()=>handleLogoout()}>Se Déconnecter</button>
        </div>
    )
  }


}
