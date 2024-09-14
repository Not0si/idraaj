import { RefObject } from 'react'

/**
 * Check if a node is a child of a given parent.
 *
 * @param {Node | null} node - The node to check.
 * @param {Node | null} parent - The parent node.
 * @returns {boolean} - True if the node is a child of the parent, false otherwise.
 */
export const isChildOf = (node: Node | null, parent: Node | null): boolean => {
  while (node !== null) {
    if (node === parent) {
      return true
    }
    node = node.parentNode
  }
  return false
}

/**
 * Get the current cursor position within a specified parent element.
 *
 * @param {React.RefObject<HTMLElement>} ref - The React ref object pointing to the parent element.
 * @returns {number} - The character offset of the cursor within the parent element.
 */
export const getCaretPosition = (ref: RefObject<HTMLElement>): number => {
  const selection = window.getSelection()
  let charCount = -1
  let node: Node | null

  if (selection && selection.focusNode) {
    if (isChildOf(selection.focusNode, ref.current)) {
      node = selection.focusNode
      charCount = selection.focusOffset

      while (node) {
        if (node === ref.current) {
          break
        }

        if (node.previousSibling) {
          node = node.previousSibling
          charCount += node.textContent?.length || 0
        } else {
          node = node.parentNode
          if (node === null) {
            break
          }
        }
      }
    }
  }

  return charCount
}

/**
 * Set the caret at the specified position within a given parent element.
 *
 * @param {React.RefObject<HTMLElement>} ref - The React ref object pointing to the parent element.
 * @param {number} position - The character offset where the caret should be placed.
 */
export const setCaretPosition = (
  ref: RefObject<HTMLElement>,
  position: number,
): void => {
  const element = ref.current

  if (!element) return

  const range = document.createRange()
  const selection = window.getSelection()

  let charCount = 0
  let node: Node | null = element
  let stack: Node[] = []

  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const textLength = node.textContent?.length || 0

      if (charCount + textLength >= position) {
        range.setStart(node, position - charCount)
        range.collapse(true)
        break
      }

      charCount += textLength
    }

    if (node.firstChild) {
      stack.push(node)
      node = node.firstChild
    } else {
      while (node && !node.nextSibling) {
        node = stack.pop() || null
      }

      if (node) {
        node = node.nextSibling
      }
    }
  }

  if (selection) {
    selection.removeAllRanges()
    selection.addRange(range)
  }
}
