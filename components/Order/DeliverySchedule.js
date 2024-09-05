import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDeliveryDate, updateDeliveryTime } from "../../reducers/cart";
import { ConfigProvider, DatePicker, Radio } from 'antd';
// import 'antd/dist/antd.css';
import styles from './styles/OrderPayment.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import locale from 'antd/locale/fr_FR';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

const dateFormat = 'DD/MM/YYYY';


function DeliverySchedule(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  console.log(props.order);
  const order = props.order ? props.order : cart;

  const [selectedDate, setSelectedDate] = useState(null);
  const deliveryTimeRanges = [
    '8h-10h',
    '10h-12h',
    '12h-14h',
    '14h-16h',
    '16h-18h',
    '18h-20h',
  ];
  const [deliveryTime, setDeliveryTime] = useState(null);


  const a = dayjs();
  const b = a.add(1, 'day');
  const c = b.add(1, 'month');

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);  // Optionally, use date formatting here if needed
    dispatch(updateDeliveryDate(dateString));
    dispatch(updateDeliveryTime(null));
    setDeliveryTime(null);
  };
  
  const handleTimeChange = (e) => {
    setDeliveryTime(e.target.value);
    dispatch(updateDeliveryTime(e.target.value));
  };

  return (
    <ConfigProvider locale={locale}>

      <div className={styles.deliverySchedule}>
        {order.orderDate && 
          <>
            <h3>Date : <span className={styles.deliveryInfo}>{order.deliveryDate && dayjs(order.deliveryDate).format(dateFormat)}</span> Créneau : <span className={styles.deliveryInfo}>{order.deliveryTime}</span></h3>
          </>
        }
        {!order.orderDate && 
          <>
            <h3><span>Choisir la date de livraison</span> {order.deliveryDate && <FontAwesomeIcon icon={faCheck} color='var(--yaya-third)' />}</h3>

            <DatePicker onChange={handleDateChange} format={dateFormat} minDate={b} maxDate={c} defaultValue={order.deliveryDate && dayjs(order.deliveryDate, dateFormat)} />
            <h3><span>Choisir le Créneau</span> {order.deliveryTime && <FontAwesomeIcon icon={faCheck} color='var(--yaya-third)' />}</h3>
            <Radio.Group onChange={handleTimeChange} className={styles.deliveryTimeRanges} defaultValue={order.deliveryTime} value={order.deliveryTime}>
              {deliveryTimeRanges.map((deliveryTimeRange,i) => <Radio value={deliveryTimeRange} key={i}>{deliveryTimeRange}</Radio>)}
            </Radio.Group>
          </>
        }
        

      </div>
    </ConfigProvider>
  );
}

export default DeliverySchedule;
