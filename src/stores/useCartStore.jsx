import { create } from 'zustand';
// import { selectCartData, insertCartData } from '../services/cartService';

// useCartStore : 장바구니 제품 정보를 저장
// useOrderItemStore : 주문할 제품 정보를 저장 및 주문하기 페이지로 전달
// useTotalStore : 총 결제 금액을 계산 및 저장

// [x] removeCartItem -> removeCartItems로 변경, id 배열을 받아서 해당하는 상품을 장바구니에서 삭제하도록 수정
// [x] 뱃지에 cartItems.length 보이도록 수정
// [ ] useCartStore 정보 DB에서 조회, 수정, 저장, 삭제하는 함수 구현
// [ ] useCartStore 정보를 DB에서 불러와서 초기화하는 fetchCartItems 구현
// [ ] 헤더 컴포넌트, 장바구니 페이지에 fetchCartItems 추가
// [ ] useCartStore 정보를 로컬 스토리지에 저장하는 로직 추가
// [ ] useOrderItemStore 구현 및 공유 (@명지님)

export const useCartStore = create((set, get) => ({
  cartItems: [], // 장바구니에 담긴 상품 정보를 저장
  cartTotal: 0, // 장바구니 총 금액 합계를 저장

  // // TODO fetchCartItem 구현
  // fetchCartStore: async () => {
  //   // 이미 useCartStore에 정보가 저장되어 있는 경우 DB의 정보를 불러오지 않음
  //   if (cartItems.length) return;

  //   // useCartStore가 비어 있는 상태인 경우 경우 DB 정보를 불러옴
  //   const data = await selectCartData();
  //   const newCartItem =
  // },

  // Supabase에서 제품 데이터를 가져와서 상태에 저장하는 함수
  fetchProducts: async () => {
    try {
      const { data, error } = await supabase.from('product').select();
      if (error) throw error;
      set({ products: data }); // 데이터를 상태에 저장
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

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
      console.log('update data =', updatedCartItems);
      // 총합을 다시 계산
      const newCartTotal = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);
      console.log('new total =', updatedCartItems);

      // 업데이트된 장바구니 정보 return
      return {
        cartItems: updatedCartItems,
        cartTotal: newCartTotal,
      };
    });

    console.log(get().cartItems);
    // 업데이트된 상태를 즉시 반환
    return get().cartItems;
  },
}));
