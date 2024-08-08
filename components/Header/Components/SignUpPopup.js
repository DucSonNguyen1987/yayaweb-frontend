import React from 'react';
import styles from '../styles/SignUpPopup.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  
} from "@fortawesome/free-solid-svg-icons";


function SignUpPopup(props) {
  return (props.trigger) ?(
    <div className={styles.popup}>
        <div className={styles.popupInner}>
            <button className={styles.closeBtn}>
            <FontAwesomeIcon className={styles.x} icon={faXmark} />
            </button>
            
            {props.children}
        </div>

    </div>
  ) :"";
}

export default SignUpPopup;