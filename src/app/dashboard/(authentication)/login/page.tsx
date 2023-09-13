"use client"

import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { useEffect } from 'react';

const Login = () => {
  
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    // Waiting for first render before redirect
    if (session.status === "authenticated") {
      router?.push("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const res = await signIn("credentials", {email, password, redirect: false,});
  }

  if (session.status === "loading") {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    )
  }

  if (session.status === "unauthenticated") {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Connexion</h1>
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
      <Link className={styles.link} href="/dashboard/register">
        Pas encore inscrit ? Créer un compte
      </Link>
      <button className={styles.google} onClick={() => signIn("google")}>Se connecter avec Google</button>
    </div>
  );}
};

export default Login;