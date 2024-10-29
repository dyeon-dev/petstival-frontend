// 제품 상세 정보 페이지
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../stores/useProductStore';
import ItemSelectContainer from '../../components/ProductDetail/ItemSelectContainer';
import { Button } from '../../stories/Button';
import styles from './ProductDetailPage.module.css';

const ProductDetailPage = () => {
  // url에서 id 가져옴
  const { id } = useParams();
  const navigate = useNavigate();
  // Zustand에서 제품 데이터 가져오기 (ID를 숫자로 변환) --> 근데 아직 상품 데이터 없으니까 하드코딩으로 해도 괜찮을 것 같고...
  const product = useProductStore((state) => state.getProductById(Number(id)));

  const handleAddToCart = () => {
    // 장바구니 페이지로 이동
    navigate('/cart');
  };

  const handleBuyNow = () => {
    alert('구매하기 버튼이 클릭되었습니다!'); // 다연님이 만든 페이지로 이동할 수 있게끔 로직 수정
  };

  return (
    <div className={styles.detailContainer}>
      {/* 제품 이미지 - 이미지 스토리지에 넣은 URL 사용 */}
      <img
        src="https://hfnchwvpqruwmlehusbs.supabase.co/storage/v1/object/sign/product-img/test-img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9kdWN0LWltZy90ZXN0LWltZy5wbmciLCJpYXQiOjE3Mjk4MTU1MTYsImV4cCI6MTczMjQwNzUxNn0.gMo6v5s3Fm4KFfooLtRGbJYPqxKk8cxIToUuCk4kMEg&t=2024-10-25T00%3A18%3A36.276Z"
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
        <Button variant="cartButton" text="장바구니에 넣기" onClick={handleAddToCart} />
        <Button variant="buyButton" text="구매하기" onClick={handleBuyNow} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
