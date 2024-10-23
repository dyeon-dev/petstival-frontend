import React from 'react';
import styled from 'styled-components';
import OrderList from "../../../components/Mypage/OrderPage/OrderList";
import Navbar from "../../../components/Navbar/Navbar";

const Wrapper = styled.section`
    margin-left: 24px;
    margin-right: 24px;
`;

function OrderPage() {
  return (
    <>
      <Wrapper>
        <OrderList />
      </Wrapper>
      <Navbar />
    </>
  );
}

export default OrderPage;
