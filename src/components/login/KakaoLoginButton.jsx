import kakaoLoginBtn from '../../assets/images/kakao_login_btn.png';
import { supabase } from "../../supabase/supabase";

import './LoginButtons.css';
const KakaoLoginButton = () => {
    
    const handleKakaoLogin = async() =>{
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'kakao',
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
   
    
    // useEffect(() => {
    //     const fetchUserOnMount = async () => {
    //         await fetchUserData(); // 컴포넌트 마운트 시 사용자 데이터 가져오기
    //     };
    //     fetchUserOnMount();
    // }, []);
    return (
        <button className="login-button" onClick={handleKakaoLogin}>
            <img src = {kakaoLoginBtn}/>
        </button>
    )
}

export default KakaoLoginButton;