import React from 'react';
import styles from './MyRecentHistory.module.css';

function MyRecentHistory() {
  return (
    <>
      <div className={styles.myRecentHistory}>최근 구매 내역</div>
      <div className={styles.myHistoryContainer}>
        <div className={styles.myHistoryFrame}>
          <div className={styles.myDate}>2024.10.23 01:17 결제 완료</div>
          <div className={styles.myDetail}>주문 상세 ></div>
        </div>

        <div className={styles.infoFrame}>
          <div className={styles.image}></div>
          <div className={styles.info}>
            <div className={styles.title}>강아지와 함께하는 피크닉 세트</div>
            <div className={styles.amount}>1개</div>
            <div className={styles.price}>39,800원</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRecentHistory;
