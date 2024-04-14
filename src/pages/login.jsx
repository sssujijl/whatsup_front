import style from '../styles/login.module.css'
import naver from '../img/btnG_아이콘원형.png'
import kakao from '../img/kakao_login.png'
import google from '../img/web_neutral_rd_na@4x.png'

export default function Login(props) {
    return (
        <>            
        <div className={style.container}>
            <div className={style.input}>
                <h3 className={style.h3}>이메일</h3>
                <input type='email' placeholder='이메일을 입력하세요.' />
            </div>
            <div className={style.input}>
                <h3>비밀번호</h3>
                <input type='password' placeholder='비밀번호를 입력하세요.' />
            </div>
            <button className={style.loginBtn}>로그인하기</button>
                <div className={style.imgContainer}>
                    <img src={naver}/>
                    <img src={kakao}/>
                <img src={google}/>
            </div>
        </div>
        </>
    )
}