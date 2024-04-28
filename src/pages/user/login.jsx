import style from '../../styles/login.module.css'
import naver from '../../img/btnG_아이콘원형.png'
import kakao from '../../img/kakao_login.png'
import google from '../../img/web_neutral_rd_na@4x.png'
import UserAPI from '../../apis/user.api'
import GoogleLoginButton from '../googleLogin'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const formData = {email, password};
            const res = await UserAPI.signin(formData);
            if (res.statusCode === 200) {
                alert(res.message)
                window.location.replace('/');
            } else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error);
            alert('이메일 또는 비밀번호가 일치하지 않습니다.')
        }
    }

    return (
        <>            
        <div className={style.container}>
            <div className={style.input}>
                <h3 className={style.h3}>이메일</h3>
                <input 
                    type='email' 
                    placeholder='이메일을 입력하세요.' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={style.input}>
                <h3>비밀번호</h3>
                <input 
                    type='password' 
                    placeholder='비밀번호를 입력하세요.' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className={style.loginBtn} onClick={handleLogin}>로그인하기</button>
            <div className={style.imgContainer}>
                <img src={naver}/>
                <img src={kakao}/>
                <img src={google}/>
            </div>
        </div>
        </>
    )
}