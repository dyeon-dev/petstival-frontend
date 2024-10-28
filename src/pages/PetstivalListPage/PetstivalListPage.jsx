import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Chip from '@mui/material/Chip';
import supabase from '../../service/supabaseClient';

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

export default function PetstivalListPage() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // 펫스티벌 데이터 가져오기
  const getData = async () => {
    const { data } = await supabase.from('festivals').select();
    console.table(data);
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="no-height">
      <Header />
      <Wrapper>
        {error && <p style={{ color: 'red' }}>오류: {error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {loading ? (
          '로딩 중...'
        ) : (
          <ImageList cols={1}>
            {data.map((item) => (
              <Paper
                key={item.id}
                sx={(theme) => ({
                  p: 2,
                  marginBottom: '15px',
                  flexGrow: 1,
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
                })}
              >
                <ImageListItem>
                  <img
                    srcSet={`${item.firstimage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.firstimage}?w=248&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />

                  <ImageListItemBar
                    title={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ marginRight: '8px' }}>
                          {item.title}
                        </Typography>
                        <Chip label="진행중" color="primary" variant="outlined" />
                      </div>
                    }
                    subtitle={<Typography sx={{ marginTop: '4px' }}>{item.startdate} - {item.enddate}</Typography>}
                    position="below"
                  />
                </ImageListItem>
              </Paper>
            ))}
          </ImageList>
        )}
      </Wrapper>
      <Navbar selectedMenu="MyPage" />
    </div>
  );
}