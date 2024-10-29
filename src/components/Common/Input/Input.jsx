import { useEffect, useState } from 'react';
import styles from './Input.module.css';
import getDateToday from '../../../utils/getDateToday';

function Input({ type, value, numType, adornment, placeholder, setData }) {
  const today = getDateToday();

  return (
    <div className={`${styles.container}`}>
      <input
        className={`${styles.input} drop-shadow-default`}
        value={value}
        type={type}
        inputMode={numType}
        max={type === 'date' ? today : null}
        placeholder={placeholder}
        onChange={setData}
      />
      <div className={`${styles.adornment}`}>{adornment}</div>
    </div>
  );
}

export default Input;
