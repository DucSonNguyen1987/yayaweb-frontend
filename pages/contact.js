
import React from 'react';
import Contact from '../components/Contact';
import styles from '../styles/ContactForm.module.css';

function contact() {
    const handleFormSubmit = (formData) => {
        console.log('Form Data Submitted:', formData);
    };

    return (
        <div className={styles.contactContainer}>
            <Contact formTitle="Vous êtes un particulier ?" handleSubmit={handleFormSubmit} />
            <Contact formTitle="Vous êtes un professionnel ?" handleSubmit={handleFormSubmit} />
        </div>
    );
}

export default contact;
