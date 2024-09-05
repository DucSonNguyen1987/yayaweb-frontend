import styles from '../styles/Home.module.css';
import {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import Head from 'next/head';
import Catalog from '../components/Catalog';
import logo from '../public/icons/yaya_white_logo.svg';


function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.heroBanner}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="YAYA logo"/>
      </div>



      </div>
      <Catalog/>
    
      
    </div>
  );
}

export default Home;
