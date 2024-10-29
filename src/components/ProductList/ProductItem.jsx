import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.css'; // CSS 모듈 import

const ProductItem = ({ id, title, price, imageSrc }) => {
  // 상품 제목이 길어서 제목을 조정할 수 있게 수정
  const truncatedTitle = title.length > 12 ? `${title.slice(0, 10)}...` : title;
  return (
    <div className={styles.item}>
      <img src={imageSrc} alt={title} className={styles.productImage} />
      <Link to={`/products/${id}`} className={styles.productTitle}>
        <h3>{truncatedTitle}</h3>
      </Link>
      <p className={styles.productPrice}>{price}원</p>
    </div>
  );
};

export default ProductItem;
