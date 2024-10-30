import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './PetProfilePage.module.css';
import DetailBar from '../../../stories/DetailBar';
import PetProfileCard from '../../../components/Pet/PetProfileCard';

// [ ] asdf
// TODO UI 수정 및 상세정보 추가
// TODO 프로필 삭제 버튼 추가
function PetProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { petId } = useParams();
  const { petData } = location.state || {};
  console.log(petId);

  function handleClickEditProfile() {
    navigate(`/pet/${petId}/edit`, { state: { petData: petData } });
  }

  return (
    <div className={`${styles.container}`}>
      <DetailBar title={'프로필 상세보기'} />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.headerWrapper}`}>
          <div className={`${styles.title}`}>{`${petData.pet_name}의 프로필`}</div>
          <div className={`${styles.addProfileButton}`} onClick={handleClickEditProfile}>
            프로필 수정하기
          </div>
        </div>
        <div className={`${styles.cardWrapper}`}>
          <PetProfileCard petData={petData} />
        </div>
      </div>
    </div>
  );
}

export default PetProfilePage;
