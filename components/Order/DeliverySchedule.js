import { useState } from 'react';
import styles from '../../styles/OrderPayment.module.css'; 

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
        <option value="morning">Matin (8h:00 - 12h00)</option>
        <option value="afternoon">Arpès-midi (12h00 - 5h00)</option>
      </select>
    </div>
  );
}

export default DeliverySchedule;
