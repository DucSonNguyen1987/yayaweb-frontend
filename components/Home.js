import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Catalog from "../components/Catalog";
// import { Button } from "antd";
import Button from "./shared/Button";
import Banner from "./shared/Banner";
import { useRouter } from "next/router";


function Home() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div className={styles.heroBanner}>
        <div className={styles.logoContainer}>
          <img
            className={styles.logo}
            src={"/icons/logo.svg"}
            alt="YAYA logo"
          />
          <div className={styles.descriptionContainer}>
            
              <div className={styles.iconContainer}>
                <img className={styles.icons} src={"/icons/Spicy_Icon.png"} />
                <p className={styles.icontext}>Des jus épicés</p>
              </div>
              <div className={styles.iconContainer}>
                <img className={styles.icons} src={"/icons/fresh_icon.png"} />
                <p className={styles.icontext}>Pressés à froid</p>
              </div>
              <div className={styles.iconContainer}>
                <img className={styles.icons} src={"/icons/Non_traité_Icon.png"} />
                <p className={styles.icontext}>Non traités</p>
              </div>
           
          </div>
        </div>
      </div>
      <div className={styles.introSection}>
      
        <h1>Nos jus pressés à foid vont vous donner chaud</h1>

        <div className={styles.presentation}>
          <div className={styles.illustration}>
            <svg className={styles.blob} viewBox="-86.331 -65.107 497.658 462.093">
              <path id="blob_5" fill="#F27C00" d="M 278.67919921875 -31.28585052490234 C 305.9068298339844 -10.00441455841064 326.2492980957031 17.22329330444336 350.9733581542969 46.64174270629883 C 375.3843994140625 76.0601806640625 404.1769104003906 107.3563919067383 410.1231384277344 142.0951995849609 C 416.0694274902344 176.8339996337891 398.8564758300781 214.7024230957031 383.2084045410156 259.7689819335938 C 367.8733520507812 304.8355407714844 353.7900390625 357.1002502441406 320.9289855957031 380.5724487304688 C 288.0679931640625 403.7315368652344 235.8033447265625 398.4112548828125 189.4850006103516 388.7093505859375 C 143.1666564941406 379.0076293945312 102.1686630249023 364.6112976074219 67.42990112304688 342.3909606933594 C 32.37815093994141 320.1706848144531 3.272706985473633 289.8133544921875 -24.89384841918945 254.7615966796875 C -53.37340545654297 219.3968505859375 -81.22700500488281 179.0247344970703 -85.60845947265625 135.8359680175781 C -90.30289459228516 92.96013641357422 -71.83812713623047 47.26766204833984 -38.35123443603516 20.66587448120117 C -4.86430025100708 -5.622946262359619 43.64479064941406 -13.13403606414795 83.07799530029297 -27.21733474731445 C 122.5111770629883 -40.9876823425293 153.1814422607422 -61.95613479614258 185.4165344238281 -64.77280426025391 C 217.6515960693359 -67.58946990966797 251.4514770507812 -52.25431823730469 278.67919921875 -31.28585052490234 Z">
              </path>
            </svg>
            <img className={styles.kooples} src={"icons/Kooples.png"}/>
          </div>
          <div className={styles.presentationText}>
            <h2 className={styles.secondTitle}>Salut,nous c'est YAYA SPICY JUICE</h2>

            <p>
              <span class={styles.exergue}>YAYA c’est avant tout une rencontre...<br />Entre Inès et Duc Son, entre deux cultures culinaires basées sur l’amour des épices.</span><br/>
              <br/>Quand Ines fait découvrir à Duc-Son le jus de gingembre de sa tante dont la recette et le savoir-faire lui ont été transmis de sa grand-mère, c’est le déclic, cela éveille des souvenirs de sa Banoï, sa grand mère viêtnamienne et sa cuisine si parfumée.< br />
              <br/>Le concept des boissons YAYA prend racine dans les savoirs faire ancestraux...<br/> En combinant nos souvenirs d’enfance, de voyages et nos héritages culinaires respectifs nous vous avons concocté des recettes détonnantes.
              <br/>Nos boissons vous apporteront tous les bienfaits que la nature peut offrir tout en faisant voyager vos papilles.<br/>
              <br/><span class={styles.exergue}>Depuis leur laboratoire parisien, ils fabriquent et distribuent les jus YAYA.</span>
            </p>


            <p class={styles.citation}>“QUI CONTRÔLE L’ÉPICE, CONTRÔLE L‘UNIVERS.”</p>
            <p class={styles.quoteSub}>Baron Vladimir Harkonnen,Dune.</p>

            <Button
              className={styles.buttonLink}
              color={'#FFF'}
              backgroundColor={'var(--yaya-second)'}
              fontSize={'20px'}
              minWidth={'200px'}
              onClick={() => router.push('/concept')}
            >En savoir plus</Button>
          </div>
        </div>
        
        <div className={styles.gammes}>
          <div className={styles.discover}>
            <p>Dévouvrez nos gammes</p>
          </div>
          <Catalog />
        </div>

        <Banner color={'white'}>
          <h2 className={styles.bannerTitle}>Vous ne trouvez pas votre bonheur ?<br /><br />Avec MYJUICE</h2>
          <Button 
            backgroundColor={'white'} 
            color={'var(--yaya-prime)'} 
            minWidth={'250px'} 
            fontSize={'20px'}
            onClick={() => router.push('/myjuice')}
          >Créer votre jus</Button>
        </Banner>

      </div>
      
    </div>
  );
}

export default Home;
