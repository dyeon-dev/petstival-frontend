import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OauthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeTokenForUser = async () => {
      // URL에서 파라미터 추출
      const params = new URLSearchParams(location.hash.slice(1));
      // 액세스 토큰 파라미터 추출
      const accessToken = params.get('access_token');

      try {
        if (accessToken) {
          navigate('/home');
          window.alert('로그인에 성공했어요.', 'success');
        } else {
          navigate('/login');
          window.alert('로그인에 실패했어요. 다시 시도해주세요.', 'error');
        }
      } catch (error) {
        window.alert(`${error}`, 'error');
      }
    };

    exchangeTokenForUser();
  }, [location.hash, navigate]);

  return (
    <div height="100vh">
      <div>로그인 중, 잠시만 기다려주세요...</div>
    </div>
  );
}

export default OauthPage;
