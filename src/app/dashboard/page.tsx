"use client"

import React, { useEffect } from 'react';
import styles from './page.module.css';
import { useSession, signIn, signOut } from "next-auth/react"
// import { useState } from 'react';
import useSWR from 'swr'
import Loading from '@/app/loading';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  const router = useRouter();
  console.log(session)

  useEffect(() => {
    // Waiting for first render before redirect
    if (session.status === "unauthenticated") {
      router?.push("/dashboard/login");
    }
  }, [session, router]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/posts?username=${session?.data?.user?.name}`, fetcher);
  console.log("data dashboard",data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const description = e.target[1].value;
    const image = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          image,
          content,
          username: session?.data?.user?.name,
          userpic: "https://randomuser.me/api/portraits/women/24.jpg"
        }),
      });
      mutate();
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };
  
  if (session.status === "loading") {
    return (
      <div className={styles.container}>
        <Loading/>
      </div>
    )
  }

  if (session.status === "authenticated") {
  return (
    <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "loading"
            : data?.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image className={styles.img} src={post.image} alt="lama" width={200} height={100} />
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(post._id)}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Créer un article</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="Description" className={styles.input} />
          <input type="text" placeholder="Image" className={styles.input} />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols={30}
            rows={10}
          ></textarea>
          <button className={styles.button}>Envoyer</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;