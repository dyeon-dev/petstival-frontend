import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import image1 from '../../assets/info_image.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import useTotalStore from '../../stores/useTotalStore';
import NumberPicker from "../ProductDetail/NumberPicker";

export default function OrderInfo() {
  const navigate = useNavigate();

  const { quantity, totalPrice, setQuantity } = useTotalStore();
  
  const handleCountChange = (newQuantity) => {
    setQuantity(newQuantity); // 수량이 변경되면 자동으로 totalPrice가 업데이트됨
  };

  const handlePayment = () => {
    navigate('/payment');
  };

  return (
    <div>
      <h3>주문 상품</h3>
      <Paper
        sx={(theme) => ({
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '5px',
          maxWidth: 600,
          flexGrow: 1,
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        })}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 100, height: 100 }}>
              <img alt="강아지와 함께하는 피크닉 세트" src={image1} />
            </ButtonBase>
          </Grid>

          <Grid item xs={12} sm container sx={{ marginTop: '10px' }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  강아지와 함께하는 피크닉 세트
                </Typography>

                <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }}>39,800원</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container spacing={2} sx={{ marginLeft: '5px', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item xs={6}>
              <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
                수량 변경
              </Typography>
            </Grid>
            <NumberPicker onCountChange={handleCountChange}  initialCount={quantity} />
            {/* <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
              <Button size="small" onClick={decreaseQuantity} variant="outlined">
                -
              </Button>
              <Typography variant="body2" component="div" sx={{ margin: '0 10px' }}>
                {quantity}
              </Typography>
              <Button size="small" onClick={increaseQuantity} variant="outlined">
                +
              </Button>
            </Grid> */}
          </Grid>

          {/* 총 주문 금액 */}
          <Grid item container spacing={2} sx={{ marginLeft: '5px', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item xs={6}>
              <Typography variant="body2" component="div">
                총 주문 금액
              </Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end" alignItems="center" sx={{ color: 'var(--secondary-orange-default)', fontWeight: 'bold' }}>
              {totalPrice}원
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Button onClick={handlePayment} variant="contained" size="large" sx={{ width: '100%', borderRadius: '8px', backgroundColor: 'var(--primary-default)' }}>
        결제하기
      </Button>
    </div>
  );
}
