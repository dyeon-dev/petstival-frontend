// 제품 상세 정보 페이지
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../stores/useProductStore';
import { useAuthStore } from '../../stores/useAuthStore';
import ItemSelectContainer from '../../components/ProductDetail/ItemSelectContainer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ProductDetailPage.module.css';
import ButtonMedium from '../../components/Common/Button/ButtonMedium';
import { useCartStore } from '../../stores/useCartStore';
import YesNoModal from '../../components/Common/Modal/YesNoModal';

// TODO 장바구니에 아이템 담은 후 장바구니 페이지로 이동? y/n 모달, 실패 모달(defaultModal) 띄우기
// [x] 장바구니 담기 버튼 클릭 시 addCartItem 실행
// [x] 이미 아이템이 cartStore에 있는 경우 updateCartItem을 실행하는 로직 추가
// [ ] DB 저장 await, DB 저장이 완료되면 setModalOpen(true)
// [ ] YesNoModal의 Y 버튼 클릭 시 장바구니 페이지로 이동

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { user } = useAuthStore();
  const { fetchProducts, getProductById } = useProductStore();
  const cartItems = useCartStore((state) => state.cartItems); // 장바구니에 store에 담겨 있는 아이템 정보
  const addCartItem = useCartStore((state) => state.addCartItem); // 장바구니 store에 선택한 상품을 추가하는 함수
  const updateCartItem = useCartStore((state) => state.updateCartItem); // 장바구니 store에 선택한 상품을 추가하는 함수

  const loadProduct = async () => {
    await fetchProducts();
    const foundProduct = getProductById(id);
    setProduct(foundProduct);
  };

  // ItemSelectedContainer에서 변경되는 수량 정보를 저장하는 상태 변수
  const [cartQuantity, setCartQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [fetchProducts, getProductById, id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
    } else {
      // cartStore에 이미 해당 상품이 담겨있는지 검사
      const prevItem = cartItems.find((item) => item.productId === product.product_id);

      // 이미 상품이 담겨있는 경우 수량만 업데이트
      if (prevItem) {
        updateCartItem({
          productId: prevItem.productId,
          quantity: prevItem.quantity + cartQuantity, // 상품 수량 업데이트
        });
      } else {
        addCartItem({
          productId: product.product_id,
          unitPrice: product.price,
          quantity: cartQuantity,
        });
      }
      setIsConfirmModalOpen(true);
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
      <YesNoModal
        title={`장바구니 확인`}
        content={`장바구니에 상품을 담았어요.\n장바구니로 이동할까요?`}
        isOpen={isConfirmModalOpen}
        setIsOpen={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
        onYesClick={() => navigate('/cart')}
      />
    </>
  );
};

export default ProductDetailPage;
