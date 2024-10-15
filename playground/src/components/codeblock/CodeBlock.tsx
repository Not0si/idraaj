import useClickOutside from '@hooks/useClickOutside'
import CheckIcon from '@icons/CheckIcon'
import CopyIcon from '@icons/CopyIcon'

import { FC, useRef, useState } from 'react'

import styles from './styles.module.css'

interface ICodeBlockProps {
  htmlContent?: string
  text?: string
}

const CodeBlock: FC<ICodeBlockProps> = ({ htmlContent, text }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isCopied, setIsCopied] = useState(false)

  useClickOutside(containerRef, () => {
    setIsCopied(false)
  })

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        onClick={() => {
          navigator.clipboard.writeText(text ?? '')
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 2000) // Reset after 2 seconds
        }}
        disabled={isCopied}
        className={styles.button}
      >
        {isCopied ?
          <CheckIcon />
        : <CopyIcon />}
      </button>
      <pre
        tabIndex={0}
        dangerouslySetInnerHTML={{ __html: htmlContent ?? '' }}
      />
    </div>
  )
}

export default CodeBlock
