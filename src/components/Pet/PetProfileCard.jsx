import styles from './PetProfileCard.module.css';
import PetProfileIcon from '../../assets/icons/profile-pet.svg?react';
import { useNavigate } from 'react-router-dom';

function PetProfileCard({ pet_id, name, breed, birth_date, birth_month, profile_img_url }) {
  const navigate = useNavigate();
  const birth_year_calc = birth_month / 12;
  const birth_month_calc = birth_month % 12;

  function handleCardClick() {
    navigate(`/pet/${pet_id}`);
  }

  return (
    <div className={`${styles.container} drop-shadow-default`} onClick={handleCardClick}>
      <div className={`${styles.wrapper}`}>
        {profile_img_url ? <img className={`${styles.profileImg}`} src={profile_img_url} /> : <PetProfileIcon width="80px" height="80px" />}
        <div>
          <div className={`${styles.contentRowWrapper}`}>
            <div className={`${styles.nameContent}`}>{name}</div>
            <div className={`${styles.breedContent}`}>{breed}</div>
          </div>
          <div className={`${styles.birthContent}`}>{birth_date ? birth_date : `${birth_year_calc}년 ${birth_month_calc}개월`}</div>
        </div>
      </div>
    </div>
  );
}

export default PetProfileCard;
