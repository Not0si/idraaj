import { type BundledLanguage, type BundledTheme, codeToHtml } from 'shiki'

import type {
  FC,
  FormEventHandler,
  KeyboardEventHandler,
  RefObject,
} from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { getCaretPosition, setCaretPosition } from './utils'

interface ICodeBlockProps {
  lang?: BundledLanguage
  theme?: BundledTheme
  children: string
  editable?: boolean
  onChange?: (text: string, html: string) => void
  className?: string
}

interface IGenerateHtml {
  code: string
  lang: BundledLanguage
  theme: BundledTheme
  containerRef: RefObject<HTMLDivElement>
  onChange?: (text: string, html: string) => void
}

const generateHtml = async ({
  code,
  containerRef,
  onChange,
  lang,
  theme,
}: IGenerateHtml) => {
  try {
    const generatedHtml = await codeToHtml(code, {
      lang,
      theme,
    })

    if (containerRef?.current) {
      if (onChange) onChange(code, generatedHtml)

      const caretPosition = getCaretPosition(containerRef)

      containerRef.current.innerHTML = generatedHtml

      if (caretPosition >= 0) {
        setCaretPosition(containerRef, caretPosition)
      }
    }
  } catch (error) {
    console.error('Error generating HTML:', error)
  }
}

const CodeBlock: FC<ICodeBlockProps> = ({
  children,
  editable = false,
  onChange,
  lang = 'javascript',
  theme = 'min-light',
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [code, setCode] = useState<string>(
    children.endsWith('\n') ? children : children + '\n',
  )

  useEffect(() => {
    generateHtml({ code, containerRef, onChange, lang, theme })
  }, [code, lang, theme])

  useEffect(() => {
    if (editable) return
    const ncode = children.endsWith('\n') ? children : children + '\n'
    generateHtml({ code: ncode, containerRef, onChange, lang, theme })
  }, [editable, children, containerRef, onChange, lang, theme])

  const updateCode = useCallback((str: string) => {
    const input = str.endsWith('\n') ? str : str + '\n'
    setCode(input)
  }, [])

  const handleElementChange: FormEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const divTextValue = event.currentTarget.innerText
      updateCode(divTextValue)
    },
    [],
  )

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        const caretPosition = getCaretPosition(containerRef)
        const codeBeforeCaret = code.slice(0, caretPosition)
        const codeAfterCaret = code.slice(caretPosition)
        const newCode = `${codeBeforeCaret}\n${codeAfterCaret}`

        updateCode(newCode)

        setCaretPosition(containerRef, caretPosition + 1)
      }
    },
    [code],
  )

  return (
    <div
      // className={getClassName(styles.container, className)}
      ref={containerRef}
      onInput={handleElementChange}
      onKeyDown={handleKeyDown}
      contentEditable={editable}
    />
  )
}

export default CodeBlock
