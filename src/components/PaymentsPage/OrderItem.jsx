import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import useTotalStore from '../../stores/useTotalStore';
import NumberPicker from '../ProductDetail/NumberPicker';
import { useProductStore } from '../../stores/useProductStore';
import useDeliveryStore from '../../stores/useDeliveryStore';
import supabase from '../../services/supabaseClient';
import { useAuthStore } from '../../stores/useAuthStore';
import { useOrderItemStore } from '../../stores/useOrderItemStore';

const OrderItem = ({ product }) => {
  const { quantity, setQuantity } = useTotalStore();
  const handleCountChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  console.table(product);

  return (
    <Grid container spacing={2}>
      <Grid item>
        <img
          src={product.info.image_url_1}
          alt={product.info.product_name}
          style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover' }}
        />
      </Grid>
      <Grid item xs={12} sm container sx={{ marginTop: '10px' }}>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
              {product.info.product_name}
            </Typography>
            <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }}>{product.info.price.toLocaleString()}원</Typography>
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
    </Grid>
  );
};

export default OrderItem;
