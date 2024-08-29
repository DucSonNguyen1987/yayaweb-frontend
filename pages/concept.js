// pages/ConceptPage.js
import React from 'react';
import Concept from '../components/Concept';
import styles from '../styles/Concept.module.css';
import Engagement from '../components/Engagement';

const concepts = [
  { name: 'Des jus épicés', imgSrc: '/Bottles/_DSC1813.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor eros nec lectus dictum feugiat. Pellentesque lacus ante, sollicitudin nec lorem nec, tincidunt pulvinar diam. Vivamus sed diam vehicula, finibus nunc vel, interdum arcu. Pellentesque dapibus ultricies magna, at viverra odio condimentum ac. Integer tincidunt efficitur ligula a pellentesque.  ' },
  { name: 'Des Jus ultra-frais', imgSrc: '/Bottles/_DSC1813.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor eros nec lectus dictum feugiat. Pellentesque lacus ante, sollicitudin nec lorem nec, tincidunt pulvinar diam. Vivamus sed diam vehicula, finibus nunc vel, interdum arcu. Pellentesque dapibus ultricies magna, at viverra odio condimentum ac. Integer tincidunt efficitur ligula a pellentesque.  ', reverse: true },
  { name: 'Des jus non traités', imgSrc: '/Bottles/_DSC1813.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor eros nec lectus dictum feugiat. Pellentesque lacus ante, sollicitudin nec lorem nec, tincidunt pulvinar diam. Vivamus sed diam vehicula, finibus nunc vel, interdum arcu. Pellentesque dapibus ultricies magna, at viverra odio condimentum ac. Integer tincidunt efficitur ligula a pellentesque.  ' },
];

const engagementData = {
  title: 'Nos engagements',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor eros nec lectus dictum feugiat. Pellentesque lacus ante, sollicitudin nec lorem nec, tincidunt pulvinar diam. Vivamus sed diam vehicula, finibus nunc vel, interdum arcu. Pellentesque dapibus ultricies magna, at viverra odio condimentum ac. Integer tincidunt efficitur ligula a pellentesque.',
};

function ConceptPage() {
  return (
    <div className={styles.conceptPage}>
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
      <Engagement title={engagementData.title} description={engagementData.description} />
    </div>
  );
}

export default ConceptPage;
