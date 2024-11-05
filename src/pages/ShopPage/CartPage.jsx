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
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.section`
  height: calc(100% - 240px); // 전체 높이에서 Header, ShopTabBar, Navbar 높이 제외
  overflow-y: auto;
  padding: 24px 0;
`;

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
    <Container>
      <DetailBar title="장바구니" />

      <Wrapper>
        <div className={`${styles.orderItemList} drop-shadow-default`}>
          <div className={styles.selectAllContainer}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
              <Checkbox
                checked={selectedItemId.length === cartItems.length}
                onChange={handleSelectAll}
                sx={{
                  color: 'var(--gray-20)', // 기본 색상
                  '&.Mui-checked': {
                    color: 'var(--primary-default)', // 체크 시 색상
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '20px', // 체크 아이콘 크기
                    width: '20px',
                    height: '20px',
                    padding: '0',
                    margin: '0',
                  },
                }}
              />
              <div className={styles.labelText}>
                전체 선택({selectedItemId.length}/{cartItems.length})
              </div>
            </div>
            {/* 삭제 버튼 추가 */}
            <div className={styles.deleteButton} onClick={handleDeleteSelected}>
              삭제하기
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
            <div style={{ fontSize: '16px', fontWeight: '600' }}>총 결제 금액</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--secondary-orange-default)' }}>{selectedTotal.toLocaleString()}원</div>
          </div>
        </div>
      </Wrapper>
      <ButtonLarge children={'구매하기'} sub={'primary'} disabled={!cartItems || cartItems.length === 0} onClick={handleOrderButtonClick} />
    </Container>
  );
};
export default CartPage;
