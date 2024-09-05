
import React, { useState } from 'react';
import Contact from '../components/Contact';
import styles from '../styles/ContactForm.module.css';
import { Modal } from 'antd';

function contact() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');

    const handleFormSubmit = async (formData) => {
        console.log('Form Data Submitted:', formData);
        const url = 'http://localhost:3000/sendmail';  // Ensure this is correct

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.success) {
                setModalTitle("Succès");
                setModalContent("Votre message a bien été envoyé !");
                setModalVisible(true);
            } else {
                setModalTitle("Échec");
                setModalContent("Oups, l'envoi de votre message a échoué. Veuillez réessayer.");
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Échec de l\'envoi de l\'email :', error);
            setModalTitle("Erreur");
            setModalContent("Une erreur est survenue lors de l'envoi du message. Veuillez vérifier votre connexion réseau.");
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className={styles.contactContainer}>
            <Contact formTitle="Vous êtes un particulier ?" handleSubmit={handleFormSubmit} />
            <Contact formTitle="Vous êtes un professionnel ?" handleSubmit={handleFormSubmit} />
            <Modal
                title={modalTitle}
                visible={modalVisible}
                onOk={closeModal}
                onCancel={closeModal}
                okText="OK"
                cancelText="Close"
            >
                <p>{modalContent}</p>
            </Modal>
        </div>
    );
}

export default contact;



// import React from 'react';
// import Contact from '../components/Contact';
// import styles from '../styles/ContactForm.module.css';
// import { Modal } from 'antd';

// function contact() {
//     const handleFormSubmit = async (formData) => {
//         console.log('Form Data Submitted:', formData);

//         // Define the endpoint URL
//         const url = 'http://localhost:3000/sendmail';  // Modify this URL based on your backend configuration

//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });
//             const result = await response.json();
//             if (result.success) {
//                 alert('Message sent successfully!');
//             } else {
//                 alert('Failed to send the message. Please try again.');
//             }
//         } catch (error) {
//             console.error('Failed to send email:', error);
//             alert('An error occurred while sending the message. Please check your network connection.');
//         }
//     };

//     return (
//         <div className={styles.contactContainer}>
//             <Contact formTitle="Vous êtes un particulier ?" handleSubmit={handleFormSubmit} />
//             <Contact formTitle="Vous êtes un professionnel ?" handleSubmit={handleFormSubmit} />
//         </div>
//     );
// }

// export default contact;



// import React from 'react';
// import Contact from '../components/Contact';
// import styles from '../styles/ContactForm.module.css';

// function contact() {
//     const handleFormSubmit = (formData) => {
//         console.log('Form Data Submitted:', formData);
//     };

//     return (
//         <div className={styles.contactContainer}>
//             <Contact formTitle="Vous êtes un particulier ?" handleSubmit={handleFormSubmit} />
//             <Contact formTitle="Vous êtes un professionnel ?" handleSubmit={handleFormSubmit} />
//         </div>
//     );
// }

// export default contact;
