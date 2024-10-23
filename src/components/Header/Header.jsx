import React from 'react';
import styles from './Header.module.css';
import Logo from "./Logo";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
  return (
    <>
      <div className={styles.headerLayout}>
        <Logo />
        <ShoppingCartIcon />
      </div>
    </>
  );
}

export default Header;
