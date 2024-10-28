import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import styled from 'styled-components';

import { useNavigate } from "react-router-dom";

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const Detail = styled.div`
  color: var(--gray-gray-60, #838283);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  cursor: pointer;
`;

export default function PopularPetstival() {
  const navigate = useNavigate();

  return (
    <>
      <Info>
      <h3>최근 인기 있는 펫스티벌</h3>
        <Detail onClick={() => navigate('/petstival')}>자세히 보기 &gt;</Detail>
      </Info>
      <Paper
        sx={(theme) => ({
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '5px',
          maxWidth: 600,
          flexGrow: 1,
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        })}
      >
        <Grid container spacing={2}>
          <Grid item>
            
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
