// components/DeliverySchedule.js
import { useState } from 'react';
import styles from './DeliverySchedule.module.css';

function DeliverySchedule() {
  const [schedule, setSchedule] = useState('');

  const handleScheduleChange = (event) => {
    setSchedule(event.target.value);
  };

  return (
    <div className={styles.deliverySchedule}>
      <h2>Delivery Schedule</h2>
      <select value={schedule} onChange={handleScheduleChange}>
        <option value="">Select a schedule</option>
        <option value="morning">Morning (8am - 12pm)</option>
        <option value="afternoon">Afternoon (12pm - 4pm)</option>
        <option value="evening">Evening (4pm - 8pm)</option>
      </select>
    </div>
  );
}

export default DeliverySchedule;
