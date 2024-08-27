import React, { useState } from 'react';
import { DatePicker, Radio } from 'antd';
import 'antd/dist/antd.css';
import styles from '../../styles/OrderPayment.module.css';

function DeliverySchedule() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState('morning');

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);  // Optionally, use date formatting here if needed
  };

  const handleTimeChange = (e) => {
    setDeliveryTime(e.target.value);
  };

  return (
    <div className={styles.deliverySchedule}>
      <h3>Choisir la date de livraison</h3>
      <DatePicker onChange={handleDateChange} />
      {selectedDate && <p>Date sélectionnée: {selectedDate}</p>} {/* Optional feedback */}

      <h3>Choisir le Créneau</h3>
      <Radio.Group onChange={handleTimeChange} value={deliveryTime}>
        <Radio value="morning">Matin (8h00 - 12h00)</Radio>
        <Radio value="afternoon">Après-midi (12h00- 17h00)</Radio>
      </Radio.Group>
    </div>
  );
}

export default DeliverySchedule;
