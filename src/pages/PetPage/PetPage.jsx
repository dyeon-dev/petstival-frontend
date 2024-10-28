import styles from './PetPage.module.css';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import PetProfileCard from '../../components/Pet/PetProfileCard';
import PlusIcon from '../../assets/icons/plus.svg?react';

function PetPage() {
  function handleClickAddProfile() {
    window.location.href = '/survey';
  }
  return (
    <div className={`${styles.container}`}>
      <Header />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.headerWrapper}`}>
          <div className={`${styles.title}`}>{`${'신혜민'}님의 반려견`}</div>
          <div className={`${styles.addProfileButton}`} onClick={handleClickAddProfile}>
            <PlusIcon />
            프로필 추가하기
          </div>
        </div>
        <div className={`${styles.cardWrapper}`}>
          <PetProfileCard pet_id={1} name={'댕댕이'} breed={'웰시코기'} birth_date={'2024.10.28'} profile_img_url={null} />
          <PetProfileCard pet_id={2} name={'댕댕이'} breed={'웰시코기'} birth_date={'2024.10.28'} profile_img_url={null} />
          <PetProfileCard pet_id={3} name={'댕댕이'} breed={'웰시코기'} birth_date={'2024.10.28'} profile_img_url={null} />
          <PetProfileCard pet_id={4} name={'댕댕이'} breed={'웰시코기'} birth_date={'2024.10.28'} profile_img_url={null} />
          <PetProfileCard pet_id={5} name={'댕댕이'} breed={'웰시코기'} birth_date={'2024.10.28'} profile_img_url={null} />
        </div>
      </div>
      <Navbar selectedMenu="Pet" />
    </div>
  );
}

export default PetPage;
