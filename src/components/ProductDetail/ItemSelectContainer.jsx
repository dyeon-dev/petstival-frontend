import React, { useEffect } from 'react';
import NumberPicker from './NumberPicker';
import PriceDisplay from './PriceDisplay';
import styles from './ItemSelectContainer.module.css';
import useTotalStore from '../../stores/useTotalStore';

const ItemSelectContainer = ({ price, setCartQuantity }) => {
  //const numericPrice = parseInt(price.replace(/,/g, ''), 10);

  // 전역 상태 및 상태 업데이트 함수 가져오기
  const { quantity, setQuantity, totalPrice, setUnitPrice } = useTotalStore();

  // price 값이 변경될 때 unitPrice를 설정
  useEffect(() => {
    setUnitPrice(price);
  }, [price, setUnitPrice]);

  const handleCountChange = (newQuantity) => {
    setQuantity(newQuantity); // 수량이 변경되면 자동으로 totalPrice가 업데이트됨
    setCartQuantity(newQuantity);
  };

  return (
    <div className={styles.itemSelectContainer}>
      <div className={styles.quantityLabel}>구매 수량</div>
      <div className={styles.rowWrapper}>
        <NumberPicker onCountChange={handleCountChange} />
        <PriceDisplay price={totalPrice} />
      </div>
    </div>
  );
};

export default ItemSelectContainer;
