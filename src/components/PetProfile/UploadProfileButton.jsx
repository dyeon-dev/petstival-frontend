import PetProfileIcon from '../../assets/icons/profile-pet.svg?react';
import CameraIcon from '../../assets/icons/camera.svg?react';
import styles from './UploadProfileButton.module.css';
import { useRef } from 'react';

function UploadProfileButton({ profileUrl, uploadProfileImg }) {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.petProfileIcon}`} onClick={uploadProfileImg}>
        {profileUrl === '' ? <PetProfileIcon width="200px" height="200px" /> : <img src="profileUrl"></img>}
        <input type="file" accept=".jpg .png" style={{ width: '200px', height: '200px', display: 'none' }} />
        <CameraIcon className={`${styles.cameraIcon}`} />
      </div>
    </div>
  );
}

export default UploadProfileButton;
