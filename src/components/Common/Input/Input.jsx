import { useEffect, useState } from 'react';
import styles from './Input.module.css';

function Input({ type, value, inputmode, adornment, placeholder, setData }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, []);

  return (
    <div className={`${styles.container}`}>
      <input
        className={`${styles.input} drop-shadow-default`}
        value={inputValue}
        type={type}
        inputmode={inputmode}
        placeholder={placeholder}
        onChange={(event) => {
          setInputValue(event.target.value);
          setData;
        }}
      />
      <div className={`${styles.adornment}`}>{adornment}</div>
    </div>
  );
}

export default Input;
