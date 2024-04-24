import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import style from "../../../../styles/toss.module.css";
import UserAPI from "../../../../apis/user.api";

export function SuccessPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isFinded, setIsFinded] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const cookies = new Cookies();

  async function confirmPayment() {
    const accessToken = cookies.get("accessToken");
    try {
      const data = { paymentKey, orderId, amount: parseInt(amount) };
      const response = await UserAPI.tossConfirm(accessToken, data);

      if (response) {
        setIsConfirmed(true);
      } else {
        console.error("API 호출 실패:", response.statusText);
      }
    } catch (error) {
      console.error("API 호출 중 오류:", error);
    }
  }

  async function cancelPayment() {
    const accessToken = cookies.get("accessToken");
    try {
      const data = { cancelReason: "", cancelAmount: parseInt(amount) };
      const response = await UserAPI.tossCancel(
        accessToken,
        data,
        paymentKey
      );

      if (response) {
        setIsCanceled(true);
      } else {
        console.error("API 호출 실패:", response.statusText);
      }
    } catch (error) {
      console.error("API 호출 중 오류:", error);
    }
  }

  async function checkPayment() {
    const accessToken = cookies.get("accessToken");
    try {
      const response = await UserAPI.tossFind(accessToken, paymentKey);

      if (response) {
        setIsFinded(true);
        setPaymentInfo(response);
      } else {
        console.error("API 호출 실패:", response.statusText);
      }
    } catch (error) {
      console.error("API 호출 중 오류:", error);
    }
  }

  return (
    <div className={`${style.wrapper} ${style.w100}`}>
      {isCanceled ? (
        <div
          className={`${style.flexColumn} ${style.alignCenter} ${style.confirmSuccess} ${style.w100} ${style.maxW540}`}
        >
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            alt="결제 취소 완료"
            width="120"
            height="120"
          />
          <h2 className={style.title}>결제가 성공적으로 취소되었어요.</h2>
        </div>
      ) :  isFinded ? (
        <div
          className={`${style.flexColumn} ${style.alignCenter} ${style.confirmSuccess} ${style.w100} ${style.maxW540}`}
        >
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            alt="결제 내역:"
            width="120"
            height="120"
          />
          <h2 className={style.title}>결제 내역</h2>
          <div className={style.paymentInfo}>
            <p>주문명: {paymentInfo.orderName}</p>
            <p>결제 금액: {paymentInfo.totalAmount}원</p>
            <p>결제 방법: {paymentInfo.method}</p>
            <p>결제 일시: {paymentInfo.approvedAt}</p>
          </div>
          <button
            className={`${style.btn} ${style.w100}`}
            onClick={cancelPayment}
          >
            결제 취소하기
          </button>
        </div>
      )  : isConfirmed ? (
        <div
          className={`${style.flexColumn} ${style.alignCenter} ${style.confirmSuccess} ${style.w100} ${style.maxW540}`}
        >
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            alt="결제 완료"
            width="120"
            height="120"
          />
          <h2 className={style.title}>결제를 완료했어요</h2>

          <div className={`${style.w100} ${style.buttonGroup}`}>
            <div
              className={style.flex}
              style={{ marginTop: "16px", gap: "16px" }}
            >
              <button
                className={`${style.btn} ${style.w100}`}
                onClick={cancelPayment}
              >
                결제 취소하기
              </button>
              <button
                className={`${style.btn} ${style.w100}`}
                onClick={checkPayment}
                target="_blank"
                rel="noopner noreferer"
              >
                결제 내역 확인하기
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${style.flexColumn} ${style.alignCenter} ${style.confirmLoading} ${style.w100} ${style.maxW540}`}
        >
          <div className={`${style.flexColumn} ${style.alignCenter}`}>
            <img
              src="https://static.toss.im/lotties/loading-spot-apng.png"
              alt="로딩 중"
              width="120"
              height="120"
            />
            <h2 className={`${style.title} ${style.textCenter}`}>
              결제 요청까지 성공했어요.
            </h2>
            <h4 className={`${style.description} ${style.textCenter}`}>
              결제 승인하고 완료해보세요.
            </h4>
          </div>
          <div className={style.w100}>
            <button
              className={`${style.btn} ${style.primary} ${style.w100}`}
              onClick={confirmPayment}
            >
              결제 승인하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}