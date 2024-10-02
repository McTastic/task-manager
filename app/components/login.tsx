"use client";

import { useState } from 'react';
import styles from "../../public/css/login.module.css";
import {signIn, SignInResponse } from 'next-auth/react';
// import { useRouter } from 'next/router';

export default function Login() {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailFocusOut = () => {
    setIsEmailFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordFocusOut = () => {
    setIsPasswordFocused(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result: SignInResponse | undefined = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    console.log('Sign-In-Result>>', result);

    if (result && result.error) {
      console.log(result.error);
      setErrorMessage(result.error);
    } else {
      // Optionally redirect after successful login
      window.location.href = '/dashboard';
    }
  };


  return (
    <div className={styles.login_form_container}>
      <div className={styles.login_form}>
        <h2>Login</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          <i className={`${styles.fa} fa-user ${isEmailFocused ? styles.glowIcon : ''}`}></i>
          <input
            type="text"
            placeholder="Email"
            className={styles.input_text}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleEmailFocus}
            onBlur={handleEmailFocusOut}
          />
        </div>
        <div className={styles.input_group}>
          <i className={`${styles.fa} fa-unlock-alt ${isPasswordFocused ? styles.glowIcon : ''}`}></i>
          <input
            type="password"
            placeholder="Password"
            className={styles.input_text}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordFocusOut}
          />
        </div>
        <div className={`${styles.button_group} ${styles.login_button}`}>
          <button type="submit">Submit</button>
        </div>
        </form>
        <div className={styles.fotter}>
          {/* <a>Forgot Password?</a> */}
          <a>Create Account</a>
        </div>
        <a style={{cursor: "pointer"}} onClick={()=>signIn()}>Use Google</a>
      </div>
    </div>
  );
}
