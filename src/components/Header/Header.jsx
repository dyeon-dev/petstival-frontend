import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './Header.module.css';
import Logo from '../../assets/logo/logo.svg?react';
import ShoppingCartIcon from '../../assets/icons/cart.svg?react';
import Badge from '@mui/material/Badge';
import useCartStore from '../../stores/useTotalStore';

function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const handleCartClick = () => {
    if (user) {
      navigate('/cart'); // 유저가 있을 때 장바구니로 이동
    } else {
      navigate('/login'); // 유저가 없을 때 로그인 페이지로 이동
    }
  };

  const items = useCartStore((state) => state.items) || []; // items가 undefined일 경우 빈 배열로 초기화

  return (
    <div className={styles.headerLayout}>
      <Logo onClick={() => navigate('/')} />
      <Badge badgeContent={items.length} color="primary" onClick={handleCartClick} style={{ cursor: 'pointer' }}>
        <ShoppingCartIcon />
      </Badge>
    </div>
  );
}

export default Header;
