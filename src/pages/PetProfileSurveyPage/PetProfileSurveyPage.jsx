import { useEffect } from 'react';
import styles from './PetProfileSurveyPage.module.css';
import usePetProfileSurvey from '../../hooks/usePetProfileSurvey';
import AngleLeftIcon from '../../assets/icons/angle-left.svg?react';
import Button from '../../components/Common/Button/Button';
import ProfileSurvey from '../../components/PetProfileSurvey/ProfileSurvey';
import postPetProfile from '../../service/postPetProfile';

function PetProfileSurveyPage() {
  const { step, setStep, petProfileData, initProfileData, setPetProfileData } = usePetProfileSurvey();

  useEffect(() => {
    // 화면 렌더링 시 프로필 정보 초기화
    initProfileData();
  }, []);

  const surveyTitle = [
    {
      title: `반려견의 이름을\n입력해주세요.`,
      subtitle: `프로필 입력 후에도 수정할 수 있어요.`,
    },
    {
      title: `반려견의 나이를\n알고 있나요?`,
      subtitle: `생년월일을 몰라도 괜찮아요.`,
    },
    {
      title: `반려견의 나이를\n입력해주세요.`, // TODO know_birth 상태에 따라 다르게 보이게 처리
      subtitle: `프로필 입력 후에도 수정할 수 있어요.`,
    },
    {
      title: `어떤 아이인가요?`,
      subtitle: `견종을 입력해주세요.`,
    },
    {
      title: `어떤 성별인가요?`,
      subtitle: `성별과 중성화 여부를 선택해주세요.`,
    },
    {
      title: `몸무게를 입력해주세요.`,
      subtitle: `프로필 입력 후에도 수정할 수 있어요.`,
    },
    {
      title: `프로필 사진을\n등록해주세요.`,
      subtitle: `등록하지 않으면 기본 프로필이 지정돼요.`,
    },
    {
      title: `프로필 정보를\n생성하고 있어요.`,
      subtitle: `잠시만 기다려주세요!`,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <AngleLeftIcon onClick={() => (step === 1 ? null : setStep(step - 1))}></AngleLeftIcon>
        </div>
        <div>반려견 프로필 등록하기</div>
        <div className={styles.progressIndicator}>
          <div className={styles.progressCount}>{step}</div>
          <div>/7</div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.title}>{surveyTitle[step - 1].title}</div>
        <div className={styles.subTitle}>{surveyTitle[step - 1].subtitle}</div>
        <div className={styles.surveyContentContainer}>
          <ProfileSurvey
            step={step} // 설문 단계 상태
            petProfileData={petProfileData} // 반려견 프로필 상태
            setPetProfileData={setPetProfileData} // 반려견 프로필 상태 변경 함수
          ></ProfileSurvey>
        </div>
      </div>
      <Button
        children={step === 7 ? '프로필 생성하기' : '다음으로'}
        size="large"
        onClick={() => {
          if (step < 7) {
            setStep(step + 1);
            return;
          }
          if (step === 7) {
            try {
              postPetProfile(petProfileData);
              window.location.href = '/home';
            } catch (error) {
              window.alert('반려견 프로필 생성에 실패했어요. 다시 시도해주세요.'); // TODO 모달로 변경, 예외처리 로직 훅에 넣기
            }
          }
        }}
      ></Button>
    </div>
  );
}

export default PetProfileSurveyPage;
