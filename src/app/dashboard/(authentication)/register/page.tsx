"use client"

import React from 'react'
import styles from './page.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      res.status === 201 && router.push("/dashboard/login?success=Utilisateur créé")
    } catch(err) {
      setError(true);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Créer un compte</h1>
      <h2 className={styles.subtitle}>Veuillez vous enregistrer pour accéder au dashboard.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          required
          className={styles.input}
        />
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
        <button className={styles.button}>Créer un compte</button>
        {error && 
          <p style={{color:"red"}}>Une erreur s&apos;est produite</p>
          }
      </form>
      <span className={styles.or}>- OU -</span>
      <Link className={styles.link} href="/dashboard/login">
        Se connecter avec un compte existant
      </Link>
    </div>
  )
}

export default Register