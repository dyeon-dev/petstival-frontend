// 제품 상세 정보 페이지
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../stores/useProductStore';
import ItemSelectContainer from '../../components/ProductDetail/ItemSelectContainer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ProductDetailPage.module.css';

const ProductDetailPage = () => {
  // url에서 id 가져옴
  const { id } = useParams();
  const navigate = useNavigate();
  // Zustand에서 제품 데이터 가져오기
  const product = useProductStore((state) => state.getProductById(id));

  const handleAddToCart = () => {
    // 장바구니 페이지로 이동
    navigate('/cart');
  };

  const handleBuyNow = () => {
    navigate(`/products/${id}/order`)
  };

  return (
    <>
    <Header />
    <div className={styles.detailContainer}>
      {/* 제품 이미지 - 이미지 스토리지에 넣은 URL 사용 */}
      <img
        src="https://hfnchwvpqruwmlehusbs.supabase.co/storage/v1/object/public/test/test-img.png?t=2024-10-29T04%3A54%3A48.164Z"
        alt={product.title}
        className={styles.productDetailImage}
      />
      {/* 제품 제목, 설명, 가격 */}
      <div className={styles.infoTextWrapper}>
        <h2 className={styles.titleText}>{product.title}</h2>
        <p className={styles.contentText}>
          댕댕이와 피크닉에 꼭 필요한
          <br />
          피크닉 매트 + 텀블러 + 신발 세트
        </p>
        <p className={styles.priceTextOrange}>{product.price}원</p>
      </div>
      {/* 수량 선택 및 가격 표시 컴포넌트 삽입 */}
      <ItemSelectContainer price={product.price} />
      {/* 버튼 영역 */}
      <div className={styles.buttonWrapper}>
        <button onClick={handleAddToCart}>장바구니</button>
        <button onClick={handleBuyNow}>구매하기</button>
      </div>
    </div>
    <Navbar selectedMenu="Shop" />
    </>
  );
};

export default ProductDetailPage;
