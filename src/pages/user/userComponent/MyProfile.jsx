import style from "../../../styles/user.module.css";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import UserAPI from "../../../apis/user.api";

export default function MyProfile() {
  const cookies = new Cookies();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleUser = async (e) => {
    e.preventDefault();
    try {
      const accessToken = cookies.get("accessToken");
      const data = await UserAPI.getUser(accessToken, password);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSecession = async (e) => {
    e.preventDefault();
    try {
      const accessToken = cookies.get("accessToken");
      const data = await UserAPI.secession(accessToken, password);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!user) {
    return (
      <>
        <div className={style.mainContainer}>
          <p className={style.mainTitle}>My Profile</p>
          <div className={style.getInfo}>
            <h3>비밀번호를 입력하세요.</h3>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{margin:'30px auto'}}>
              <button onClick={handleUser}>내 정보 조회하기</button>
              <button onClick={handleSecession}>탈퇴하기</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={style.mainContainer}>
        <p className={style.mainTitle}>My Profile</p>
        <form className={style.contents} onSubmit={handleSubmit}>
          <h4>이메일</h4>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <h4>새 비밀번호</h4>
          <input
            type="password"
            name="newPassword"
            placeholder="새 비밀번호를 입력해주세요."
            onChange={handleChange}
          />
          <h4>새 비밀번호 확인</h4>
          <input
            type="password"
            name="newCheckPassword"
            placeholder="새 비밀번호 확인을 입력해주세요."
            onChange={handleChange}
          />
          <h4>이름</h4>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <h4>닉네임</h4>
          <input
            type="text"
            name="nickName"
            value={user.nickName}
            onChange={handleChange}
          />
          <h4>휴대전화번호</h4>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
          <h4>성별</h4>
          <input
            type="text"
            name="gender"
            value={user.gender}
            onChange={handleChange}
          />
          <h4>생년월일</h4>
          <input
            type="date"
            name="birth"
            value={user.birth}
            onChange={handleChange}
          />
          <h4>문자메세지 수신 동의</h4>
          <input
            type="checkBox"
            name="smsConsent"
            value={user.smsConsent}
            onChange={handleChange}
          />
          <button type="submit">수정하기</button>
        </form>
      </div>
    </>
  );
}
