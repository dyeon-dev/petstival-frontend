import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './PestivalItem.module.css';
import badgeUnverified from '../../assets/icons/petstival_nonauth.svg?react';
import badgeVerified from '../../assets/icons/petstival_auth.svg?react';

function PetstivalItem({ id, title, isVerified, verifiedAt }) {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/petstival/${id}`);
  };
  const handleQRAuth = () => {
    navigate('/qrscanner');
  };

  return (
    <div className={styles.festivalItem}>
      <div className={styles.info}>
        {isVerified ? <badgeVerified className={styles.badge} alt="인증 완료 뱃지" /> : <badgeUnverified className={styles.badge} alt="인증 전 뱃지" />}{' '}
        <h3 onClick={handleTitleClick} className={styles.title}>
          {title}
        </h3>
        <p>{isVerified ? `${verifiedAt}` : '아직 참여 인증 전이에요.'}</p>{' '}
      </div>
      <div className={styles.verification}>
        {isVerified ? (
          <Button variant="contained" color="success" disabled>
            인증 완료
          </Button>
        ) : (
          <Button variant="outlined" color="primary" onClick={handleQRAuth}>
            인증하기
          </Button>
        )}
      </div>
    </div>
  );
}
export default PetstivalItem;
