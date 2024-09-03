import { useEffect } from 'react';
import styles from '../styles/Merci.module.css';
import Link from 'next/link';
import api from '../api/axios';


const Merci = () => {

    useEffect(()=>{
     // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if(query.get('success')){
            const orderId = query.get('orderId');
            if(orderId && orderId !== '') {
                // TODO : change status of order via fetch to backend
                api.post('/order-success', { orderId });
                console.log('Order placed! You will receive an email confirmation');
            }
        }
    
        if (query.get('canceled')){
          console.log('Order Canceled -- continue to shop around and checkout when you’re ready. ');
        }
    
    },[]);

    return (
        <div className={styles.merciPage}>
            <main className={styles.main}>
                <h1 className={styles.title}>Merci pour votre commande !</h1>  
                <p>
                    Vous pourrez suivre l'état d'avancement de votre commande dans l'<Link href="/orders">historique de vos commandes</Link>.
                </p>
            </main>
        </div>
    )
}

export default Merci