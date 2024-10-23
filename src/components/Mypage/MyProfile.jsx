import React from 'react'
import styles from './MyProfile.module.css'; // CSS 모듈 임포트

function MyProfile() {
  return (
    <>
        <div className={styles.myProfile}>나의 프로필</div>
        <div className={styles.myProfileContainer}>
          <div className={styles.myProfileFrame}>
            <div className={styles.myProfileImage}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="39" fill="#EEF6FF" stroke="#C8E2FF" strokeWidth="2" />
                <ellipse cx="40.3539" cy="27.5474" rx="10.6016" ry="10.6016" fill="#C8E2FF" />
                <path
                  d="M59.0328 63.0541C59.0328 60.3138 58.5497 57.6004 57.611 55.0688C56.6723 52.5371 55.2964 50.2368 53.5619 48.2992C51.8274 46.3615 49.7682 44.8245 47.502 43.7759C45.2358 42.7272 42.8068 42.1875 40.3539 42.1875C37.9009 42.1875 35.472 42.7272 33.2057 43.7759C30.9395 44.8245 28.8804 46.3615 27.1459 48.2992C25.4114 50.2368 24.0355 52.5371 23.0968 55.0688C22.1581 57.6004 21.6749 60.3138 21.6749 63.0541L40.3539 63.0541H59.0328Z"
                  fill="#C8E2FF"
                />
              </svg>
            </div>

            <div className={styles.myInfo}>
              <div className={styles.myName}>김다연</div>
              <div className={styles.myEmail}>email@email.com</div>
            </div>
          </div>
        </div>
    </>
  )
}

export default MyProfile
