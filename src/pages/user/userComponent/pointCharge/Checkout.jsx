import UserAPI from "../../../../apis/user.api";
import { Cookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import style from "../../../../styles/toss.module.css"; 

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

export function CheckoutPage() {
  const cookies = new Cookies();
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const agreementWidgetRef = useRef(null);
  const [price, setPrice] = useState(1000);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = cookies.get("accessToken");
        const info = await UserAPI.getUserInfo(accessToken);
        setUserInfo(info);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  },);

  useEffect(() => {
    (async () => {
      const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;
      const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 customerKey
      if (paymentWidgetRef.current == null) {
        paymentWidgetRef.current = paymentWidget;
      }

      /**
       * 결제창을 렌더링합니다.
       * @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods%EC%84%A0%ED%83%9D%EC%9E%90-%EA%B2%B0%EC%A0%9C-%EA%B8%88%EC%95%A1
       */
      const paymentMethodsWidget = paymentWidgetRef.current.renderPaymentMethods(
        "#payment-method",
        { value: price },
        { variantKey: "DEFAULT" }
      );

      /**
       * 약관을 렌더링합니다. 
       * @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement%EC%84%A0%ED%83%9D%EC%9E%90-%EC%98%B5%EC%85%98
       */
      agreementWidgetRef.current = paymentWidgetRef.current.renderAgreement('#agreement', { variantKey: 'DEFAULT' });

      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, [price]);

  return (
    <div className={`${style.wrapper} ${style.flex} ${style.flexColumn} ${style.alignCenter}`}>
      <div className={`${style.maxW720} ${style.w100}`}>
        <div id="payment-method" className={style.w100} />
        <div id="agreement" className={style.w100} />
        <div className={`${style.btnWrapper} ${style.w100}`}>
        <p><input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            className={`${style.w100} ${style.input}`}
            placeholder="결제할 포인트"
          />
        <span className={style.textCenter}>P</span></p>
          <button
            className={`${style.btn} ${style.primary} ${style.w100}`}
            onClick={async () => {
              const paymentWidget = paymentWidgetRef.current;

              try {
                /**
                 * 결제 요청
                 * @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment%EA%B2%B0%EC%A0%9C-%EC%A0%95%EB%B3%B4
                 */
                await paymentWidget?.requestPayment({
                  orderId: generateRandomString(),
                  orderName: "와쩝 포인트",
                  customerName: userInfo.nickName,
                  customerEmail: userInfo.email,
                  amount: price,
                  successUrl: window.location.origin + "/user/toss/success" + window.location.search,
                  failUrl: window.location.origin + "/user/toss/fail" + window.location.search
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