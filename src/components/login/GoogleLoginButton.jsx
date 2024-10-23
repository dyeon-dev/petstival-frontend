import googleLoginBtn from '../../assets/images/google_login_btn.png'
import { supabase } from "../../supabase/supabase";
import './LoginButtons.css';
const GoogleLoginButton = () => {
    const handleGoogleLogin = async() =>{
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
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
       
            <button className="login-button" onClick={handleGoogleLogin}>
                <img src={googleLoginBtn}/>
            </button>
        
    )
}
export default GoogleLoginButton;