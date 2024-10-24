import kakaoLoginBtn from '../../assets/images/kakao_login_btn.png';
import { signInWithProvider } from '../../hooks/useLogin.js';

import './LoginButtons.css';
const KakaoLoginButton = () => {
    
    const handleKakaoLogin = async() =>{
      try {
        await signInWithProvider('kakao');
    } catch (error) {
        console.error('카카오 로그인 실패:', error.message);
    }
    };
   
    
   
    return (
        <button className="login-button" onClick={handleKakaoLogin}>
            <img src = {kakaoLoginBtn}/>
        </button>
    )
}

export default KakaoLoginButton;