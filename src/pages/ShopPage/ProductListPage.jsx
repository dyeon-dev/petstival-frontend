// 쇼핑 페이지
import React, { useState } from 'react';
import styled from 'styled-components';
import ShopTabBar from '../../components/ProductList/ShopTabBar';
import ProductItem from '../../components/ProductList/ProductItem';
import styles from './ProductListPage.module.css';
import picnicImage from '../../assets/picnic.svg';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';

const Wrapper = styled.section`
  margin-left: 28px;
`;

const ProductListPage = () => {
  const [activeTab, setActiveTab] = useState('전체'); // 상위 컴포넌트에서 activeTab 상태 관리

  const products = [
    //keywords 제품과 관련된 키워드 > 필터링에 사용될 수 있도록 만들어 보았습니다
    { id: 1, title: '하루치카 버블츄 중대형 톱니형 덴탈껌', price: '12,000', imageSrc: picnicImage, keywords: ['덴탈껌'] },
    { id: 2, title: '하루조이 해피카우 펫밀크 100ml', price: '5,000', imageSrc: picnicImage, keywords: ['펫밀크'] },
    { id: 3, title: '독 레날 캔 410g', price: '30,000', imageSrc: picnicImage, keywords: ['캔'] },
    { id: 4, title: '독 레날 스몰독 1.5kg', price: '25,000', imageSrc: picnicImage, keywords: ['kg'] },
    { id: 5, title: '강아지 배변 봉투', price: '3,000', imageSrc: picnicImage, keywords: ['위생', '배변'] },
    { id: 6, title: '고양이 모래', price: '10,000', imageSrc: picnicImage, keywords: ['위생', '배변'] },
    { id: 7, title: '강아지 겨울 외투', price: '25,000', imageSrc: picnicImage, keywords: ['의류'] },
    { id: 8, title: '강아지와 함께하는 피크닉 세트', price: '39,800', imageSrc: picnicImage, keywords: ['장난감'] },
    { id: 9, title: '강아지 공', price: '8,000', imageSrc: picnicImage, keywords: ['장난감'] },
  ];

  const filteredProducts = products.filter((product) => {
    if (activeTab === '전체') return true; // 모든 제품 반환
    if (activeTab === '사료/간식') {
      return ['간식', '덴탈껌', '펫밀크', '캔', 'kg'].some((keyword) => product.title.includes(keyword));
    }
    if (activeTab === '위생/배변') {
      return ['배변', '모래'].some((keyword) => product.title.includes(keyword));
    }
    if (activeTab === '의류') {
      return ['외투'].some((keyword) => product.title.includes(keyword));
    }
    if (activeTab === '장난감') {
      return ['공', '피크닉'].some((keyword) => product.title.includes(keyword));
    }
    return false; // 다섯 개의 조건에 해당되지 않는 경우
  });

  return (
    <>
      <Header />
      <Wrapper>
        <ShopTabBar activeTab={activeTab} onTabChange={setActiveTab} /> {/* activeTab을 ShopTabBar로 전달 */}
        <div className={styles.itemWrapper}>
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} id={product.id} title={product.title} price={product.price} imageSrc={product.imageSrc} />
          ))}
        </div>
      </Wrapper>
      <Navbar selectedMenu="Shop" />
    </>
  );
};

export default ProductListPage;
