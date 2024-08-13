import styles from '../styles/Home.module.css';
import {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import Head from 'next/head';
import Catalog from '../components/Catalog';




function Home() {
  return (
    <div>
      <Catalog />
    </div>
  );
}

export default Home;
