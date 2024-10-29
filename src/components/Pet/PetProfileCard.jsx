import styles from './PetProfileCard.module.css';
import PetProfileIcon from '../../assets/icons/profile-pet.svg?react';
import { useNavigate } from 'react-router-dom';

function PetProfileCard({ petData }) {
  const navigate = useNavigate();
  const birth_year_calc = Math.floor(petData.birth_month / 12);
  const birth_month_calc = petData.birth_month % 12;
  console.log(petData);
  function handleCardClick() {
    navigate(`/pet/${petData.pet_id}`, {
      state: {
        petData: petData,
      },
    });
  }

  return (
    <div className={`${styles.container} drop-shadow-default`} onClick={handleCardClick}>
      <div className={`${styles.wrapper}`}>
        {petData.profile_url ? <img className={`${styles.profileImg}`} src={petData.profile_url} /> : <PetProfileIcon width="80px" height="80px" />}
        <div>
          <div className={`${styles.contentRowWrapper}`}>
            <div className={`${styles.nameContent}`}>{petData.pet_name}</div>
            <div className={`${styles.breedContent}`}>{petData.breed}</div>
          </div>
          <div className={`${styles.birthContent}`}>{petData.birth_date ? petData.birth_date : `${birth_year_calc}년 ${birth_month_calc}개월`}</div>
        </div>
      </div>
    </div>
  );
}

export default PetProfileCard;
