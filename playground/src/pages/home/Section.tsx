import { FC, ReactElement } from 'react'

import styles from './styles.module.css'

interface ISectionProps {
  title: string
  description?: string
  children?: ReactElement
}

const Section: FC<ISectionProps> = ({ title, description, children }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {description ?
        <p className={styles.sectionDescription}>{description}</p>
      : null}
      {children}
    </section>
  )
}

export default Section
