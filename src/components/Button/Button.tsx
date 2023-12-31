import React from 'react'
import styles from "./button.module.css"
import Link from 'next/link'

type Props = {
  text: String,
  url: Object
}

const Button = (props: Props) => {
  
  const { text, url } = props;

  return (
    <Link href={url} >
      <button className={styles.button}>
        {text}
      </button>
    </Link>
  )
}

export default Button