import { useEffect, useState } from 'react';
import styles from './PetPage.module.css';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import PetProfileCard from '../../components/Pet/PetProfileCard';
import PlusIcon from '../../assets/icons/plus.svg?react';
import fetchPetProfile from '../../services/fetchPetProfile';

function PetPage() {
  const [petsData, setPetsData] = useState(null);

  // 프로필 추가하기 버튼을 클릭할 경우 반려견 프로필 설문 페이지로 이동
  function handleClickAddProfile() {
    window.location.href = '/survey';
  }

  // fetchPetProfile 함수로 반려견 정보를 불러옴
  async function loadPetsData() {
    try {
      const data = await fetchPetProfile();
      setPetsData(data);
    } catch (error) {
      console.log(error);
    }
  }

  // 페이지 진입 시 반려견 프로필 정보를 DB로부터 불러옴
  useEffect(() => {
    loadPetsData();
  }, []);

  return (
    <div className={`${styles.container}`}>
      <Header />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.headerWrapper}`}>
          {/* TODO '신혜민' -> Zustand에서 유저 정보 불러와 유저 이름으로 수정 */}
          <div className={`${styles.title}`}>{`${'신혜민'}님의 반려견`}</div>
          <div className={`${styles.addProfileButton}`} onClick={handleClickAddProfile}>
            <PlusIcon />
            프로필 추가하기
          </div>
        </div>
        <div className={`${styles.cardWrapper}`}>
          {petsData ? petsData.map((pet, index) => <PetProfileCard key={index} petData={pet} />) : <div>로딩중</div>}
        </div>
      </div>
      <Navbar selectedMenu="Pet" />
    </div>
  );
}

export default PetPage;
