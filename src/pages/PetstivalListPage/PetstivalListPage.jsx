import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DetailBar from '../../stories/DetailBar';
import Navbar from '../../components/Navbar/Navbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import supabase from '../../services/supabaseClient';
import noImage from '../../assets/images/no-image.jpg';
import { Button, LinearProgress } from '@mui/material';

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

export default function PetstivalListPage() {
  const [data, setData] = useState([]);
  const [participationStatus, setParticipationStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // 펫스티벌 데이터 가져오기 및 참여 상태 확인
  const getData = async () => {
    try {
      const { data, error } = await supabase.from('festivals').select();
      if (error) throw error;

      const sortedData = data.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
      setData(sortedData);

      // 참여 상태 확인
      if (userId) {
        const status = {};
        for (const festival of data) {
          const { data: participationData } = await supabase
            .from('user_festival')
            .select('verified')
            .eq('user_id', userId)
            .eq('fetstivals_id', festival.id)
            .maybeSingle();

          status[festival.id] = participationData
            ? { isParticipating: true, verified: participationData.verified }
            : { isParticipating: false, verified: false };
        }
        setParticipationStatus(status);
      }
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUserId();
    getData();
  }, [userId]);

  const today = new Date();

  const getStatus = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > today) {
      return { label: '진행예정', color: '#FF866B' };
    } else if (start <= today && end >= today) {
      return { label: '진행중', color: 'primary' };
    } else {
      return { label: '진행완료', color: '#838283' };
    }
  };

  // 페스티벌 참여 및 취소 함수
  const handleParticipation = async (festivalId) => {
    if (!userId) {
      navigate('/login'); // 로그인되지 않은 경우에만 로그인 페이지로 리디렉션
      return;
    }

    const currentStatus = participationStatus[festivalId] || { isParticipating: false, verified: false };

    try {
      if (currentStatus.isParticipating) {
        const { error } = await supabase
          .from('user_festival')
          .delete()
          .eq('user_id', userId)
          .eq('fetstivals_id', festivalId);

        if (error) throw error;
        setParticipationStatus((prev) => ({
          ...prev,
          [festivalId]: { isParticipating: false, verified: false },
        }));
      } else {
        const { error } = await supabase
          .from('user_festival')
          .insert({
            user_id: userId,
            fetstivals_id: festivalId,
            verified: false,
            verified_at: new Date().toISOString(),
          });

        if (error) throw error;
        setParticipationStatus((prev) => ({
          ...prev,
          [festivalId]: { isParticipating: true, verified: false },
        }));
      }
    } catch (error) {
      console.error('참여 신청 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <DetailBar title="펫스티벌 모아보기" />
      <Wrapper>
        {error && <p style={{ color: 'red' }}>오류: {error}</p>}
        {loading ? (
          <LinearProgress />
        ) : (
          <ImageList cols={1}>
            {data.map((item) => {
              const { label, color } = getStatus(item.startdate, item.enddate);
              const imageSrc = item.firstimage || noImage;
              const participation = participationStatus[item.id] || {};
              const buttonLabel = participation.verified
                ? "참여 완료"
                : participation.isParticipating
                ? "신청 취소"
                : "참여 신청";

              return (
                <Paper
                  key={item.id}
                  sx={{
                    p: 2,
                    marginBottom: '15px',
                    flexGrow: 1,
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
                  }}
                >
                  <ImageListItem onClick={() => navigate(`/petstival/${item.id}`)} style={{ cursor: 'pointer' }}>
                    <img
                      srcSet={`${imageSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${imageSrc}?w=248&fit=crop&auto=format`}
                      alt={item.title || 'No image available'}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                          <Typography variant="h6" sx={{ marginRight: '8px' }}>
                            {item.title}
                          </Typography>
                          <Chip
                            label={label}
                            sx={{
                              color: color === '#FF866B' ? '#FF866B' : undefined,
                              borderColor: color === '#FF866B' ? '#FF866B' : undefined,
                            }}
                            variant="outlined"
                          />
                        </div>
                      }
                      subtitle={
                        <Typography sx={{ marginTop: '4px' }}>
                          {item.startdate} ~ {item.enddate}
                        </Typography>
                      }
                      position="below"
                    />
                  </ImageListItem>
                  {(label !== "진행완료" || participation.verified) && (
                    <Button
                      variant="contained"
                      color={participation.verified ? "success" : "primary"}
                      onClick={() => handleParticipation(item.id)}
                      sx={{ mt: 1 }}
                      disabled={participation.verified}
                    >
                      {buttonLabel}
                    </Button>
                  )}
                </Paper>
              );
            })}
          </ImageList>
        )}
      </Wrapper>
      <Navbar selectedMenu="Home" />
    </div>
  );
}