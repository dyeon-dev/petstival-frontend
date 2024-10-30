import { useState } from 'react';
import updatePetProfile from '../services/updatePetProfile';
import insertPetProfile from '../services/insertPetProfile';

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
      birth_date: '',
      birth_year: '',
      birth_month: '',
      breed: '',
      gender: '',
      neutered: true,
      weight: '',
      profile_img_url: '',
    });

    setStep(1);
  }

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
    // 반려견 프로필 정보 유효성 검사
    const isValidated = validateEditFrom(petProfileData);
    if (!isValidated) return;

    // 반려견 프로필 정보 업데이트
    try {
      await updatePetProfile(petId, petProfileData);
    } catch (error) {
      window.alert('업로드에 실패했어요. 다시 시도해주세요.');
      console.log(error);
      return;
    }
    window.alert('프로필 정보 업데이트에 성공했어요.');
    window.location.href = '/pet';
  }

  /* 반려견 프로필 수정 폼 유효성 검사 */
  function validateEditFrom(data) {
    // 1. 이름이 빈 값인지 검사
    if (!data.pet_name) {
      alert('이름을 입력해주세요.');
      return false;
    }

    // 2. 연, 개월 수 모두 0인지 검사
    if (!data.know_birth && data.birth_year === 0 && data.birth_month === 0) {
      alert('최소 1개월 이상의 나이를 입력해주세요.');
      return false;
    }

    // 3. 견종이 빈 값인지 검사
    if (!data.breed) {
      alert('견종을 입력해주세요.');
      return false;
    }

    // 4. 몸무게가 0인지 검사
    if (data.weight === 0) {
      alert('몸무게는 0으로 설정할 수 없어요.');
      return false;
    }

    // 모든 유효성 검사를 통과한 경우
    return true;
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

  /* 프로필 등록 설문 단계 핸들러 함수 */
  function handleSurveyStep() {
    if (step < 7) {
      setStep(step + 1);
      return;
    }
    if (step === 7) {
      postProfileData();
    }
  }

  return {
    step, // 설문 진행도
    setStep, // 설문 진행도 변경 함수
    petProfileData, // 설문 데이터
    getPetProfileData, // 설문 데이터 상태 저장 함수
    postProfileData, // 설문 데이터 생성 함수
    setPetProfileData, // 설문 데이터 상태 변경 함수
    updateProfileData, // 설문 데이터 업데이트 함수
    initProfileData, // 설문 데이터 초기화 함수
    handleSurveyStep, // 설문 단계 핸들러 함수
    validateStep, // 설문 단계별 유효성 검사
  };
}
export default usePetProfileSurvey;
