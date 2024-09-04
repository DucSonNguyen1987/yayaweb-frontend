
import React from 'react';
import Contact from '../components/Contact';
import styles from '../styles/ContactForm.module.css';

function contact() {
    const handleFormSubmit = async (formData) => {
        console.log('Form Data Submitted:', formData);

        // Define the endpoint URL
        const url = 'http://localhost:3000/sendmail';  // Modify this URL based on your backend configuration

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
                alert('Message sent successfully!');
            } else {
                alert('Failed to send the message. Please try again.');
            }
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('An error occurred while sending the message. Please check your network connection.');
        }
    };

    return (
        <div className={styles.contactContainer}>
            <Contact formTitle="Vous êtes un particulier ?" handleSubmit={handleFormSubmit} />
            <Contact formTitle="Vous êtes un professionnel ?" handleSubmit={handleFormSubmit} />
        </div>
    );
}

export default contact;



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
