import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand 스토어 생성
export const useAuthStore = create(persist(
  (set) => ({
    user: null,
    isLoading: false,
    isAuthenticated: false, // 인증 상태 추가
    setUser: (user) => set({ 
      user,
      isAuthenticated: true, // 유저 정보와 함께 인증 상태도 업데이트
    }),
    clearUser: () => set({ 
      user: null, 
      isAuthenticated: false // 유저 정보 초기화 및 인증 상태 초기화
    }),
    setLoading: (isLoading) => set({ isLoading }),
  }),
  {
    name: 'auth-storage', // 로컬 스토리지의 키 이름
    getStorage: () => sessionStorage, // sessionStorage를 사용
  }
));
