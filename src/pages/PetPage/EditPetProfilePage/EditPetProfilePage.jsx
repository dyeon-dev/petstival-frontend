import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './EditPetProfilePage.module.css';
import DetailBar from '../../../stories/DetailBar';
import UploadProfileButton from '../../../components/PetProfileSurvey/UploadProfileButton';
import Input from '../../../components/Common/Input/Input';
import InputNumber from '../../../components/Common/Input/InputNumber';
import RadioGroup from '../../../components/PetProfileSurvey/RadioGroup';
import RadioButton from '../../../components/PetProfileSurvey/RadioButton';
import usePetProfileSurvey from '../../../hooks/usePetProfileSurvey';
import ButtonLarge from '../../../components/Common/Button/ButtonLarge';

function EditPetProfilePage() {
  const { petProfileData, getPetProfileData, setPetProfileData, updateProfileData, setWeightData } = usePetProfileSurvey();
  const location = useLocation();
  const { petId } = useParams();
  const { petData } = location.state || {};

  // 초기 화면 렌더링 시 petData를 usePetProfileSurvey 훅에 저장
  useEffect(() => {
    getPetProfileData(petData);
  }, []);

  return (
    <>
      {petProfileData ? (
        <div className={`${styles.container}`}>
          <DetailBar title={'프로필 정보 수정하기'} />
          <div className={`${styles.wrapper}`}>
            <div className={`${styles.form}`}>
              {/* 1. 프로필 사진 */}
              <div className={`${styles.fieldContainer}`}>
                <div className={`${styles.label}`}>프로필 사진</div>
                <UploadProfileButton
                  petName={petProfileData.pet_name}
                  profileUrl={petProfileData.profile_img_url}
                  setData={(data) =>
                    setPetProfileData((prev) => {
                      return { ...prev, profile_img_url: data };
                    })
                  }
                />
              </div>
              {/* 2. 반려견 이름 */}
              <div className={`${styles.fieldContainer}`}>
                <div className={`${styles.label}`}>이름</div>
                <Input
                  type={'text'}
                  value={petProfileData.pet_name}
                  placeholder={'이름을 입력하세요'}
                  setData={(event) =>
                    setPetProfileData((prev) => {
                      return { ...prev, pet_name: event.target.value };
                    })
                  }
                ></Input>
              </div>
              {/* 3. 나이 */}
              <div className={`${styles.fieldContainer}`}>
                <div className={`${styles.label}`}>나이</div>
                <RadioGroup
                  title={['생년월일', '개월수']}
                  value={[true, false]}
                  selected={petProfileData.know_birth}
                  setData={(data) =>
                    setPetProfileData((prev) => {
                      return { ...prev, know_birth: data };
                    })
                  }
                />
                {petProfileData.know_birth ? (
                  <Input
                    type={'date'}
                    value={petProfileData.birth_date}
                    placeholder={'생년월일을 입력하세요'}
                    setData={(event) =>
                      setPetProfileData((prev) => {
                        return { ...prev, birth_date: event.target.value };
                      })
                    }
                  />
                ) : (
                  <>
                    <InputNumber
                      type="number"
                      value={petProfileData.birth_year}
                      numType="numeric"
                      adornment="년"
                      placeholder="0"
                      setData={(data) =>
                        setPetProfileData((prev) => {
                          return { ...prev, birth_year: data };
                        })
                      }
                    />
                    <InputNumber
                      type="number"
                      value={petProfileData.birth_month}
                      numType="numeric"
                      adornment="개월"
                      placeholder="0"
                      setData={(data) =>
                        setPetProfileData((prev) => {
                          return { ...prev, birth_month: data };
                        })
                      }
                    />
                  </>
                )}
              </div>
              {/* 4. 견종 */}
              <div className={`${styles.fieldContainer}`}>
                <div className={`${styles.label}`}>견종</div>
                <Input
                  value={petProfileData.breed}
                  type={'text'}
                  placeholder={'견종을 입력하세요'}
                  setData={(event) =>
                    setPetProfileData((prev) => {
                      return { ...prev, breed: event.target.value };
                    })
                  }
                ></Input>
              </div>
              {/* 5. 성별 */}
              <div className={`${styles.fieldContainer}`}>
                <div className={`${styles.label}`}>성별</div>
                <RadioGroup
                  title={['남아', '여아']}
                  value={['male', 'female']}
                  selected={petProfileData.gender}
                  setData={(data) => {
                    setPetProfileData((prev) => {
                      return { ...prev, gender: data };
                    });
                  }}
                />
                <RadioButton
                  title="중성화 했어요."
                  value={petProfileData.neutered}
                  selected={petProfileData.neutered}
                  setData={() => {
                    setPetProfileData((prev) => {
                      return { ...prev, neutered: !prev.neutered };
                    });
                  }}
                />
              </div>
              {/* 6. 몸무게 */}
              <div className={`${styles.fieldContainer}`}>
                <div className={`${styles.label}`}>몸무게</div>
                <InputNumber
                  value={petProfileData.weight}
                  numType="decimal"
                  adornment="kg"
                  placeholder="0"
                  setData={(data) =>
                    setPetProfileData((prev) => {
                      return { ...prev, weight: data };
                    })
                  }
                />
              </div>
            </div>
          </div>
          <>
            <ButtonLarge
              children={'수정한 정보 저장하기'}
              onClick={() => {
                console.table(petProfileData);
                updateProfileData(petId);
              }}
            />
          </>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}

export default EditPetProfilePage;
