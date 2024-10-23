import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import image1 from '../../../assets/info_image.png';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


export default function OrderList() {
  return (
    <Paper
      sx={(theme) => ({
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: '#fff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      })}
    >
      <Grid item container spacing={2} sx={{ color: 'text.secondary', marginLeft: '10px' }}>
        <Typography variant="body2" component="div">
          2024.10.23 01:17 &nbsp;
        </Typography>
        <Typography variant="body2" component="div">
          결제 완료
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 100, height: 100 }}>
            <Img alt="info_image" src={image1} />
          </ButtonBase>
        </Grid>

        <Grid item xs={12} sm container sx={{  marginTop: '10px' }}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer' }}>
                강아지와 함께하는 피크닉 세트
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                1개
              </Typography>

              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                39,800원
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
