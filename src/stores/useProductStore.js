import { create } from 'zustand';

// useProductStore라는 Zustand 스토어를 생성
export const useProductStore = create((set, get) => ({
  products: [
    { id: 1, title: '하루치카 버블츄 중대형 톱니형 덴탈껌', price: '12,000', imageSrc: '/assets/picnic.svg' },
    { id: 2, title: '하루조이 해피카우 펫밀크 100ml', price: '5,000', imageSrc: '/assets/picnic.svg' },
    { id: 3, title: '독 레날 캔 410g', price: '30,000', imageSrc: '/assets/picnic.svg' },
    { id: 4, title: '독 레날 스몰독 1.5kg', price: '25,000', imageSrc: '/assets/picnic.svg' },
    { id: 5, title: '강아지 배변 봉투', price: '3,000', imageSrc: '/assets/picnic.svg' },
    { id: 6, title: '고양이 모래', price: '10,000', imageSrc: '/assets/picnic.svg' },
    { id: 7, title: '강아지 겨울 외투', price: '25,000', imageSrc: '/assets/picnic.svg' },
    { id: 8, title: '강아지와 함께하는 피크닉 세트', price: '39,800', imageSrc: '/assets/picnic.svg' },
    { id: 9, title: '강아지 공', price: '8,000', imageSrc: '/assets/picnic.svg' },
  ],
  // 주어진 ID로 제품을 검색하는 함수
  getProductById: (id) => {
    // 현재 스토어의 제품 목록에서 ID가 일치하는 제품을 찾아 반환
    return get().products.find((product) => product.id === id);
  },
}));
