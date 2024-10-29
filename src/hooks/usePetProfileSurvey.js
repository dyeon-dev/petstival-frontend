import { useEffect, useRef, useState } from 'react';
import updatePetProfile from '../services/updatePetProfile';

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
      birth_year: 0,
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
  // 2-1. 기존 반려견 정보를 받아와 프로필 상태에 저장
  function getPetProfileData(data) {
    setPetProfileData({
      pet_name: data.pet_name,
      know_birth: data.know_birth,
      birth_date: data.birth_date,
      birth_year: Math.floor(data.birth_month / 12),
      birth_month: data.birth_month % 12,
      breed: data.breed,
      gender: data.gender,
      neutered: data.neutered,
      weight: data.weight,
      profile_img_url: data.profile_url,
      user_id: data.user_id,
    });
  }

  // 2-2. DB에 수정된 반려견 프로필 업데이트
  async function updateProfileData(petId) {
    // 반려견 생년월일 숙지 유무에 따라 사용하지 않는 값 null 처리
    if (petProfileData.know_birth) {
      petProfileData.birth_year = null;
      petProfileData.birth_month = null;
    } else {
      petProfileData.birth_date = null;
    }

    // 반려견 프로필 정보 업데이트
    try {
      console.log('여기까진되냐?');
      await updatePetProfile(petId, petProfileData);
    } catch (error) {
      window.alert('업로드에 실패했어요. 다시 시도해주세요.');
      console.log(error);
      return;
    }
    window.alert('프로필 정보 업데이트에 성공했어요.');
    window.location.href = '/pet';
  }

  return {
    step, // 설문 진행도
    setStep, // 설문 진행도 변경 함수
    petProfileData, // 설문 데이터
    getPetProfileData, // 설문 데이터 상태 저장 함수
    setPetProfileData, // 설문 데이터 상태 변경 함수
    updateProfileData, // 설문 데이터 업데이트 함수
    initProfileData, // 설문 데이터 초기화 함수
  };
}
export default usePetProfileSurvey;
