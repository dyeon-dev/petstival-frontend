import styles from './Input.module.css';

function Input({ type, inputmode, adornment, placeholder, setData }) {
  return (
    <div className={`${styles.container}`}>
      <input className={`${styles.input} drop-shadow-default`} type={type} inputmode={inputmode} placeholder={placeholder} onChange={setData} />
      <div className={`${styles.adornment}`}>{adornment}</div>
    </div>
  );
}

export default Input;
