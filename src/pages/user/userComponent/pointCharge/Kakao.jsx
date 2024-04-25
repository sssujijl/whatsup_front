import { Cookies } from "react-cookie";
import { useEffect, useMemo, useState } from "react";
import UserAPI from "../../../../apis/user.api";
import style from "../../../../styles/kakaopay.module.css"

export function KakaoPay() {
  const cookies = useMemo(() => new Cookies(), []); 
  const [userInfo, setUserInfo] = useState(null);
  const [IMPReady, setIMPReady] = useState(false);
  const [price, setPrice] = useState(1000);
  const [paymentResult, setPaymentResult] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = cookies.get("accessToken");
        setAccessToken(token);
        const info = await UserAPI.getUserInfo(accessToken);
        setUserInfo(info);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();

    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    script.async = true;
    script.onload = () => {
      const IMP = window.IMP;
      IMP.init(process.env.REACT_APP_PORTONE_VERIFY);

      setIMPReady(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [cookies, accessToken]);

  const generateMerchantUID = () => {
    return 'IMP' + new Date().getTime();
  };

  const handleRequestPay = () => {
    if (!userInfo) {
      console.log("사용자 정보를 불러올 수 없습니다.");
      return;
    }

    if (!IMPReady) {
      console.log("결제 모듈을 불러올 수 없습니다.");
      return;
    }

    if (price <= 0) {
        console.log("유효한 가격을 입력해주세요.");
        return;
      }

    const IMP = window.IMP;

    const merchant_uid = generateMerchantUID();

    IMP.request_pay({
      pg: `kakaopay.${process.env.REACT_APP_KAKAOPAY_CID}`,
      merchant_uid: merchant_uid,
      name: '왔쩝 포인트',
      amount: price,
      buyer_email: userInfo.email,
      buyer_name: userInfo.name,
    }, async (rsp) => {
      if (rsp.success) {
        try {
          const data = await UserAPI.updatePoint(accessToken, price);
          if (!data) {
            const cancelResult = await UserAPI.cancelPayment(accessToken, merchant_uid);
            return cancelResult ? alert('포인트 충전 중 오류가 발생하여 결제가 취소되었습니다.') : alert('포인트 충전 실패로 인한 결제 취소 요청 중 오류가 발생하였습니다.')
          }
          setPaymentResult(rsp);          
          setCurrentPoint(data);
        } catch (error) {
          console.log('포인트 충전 중 오류가 발생했습니다:', error);
        }
      } else {
        console.log('결제 실패');
        console.log('에러 메시지: ', rsp.error_msg);
      }
    });
  };

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };

  return (
    <div className={style.paymentContainer}>
      <div className={style.paymentBox}>
        <div className={style.paymentHeader}>
        <h1 className={style.title}>KakaoPay 결제</h1>
        </div>
        <div className={style.paymentBody}>
          <p className={style.inputGuide}>결제할 금액을 입력해주세요</p>
          <div className={style.inputContainer}>
            <input
              type="number"
              value={price === 0 ? '' : price}
              onChange={handlePriceChange}
              className={style.priceInput}
              placeholder="금액을 입력하세요"
            />
            <span className={style.priceUnit}>P</span>
          </div>
          <button onClick={handleRequestPay} className={style.payButton}>
            결제하기
          </button>
          {paymentResult && (
            <div className={style.paymentResult}>
              <p className={style.success}>결제 성공!</p>
              <p>결제 고유번호: {paymentResult.imp_uid}</p>
              <p>상점 거래고유번호: {paymentResult.merchant_uid}</p>
              <p>결제 금액: {paymentResult.paid_amount}</p>
              <p>카드 승인번호: {paymentResult.apply_num}</p>
              <p className={style.currentPoint}>충전 후 포인트: {currentPoint}</p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}
