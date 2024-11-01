import { create } from 'zustand';
import supabase from '../services/supabaseClient';

// useCartStore : 장바구니 제품 정보를 저장
// useOrderItemStore : 주문할 제품 정보를 저장 및 주문하기 페이지로 전달
// useTotalStore : 총 결제 금액을 계산 및 저장

export const useCartStore = create((set, get) => ({
  cartItems: [], // 장바구니에 담긴 상품 정보를 저장
  cartTotal: 0, // 장바구니 총 금액 합계를 저장

  /* ------- 장바구니에 새로운 상품 정보를 저장 ------- */
  addCartItem: ({ productId, unitPrice, quantity }) => {
    set((state) => {
      // 장바구니에 새로운 상품 정보를 저장
      const newCartItem = {
        productId, // 상품 아이디
        unitPrice, // 상품 가격
        quantity, // 상품 선택 개수
        totalPrice: unitPrice * quantity, // 상품별 총 금액
      };

      // 장바구니 정보 업데이트
      return {
        cartItems: [...state.cartItems, newCartItem],
        cartTotal: state.cartTotal + newCartItem.totalPrice,
      };
    });

    // 업데이트된 상태를 즉시 반환
    return get().cartItems;
  },

  /* ------- 장바구니에 담긴 아이템의 개수 정보를 업데이트 ------- */
  updateCartItem: ({ productId, quantity }) =>
    set((state) => {
      const updatedCartItems = state.carts.map((item) =>
        // 장바구니에서 productId가 일치하는 아이템을 검색
        item.productId === productId
          ? {
              ...item,
              quantity, // 업데이트된 quantity 반영
              totalPrice: item.unitPrice * quantity, // quantity에 따라 totalPrice를 재계산
            }
          : // 일치하지 않는 경우, 기존 아이템을 그대로 유지
            item
      );

      // 총합을 다시 계산
      const newCartTotal = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);

      // 업데이트된 장바구니 정보 return
      return {
        carts: updatedCartItems,
        cartTotal: newCartTotal,
      };
    }),

  /* ------- 장바구니에 담긴 아이템을 삭제 ------- */
  removeCartItem: (productId) =>
    set((state) => {
      // carts에서 특정 productId를 제외한 아이템만 남김
      const updatedCartItems = state.carts.filter((item) => item.productId !== productId);

      // 총합을 다시 계산
      const newCartTotal = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);

      // 업데이트된 장바구니 정보 return
      return {
        carts: updatedCartItems,
        cartTotal: newCartTotal,
      };
    }),
}));
