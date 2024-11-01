// 제품 상세 정보 페이지
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../stores/useProductStore';
import { useAuthStore } from '../../stores/useAuthStore';
import useTotalStore from '../../stores/useTotalStore'; // 장바구니 상태 가져오기
import ItemSelectContainer from '../../components/ProductDetail/ItemSelectContainer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ProductDetailPage.module.css';
import ButtonMedium from '../../components/Common/Button/ButtonMedium';
import { useCartStore } from '../../stores/useCartStore';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { fetchProducts, getProductById } = useProductStore();
  const [product, setProduct] = useState(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  // 장바구니 store에 선택한 상품을 추가하는 함수
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loadProduct = async () => {
    await fetchProducts();
    const foundProduct = getProductById(id);
    setProduct(foundProduct);
  };

  const cartItems = useCartStore((state) => state.cartItems);

  // ItemSelectedContainer에서 변경되는 수량 정보를 저장하는 상태 변수
  const [cartQuantity, setCartQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [fetchProducts, getProductById, id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  // const handleAddToCart = () => {
  //   if (!user) {
  //     navigate('/login');
  //   } else {
  //     const updatedCartItems = addCartItem({
  //       productId: product.product_id,
  //       unitPrice: product.price,
  //       quantity: cartQuantity,
  //     });
  //     console.log(updatedCartItems);
  //     navigate('/cart'); // 장바구니 페이지로 이동
  //   }
  // };
  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
    } else {
      const updatedCartItems = addCartItem({
        productId: product.product_id,
        unitPrice: product.price,
        quantity: cartQuantity,
        productName: product.product_name, // 상품명 추가
        imageSrc: product.image_url_1, // 상품 이미지 추가
      });
      console.log(updatedCartItems);
      navigate('/cart'); // 장바구니 페이지로 이동
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/products/${id}/order`);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.detailContainer}>
        <img src={product.image_url_1} alt={product.product_name} />
        <div className={styles.infoTextWrapper}>
          <h2 className={styles.titleText}>{product.product_name}</h2>
          <p className={styles.contentText}>{product.contents}</p>
          <p className={styles.priceTextOrange}>{product.price.toLocaleString()}원</p>
        </div>
        <ItemSelectContainer price={product.price} setCartQuantity={setCartQuantity} />
        <div className={styles.buttonWrapper}>
          <ButtonMedium children={'장바구니 담기'} sub={'secondary'} onClick={handleAddToCart} />
          <ButtonMedium children={'구매하기'} sub={'primary'} onClick={handleBuyNow} />
        </div>
      </div>
      <Navbar selectedMenu="Shop" />
    </>
  );
};

export default ProductDetailPage;
