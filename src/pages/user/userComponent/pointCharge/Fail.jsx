import { useSearchParams } from "react-router-dom";
import style from "../../../../styles/toss.module.css"; 

export function FailPage() {
    const [searchParams] = useSearchParams();
    const errorCode = searchParams.get("code");
    const errorMessage = searchParams.get("message");
  
    return (
      <div className={`${style.wrapper} ${style.flex} ${style.flexColumn} ${style.alignCenter}`}>
        <div className={`${style.maxW540} ${style.w100}`}>
          <img
            src="https://static.toss.im/lotties/error-spot-apng.png"
            width="120"
            height="120"
            alt="결제 실패"
          />
          <h2 className={style.title}>결제를 실패했어요</h2>
          <div className={`${style.responseSection} ${style.w100}`}>
            <div className={`${style.flex} ${style.justifyBetween}`}>
              <span className={style.responseLabel}>code</span>
              <span id="error-code" className={style.responseText}>
                {errorCode}
              </span>
            </div>
            <div className={`${style.flex} ${style.justifyBetween}`}>
              <span className={style.responseLabel}>message</span>
              <span id="error-message" className={style.responseText}>
                {errorMessage}
              </span>
            </div>
          </div>
  
          <div className={`${style.buttonGroup} ${style.w100}`}>
            <a
              className={style.btn}
              href="https://developers.tosspayments.com/sandbox"
              target="_blank"
              rel="noreferrer noopener"
            >
              다시 테스트하기
            </a>
            <div className={style.flex} style={{ gap: "16px" }}>
              <a
                className={`${style.btn} ${style.w100}`}
                href="https://docs.tosspayments.com/reference/error-codes"
                target="_blank"
                rel="noreferrer noopener"
              >
                에러코드 문서보기
              </a>
              <a
                className={`${style.btn} ${style.w100}`}
                href="https://techchat.tosspayments.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                실시간 문의하기
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }