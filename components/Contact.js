
import React, { useState } from 'react';
import styles from '../styles/ContactForm.module.css'; 

function Contact({ formTitle, handleSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        firstName: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

  
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData); 
        setFormData({ name: '', firstName: '',entreprise: '', email: '', message: '' }); 
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>{formTitle}</h2>
            <form onSubmit={onSubmit}>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nom"
                    className={styles.input}
                    required
                />

                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Prénom"
                    className={styles.input}
                    required
                />

                <input
                    type="text"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={handleChange}
                    placeholder="Entreprise"
                    className={styles.input}
                    required
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={styles.input}
                    required
                />

                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Laissez nous un message, on mord pas!"
                    className={`${styles.input} ${styles.textarea}`}
                    required
                />

                <button type="submit" className={styles.button}>Envoyer</button>
            </form>
        </div>
    );
}

export default Contact;
