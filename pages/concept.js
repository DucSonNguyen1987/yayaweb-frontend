// pages/ConceptPage.js
import React from 'react';
import Concept from '../components/Concept';
import styles from '../styles/Concept.module.css';
import Engagement from '../components/Engagement';
import Banner from "../components/shared/Banner";
import Button from "../components/shared/Button";
import { useRouter } from "next/router";

const concepts = [
  { name: 'Des jus épicés inspirés des remèdes de nos grand mères', imgSrc: '/images/JusEpices.png', description: "Nos jus sont de véritables élixirs de vitalité. Mélangeant la chaleur du gingembre, la fraîcheur du citron et la puissance du curcuma, ils réveillent le corps et l’esprit tout en fortifiant le système immunitaire. Ces boissons naturelles, riches en bienfaits ancestraux, apaisent les maux du quotidien tout en purifiant l'organisme. Chaque gorgée est un rappel de la sagesse des générations passées, qui savaient puiser dans la nature pour guérir et nourrir. Boire un jus épicé, c'est embrasser une tradition de bien-être et de force intérieure."},
  { name: 'Des Jus ultra-frais', imgSrc: '/images/FreshJuice.png', description: "Les jus ultra frais offrent de nombreuses vertus pour la santé grâce à leur richesse en nutriments préservés. Ils regorgent de vitamines, minéraux et enzymes vivantes, essentiels pour renforcer le système immunitaire et stimuler l’énergie. Leur fraîcheur permet une meilleure hydratation et une absorption rapide des nutriments, favorisant ainsi une digestion plus légère. De plus, ils sont riches en antioxydants, contribuant à la détoxification du corps et à la lutte contre les radicaux libres. Enfin, les jus ultra frais soutiennent la santé de la peau et apportent une vitalité globale.", reverse: true },
  { name: 'Des jus non traités', imgSrc: '/images/jusnontraités.png', description: "Les jus non traités offrent de nombreux bienfaits, car ils conservent l’intégrité de leurs nutriments. Sans pasteurisation ni traitement thermique, ils préservent un maximum de vitamines, minéraux et enzymes, favorisant ainsi une meilleure absorption des nutriments. Ces jus sont riches en antioxydants, ce qui aide à lutter contre le stress oxydatif et à renforcer le système immunitaire. En outre, ils soutiennent la digestion et peuvent améliorer l’hydratation grâce à leur teneur élevée en eau et en électrolytes naturels. Enfin, leur fraîcheur et leur pureté en font un allié pour l’énergie et la santé globale." },
];

const engagementData = {
  title: 'Nos engagements',
  description: "Découvrez nos jus, une invitation à un voyage gustatif où chaque gorgée raconte une histoire de santé et de saveurs. Nous nous engageons à vous offrir des recettes diététiquement optimales, créées pour nourrir votre corps et dynamiser votre esprit. Nos ingrédients, sourcés de manière responsable, respectent à la fois la nature et ceux qui la cultivent. Chaque jus est une promesse d'authenticité, d'équilibre et d'innovation, pour que chaque dégustation soit une expérience inédite. Venez goûter à l'alliance parfaite entre bien-être et plaisir, tout en soutenant un avenir plus sain et durable,"
};

function ConceptPage() {
  const router = useRouter();

  return (
    <div className={styles.main}>
    <Banner className={styles.heroBanner} backgroundColor={'var(--yaya-second)'}>
    <div className={styles.heroSection}>
        <div className={styles.leftSection}>
          <h1>What the fruit is YAYA ?</h1>

          <p className={styles.whiteSub}>
            <span className={styles.whiteTitle}>yaya   </span>\'ja˩.ja˥\ ( Nom
            Commun Lingala ) ainé.e, grand mère, tante, grand frère, grand père, oncle, grande sœur
          </p>

          <p className={styles.whiteText}>
            <span className={styles.whiteExergue}>YAYA SPICY JUICE </span> vous propose une nouvelle vision du jus.
            <br />
            Gourmands et épicés, les jus YAYA allient tous les bienfaits des jus
            détox et la chaleur enivrante des épices. Inspirés du jus de
            gingembre africain, nos jus vous apporteront le coup de boost dont
            vous avez besoin au quotidien.
            <br />
            Chacune de nos recettes est une référence à nos origines
            respectives, souvenirs de voyage ou d'enfance.
            <br />
            Elles sont pensées et élaborées afin de vous offrir une expérience
            gustative inédite et super-naturelle.
          </p>
        </div>
        <div className={styles.rightSection}>
          <img  className={styles.portrait} src={"/images/grandmeres.png"}/>
        </div>

      </div>
    </Banner>
      
      <h1 className={styles.pageTitle}>Que faisons-nous?</h1>
      <div className={styles.conceptContent}>
        {concepts.map((concept, index) => (
          <Concept
            key={index}
            title={concept.name}
            description={concept.description}
            imgSrc={concept.imgSrc}
            reverse={concept.reverse}
          />
        ))}
      </div>

      <Banner color={'white'}>
          <h2 className={styles.bannerTitle}>Pret.e à réveiller vos papilles ?</h2>
          <Button 
            backgroundColor={'white'} 
            color={'var(--yaya-prime)'} 
            minWidth={'250px'} 
            fontSize={'20px'}
            onClick={() => router.push('/shop')}
          >Découvrez nos jus</Button>
        </Banner>




      <div className={styles.engagement}>
      <Engagement  title={engagementData.title} description={engagementData.description} />
      </div>
    </div>
   
  );
}

export default ConceptPage;
