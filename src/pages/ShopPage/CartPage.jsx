// 장바구니 페이지
import React, { useMemo } from 'react';
import useTotalStore from '../../stores/useTotalStore';
import CartItem from '../../components/Cart/CartItem';
import TotalAmount from '../../components/Cart/TotalAmount';
import DetailBar from '../../stories/DetailBar';
import styles from './CartPage.module.css';
import ButtonLarge from '../../components/Common/Button/ButtonLarge';

const CartPage = () => {
  const items = useTotalStore((state) => state.items) || [];
  const selectedItemIds = useTotalStore((state) => state.selectedItemIds) || [];
  const updateItemQuantity = useTotalStore((state) => state.updateItemQuantity);
  const setSelectedItemIds = useTotalStore((state) => state.setSelectedItemIds);
  const toggleSelectItem = useTotalStore((state) => state.toggleSelectItem);
  const calculateTotalAmount = useTotalStore((state) => state.calculateTotalAmount); // 함수 가져오기
  const removeAllItems = useTotalStore((state) => state.removeAllItems);

  // useMemo로 총 금액 계산
  const totalAmount = useMemo(() => calculateTotalAmount(), [items, selectedItemIds]);

  // 핸들러 함수들
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

  const handleRemoveAll = () => {
    removeAllItems();
  };

  const handleBuyNow = () => {
    navigate(`/`);
  };

  return (
    <div>
      <DetailBar title="장바구니" />
      <div className={styles.orderItemList}>
        <div className={styles.selectAllContainer}>
          <div className={styles.selectAll}>
            <input type="checkbox" id="select-all" checked={selectedItemIds.length === items.length} onChange={handleSelectAll} className={styles.checkbox} />
            <label htmlFor="select-all" className={styles.checkboxLabel}>
              전체 선택 ({selectedItemIds.length}/{items.length})
            </label>
          </div>
          {items.length > 0 && (
            <button onClick={handleRemoveAll} className={styles.deleteLink}>
              삭제하기
            </button>
          )}
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
          <h2 className={styles.totalPrice}>총 결제 금액</h2>
          <span className={styles.totalamounttext}>{totalAmount.toLocaleString()}원</span>
        </div>
      </div>
      <ButtonLarge children={'구매하기'} sub={'primary'} onClick={handleBuyNow} disabled={false} />
    </div>
  );
};

export default CartPage;
