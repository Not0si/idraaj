import { RefObject, useEffect } from 'react'

/**
 * Custom hook that triggers a callback when a click or touch occurs outside a specified element.
 *
 * @param {RefObject<HTMLElement>} ref - React ref object that points to the element you want to detect clicks outside of.
 * @param {() => void} onClickOutside - Callback function that gets executed when a click outside the referenced element occurs.
 */
const useClickOutside = (
  ref: RefObject<HTMLElement>,
  onClickOutside: () => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [ref, onClickOutside])
}

export default useClickOutside
