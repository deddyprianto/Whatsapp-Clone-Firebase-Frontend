import React from 'react'
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import "./Login.css";
import { useStateValues } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
   const [{ }, dispatch] = useStateValues();

   const signIn = () => {
      auth.signInWithPopup(provider).then(result => {
         dispatch({
            type: actionTypes.SET_USER,
            user: result.user
         })
      }).catch(err => alert(err.message))
   };
   return (
      <div className="login">
         <div className="login__container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />
            <div className="login__text">
               <h1>Masuk Ke WhatsApp Web</h1>
            </div>
            <Button onClick={signIn}>
               <img className="google__tombol" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png" alt="google.png" />
               Masuk Menggunakan Gmail Anda
               </Button>
         </div>
      </div>
   )
}

export default Login
