import facebookLoginBtn from '../../assets/images/facebook_login_btn.png';
import { supabase } from "../../supabase/supabase";
import './LoginButtons.css';
const FacebookLoginButton = () => {
    const handleFacebookLogin = async() =>{
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
              queryParams: {
                access_type: 'offline',
                prompt: 'consent',
                
              },
            },
          });
          if (error) {
            console.error('로그인 오류:', error.message);
        } else {
            console.log('로그인 성공:', data);
           
        }
    };
    return (
        <button className="login-button" onClick={handleFacebookLogin}>
            <img src={facebookLoginBtn}/>
        </button>
    )
}
export default FacebookLoginButton;