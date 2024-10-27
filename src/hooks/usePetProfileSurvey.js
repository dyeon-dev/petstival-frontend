import { useRef, useState } from 'react';

/* 반려견 프로필 생성 및 DB 저장 */
function usePetProfileSurvey() {
  const [petProfileData, setPetProfileData] = useState();
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  /* 신규 반려견 프로필 등록 */
  // 1-1. 반려견 등록 시 프로필을 초기화
  function initProfileData() {
    setPetProfileData({
      pet_name: '',
      know_birth: true,
      birth_date: '',
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

  // 1-3. Storage에 이미지 파일을 업로드하고 URL을 프로필 상태에 업데이트
  async function uploadProfileImg() {}

  /* 기존 반려견 프로필 업데이트 */
  // 2-1. DB에서 기존 반려견 정보를 받아와 프로필을 업데이트
  async function getProfileData() {}

  // 2-2. DB에 수정된 반려견 프로필 업데이트
  async function updateProfileData() {}

  return {
    step, // 설문 진행도
    setStep, // 설문 진행도 변경 함수
    petProfileData, // 설문 데이터
    initProfileData, // 설문 데이터 초기화 함수
    uploadProfileImg, // 프로필 이미지 업로드 함수
    setPetProfileData, // 설문 데이터 변경 함수
  };
}
export default usePetProfileSurvey;
