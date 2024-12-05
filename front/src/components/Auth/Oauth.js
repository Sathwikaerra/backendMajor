// import React from "react";
// // import { auth, provider, signInWithPopup } from "./firebase";
// import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux'
// import { userActions } from '../../store/reducers'




// const GoogleLoginButton = () => {

//   const dispatch=useDispatch();





//   const navigate=useNavigate()
//     const handleLogin = async () => {
//       try {
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;

//         // Send user data to backend
//       const res = await fetch("/user/google", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
                
//                 email: user.email,
//                 name: user.displayName,
//             }),
//         }).then((res)=>{
//           dispatch(userActions.login(res.user))
//   localStorage.setItem("UserEmail",res.user.email);
//   localStorage.setItem("UserName",user.user.name);
//   localStorage.setItem("UserId",res.user._id);
//           toast.success(`WelCome  ${res.user.name}`, { position: 'top-center' });
//           navigate('/')

//         })
//     }catch(err){
//       toast.error(`Error${err} `, { position: 'top-center' });


//     }
//     };

//     return (
//         <button onClick={handleLogin} className="google-login-btn">
//             Sign Up with Google
//         </button>
//     );
// };

// export default GoogleLoginButton;
