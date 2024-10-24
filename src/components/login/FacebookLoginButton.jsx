import facebookLoginBtn from '../../assets/images/facebook_login_btn.png';
import { signInWithProvider } from '../../hooks/useLogin.js';
import './LoginButtons.css';
const FacebookLoginButton = () => {
    const handleFacebookLogin = async() =>{
      try {
        await signInWithProvider('facebook');
    } catch (error) {
        console.error('카카오 로그인 실패:', error.message);
    }
    };
    return (
        <button className="login-button" onClick={handleFacebookLogin}>
            <img src={facebookLoginBtn}/>
        </button>
    )
}
export default FacebookLoginButton;