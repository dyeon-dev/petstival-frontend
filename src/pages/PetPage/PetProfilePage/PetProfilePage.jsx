import { useNavigate } from 'react-router-dom';
import styles from './PetProfilePage.module.css';
import DetailBar from '../../../stories/DetailBar';
import Navbar from '../../../components/Navbar/Navbar';
import PetProfileCard from '../../../components/Pet/PetProfileCard';

function PetProfilePage() {
  const navigate = useNavigate();

  function handleClickEditProfile() {
    navigate(`/pet/${pet_id}/edit`);
  }

  return (
    <div className={`${styles.container}`}>
      <DetailBar title={'프로필 상세보기'} />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.headerWrapper}`}>
          <div className={`${styles.title}`}>{`${'댕댕이'}의 프로필`}</div>
          <div className={`${styles.addProfileButton}`} onClick={handleClickEditProfile}>
            프로필 수정하기
          </div>
        </div>
        <div className={`${styles.cardWrapper}`}>
          <PetProfileCard pet_id={1} name={'댕댕이'} breed={'웰시코기'} birth_date={'2024.10.28'} profile_img_url={null} />
        </div>
      </div>
    </div>
  );
}

export default PetProfilePage;
