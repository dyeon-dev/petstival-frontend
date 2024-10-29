import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import PopularPetstival from '../../components/HomePage/PopularPetstival';
import Navbar from '../../components/Navbar/Navbar';


const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

function HomePage() {
    
  return (
    <div>
      <Header />
      <Wrapper>
        <PopularPetstival />
      </Wrapper>
      <Navbar selectedMenu="MyPage" />
    </div>
  );
}

export default HomePage;
