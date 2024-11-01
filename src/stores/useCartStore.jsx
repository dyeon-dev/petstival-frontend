import { create } from 'zustand';
// import { selectCartData, insertCartData } from '../services/cartService';

// useCartStore : 장바구니 제품 정보를 저장
// useOrderItemStore : 주문할 제품 정보를 저장 및 주문하기 페이지로 전달
// useTotalStore : 총 결제 금액을 계산 및 저장

// [x] removeCartItem -> removeCartItems로 변경, id 배열을 받아서 해당하는 상품을 장바구니에서 삭제하도록 수정
// TODO useCartStore 정보 DB에서 조회, 수정, 저장, 삭제하는 함수 구현
// TODO useCartStore 정보를 DB에서 불러와서 초기화하는 initCartStore 구현
// TODO 헤더 컴포넌트에 initCartStore 추가 및 뱃지에 cartItems.length 보이도록 수정
// TODO useCartStore 정보를 로컬 스토리지에 저장하는 로직 추가
// TODO useOrderItemStore 구현 및 공유 (@명지님)

export const useCartStore = create((set, get) => ({
  cartItems: [], // 장바구니에 담긴 상품 정보를 저장
  cartTotal: 0, // 장바구니 총 금액 합계를 저장

  // // TODO fetchCartItem 구현
  // fetchCartStore: () => {
  //   // 이미 useCartStore에 정보가 저장되어 있는 경우 DB의 정보를 불러오지 않음
  //   if (cartItems.length) return;

  //   const data = selectCartData();
  //   set((state) => {});
  // },

  /* ------- 장바구니에 새로운 상품 정보를 저장 ------- */
  addCartItem: ({ productId, unitPrice, quantity, productName = '', imageSrc = '' }) => {
    set((state) => {
      const newCartItem = {
        productId,
        unitPrice,
        quantity,
        totalPrice: unitPrice * quantity,
        productName,
        imageSrc,
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
  updateCartItem: ({ productId, quantity }) => {
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) => {
        // 장바구니에서 productId가 일치하는 아이템을 검색
        if (item.productId === productId) {
          return {
            ...item,
            quantity, // 업데이트된 quantity 반영
            totalPrice: item.unitPrice * quantity, // quantity에 따라 totalPrice를 재계산}
          };
        } else {
          return item;
        }
      });

      // 총합을 다시 계산
      const newCartTotal = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);

      // 업데이트된 장바구니 정보 return
      return {
        cartItems: updatedCartItems,
        cartTotal: newCartTotal,
      };
    });

    // 업데이트된 상태를 즉시 반환
    return get().cartItems;
  },

  /* ------- 장바구니에 담긴 아이템을 삭제 ------- */
  removeCartItems: (productIdList) => {
    set((state) => {
      // 장바구니에서 선택한 상품 목록을 제외한 아이템만 남김
      const updatedCartItems = state.cartItems.filter((item) => !productIdList.includes(item.productId));

      // 총합을 다시 계산
      const newCartTotal = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);

      // 업데이트된 장바구니 정보 return
      return {
        carts: updatedCartItems,
        cartTotal: newCartTotal,
      };
    });

    // 업데이트된 상태를 즉시 반환
    return get().cartItems;
  },
}));
