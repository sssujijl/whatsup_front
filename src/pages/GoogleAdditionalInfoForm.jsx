import { useState, useEffect, useMemo } from 'react';
import { Cookies } from "react-cookie";
import UserAPI from '../apis/user.api';
import styles from '../styles/additionalInfoForm.module.css'; // CSS 모듈 임포트

export default function AdditionalInfoForm() {
  const cookies = useMemo(() => new Cookies(), []); 
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = cookies.get("accessToken");
        setAccessToken(token);
        const info = await UserAPI.getUserInfo(token);
        setUserInfo(info);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [cookies]);

  const [formData, setFormData] = useState({
    birth: '',
    gender: '',
    phone: '',
    nickName: '',
    smsConsent: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (gender) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: gender,
    }));
  };

  const handleSmsConsentChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      smsConsent: !prevData.smsConsent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserAPI.submitAdditionalInfo(accessToken, formData);
      console.log(response);
      response ? alert('성공적으로 가입되었습니다!') : alert('문제가 발생했습니다!')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["form-container"]}>
      <h2 className={styles["form-title"]}>추가 정보 입력</h2>
      <div className={styles["form-group"]}>
        <label htmlFor="birth">생년월일</label>
        <input
          type="date"
          id="birth"
          name="birth"
          value={formData.birth}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles["form-group"]}>
        <label>성별</label>
        <div className={styles["gender-buttons"]}>
          <button
            type="button"
            onClick={() => handleGenderChange('M')}
            className={`${styles["gender-button"]} ${formData.gender === "M" ? styles["active"] : ""}`}
          >
            남성
          </button>
          <button
            type="button"
            onClick={() => handleGenderChange('F')}
            className={`${styles["gender-button"]} ${formData.gender === "F" ? styles["active"] : ""}`}
          >
            여성
          </button>
        </div>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="phone">전화번호</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="nickName">닉네임</label>
        <input
          type="text"
          id="nickName"
          name="nickName"
          value={formData.nickName}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles["form-group"]}>
      <label htmlFor="smsConsent" className={styles["checkbox-label"]}>
          <span className={styles["checkbox-text"]}>SMS 수신 동의</span>
        </label>
        <input
          type="checkbox"
          id="smsConsent"
          name="smsConsent"
          checked={formData.smsConsent}
          onChange={handleSmsConsentChange}
          className={styles.checkbox}
        />

      </div>
      <button type="submit" className={styles.button}>저장</button>
    </form>
  );
}
