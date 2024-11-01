// 장바구니 페이지
import React, { useEffect, useMemo, useState } from 'react';
import useTotalStore from '../../stores/useTotalStore';
import CartItem from '../../components/Cart/CartItem';
import TotalAmount from '../../components/Cart/TotalAmount';
import DetailBar from '../../stories/DetailBar';
import styles from './CartPage.module.css';
import ButtonLarge from '../../components/Common/Button/ButtonLarge';
import { useCartStore } from '../../stores/useCartStore';

/* 장바구니 페이지 요구사항
1. 장바구니는 기본적으로 모두 체크되어 있는 상태이다.
   즉, 장바구니의 제품 체크 여부는 DB나 상태에 저장하지 않는다.

2. 장바구니에서 선택된 cartItem의 인덱스를 따로 장바구니 페이지 컴포넌트에서 상태로 저장한다.

3. 장바구니 페이지 컴포넌트에서 주문하기 버튼을 클릭하면, 선택된 cartItem의 인덱스에 해당하는 cartItem만 새롭게 객체 배열에 저장한다.

4. orderItemStore에 새롭게 선택한 객체 배열을 전달하고 주문하기 페이지로 이동한다.
*/

const CartPage = () => {
  // useCartStore에서 장바구니에 담겨 있는 아이템 정보를 불러옴
  const cartItems = useCartStore((state) => state.cartItems);
  const cartTotal = useCartStore((state) => state.cartTotal);
  // 선택된 아이템의 아이디를 저장
  const [selectedItemId, setSelectedItemId] = useState([]);
  // 아이템의 수량을 변경하는 함수
  const updateCartItem = useCartStore((state) => state.updateCartItem);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItemId(cartItems.map((item) => item.productId));
      //setSelectedItemId(items.map((item) => item.id));
    } else {
      setSelectedItemId([]);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItem({ productId, quantity: newQuantity });
  };

  // const handleQuantityChange = (uniqueId, newQuantity) => {
  //   updateItemQuantity(uniqueId, newQuantity);
  // };

  // 초기 렌더링 시 장바구니에 담겨 있는 모든 아이템을 선택한 상태로 렌더링
  useEffect(() => {
    console.log('장바구니에 담긴 상품 정보 = ', cartItems);
    cartItems.map((item) => {
      setSelectedItemId(() => [...selectedItemId, item.productId]);
    });
  }, []);

  /*   return (
    <div>
      {<DetailBar title="장바구니" />
      <div className={styles.orderItemList}>
        <div className={styles.selectAllContainer}>
          <div className={styles.selectAll}>
            <input type="checkbox" id="select-all" checked={selectedItemId.length === items.length} onChange={handleSelectAll} />
            <label htmlFor="select-all">
              전체 선택 ({selectedItemId.length}/{cartItems.length})
            </label>
          </div>
        </div>
        <div className={styles.itemList}>
          {cartItems.length === 0 ? (
            <p>장바구니에 제품이 없습니다.</p>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                isSelected={selectedItemId.includes(item.id)} // id를 index로 변경
                onSelect={() => toggleSelectItem(item.id)}
                onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
              />
            ))
          )}
        </div>
        <div className={styles.totalContainer}>
          <TotalAmount items={cartTotal} />
        </div>
      </div>
      <ButtonLarge children={'구매하기'} sub={'primary'} />
  );
};*/
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
        <div className={styles.totalContainer}>{/* <TotalAmount total={cartTotal} /> */}</div>
      </div>
      <ButtonLarge children={'구매하기'} sub={'primary'} disabled={false} />
    </>
  );
};
export default CartPage;
