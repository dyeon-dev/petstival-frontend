import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import PopularPetstival from '../../components/HomePage/PopularPetstival';
import RecommendCommerce from '../../components/HomePage/RecommendCommerce';
import Category from '../../components/HomePage/Category';
import Navbar from '../../components/Navbar/Navbar';


const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

function HomePage() {
    
  return (
    <div className="no-height">
      <Header />
      <Wrapper>
        <PopularPetstival />
        <RecommendCommerce />
        <Category />
      </Wrapper>
      <Navbar selectedMenu="Home" />
    </div>
  );
}

export default HomePage;
