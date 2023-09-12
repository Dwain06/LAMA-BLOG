"use client"

import React, { useEffect } from 'react';
import styles from './page.module.css';
import { useSession, signIn, signOut } from "next-auth/react"
// import { useState } from 'react';
import useSWR from 'swr'

const Dashboard = () => {

  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch("https://fakestoreapi.com/products/", {
  //       cache: "no-store",
  //     });

  //     if (!res.ok) {
  //       setErr(true);
  //     }

  //     const data = await res.json()

  //     console.log(data)

  //     setData(data);
  //     setIsLoading(false);
  //   };
  //   getData()
  // }, []);

  const session = useSession();
  console.log(session)

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("https://fakestoreapi.com/products/", fetcher);
  // console.log(data);

  return (
    <div className={styles.container}>
      Dashboard page
    </div>
  );
};

export default Dashboard;