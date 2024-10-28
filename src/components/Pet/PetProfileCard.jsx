import styles from './PetProfileCard.module.css';
import PetProfileIcon from '../../assets/icons/profile-pet.svg?react';
import { useNavigate } from 'react-router-dom';

function PetProfileCard({ pet_id, pet_name, breed, birth_date, birth_month, profile_img_url }) {
  const navigate = useNavigate();
  const birth_year_calc = Math.floor(birth_month / 12);
  const birth_month_calc = birth_month % 12;

  function handleCardClick() {
    navigate(`/pet/${pet_id}`, {
      state: {
        pet_name: pet_name,
        breed: breed,
        birth_date: birth_date,
        birth_month: birth_month,
        profile_img_url: profile_img_url,
      },
    });
  }

  return (
    <div className={`${styles.container} drop-shadow-default`} onClick={handleCardClick}>
      <div className={`${styles.wrapper}`}>
        {profile_img_url ? <img className={`${styles.profileImg}`} src={profile_img_url} /> : <PetProfileIcon width="80px" height="80px" />}
        <div>
          <div className={`${styles.contentRowWrapper}`}>
            <div className={`${styles.nameContent}`}>{pet_name}</div>
            <div className={`${styles.breedContent}`}>{breed}</div>
          </div>
          <div className={`${styles.birthContent}`}>{birth_date ? birth_date : `${birth_year_calc}년 ${birth_month_calc}개월`}</div>
        </div>
      </div>
    </div>
  );
}

export default PetProfileCard;
