import { isCursorLeftEmpty, getCurrentNode, moveCursorToEnd } from './cursor'
export const handleCustomArrowUp = (event: Event) => {}

export const handleCustomArrowDown = (event: Event) => {}

export const handleCustomArrowLeft = (event: Event) => {
  if (isCursorLeftEmpty()) {
    const target = event.target as HTMLElement
    const previousSibling = target?.previousSibling as HTMLElement
    if (previousSibling) {
      event.preventDefault()
      previousSibling?.focus()
      const preNode = previousSibling.lastChild as Node
      moveCursorToEnd(preNode)
    }
  }
}

export const handleCustomArrowRight = (event: Event) => {}
