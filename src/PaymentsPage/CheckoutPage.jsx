import { useEffect, useRef, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { v4 as uuidv4 } from 'uuid';
import './style.css';
import { createClient } from '@supabase/supabase-js';

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = import.meta.env.VITE_CLIENT_SECRET_KEY;;

const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

export function CheckoutPage() {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  // ------ 주문의 결제 금액 설정 ------
  const [amount, setAmount] = useState({
  currency: "KRW",
  value: 50000,
  });

  // supabase POST
  const postTestData = async (orderId, amountValue) => {
    const dataToPost = {
      orderId: orderId,
      amount: amountValue,
    };
    // payment_info table에 정보를 업데이트
    const { data, error } = await supabase.from('payment_info').upsert([dataToPost]);

    if (error) {
      console.error('Error posting data:', error);
      return;
    }

    //console.log('Data posted successfully:', data);
  };



  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
      const tossPayments = await loadTossPayments(clientKey); // 클라이언트 키로 TossPayments() 초기화 메서드를 호출하면 토스페이먼츠 객체가 생성된다.
      const customerKey = uuidv4()
      const widgets = tossPayments.widgets({ customerKey: customerKey });
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    } 

    fetchPaymentWidgets();
  }, [clientKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      /**
       * 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
       * renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
       * @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
       */
      await widgets.setAmount(amount);

      await Promise.all([
        /**
         * 결제창을 렌더링합니다.
         * @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
         */
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          // 렌더링하고 싶은 결제 UI의 variantKey
          // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
          // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
          variantKey: "DEFAULT",
        }),
        /**
         * 약관을 렌더링합니다.
         * @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
         */
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);


  return (
    <div className="wrapper w-100">
      <div className="max-w-540 w-100">
      {/* <!-- 결제 UI --> */}
        <div id="payment-method" className="w-100" />
        {/* <!-- 이용약관 UI --> */}
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
        {/* // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------ */}
        {/* <!-- 결제하기 버튼 --> */}
          <button
            className="btn primary w-100"
            onClick={async () => {
              try {
                const orderId = generateRandomString();
                await postTestData(orderId, amount.value);

                await widgets?.requestPayment({
                  orderId: orderId, // 고유 주문번호
                  orderName: "토스 티셔츠 외 2건",
                  customerName: "김토스",
                  customerEmail: "customer123@gmail.com",
                  customerMobilePhone: "01012341234",
                  successUrl: window.location.origin + "/success" + window.location.search,
                  failUrl: window.location.origin + "/fail" + window.location.search
                });
              } catch (error) {
                // TODO: 에러 처리
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}