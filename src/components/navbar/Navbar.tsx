"use client";

import Link from "next/link";
import React from "react";
import styles from "./page.module.css";
import DarkModeToggle from "../DarkModeToogle/DarkModeToogle";
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {

  const session = useSession();

  const links = [
    {
      id: 1,
      title: "Accueil",
      url: "/",
    },
    {
      id: 2,
      title: "Portfolio",
      url: "/portfolio",
    },
    {
      id: 3,
      title: "Blog",
      url: "/blog",
    },
    {
      id: 4,
      title: "A propos",
      url: "/about",
    },
    {
      id: 5,
      title: "Contact",
      url: "/contact",
    },
  ];

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        LAMA BLOG
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {session.status === "unauthenticated" &&
          <Link href="/dashboard/login" className={styles.logout}>
            Connexion
          </Link>
        }
        {session.status === "authenticated" &&
          <>
            <Link href="/dashboard" className={styles.link}>
              Dashboard
            </Link>
            <button className={styles.logout} onClick={() => signOut()}>
              Déconnexion
            </button>
          </>
        }
      </div>
    </div>
  );
};

export default Navbar;
