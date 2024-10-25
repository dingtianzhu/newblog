import { isComposing } from './state'
import { renderToFragment } from './render'
import { createElementBlock } from './createBlockElement'
import { mapTextToHtml, isInline } from './helps'

import { getCurrentNode, getCursorPosition, setToStart } from './cursor'

export const handleCustomEnter = (event: Event) => {
  //如果中文输入没有结束则回车不会被组织
  if (isComposing.value) return

  const cNode = getCurrentNode() as HTMLElement
  if (cNode.nodeType === Node.TEXT_NODE && cNode.textContent!.match(/```.*/g)) {
    return
  }
  const parent = (event.target as Node).parentNode
  const position = getCursorPosition(event.target as HTMLElement)

  const target = event.target as HTMLElement

  event.preventDefault()
  const newDivVNode = createElementBlock('div', '', '')
  const fragment = document.createDocumentFragment()
  const newDivElement = renderToFragment(newDivVNode, fragment)
  if (isInline(cNode.parentElement!)) return
  if (target.nextSibling) {
    parent?.insertBefore(newDivElement!, target.nextSibling)
  } else {
    parent?.appendChild(newDivElement!)
  }
  if (cNode.nodeType === Node.TEXT_NODE) {
    const originalContent = cNode.parentElement?.textContent || '' // 获取原始的纯文本
    const htmlContent = cNode.parentElement?.innerHTML // 获取解析后的 HTML 内容
    const mapping = mapTextToHtml(originalContent, htmlContent!)
    const startInHtml = mapping[position] || 0
    const contentBeforeCursor = htmlContent?.slice(0, startInHtml)
    const contentAfterCursor = htmlContent?.slice(startInHtml)
    if (contentAfterCursor) {
      ;(newDivElement as Element).innerHTML = contentAfterCursor
    }

    cNode.parentElement!.innerHTML = contentBeforeCursor!
  }
  setToStart(newDivElement as Element)
}
