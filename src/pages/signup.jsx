import styled from "styled-components";
import style from "../styles/signup.module.css";
import { useState } from "react";

const Title = styled.h1`
  font-family: "Pretendard";
  margin-bottom: 80px;
  margin: 30px 0 100px 30px;
`;

export default function Signup() {
  const [showTimer, setShowTimer] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // 중복 확인 버튼 클릭 시
  const handleCheckDuplicate = () => {
    // 중복 확인 로직...
    console.log(showTimer);
    // 타이머 시작
    setShowTimer(true);
    startTimer();
  };

  // 타이머 시작 함수
  const startTimer = () => {
    const timer = setInterval(() => {
      let time = remainingTime;
      setRemainingTime((time) => time - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
    }, remainingTime * 1000);
  };

  return (
    <>
      <div className={style.container}>
        <Title>이메일 회원가입</Title>
        <h4>이름</h4>
        <input type="text" placeholder="이름을 입력해주세요." />

        <h4>닉네임</h4>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          style={{ width: "247px" }}
        />
        <button className={style.checkBtn}>중복 확인</button>

        <h4>이메일</h4>
        <input
          type="email"
          placeholder="이메일을 입력해주세요."
          style={{ width: "247px" }}
        />
        <button className={style.checkBtn} onClick={handleCheckDuplicate}>
          중복 확인
        </button>
        {showTimer && (
          <IsVerifiedEmail
            setIsVerified={setIsVerified}
            remainingTime={remainingTime}
          />
        )}

        <h4>비밀번호</h4>
        <input type="password" placeholder="비밀번호를 입력해주세요." />

        <h4>비밀번호 확인</h4>
        <input type="password" placeholder="비밀번호 확인을 입력해주세요." />

        <h4>생년월일</h4>
        <input type="date" />

        <h4>휴대전화번호</h4>
        <input
          type="tel"
          placeholder="휴대전화번호를 입력해주세요."
          style={{ width: "247px" }}
        />
        <button className={style.checkBtn}>중복 확인</button>

        <h4 className={style.sms}>문자메세지 수신 동의</h4>
        <input
          type="checkbox"
          style={{ width: "25px", height: "25px" }}
          className={style.smsInput}
        />

        <button className={style.signupBtn}>회원가입하기</button>
      </div>
    </>
  );
}

function IsVerifiedEmail(props) {
  const [isHover, setHover] = useState(false);
  // 인증 확인 버튼 클릭 시
  const handleCheckVerification = () => {
    // 인증 확인 로직...

    // 인증 여부 설정
    props.setIsVerified(true);
  };

  // 시간 포맷 변환 함수 (분:초 형태로 변환)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  };

  const btnText =
    isHover === true ? "인증 확인" : formatTime(props.remainingTime);

  return (
    <>
      <div className={style.checkNumber}>
        <input
          type="text"
          placeholder="인증번호를 입력해주세요."
          onClick={handleCheckVerification}
          style={{ width: "247px" }}
        />
        <button
          className={style.checkBtn}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {btnText}
        </button>
      </div>
    </>
  );
}
