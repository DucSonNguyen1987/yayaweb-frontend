import styles from '../styles/UserOrders.module.css';
import { useLayoutEffect, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import api from '../api/axios';
import { Collapse } from "antd";

import OrderSummary from '../components/Order/OrderSummary';
import OrderDelivery from '../components/Order/OrderDelivery';


function UserOrders() {
    const router = useRouter();
    const user = useSelector((state) => state.user.value);
    console.log(user);
    

    // loading state
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    
    useLayoutEffect(() => {
        async function handleRouteChange() {
            // redirect to home if user is not connected
            if(!user.accessToken) {
                await router.push('/');
            }
            if(isLoading) setIsLoading(false);
        }
        void handleRouteChange();

    }, []);

    // fetch orders from backend on component mount
    useEffect(() => {
        const fetchOrders = async () => {
            // send get request to backend
            const response = await api.get('/users/orders');
            const data = response.data;
            if(data.result) {
                setOrders(data.orders);
            } 
            if(isLoading) setIsLoading(false);
        };
        fetchOrders();
    }, []);

    // display loading (while checking if user is connected)
    if(isLoading) {
        return <div className={styles.loading}></div>;
    }

    const orderStatuses = {
        'Pending payment': 'Paiement en attente',
        'Paid': 'Payée',
        'Processing': 'En préparation',
        'Completed': 'Terminée',
        'Shipped': 'Expédiée',
        'Delivered': 'Livrée',
        'Canceled': 'Annulée',
        'Refunded': 'Remboursée'
    };
        
    const orderItems = orders.map((order,i) => {
        return {
            key: i,
            label: <div className={styles.orderHeader}>
                <span className={styles.orderTitle}>N°{order.orderId}</span>
                <span className={styles.orderDate}>Date : {new Date(order.orderDate).toLocaleString()}</span>
                <span className={styles.orderDate}>Statut : {orderStatuses[order.status]}</span>
            </div>,
            children: <div>
                <OrderSummary order={order} />
                <OrderDelivery order={order} />
                <div className={styles.orderPayment}>
                    <h2>Paiement</h2>
                    {order.status === 'Pending payment' && 'En attente'}
                    {/* Informations sur le paiement : type, date?, ... */}
                </div>
            </div>
        }
    })

    return (
      <div>
        <main className={styles.main}>
            <h1 className={styles.title}>Mon historique</h1>
            <h2>Mes commandes</h2>
            {user && orders && (orderItems.length > 0) && (
                <div className={styles.ordersList}>
                    <Collapse
                        size="large"
                        items={orderItems}
                        defaultActiveKey={0}
                    />
                </div>
            )}
        </main>
      </div>
    );
}

export default UserOrders;
