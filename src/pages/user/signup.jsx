import styled from "styled-components";
import style from "../../styles/signup.module.css";
import { useEffect, useState } from "react";
import UserAPI from "../../apis/user.api";
import { useNavigate } from "react-router-dom";

const Title = styled.h2`
  font-family: "Pretendard";
  text-align: center;
`;

export default function Signup() {
  let navigate = useNavigate();

  const [showTimer, setShowTimer] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180);
  const [isVerified, setIsVerified] = useState(false);

  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState(["남자", "여자"]);
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const format = {
        name,
        nickName,
        email,
        password,
        checkPassword,
        birth,
        gender,
        phone,
        smsConsent
      };
      await UserAPI.signUp(format);

      navigate('/login')
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckDuplicate = async (event) => {
    event.preventDefault();
    try {
      const formData = {nickName, phone};
      await UserAPI.checkDuplicate(formData);
      alert('사용 가능합니다.')
    } catch (error) {
      console.error(error);
      alert(`${nickName || phone} 중복되었습니다.`);
    }
  };

  // 이메일 중복확인 클릭 시 중복 확인 되면 바로 이메일 발송
  const handleCheckDuplicateEmail = async (event) => {
    event.preventDefault();
    try {
      await UserAPI.checkDuplicate({email});

      setShowTimer(true);
      startTimer();

      alert(`${email} 로 인증메일을 발송하였습니다.`)
    } catch (error) {
      console.error(error);
      alert(`${email} 중복되었습니다.`);
    }

  };

  // 타이머 시작 함수
  let timer;
  const startTimer = () => {
    timer = setInterval(() => {
      let time = remainingTime;

      setRemainingTime((time) => time - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
    }, remainingTime * 1000);
  };

  useEffect(() => {
    if (isVerified === true) {
      clearInterval(timer);
      setShowTimer(false);
      setRemainingTime(180);
      alert('인증이 완료되었습니다.')
    }
  }, [isVerified])

  useEffect(() => {
    if (remainingTime === 0) {
      setShowTimer(false);
      setRemainingTime(180);
      alert('인증시간이 만료되었습니다. 인증메일을 다시 발송하세요.');
    }
  }, [remainingTime])

  return (
    <>
      <div className={style.container}>
        <Title>이메일 회원가입</Title>
        <h4>이름</h4>
        <input
          type="text"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h4>닉네임</h4>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          style={{ width: "33.5%" }}
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <button className={style.checkBtn} onClick={handleCheckDuplicate}>
          중복 확인
        </button>

        <h4>이메일</h4>
        <input
          type="email"
          placeholder="이메일을 입력해주세요."
          style={{ width: "33.5%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={style.checkBtn} onClick={handleCheckDuplicateEmail}>
          {" "}
          중복 확인{" "}
        </button>
        {showTimer && (
          <IsVerifiedEmail
            email={email}
            setIsVerified={setIsVerified}
            remainingTime={remainingTime}
          />
        )}

        <h4>비밀번호</h4>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <h4>비밀번호 확인</h4>
        <input
          type="password"
          placeholder="비밀번호 확인을 입력해주세요."
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />

        <h4>생년월일</h4>
        <input
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />

        <h4>성별</h4>
        <div className={style.genderContainer}>
          <label>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={gender === "M"}
              onChange={() => setGender("M")}
            />
            <span
              className={style.m}
              style={
                gender === "M" ? { background: "rgb(230, 230, 230)" } : null
              }
            >
              남자
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={gender === "F"}
              onChange={() => setGender("F")}
            />
            <span
              className={style.f}
              style={
                gender === "F" ? { background: "rgb(230, 230, 230)" } : null
              }
            >
              여자
            </span>
          </label>
        </div>

        <h4>휴대전화번호</h4>
        <input
          type="tel"
          placeholder="휴대전화번호를 입력해주세요."
          style={{ width: "33.5%" }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className={style.checkBtn} onClick={handleCheckDuplicate}>중복 확인</button>

        <h4 className={style.sms}>문자메세지 수신 동의</h4>
        <input
          type="checkbox"
          style={{ width: "25px", height: "25px" }}
          className={style.smsInput}
          value={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
        />

        <button className={style.signupBtn} onClick={handleSignUp}>회원가입하기</button>
      </div>
    </>
  );
}

function IsVerifiedEmail(props) {
  const [isHover, setHover] = useState(false);
  const [checkVerificationCode, setCheckVerificationCode] = useState("");
  const email = props.email;

  const handleCheckVerification = async (event) => {
    event.preventDefault();
    try {
      await UserAPI.verificationCode({email, checkVerificationCode});

      props.setIsVerified(true);

      alert(`${email} 인증 성공하였습니다.`)
    } catch (error) {
      console.error(error);
      alert(`인증번호가 일치하지 않습니다.`);
    }
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
          style={{ width: "33.5%" }}
          value={checkVerificationCode}
          onChange={(e) => setCheckVerificationCode(e.target.value)}
        />
        <button
          onClick={handleCheckVerification}
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
