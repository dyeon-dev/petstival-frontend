import { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderList from '../../../components/Mypage/OrderPage/OrderList';
import Navbar from '../../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import DetailBar from '../../../stories/DetailBar';
import supabase from '../../../services/supabaseClient';

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

function OrderPage() {
  const navigate = useNavigate();
  const [successProduct, setSuccessProduct] = useState(null);

  const getSuccessData = async () => {
    // payment 테이블에서 payment_state가 success인 데이터만 order 테이블의 정보를 가져옴
    const { data, error } = await supabase.from('payment').select('order_id, order(*)').eq('payment_state', 'success');

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    if (data) {
      setSuccessProduct(data);
    }
  };

  useEffect(() => {
    getSuccessData();
  }, []);

  // 위치가 중요함...
  if (!successProduct) {
    return <p>Loading product data...</p>;
  }

  // 아이템 데이터를 날짜별로 그룹화하는 함수
  const groupItemsByDate = (items) => {
    return items.reduce((acc, item) => {
      const date = item.order.created_at.split('T')[0] // 날짜만 추출
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };
  const groupedItems = groupItemsByDate(successProduct);

  return (
    <>
      <DetailBar title="주문 내역" />

      <Wrapper>
        {Object.keys(groupedItems).map((date) => (
          <div key={date}>
            <Info>
              <h3>{date}</h3>
              <Detail onClick={() => navigate('/mypage/order/detail')}>주문 상세 &gt;</Detail>
            </Info>
            {groupedItems[date].map((item, index) => (
              <OrderList key={index} item={item} />
            ))}
          </div>
        ))}
      </Wrapper>
      <Navbar selectedMenu="MyPage" />
    </>
  );
}

export default OrderPage;
