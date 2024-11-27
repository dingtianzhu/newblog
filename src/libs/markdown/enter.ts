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
  console.log('🚀 ~ handleCustomEnter ~ position:', position)

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
    console.log('🚀 ~ handleCustomEnter ~ htmlContent:', htmlContent)
    const mapping = mapTextToHtml(originalContent, htmlContent!)
    console.log('🚀 ~ handleCustomEnter ~ mapping:', mapping)
    const startInHtml = mapping[position] || 0
    // 使用新函数确保准确截取
    const { contentBeforeCursor, contentAfterCursor } = getHtmlContentAtPosition(
      htmlContent!,
      startInHtml
    )

    console.log('🚀 ~ handleCustomEnter ~ contentAfterCursor:', contentAfterCursor)
    if (contentAfterCursor) {
      ;(newDivElement as Element).innerHTML = contentAfterCursor
    }

    cNode.parentElement!.innerHTML = contentBeforeCursor!
  }
  setToStart(newDivElement as Element)
}
// 获取 HTML 映射位置后，使用此函数来准确截取内容
const getHtmlContentAtPosition = (
  htmlContent: string,
  startInHtml: number
): { contentBeforeCursor: string; contentAfterCursor: string } => {
  let cursorPos = 0
  let contentBeforeCursor = ''
  let contentAfterCursor = ''

  // 遍历 HTML 内容直到达到指定位置
  for (let i = 0; i < htmlContent.length; i++) {
    // 判断是否遇到 HTML 实体符号
    if (htmlContent[i] === '&') {
      const endIndex = htmlContent.indexOf(';', i)
      if (endIndex !== -1) {
        const entity = htmlContent.slice(i, endIndex + 1)
        contentBeforeCursor += entity
        i = endIndex // 跳过该实体的长度
        cursorPos++ // 实体作为单个字符处理
      } else {
        contentBeforeCursor += htmlContent[i]
        cursorPos++
      }
    } else {
      // 处理普通字符
      contentBeforeCursor += htmlContent[i]
      cursorPos++
    }

    // 当达到目标位置时，停止并获取剩余内容
    if (cursorPos === startInHtml) {
      contentAfterCursor = htmlContent.slice(i + 1)
      break
    }
  }

  return { contentBeforeCursor, contentAfterCursor }
}
