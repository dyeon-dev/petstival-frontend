import { useState } from 'react';

/* 반려견 프로필 생성 및 DB 저장 */
function usePetProfileSurvey() {
  const [surveyCount, setSurveyCount] = useState(0);
  const [petProfileSurvey, setPetProfileSurvey] = useState({
    pet_name: null,
    know_birth: null,
    birth_date: null,
    birth_month: null,
    breed: null,
    gender: null,
    neutered: null,
    weight: null,
    profile_img_url: null,
  });

  // Supabase Client로 DB에 저장하는 로직 구현
  async function postPetProfile() {}

  return {
    surveyCount, // 설문 진행도
    setSurveyCount, // 설문 진행도 변경 함수
    petProfileSurvey, // 설문 데이터
    setPetProfileSurvey, // 설문 데이터 변경 함수
  };
}
export default usePetProfileSurvey;
