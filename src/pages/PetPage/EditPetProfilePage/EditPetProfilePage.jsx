import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './EditPetProfilePage.module.css';
import DetailBar from '../../../stories/DetailBar';
import UploadProfileButton from '../../../components/PetProfileSurvey/UploadProfileButton';
import Input from '../../../components/Common/Input/Input';
import InputNumber from '../../../components/Common/Input/InputNumber';
import RadioGroup from '../../../components/PetProfileSurvey/RadioGroup';
import RadioButton from '../../../components/PetProfileSurvey/RadioButton';
import usePetProfileSurvey from '../../../hooks/usePetProfileSurvey';
import { CircularProgress } from '@mui/material';
import ButtonMedium from '../../../components/Common/Button/ButtonMedium';
import deletePetProfile from '../../../services/deletePetProfile';
import DefaultModal from '../../../components/Common/Modal/DefaultModal';
import YesNoModal from '../../../components/Common/Modal/YesNoModal';

function EditPetProfilePage() {
  const { petProfileData, getPetProfileData, setPetProfileData, updateProfileData } = usePetProfileSurvey();
  const location = useLocation();
  const { petId } = useParams();
  const { petData } = location.state || {};
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isDeleteFailed, setIsDeleteFailed] = useState(false);

  // 반려견 프로필 데이터 삭제 함수
  async function handleDeletePetProfile() {
    try {
      await deletePetProfile(petId); // petId에 해당하는 반려견 프로필 데이터 삭제
      setIsDeleteSuccess(true); // 삭제에 성공한 경우 성공 알림 모달 띄움
    } catch (error) {
      setIsDeleteFailed(true); // 삭제에 실패한 경우 실패 알림 모달 띄움
    }
  }

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
                <div className={styles.buttonWrapper}>
                  <ButtonMedium children={'삭제하기'} sub={'secondary'} onClick={() => setIsConfirmModalOpen(true)} />
                  <ButtonMedium children={'정보 저장하기'} sub={'primary'} onClick={() => updateProfileData(petId)} />
                </div>
              </div>
            </div>
          </div>
          <YesNoModal
            title={'반려견 프로필 삭제'}
            content={'정말 반려견 프로필을 삭제하시겠어요?'}
            isOpen={isConfirmModalOpen}
            setIsOpen={() => setIsConfirmModalOpen(!setIsConfirmModalOpen)}
            onYesClick={handleDeletePetProfile}
          />
          <DefaultModal
            title={'삭제 완료'}
            content={'반려견 프로필 삭제가 완료되었어요.'}
            isOpen={isDeleteSuccess}
            setIsOpen={() => setIsDeleteSuccess(!setIsDeleteSuccess)}
            onYesClick={() => {
              window.location.href = '/pet';
            }}
          />
          <DefaultModal
            title={'삭제 실패'}
            content={'반려견 프로필 삭제에 실패했어요.\n다시 시도해주세요.'}
            isOpen={isDeleteFailed}
            setIsOpen={() => setIsDeleteFailed(!isDeleteFailed)}
            onYesClick={() => setIsDeleteSuccess(!setIsDeleteSuccess)}
          />
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default EditPetProfilePage;
