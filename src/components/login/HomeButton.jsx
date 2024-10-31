import React from 'react';
import Home from '../../assets/icons/login-home.svg?react'
import styles from './HomeButton.module.css';
import {useNavigate} from 'react-router-dom';
function HomeButton () {
    const navigate = useNavigate(); // useNavigate 인스턴스 생성

    const handleClick = () => {
        navigate('/home'); // /home 경로로 이동
    };

    return (
        <div className={styles.homeButtonLayout} onClick={() => navigate('/home')}>
            <div className={styles.homeIconWrapper}>
                <Home />
            </div>
        </div>
    );
}
export default HomeButton;