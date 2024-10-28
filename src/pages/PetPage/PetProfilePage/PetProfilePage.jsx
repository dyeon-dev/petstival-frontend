import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './PetProfilePage.module.css';
import DetailBar from '../../../stories/DetailBar';
import PetProfileCard from '../../../components/Pet/PetProfileCard';

function PetProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { pet_id } = useParams();
  const { pet_name, breed, birth_date, birth_month, profile_img_url } = location.state || {};

  function handleClickEditProfile() {
    navigate(`/pet/${pet_id}/edit`);
  }

  return (
    <div className={`${styles.container}`}>
      <DetailBar title={'프로필 상세보기'} />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.headerWrapper}`}>
          <div className={`${styles.title}`}>{`${pet_name}의 프로필`}</div>
          <div className={`${styles.addProfileButton}`} onClick={handleClickEditProfile}>
            프로필 수정하기
          </div>
        </div>
        <div className={`${styles.cardWrapper}`}>
          <PetProfileCard
            pet_id={pet_id}
            pet_name={pet_name}
            breed={breed}
            birth_date={birth_date}
            birth_month={birth_month}
            profile_img_url={profile_img_url}
            onClick={null}
          />
        </div>
      </div>
    </div>
  );
}

export default PetProfilePage;
