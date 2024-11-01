// 장바구니 페이지
import React, { useMemo } from 'react';
import useTotalStore from '../../stores/useTotalStore';
import CartItem from '../../components/Cart/CartItem';
import TotalAmount from '../../components/Cart/TotalAmount';
import DetailBar from '../../stories/DetailBar';
import styles from './CartPage.module.css';
import ButtonLarge from '../../components/Common/Button/ButtonLarge';

/* 장바구니 페이지 요구사항
1. 장바구니는 기본적으로 모두 체크되어 있는 상태이다.
   즉, 장바구니의 제품 체크 여부는 DB나 상태에 저장하지 않는다.

2. 장바구니에서 선택된 cartItem의 인덱스를 따로 장바구니 페이지 컴포넌트에서 상태로 저장한다.

3. 장바구니 페이지 컴포넌트에서 주문하기 버튼을 클릭하면, 선택된 cartItem의 인덱스에 해당하는 cartItem만 새롭게 객체 배열에 저장한다.

4. orderItemStore에 새롭게 선택한 객체 배열을 전달하고 주문하기 페이지로 이동한다.
*/

const CartPage = () => {
  const items = useTotalStore((state) => state.items);
  const selectedItemIds = useTotalStore((state) => state.selectedItemIds);
  const updateItemQuantity = useTotalStore((state) => state.updateItemQuantity);
  const setSelectedItemIds = useTotalStore((state) => state.setSelectedItemIds); // 여기서 가져옴
  const toggleSelectItem = useTotalStore((state) => state.toggleSelectItem); // 여기서 가져옴

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItemIds(items.map((item) => item.id));
    } else {
      setSelectedItemIds([]);
    }
  };

  const handleQuantityChange = (uniqueId, newQuantity) => {
    updateItemQuantity(uniqueId, newQuantity);
  };

  return (
    <div>
      <DetailBar title="장바구니" />
      <div className={styles.orderItemList}>
        <div className={styles.selectAllContainer}>
          <div className={styles.selectAll}>
            <input type="checkbox" id="select-all" checked={selectedItemIds.length === items.length} onChange={handleSelectAll} />
            <label htmlFor="select-all">
              전체 선택 ({selectedItemIds.length}/{items.length})
            </label>
          </div>
        </div>
        <div className={styles.itemList}>
          {items.length === 0 ? (
            <p>장바구니에 제품이 없습니다.</p>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                isSelected={selectedItemIds.includes(item.id)}
                onSelect={() => toggleSelectItem(item.id)}
                onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
              />
            ))
          )}
        </div>
        <div className={styles.totalContainer}>
          <TotalAmount items={items} />
        </div>
      </div>
      <ButtonLarge children={'구매하기'} sub={'primary'} />
    </div>
  );
};

export default CartPage;
