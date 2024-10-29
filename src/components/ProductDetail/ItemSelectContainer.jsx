import React, { useState } from 'react';
import NumberPicker from './NumberPicker';
import PriceDisplay from './PriceDisplay';
import styles from './ItemSelectContainer.module.css';

const ItemSelectContainer = ({ price }) => {
  // 쉼표를 제거한 후 숫자로 변환
  const numericPrice = parseInt(price.replace(/,/g, ''), 10);
  const [quantity, setQuantity] = useState(1); // 기본 수량 1부터 시작
  const [totalPrice, setTotalPrice] = useState(numericPrice); // 기본 가격

  const handleCountChange = (newQuantity) => {
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * numericPrice); // 수량에 따른 가격 계산
  };

  return (
    <div className={styles.itemSelectContainer}>
      <p className={styles.quantityLabel}>구매 수량</p>
      <NumberPicker onCountChange={handleCountChange} initialCount={quantity} />
      <PriceDisplay price={totalPrice} />
    </div>
  );
};

export default ItemSelectContainer;
