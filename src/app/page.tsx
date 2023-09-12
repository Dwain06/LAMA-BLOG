import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
// import Hero from 'public/hero.png'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Un lama dans chaque projet professionnel.</h1>
        <p  className={styles.desc}>
          Vos idées deviennent réalité. Nous réalisons vos projets et vous aidons à faire grandir votre entreprise.
        </p>
        <Button text="Voir notre travail" url="/portfolio" />
      </div>
      <div className={styles.item}>
        <div className={styles.imageContainer}>
          <Image
            fill={true}
            src="https://images.unsplash.com/photo-1572297982753-48c028401d18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFtYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Hero"
            sizes="100%"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}
