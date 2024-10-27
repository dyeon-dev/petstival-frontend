import PetProfileIcon from '../../assets/icons/profile-pet.svg?react';
import CameraIcon from '../../assets/icons/camera.svg?react';
import styles from './UploadProfileButton.module.css';
import { useRef } from 'react';
import uploadProfileImg from '../../service/uploadProfileImg';

// Create Supabase client
function UploadProfileButton({ petName, profileUrl, setData }) {
  const fileInputRef = useRef(null);

  // 사진 파일 선택 창 표시
  function handleFileButtonClick() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  // 첨부된 사진을 Storage에 업로드 후 URL을 상태에 업데이트
  async function fileInputSubmit(event) {
    const targetFile = event.target.files?.[0];
    const encodedPath = encodeURIComponent(petName);
    console.log(targetFile.type);

    if (!targetFile) return;
    const profileImgUrl = await uploadProfileImg(targetFile, '2');
    setData(profileImgUrl);
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.petProfileIcon}`} onClick={handleFileButtonClick}>
        {profileUrl === '' ? <PetProfileIcon width="200px" height="200px" /> : <img className={`${styles.profileImg}`} src={`${profileUrl}`}></img>}
        <input ref={fileInputRef} type="file" accept=".jpg .png" onChange={fileInputSubmit} style={{ width: '200px', height: '200px', display: 'none' }} />
        <CameraIcon className={`${styles.cameraIcon}`} />
      </div>
    </div>
  );
}

export default UploadProfileButton;
