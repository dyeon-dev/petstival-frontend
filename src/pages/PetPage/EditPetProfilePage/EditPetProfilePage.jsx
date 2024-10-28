import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './EditPetProfilePage.module.css';
import DetailBar from '../../../stories/DetailBar';
import Button from '../../../components/Common/Button/Button';
import UploadProfileButton from '../../../components/PetProfileSurvey/UploadProfileButton';
import Input from '../../../components/Common/Input/Input';
import RadioGroup from '../../../components/PetProfileSurvey/RadioGroup';
import RadioButton from '../../../components/PetProfileSurvey/RadioButton';

function EditPetProfilePage() {
  const location = useLocation();
  const { pet_id } = useParams();

  const { petData } = location.state || {};
  console.log(petData);
  return (
    <div className={`${styles.container}`}>
      <DetailBar title={'프로필 정보 수정하기'} />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.form}`}>
          {/* 1. 프로필 사진 */}
          <div className={`${styles.fieldContainer}`}>
            <div className={`${styles.label}`}>프로필 사진</div>
            <UploadProfileButton petName={petData.pet_name} profileUrl={petData.profile_url} setData={null} />
          </div>
          {/* 2. 반려견 이름 */}
          <div className={`${styles.fieldContainer}`}>
            <div className={`${styles.label}`}>이름</div>
            <Input value={petData.pet_name} type={'text'} placeholder={'이름을 입력하세요'}></Input>
          </div>
          {/* 3. 나이 */}
          <div className={`${styles.fieldContainer}`}>
            <div className={`${styles.label}`}>나이</div>
            <RadioGroup title={['생년월일', '개월수']} value={[true, false]} selected={petData.know_birth} setData={null} />
            {petData.know_birth ? (
              <Input type={'date'} value={petData.birth_date} placeholder={'생년월일을 입력하세요'} setData={null} />
            ) : (
              <>
                <Input type="number" value={Math.floor(petData.birth_month / 12)} inputmode="numeric" adornment="년" placeholder="0" setData={null} />
                <Input type="number" value={petData.birth_month % 12} inputmode="numeric" adornment="개월" placeholder="0" setData={null} />
              </>
            )}
          </div>
          {/* 4. 견종 */}
          <div className={`${styles.fieldContainer}`}>
            <div className={`${styles.label}`}>견종</div>
            <Input value={petData.breed} type={'text'} placeholder={'견종을 입력하세요'}></Input>
          </div>
          {/* 5. 성별 */}
          <div className={`${styles.fieldContainer}`}>
            <div className={`${styles.label}`}>성별</div>
            <RadioGroup title={['남아', '여아']} value={['male', 'female']} selected={petData.gender} setData={null} />
            <RadioButton title="중성화 했어요." value={petData.neutered} selected={petData.neutered} setData={null} />
          </div>
          {/* 6. 몸무게 */}
          <div className={`${styles.fieldContainer}`}>
            <div className={`${styles.label}`}>몸무게</div>
            <Input type="number" value={petData.weight} inputmode="decimal" adornment="kg" placeholder="0" setData={null} />
          </div>
        </div>
      </div>
      <>
        <Button children={'수정한 정보 저장하기'} onClick={() => console.log('클릭이요')} />
      </>
    </div>
  );
}

export default EditPetProfilePage;
