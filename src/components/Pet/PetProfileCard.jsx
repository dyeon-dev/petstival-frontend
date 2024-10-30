import styles from './PetProfileCard.module.css';
import PetProfileIcon from '../../assets/icons/profile-pet.svg?react';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import CancelIcon from '../../assets/icons/cancel.svg?react';

// TODO 날짜 포맷팅 함수 적용 (2024-01-01 -> 2024.01.01)
// TODO 날짜 들어가는 곳마다 적용 (birth_date)

function PetProfileCard({ petData }) {
  const navigate = useNavigate();
  const pet_id = petData.pet_id;
  const birth_date_calc = formatDate(petData.birth_date) || '';
  const birth_year_calc = Math.floor(petData.birth_month / 12);
  const birth_month_calc = petData.birth_month % 12;

  function handleCardClick() {
    navigate(`/pet/${pet_id}`, {
      state: {
        petData: petData,
      },
    });
  }

  return (
    <div className={`${styles.container} drop-shadow-default`} onClick={handleCardClick}>
      <div className={`${styles.cancelButtonContainer}`} onClick={console.log('삭제하기 기능')}>
        <CancelIcon />
      </div>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.profileImgContainer}`}>
          {petData.profile_url ? <img className={`${styles.profileImg}`} src={petData.profile_url} /> : <PetProfileIcon width="80px" height="80px" />}
        </div>

        <div>
          <div className={`${styles.nameText}`}>{petData.pet_name}</div>
          <div className={`${styles.birthText}`}>{petData.birth_date ? birth_date_calc : `${birth_year_calc}년 ${birth_month_calc}개월`}</div>
        </div>
        <div className={`${styles.contentWrapper}`}>
          <div className={`${styles.contentRowWrapper}`}>
            <div className={`${styles.labelText}`}>{`견종`}</div>
            <div className={`${styles.contentText}`}>{petData.breed}</div>
          </div>
          <div className={`${styles.contentRowWrapper}`}>
            <div className={`${styles.labelText}`}>{`성별`}</div>
            <div className={`${styles.contentText}`}>{petData.gender === 'Male' ? '남아' : '여아'}</div>
          </div>
          <div className={`${styles.contentRowWrapper}`}>
            <div className={`${styles.labelText}`}>{`몸무게`}</div>
            <div className={`${styles.contentText}`}>{petData.weight}kg</div>
          </div>
          <div className={`${styles.contentRowWrapper}`}>
            <div className={`${styles.labelText}`}>{`중성화`}</div>
            <div className={`${styles.contentText}`}>{petData.neutered ? '중성화 했어요.' : '중성화 안 했어요.'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetProfileCard;
