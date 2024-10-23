import React from 'react';
import styled from 'styled-components';
import OrderList from '../../../components/Mypage/OrderPage/OrderList';
import Navbar from '../../../components/Navbar/Navbar';
import image1 from '../../../assets/info_image.png';

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
];

function OrderPage() {
  return (
    <>
      <Wrapper>
        {itemData.map((item, index) => (
          <OrderList key={index} item={item} />
        ))}
      </Wrapper>
      <Navbar />
    </>
  );
}

export default OrderPage;
