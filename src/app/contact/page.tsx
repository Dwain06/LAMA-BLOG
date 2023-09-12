import React from 'react';
import styles from './page.module.css'
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact - Lama Blog",
  description: "Contactez-nous",
}

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Restons en contact</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.jpg"
            alt="lama"
            fill={true}
            sizes="100%"
            className={styles.image}
          />
        </div>
        <form className={styles.form}>
          <input type="text" placeholder="Nom" className={styles.input} />
          <input type="text" placeholder="Email" className={styles.input} />
          <textarea
            className={styles.textArea}
            placeholder="Message"
            cols={30}
            rows={10}
          ></textarea>
          <Button url="#" text="Envoyer"/>
        </form>
      </div>
    </div>
  );
};

export default Contact;