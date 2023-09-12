"use client"

import React from 'react';
import { signIn } from 'next-auth/react';
import styles from './page.module.css';
import Link from 'next/link';

const Login = () => {

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {email, password})
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Créer un compte</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>Connexion</button>
      </form>
      <span className={styles.or}>- OU -</span>
      <Link className={styles.link} href="/dashboard/login">
        Se connecter avec un compte existant
      </Link>
      <button onClick={() => signIn("google")}>Se connecter avec Google</button>
    </div>
  );
};

export default Login;