import React from 'react';
import NumberPicker from '../ProductDetail/NumberPicker';
// import useTotalStore from '../../stores/useTotalStore';
import { useCartStore } from '../../stores/useCartStore';
import CartNumberPicker from '../ProductDetail/CartNumberPicker';

const CartItem = ({ item, isSelected, onSelect }) => {
  // 수량 업데이트 함수 가져오기
  // TODO useCartStore - updateCartItem을 참고하도록 수정
  // const updateItemQuantity = useTotalStore((state) => state.updateItemQuantity);
  const updateCartItem = useCartStore((state) => state.updateCartItem);

  // 수량 변경 핸들러
  // const handleQuantityChange = (newQuantity) => {
  //   updateItemQuantity(item.id, newQuantity); // 새로운 수량을 useTotalStore에 업데이트
  // };
  const handleQuantityChange = (newQuantity) => {
    updateCartItem({ productId: item.productId, quantity: newQuantity });
  };

  return (
    <div className="cart-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* 선택 체크박스 */}
      <input type="checkbox" checked={isSelected} onChange={onSelect} aria-label="상품 선택" />
      {/* 상품 이미지 */}
      <img src={item.imageSrc} alt={item.title} style={{ width: 50, height: 50 }} />
      {/* 상품 정보 */}
      <div style={{ flex: 1 }}>
        {/* <h3>{item.title}</h3>
        {/* <p>{item.price.toLocaleString()}원</p> */}
        {/*<p>{(item.totalPrice ?? 0).toLocaleString()}원</p> */}
        <h3>{item.productName}</h3> {/* 상품명을 표시 */}
        <p>{(item.totalPrice ?? 0).toLocaleString()}원</p>
      </div>
      {/* 수량 조절 */}
      <CartNumberPicker
        initialCount={item.quantity} // 현재 수량을 초기 값으로 전달
        onCountChange={handleQuantityChange} // 수량 변경 시 updateItemQuantity 호출
      />
    </div>
  );
};

export default CartItem;
