import React from 'react';
import styled from 'styled-components';
import Header from "../../components/Header/Header";
import MyProfile from "../../components/Mypage/MyProfile";
import MyRecentHistory from "../../components/Mypage/MyRecentHistory";
import MyAccount from "../../components/Mypage/MyAccount";

const Wrapper = styled.section`
    margin-left: 24px;
    margin-right: 24px;
`;

function MyPage() {
  return (
    <>
    <Header />
      <Wrapper>
        <MyProfile />
        <MyRecentHistory />
        <MyAccount />
      </Wrapper>
    </>
  );
}

export default MyPage;
