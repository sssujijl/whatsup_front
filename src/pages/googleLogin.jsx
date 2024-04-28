// import React from 'react';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import UserAPI from '../apis/user.api';
// import { useNavigate } from "react-router-dom";

// function GoogleLoginButton() {
//   let navigate = useNavigate();
//   // 구글 로그인 성공시 콜백 함수
//   const responseGoogle = async (response) => {
//     try {
//       navigate('/');
//         console.log(response);
//         const google = await UserAPI.googleLogin(response);
//         console.log('--google', google);
//     } catch (error) {
//         console.log(error);
//     }
//   };

//   // 구글 로그인 실패시 콜백 함수
//   const responseGoogleFailure = (error) => {
//     console.error(error);
//   };
//   const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <GoogleLogin
//         buttonText="구글 로그인"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogleFailure}
//       />
//     </GoogleOAuthProvider>

//   );
// }

// export default GoogleLoginButton;
