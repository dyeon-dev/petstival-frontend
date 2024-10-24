import googleLoginBtn from '../../assets/images/google_login_btn.png'
import { signInWithProvider } from '../../hooks/useLogin.js';
import './LoginButtons.css';
const GoogleLoginButton = () => {
    const handleGoogleLogin = async() =>{
      try {
        await signInWithProvider('google');
    } catch (error) {
        console.error('카카오 로그인 실패:', error.message);
    }
    };
    return (
       
            <button className="login-button" onClick={handleGoogleLogin}>
                <img src={googleLoginBtn}/>
            </button>
        
    )
}
export default GoogleLoginButton;