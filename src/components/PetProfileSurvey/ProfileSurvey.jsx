import styles from './ProfileSurvey.module.css';
import Input from '../Common/Input/Input';
import RadioGroup from './RadioGroup';
import RadioButton from './RadioButton';
import UploadProfileButton from './UploadProfileButton';

function ProfileSurvey({ step, petProfileData, setPetProfileData }) {
  return (
    <>
      {/* 1. 반려견 이름 입력 */}
      {step === 1 && (
        <Input
          type="text"
          placeholder="반려견의 이름을 입력하세요"
          setData={(event) =>
            setPetProfileData((prev) => {
              return { ...prev, pet_name: event.target.value };
            })
          }
        ></Input>
      )}
      {/* 2. 반려견 생년월일 숙지 여부 */}
      {step === 2 && (
        <RadioGroup
          title={['생년월일을 알고 있어요.', '대략적인 나이만 알아요.']}
          value={[true, false]}
          selected={petProfileData.know_birth}
          setData={(data) =>
            setPetProfileData((prev) => {
              return { ...prev, know_birth: data };
            })
          }
          size="Large"
        ></RadioGroup>
      )}
      {/* 3. 반려견 나이 */}
      {step === 3 && (
        <>
          {/* 3-1. 생년월일을 정확히 알고 있는 경우 */}
          {petProfileData.know_birth ? (
            <Input
              type="date"
              placeholder="생년월일을 입력하세요"
              setData={(event) =>
                setPetProfileData((prev) => {
                  return { ...prev, birth_date: event.target.value };
                })
              }
            ></Input>
          ) : (
            <div>
              {/* 3-2. 대략적인 개월수만 알고 있는 경우 */}
              <Input
                type="number"
                inputmode="numeric"
                adornment="년"
                placeholder="0"
                setData={(event) =>
                  setPetProfileData((prev) => {
                    return { ...prev, birth_month: prev.birth_month + +event.target.value * 12 };
                  })
                }
              />
              <Input
                type="number"
                inputmode="numeric"
                adornment="개월"
                placeholder="0"
                setData={(event) =>
                  setPetProfileData((prev) => {
                    return { ...prev, birth_month: prev.birth_month + +event.target.value };
                  })
                }
              />
            </div>
          )}
        </>
      )}
      {/* 4. 반려견 견종 */}
      {step === 4 && (
        <Input
          type="text"
          placeholder="견종을 입력해주세요"
          setData={(event) =>
            setPetProfileData((prev) => {
              return { ...prev, breed: event.target.value };
            })
          }
        />
      )}
      {/* 5. 반려견 성별 */}
      {step === 5 && (
        <div className={`${styles.genderRadioWrapper}`}>
          <RadioGroup
            title={['남아', '여아']}
            value={['male', 'female']}
            selected={petProfileData.gender}
            setData={(data) => {
              setPetProfileData((prev) => {
                return { ...prev, gender: data };
              });
            }}
            size="Medium"
          />
          <RadioButton title="중성화 했어요." value={petProfileData.neutered} selected={petProfileData.neutered} setData={null} />
        </div>
      )}
      {/* 6. 몸무게 입력 */}
      {step === 6 && <Input type="number" inputmode="decimal" adornment="Kg" placeholder="0" />}
      {/* 7. 프로필 사진 등록 */}
      {step === 7 && (
        <UploadProfileButton
          petName={petProfileData.pet_name}
          profileUrl={petProfileData.profile_img_url}
          setData={(data) =>
            setPetProfileData((prev) => {
              return { ...prev, profile_img_url: data };
            })
          }
        />
      )}
    </>
  );
}

export default ProfileSurvey;
