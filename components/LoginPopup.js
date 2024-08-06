import React from 'react';
import styles from '../styles/LoginPopup.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";


function LoginPopup(props) {
  return (props.trigger) ?(
    <div className={styles.popup}>
        <div className={styles.popupInner}>
            <button className={styles.closeBtn}>
                <span>X</span>
            </button>
            {props.children}
        </div>

    </div>
  ) :"";
}

export default LoginPopup;