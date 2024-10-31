import { useState } from 'react';
import updatePetProfile from '../services/updatePetProfile';
import insertPetProfile from '../services/insertPetProfile';

/* 반려견 프로필 생성 및 DB 저장 */
function usePetProfileSurvey() {
  const [petProfileData, setPetProfileData] = useState();
  const [step, setStep] = useState(1);

  /* 신규 반려견 프로필 등록 */
  // 1-2. DB에 새로운 반려견 프로필을 저장
  async function postProfileData() {
    try {
      insertPetProfile(petProfileData);
      window.alert('프로필 생성이 완료되었어요.'); // TODO 모달로 변경, 예외처리 로직 훅에 넣기
    } catch (error) {
      console.log(error);
      window.alert('반려견 프로필 생성에 실패했어요. 다시 시도해주세요.'); // TODO 모달로 변경, 예외처리 로직 훅에 넣기
      return;
    }
    window.location.href = '/home';
  }

  /* 반려견 프로필 등록 설문 유효성 검사 */
  function validateStep() {
    switch (step) {
      case 1:
        return petProfileData.pet_name !== '';
      case 2:
        return petProfileData.know_birth !== undefined;
      case 3:
        if (petProfileData.know_birth) {
          return petProfileData.birth_date !== '';
        } else {
          return petProfileData.birth_month < 12 && (petProfileData.birth_month > 0 || petProfileData.birth_year > 0);
        }
      case 4:
        return petProfileData.breed !== '';
      case 5:
        return petProfileData.gender !== '';
      case 6:
        return petProfileData.weight > 0;
      case 7:
        return true;
      default:
        return false;
    }
  }

  return {
    step, // 설문 진행도
    setStep, // 설문 진행도 변경 함수
    petProfileData, // 설문 데이터
    postProfileData, // 설문 데이터 생성 함수
    setPetProfileData, // 설문 데이터 상태 변경 함수
    validateStep, // 설문 단계별 유효성 검사
  };
}
export default usePetProfileSurvey;
