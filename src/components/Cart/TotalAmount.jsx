// TotalAmount.jsx
import React from 'react';
import useTotalStore from '../../stores/useTotalStore';
import styles from './TotalAmount.module.css';

const TotalAmount = () => {
  // useTotalStore에서 totalAmount를 가져오기
  const totalAmount = useTotalStore((state) => state.totalAmount);

  return (
    <div className={styles.totalAmountContainer}>
      <h2 className={styles.totalLabel}>총 결제 금액</h2>
      <span className={styles.totalValue}>{totalAmount.toLocaleString()}원</span>
    </div>
  );
};

export default TotalAmount;
