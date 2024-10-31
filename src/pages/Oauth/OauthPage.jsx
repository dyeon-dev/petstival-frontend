import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore'; // useAuthStore import
import supabase from '../../services/supabaseClient'; // Supabase 클라이언트 import

function OauthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuthStore(); // useAuthStore에서 setUser 가져오기

  React.useEffect(() => {
    const exchangeTokenForUser = async () => {
      const params = new URLSearchParams(location.hash.slice(1));
      const accessToken = params.get('access_token');

      try {
        if (accessToken) {
          console.log("Access Token:", accessToken);

          // Supabase API를 사용하여 사용자 정보 가져오기
          const { data, error } = await supabase.auth.getUser(accessToken);

          if (error) {
            console.error('Error fetching user:', error.message);
            // window.alert('Failed to retrieve user information!', 'error');
            navigate('/login');
            return;
          }

          const userData = data.user;

          // 사용자 정보 저장
          if (userData) {
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.user_metadata.full_name || '', // 사용자 이름
              sub: userData.user_metadata.sub,
              avatarUrl: userData.user_metadata.avatar_url,
            });

            navigate('/mypage'); // 페이지 이동
            alert('로그인 완료');
          } else {
            navigate('/login');
            // window.alert('User data is not available!', 'error');
          }
        } else {
          navigate('/login');
          // window.alert('No access token found!', 'error');
          console.error(error.message);
          
        }
      } catch (error) {
        // window.alert(`Error: ${error.message}`, 'error');
      }
    };

    exchangeTokenForUser();
  }, [location.hash, navigate, setUser]); // setUser를 의존성 배열에 추가

  return (
    <div height="100vh">
      <div>로그인 중, 잠시만 기다려주세요...</div>
    </div>
  );
}

export default OauthPage;
