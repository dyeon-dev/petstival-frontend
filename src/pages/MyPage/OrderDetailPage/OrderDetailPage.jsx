import React from 'react';
import styled from 'styled-components';
import Navbar from '../../../components/Navbar/Navbar';
import image1 from '../../../assets/info_image.png';
import { useNavigate } from "react-router-dom";
import OrderInfo from "../../../components/Mypage/OrderDetailPage/OrderInfo";
import MyOrder from '../../../components/Mypage/MyOrder';
import DeliveryInfo from "../../../components/Mypage/OrderDetailPage/DeliveryInfo";

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(24, 119, 242, 0.08);
`;

const OrderText = styled.div`
  flex: 1;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px;
`;

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

const itemData = [
  {
    img: image1,
    title: '강아지와 함께하는 피크닉 세트',
    amount: '1',
    price: 39800,
    dateTime: '2024.10.23 01:17',
    status: '결제 완료',
  },
  {
    img: image1,
    title: '강아지와 함께하는 물놀이 세트',
    amount: '1',
    price: 39800,
    dateTime: '2024.10.23 01:17',
    status: '결제 완료',
  },

  {
    img: image1,
    title: '강아지와 함께하는 피크닉 세트',
    amount: '2',
    price: 39800,
    dateTime: '2024.10.22 01:17',
    status: '결제 완료',
  },
  {
    img: image1,
    title: '강아지와 함께하는 물놀이 세트',
    amount: '2',
    price: 39800,
    dateTime: '2024.10.22 01:17',
    status: '결제 완료',
  },
];

// 아이템 데이터를 날짜별로 그룹화하는 함수
const groupItemsByDate = (items) => {
  return items.reduce((acc, item) => {
    const date = item.dateTime.split(' ')[0]; // 날짜만 추출
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
};
const groupedItems = groupItemsByDate(itemData);

function OrderDetailPage() {
  const navigate = useNavigate();

   // TODO: 해당 날짜 아이템만 가져오기
   // TODO: 해당 날짜 아이템만 토대로 주문 내역 컴포넌트 다시 만들기 (현재 임시 컴포넌트)
  return (
    <>
      <Header>
        <div onClick={() => window.history.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M11.9473 1.00338C11.9471 1.26851 11.8416 1.52269 11.654 1.71005L6.5393 6.82472C6.38449 6.97949 6.26168 7.16324 6.1779 7.36548C6.09411 7.56771 6.05099 7.78448 6.05099 8.00338C6.05099 8.22229 6.09411 8.43905 6.1779 8.64129C6.26168 8.84353 6.38449 9.02728 6.5393 9.18205L11.6473 14.29C11.8295 14.4787 11.9303 14.7313 11.928 14.9935C11.9257 15.2556 11.8205 15.5065 11.6351 15.6919C11.4497 15.8773 11.1989 15.9824 10.9367 15.9847C10.6745 15.987 10.4219 15.8862 10.2333 15.7041L5.1253 10.6C4.43847 9.91188 4.05273 8.97932 4.05273 8.00705C4.05273 7.03478 4.43847 6.10223 5.1253 5.41405L10.24 0.29605C10.3798 0.156106 10.558 0.0607924 10.7521 0.0221697C10.9461 -0.0164531 11.1473 0.00335101 11.33 0.079076C11.5128 0.154801 11.669 0.283043 11.7789 0.447576C11.8888 0.612108 11.9474 0.805536 11.9473 1.00338Z"
              fill="#B8B8B8"
            />
          </svg>
        </div>
        <OrderText>주문 상세</OrderText>
      </Header>

      <Wrapper>
        <OrderInfo />
        <MyOrder />
        <DeliveryInfo />
      </Wrapper>
      <Navbar />
    </>
  );
}

export default OrderDetailPage;
