import { isCursorLeftEmpty, getCursorRight } from './cursor'
import { moveCursorToPreviousEditable } from './removeNode'
export const handleCustomArrowUp = (event: Event) => {
  const target = event.target as HTMLElement
  const previousSibling = target?.previousSibling as HTMLElement
  if (previousSibling) {
    event.preventDefault()
    moveCursorToPreviousEditable(previousSibling)
  }
}

export const handleCustomArrowDown = (event: Event) => {
  const target = event.target as HTMLElement
  const nextSibling = target?.nextSibling as HTMLElement
  if (nextSibling) {
    event.preventDefault()
    nextSibling.focus()
  }
}

export const handleCustomArrowLeft = (event: Event) => {
  if (isCursorLeftEmpty()) {
    const target = event.target as HTMLElement
    const previousSibling = target?.previousSibling as HTMLElement
    if (previousSibling) {
      event.preventDefault()
      moveCursorToPreviousEditable(previousSibling)
    }
  }
}

export const handleCustomArrowRight = (event: Event) => {
  if (!getCursorRight()) {
    const target = event.target as HTMLElement
    const nextSibling = target?.nextSibling as HTMLElement
    if (nextSibling) {
      event.preventDefault()
      nextSibling.focus()
    }
  }
}
