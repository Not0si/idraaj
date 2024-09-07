import { FC, ReactNode } from 'react'

import styles from './styles.module.scss'

interface IPlayGround {
  children: ReactNode
  title?: string
}

const PlayGround: FC<IPlayGround> = ({ children, title }) => {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header} />
      </div>
      <div className={styles.card}>
        <header className={styles.header}></header>
        <h1 className={styles.title}>{title}</h1>
        <main className={styles.main}>{children}</main>
      </div>
    </section>
  )
}

export default PlayGround
