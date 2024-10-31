import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import useTotalStore from '../../stores/useTotalStore';
import NumberPicker from '../ProductDetail/NumberPicker';
import { useProductStore } from '../../stores/useProductStore';
import ButtonLarge from '../../components/Common/Button/ButtonLarge';

export default function OrderInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchProducts, getProductById } = useProductStore();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      await fetchProducts();
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
    };
    loadProduct();
  }, [fetchProducts, id]);

  const { quantity, totalPrice, setQuantity } = useTotalStore();
  const handleCountChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handlePayment = () => {
    navigate('/payment');

    // const postTestData = async () => {
    //   const dataToPost = {
    //     content: inputText,
    //   };
      
    //   // test table에 정보를 업데이트
    //   const { data, error } = await supabase.from('order').upsert([dataToPost]);
  
    //   if (error) {
    //     console.error('Error posting data:', error);
    //     return;
    //   }
  
    //   console.log('Data posted successfully:', data);
    // };
  
  };

  // 위치가 중요함...
  if (!product) {
    return <p>Loading product data...</p>;
  }

  return (
    <div>
      <h3>주문 상품</h3>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '5px',
          maxWidth: 600,
          flexGrow: 1,
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <img src={product.image_url_1} alt={product.product_name} style={{ width: '418px', height: '264px', objectFit: 'cover' }} />
          </Grid>
          <Grid item xs={12} sm container sx={{ marginTop: '10px' }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  {product.product_name}
                </Typography>
                <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }}>{product.price.toLocaleString()}원</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={2} sx={{ marginLeft: '5px', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item xs={6}>
              <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
                수량 변경
              </Typography>
            </Grid>
            <NumberPicker onCountChange={handleCountChange} initialCount={quantity} />
          </Grid>
          <Grid item container spacing={2} sx={{ marginLeft: '5px', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item xs={6}>
              <Typography variant="body2" component="div">
                총 주문 금액
              </Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end" alignItems="center" sx={{ color: 'var(--secondary-orange-default)', fontWeight: 'bold' }}>
              {totalPrice.toLocaleString()}원
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
