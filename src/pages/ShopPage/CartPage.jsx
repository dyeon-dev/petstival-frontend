// 장바구니 페이지
import React, { useMemo } from 'react';
import useTotalStore from '../../stores/useTotalStore';
import CartItem from '../../components/Cart/CartItem';
import TotalAmount from '../../components/Cart/TotalAmount';
import DetailBar from '../../stories/DetailBar';
import styles from './CartPage.module.css';
import ButtonLarge from '../../components/Common/Button/ButtonLarge';

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
