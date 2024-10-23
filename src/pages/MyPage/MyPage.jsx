import React from 'react';
import styled from 'styled-components';
import MyProfile from "../../components/Mypage/MyProfile";
import MyRecentHistory from "../../components/Mypage/MyRecentHistory";

const Wrapper = styled.section`
    margin-left: 24px;
    margin-right: 24px;
`;

function MyPage() {
  return (
    <>
      <Wrapper>
        <MyProfile />
        <MyRecentHistory />
      </Wrapper>
    </>
  );
}

export default MyPage;
