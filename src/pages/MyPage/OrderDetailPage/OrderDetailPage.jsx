import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../../components/Navbar/Navbar';
import OrderId from "../../../components/Mypage/OrderDetailPage/OrderId";
import MyOrder from '../../../components/Mypage/MyOrder';
import DeliveryInfo from "../../../components/Mypage/OrderDetailPage/DeliveryInfo";
import DetailBar from "../../../stories/DetailBar";
import { useSearchParams } from 'react-router-dom';
import supabase from '../../../services/supabaseClient';

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

function OrderDetailPage() {
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get('order_id');
  const [product, setProduct] = useState(null);

  const getProductData = async () => {
    // payment 테이블에서 payment_state가 success이고 order_id가 일치하는 데이터만 가져옴
    const { data, error } = await supabase
      .from('payment')
      .select('order_id, order(*)')
      .eq('payment_state', 'success')
      .eq('order_id', order_id)
      .single(); // 일치하는 정보 1개만 가져옴
    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    if (data) {
      setProduct(data);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (product) {
      console.log("Success Product:", product);
    }
  }, [product]);

  // 위치가 중요함...
  if (!product) {
    return <p>Loading product data...</p>;
  }

  return (
    <>
      <DetailBar title="주문 상세" />
      <Wrapper>
        <OrderId order_id={order_id} created_at={product.order.created_at} />
        <MyOrder />
        <DeliveryInfo />
      </Wrapper>
      <Navbar selectedMenu="MyPage" />
    </>
  );
}

export default OrderDetailPage;
