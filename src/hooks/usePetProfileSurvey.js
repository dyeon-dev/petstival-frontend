import { useRef, useState } from 'react';

/* 반려견 프로필 생성 및 DB 저장 */
function usePetProfileSurvey() {
  const [petProfileData, setPetProfileData] = useState();
  const [step, setStep] = useState(1);

  /* 신규 반려견 프로필 등록 */
  // 1-1. 반려견 등록 시 프로필을 초기화
  function initProfileData() {
    setPetProfileData({
      pet_name: '',
      know_birth: true,
      birth_date: null,
      birth_month: 0,
      breed: '',
      gender: '',
      neutered: true,
      weight: 0,
      profile_img_url: '',
    });
  }

  // 1-2. DB에 새로운 반려견 프로필을 저장
  async function postProfileData() {}

  /* 기존 반려견 프로필 업데이트 */
  // 2-1. DB에서 기존 반려견 정보를 받아와 프로필을 업데이트
  async function getProfileData() {}

  // 2-2. DB에 수정된 반려견 프로필 업데이트
  async function updateProfileData() {}

  return {
    step, // 설문 진행도
    setStep, // 설문 진행도 변경 함수
    petProfileData, // 설문 데이터
    setPetProfileData, // 설문 데이터 상태 변경 함수
    initProfileData, // 설문 데이터 초기화 함수
  };
}
export default usePetProfileSurvey;
