import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { logout, deleteAccount } from '../../hooks/useAuth';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function MyAccount() {
  const navigate = useNavigate();
  const { user, setUser,clearUser } = useAuthStore(); // setUser 추가

  useEffect(() => {
    if (user) {
      console.log('현재 유저:', user);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout(); // 로그아웃 함수 호출
      // setUser(null); // 로그아웃 후 사용자 상태를 null로 설정
      clearUser();
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      alert('로그아웃 실패: ' + error.message); // 에러 처리
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 계정을 삭제하시겠습니까?')) { // 사용자 확인
      try {
        await deleteAccount(user); // 회원 탈퇴 함수 호출
        clearUser(); // 유저 정보 초기화
        navigate("/login"); // 로그인 페이지로 이동
      } catch (error) {
        console.error('회원 탈퇴 실패: ' + error.message); // 에러 처리
      }
    }
  };

  return (
    <>
      <h3>계정 관리</h3>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '5px',
          maxWidth: 600,
          flexGrow: 1,
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        }}
      >
        <Grid container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography 
                gutterBottom 
                variant="body2" 
                sx={{ margin: '15px', cursor: "pointer" }} 
                onClick={handleLogout}
              >
                로그아웃
              </Typography>
              <Typography 
                gutterBottom 
                variant="body2" 
                sx={{ margin: '15px', cursor: "pointer" }} 
                onClick={handleDelete}
              >
                회원탈퇴
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
