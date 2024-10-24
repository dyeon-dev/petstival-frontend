import KakaoLoginButton from '../../components/login/KakaoLoginButton';
import GoogleLoginButton from '../../components/login/GoogleLoginButton';
import FacebookLoginButton from '../../components/login/FacebookLoginButton';
import PetstivalLogo from '../../assets/images/petstival-logo.png';
import './Login.css';
const LoginPage = () => {
  return (
    <>
     <div className="login-container">
        <div className="logo">
          <img src = {PetstivalLogo}/>
        </div>
      <KakaoLoginButton/>
      <GoogleLoginButton/>
      {/* <FacebookLoginButton/> */}
      </div>
    </>
   
  );
};

export default LoginPage;
