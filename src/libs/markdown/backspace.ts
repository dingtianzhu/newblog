import { removeCurrentNode } from './removeNode'
import { isCursorLeftEmpty, getCurrentNode } from './cursor'
export const handleCustomBackspace = (event: Event) => {
  const isEmpty = isCursorLeftEmpty()
  console.log('🚀 ~ handleCustomBackspace ~ isEmpty:', isEmpty)
  if (isEmpty) {
    const currentNode = getCurrentNode()
    let node: HTMLElement
    if (currentNode?.nodeType === Node.ELEMENT_NODE) node = currentNode as HTMLElement
    else node = currentNode?.parentNode as HTMLElement
    const html = node?.innerHTML || ''
    console.log('🚀 ~ handleCustomBackspace ~ html:', html)
    removeCurrentNode(event, html)
  }
}
