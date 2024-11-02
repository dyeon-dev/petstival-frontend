import { create } from 'zustand';

// useCartStore : 장바구니 제품 정보를 저장
// useOrderItemStore : 주문할 제품 정보를 저장 및 주문하기 페이지로 전달
// useTotalStore : 총 결제 금액을 계산 및 저장

// [x] useOrderItemStore 구현 및 공유 (@명지님)
// [ ] 제품 상세보기 페이지에서 구매하기 버튼 클릭 시 useOrderItemStore에 정보 저장 후 구매하기 페이지로 이동 (배열로 저장)

export const useOrderItemStore = create((set, get) => ({
  orderItems: [], // 주문할 상품 정보(productId, unitPrice, quantity)를 저장
  orderTotal: 0, // 주문할 상품들의 총 합계를 저장

  /* ------- 주문할 상품 추가 ------- */
  addOrderItem: async (orderItems) => {
    // 주문할 상품 정보 추가 및 가격 총합 업데이트
    set({ orderItems: orderItems, orderTotal: orderItems.reduce((total, item) => total + item.totalPrice, 0) });
    // 업데이트된 상태를 즉시 반환
    return get().orderItems;
  },

  /* ------- 주문할 상품 정보 초기화 ------- */
  clearOrderItem: () =>
    set({
      orderItems: [],
      orderTotal: 0,
    }),
}));
