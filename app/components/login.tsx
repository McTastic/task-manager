"use client";

import { useState } from 'react';
import styles from "../../public/css/login.module.css";
import {signIn} from 'next-auth/react';

export default function Login() {
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleUsernameFocus = () => {
    setIsUsernameFocused(true);
  };

  const handleUsernameFocusOut = () => {
    setIsUsernameFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordFocusOut = () => {
    setIsPasswordFocused(false);
  };

  return (
    <div className={styles.login_form_container}>
      <div className={styles.login_form}>
        <h2>Login</h2>
        <div className={styles.input_group}>
          <i className={`${styles.fa} fa-user ${isUsernameFocused ? styles.glowIcon : ''}`}></i>
          <input
            type="text"
            placeholder="Username"
            className={styles.input_text}
            autoComplete="off"
            onFocus={handleUsernameFocus}
            onBlur={handleUsernameFocusOut}
          />
        </div>
        <div className={styles.input_group}>
          <i className={`${styles.fa} fa-unlock-alt ${isPasswordFocused ? styles.glowIcon : ''}`}></i>
          <input
            type="password"
            placeholder="Password"
            className={styles.input_text}
            autoComplete="off"
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordFocusOut}
          />
        </div>
        <div className={`${styles.button_group} ${styles.login_button}`}>
          <button>Submit</button>
        </div>
        <div className={styles.fotter}>
          {/* <a>Forgot Password?</a> */}
          <a>Create Account</a>
        </div>
        <a style={{cursor: "pointer"}} onClick={()=>signIn()}>Use Google</a>
      </div>
    </div>
  );
}
