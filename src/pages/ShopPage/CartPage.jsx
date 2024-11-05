// 장바구니 페이지
import React, { useEffect, useMemo, useState } from 'react';
import useTotalStore from '../../stores/useTotalStore';
import CartItem from '../../components/Cart/CartItem';
import TotalAmount from '../../components/Cart/TotalAmount';
import DetailBar from '../../stories/DetailBar';
import styles from './CartPage.module.css';
import ButtonLarge from '../../components/Common/Button/ButtonLarge';
import { useCartStore } from '../../stores/useCartStore';
import { useOrderItemStore } from '../../stores/useOrderItemStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { navigate } from '@storybook/addon-links';

const CartPage = () => {
  // useCartStore에서 장바구니에 담겨 있는 아이템 정보를 불러옴
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const updateCartItem = useCartStore((state) => state.updateCartItem);
  const removeCartItems = useCartStore((state) => state.removeCartItems);
  const addOrderItem = useOrderItemStore((state) => state.addOrderItem);
  const [selectedItemId, setSelectedItemId] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false); // 초기화를 한 번만 수행하도록 상태 추가

  // 전체 선택/해제 핸들러
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItemId(cartItems.map((item) => item.productId));
    } else {
      setSelectedItemId([]);
    }
  };

  const toggleSelectItem = (productId) => {
    setSelectedItemId((prevSelected) => (prevSelected.includes(productId) ? prevSelected.filter((id) => id !== productId) : [...prevSelected, productId]));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItem({ productId, quantity: newQuantity });
  };

  const handleDeleteSelected = () => {
    removeCartItems(selectedItemId);
    setSelectedItemId([]);
  };

  const selectedTotal = useMemo(() => {
    return cartItems.filter((item) => selectedItemId.includes(item.productId)).reduce((total, item) => total + item.totalPrice, 0);
  }, [cartItems, selectedItemId]);

  useEffect(() => {
    // 페이지 첫 로드 시 한 번만 전체 선택 상태로 초기화
    if (!isInitialized && cartItems.length > 0) {
      console.log('cart page use effect =', cartItems);
      setSelectedItemId(cartItems.map((item) => item.productId));
      setIsInitialized(true);
    }
  }, [cartItems, isInitialized]);

  const handleOrderButtonClick = () => {
    const orderItems = addOrderItem(cartItems);
    navigate('/order');
  };

  console.log(cartItems);
  return (
    <>
      <DetailBar title="장바구니" />
      <div className={styles.orderItemList}>
        <div className={styles.selectAllContainer}>
          <div className={styles.selectAll}>
            <input type="checkbox" id="select-all" checked={selectedItemId.length === cartItems.length} onChange={handleSelectAll} />
            <label htmlFor="select-all">
              전체 선택 ({selectedItemId.length}/{cartItems.length})
            </label>
            {/* 삭제 버튼 추가 */}
            <button className={styles.deleteButton} onClick={handleDeleteSelected}>
              선택 삭제
            </button>
          </div>
        </div>
        <div className={styles.itemList}>
          {cartItems.length === 0 ? (
            <p>장바구니에 제품이 없습니다.</p>
          ) : (
            cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                isSelected={selectedItemId.includes(item.productId)}
                onSelect={() => toggleSelectItem(item.productId)}
                onQuantityChange={(newQuantity) => handleQuantityChange(item.productId, newQuantity)}
              />
            ))
          )}
        </div>
        <div className={styles.totalContainer}>
          <p>총 금액: {selectedTotal.toLocaleString()}원</p>
        </div>
      </div>
      <ButtonLarge children={'구매하기'} sub={'primary'} disabled={!cartItems || cartItems.length === 0} onClick={handleOrderButtonClick} />
    </>
  );
};
export default CartPage;
