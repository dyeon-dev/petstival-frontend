import styles from './Button.module.css';

function Button({ children, size, onClick, disabled }) {
  return (
    <button className={styles.btn} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
