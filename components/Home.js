import styles from '../styles/Home.module.css';
import {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import Head from 'next/head';




function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        
      </main>
    </div>
  );
}

export default Home;
