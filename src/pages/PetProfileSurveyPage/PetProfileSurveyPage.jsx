import usePetProfileSurvey from '../../hooks/usePetProfileSurvey';
import styles from './PetProfileSurveyPage.module.css';
import AngleLeftIcon from '../../assets/icons/angle-left.svg?react';

function PetProfileSurveyPage() {
  const { surveyCount, setSurveyCount, petProfileSurvey, setPetProfileSurvey } = usePetProfileSurvey();

  // 설문 진행도에 따라 다른 input contents를 렌더링
  function surveyContent() {
    switch (surveyCount) {
      // 0. 반려견 이름 입력
      case 0:
        return (
          <>
            <input
              className={`${styles.inputText} drop-shadow-default`}
              type="text"
              placeholder="이름을 입력해주세요"
              onChange={(e) => setPetProfileSurvey((prev) => ({ ...prev, pet_name: e.target.value }))}
            ></input>
          </>
        );

      // 1. 정확한 생년월일 숙지 여부 입력
      case 1:
        return <></>;

      // 2. 반려견 나이 입력
      case 2:
        if (petProfileSurvey.know_birth) {
          return <></>;
        } else {
          return <></>;
        }

      // 3. 반려견 견종 입력
      case 3:
        return <></>;

      // 4. 반려견 성별 및 중성화 유무 입력
      case 4:
        return <></>;

      // 5. 반려견 몸무게 입력
      case 5:
        return <></>;

      // 6. 반려견 프로필 사진 업로드
      case 6:
        return <></>;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <AngleLeftIcon onClick={() => setSurveyCount(surveyCount - 1)}></AngleLeftIcon>
        </div>
        <div>반려견 프로필 등록하기</div>
        <div className={styles.progressIndicator}>
          <div className={styles.progressCount}>{surveyTitle[surveyCount].progressCount}</div>
          <div>/7</div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.title}>{surveyTitle[surveyCount].title}</div>
        <div className={styles.subTitle}>{surveyTitle[surveyCount].subtitle}</div>
        <div className={styles.surveyContentContainer}>{surveyContent()}</div>
      </div>
      <button className={styles.btn} onClick={() => setSurveyCount(surveyCount + 1)}>
        다음으로
      </button>
    </div>
  );
}

export default PetProfileSurveyPage;

const surveyTitle = [
  {
    title: `반려견의 이름을\n입력해주세요.`,
    subtitle: `프로필 입력 후에도 수정할 수 있어요.`,
    progressCount: 1,
  },
  {
    title: `나이를 알고 있나요?`,
    subtitle: `생년월일을 몰라도 괜찮아요.`,
    progressCount: 2,
  },
  {
    title: `생년월일을 입력해주세요.`,
    subtitle: `프로필 입력 후에도 수정할 수 있어요.`,
    progressCount: 3,
  },
  {
    title: `대략적인 나이를\n입력해주세요.`,
    subtitle: `프로필 입력 후에도 수정할 수 있어요.`,
    progressCount: 3,
  },
  {
    title: `어떤 아이인가요?`,
    subtitle: `견종을 입력해주세요.`,
    progressCount: 4,
  },
  {
    title: `어떤 성별인가요?`,
    subtitle: `성별과 중성화 여부를 선택해주세요.`,
    progressCount: 5,
  },
  {
    title: `몸무게를 입력해주세요.`,
    subtitle: `프로필 입력 후에도 수정할 수 있어요.`,
    progressCount: 6,
  },
  {
    title: `프로필 사진을\n등록해주세요.`,
    subtitle: `등록하지 않으면 기본 프로필이 지정돼요.`,
    progressCount: 7,
  },
  {
    title: `프로필 정보를\n생성하고 있어요.`,
    subtitle: `잠시만 기다려주세요!`,
  },
];
