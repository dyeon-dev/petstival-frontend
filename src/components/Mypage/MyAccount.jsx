import React from 'react';
import styles from './MyAccount.module.css';

function MyAccount() {
  return (
    <>
      <div className={styles.myAccount}>계정 관리</div>
      <div className={styles.myAccountContainer}>
        <div className={styles.myLogout}>로그아웃</div>
        <div className={styles.myWithdraw}>탈퇴하기</div>
      </div>
    </>
  );
}

export default MyAccount;