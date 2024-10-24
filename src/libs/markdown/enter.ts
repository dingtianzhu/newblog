import { isComposing } from './state'
import { renderToFragment } from './render'
import { createElementBlock } from './createBlockElement'

import { getCurrentNode, saveSelection, getCursorPosition, setToStart } from './cursor'

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
  if (cNode.nodeType !== Node.TEXT_NODE) {
    console.log('🚀 ~ handleCustomEnter ~ newDivElement:', newDivElement)

    if (target.nextSibling) {
      parent?.insertBefore(newDivElement!, target.nextSibling)
    } else {
      parent?.appendChild(newDivElement!)
    }
  } else {
    const originalContent = target?.textContent || '' // 获取原始的纯文本

    const htmlContent = target?.innerHTML // 获取解析后的 HTML 内容

    const mapping = mapTextToHtml(originalContent, htmlContent!)
    const startInHtml = mapping[position!.start - 1] || 0
    const endInHtml = mapping[position!.end]
    const contentAfterCursor = htmlContent?.slice(startInHtml + 1)
    if (contentAfterCursor) {
      ;(newDivElement as Element).innerHTML = contentAfterCursor
    }
    // parent?.insertBefore(newDivElement!, event.target?.nextSibling)
  }
  setToStart(newDivElement as Element)
  // const selection = window.getSelection()
  // const range = selection?.getRangeAt(0)

  // if (cNode && cNode.textContent!.match(/```.*/g)) {
  //   return
  // }

  // 阻止默认的回车行为
  // // console.log('🚀 ~ resetInputKeydown ~ cNode:', cNode)
  // // 获取光标前的内容（包括行内元素）
  // const parentElement = cNode.parentElement
  // if (cNode instanceof String) {
  // }

  // // 创建纯文本到解析内容的映射
  // const mapping = mapTextToHtml(originalContent, htmlContent!)
  // console.log(
  //   '🚀 ~ resetInputKeydown ~ mapping:',
  //   mapping,
  //   position!.start,
  //   mapping[position!.start - 1]
  // )

  // // 根据映射获取光标在解析内容中的实际位置
  // const startInHtml = mapping[position!.start - 1] || 0
  // const endInHtml = mapping[position!.end]

  // const contentBeforeCursor = htmlContent?.slice(0, startInHtml + 1)
  // console.log('🚀 ~ resetInputKeydown ~ startInHtml:', startInHtml)
  // const contentAfterCursor = htmlContent?.slice(startInHtml + 1)
  // console.log('🚀 ~ Content Before Cursor:', position!.start, contentBeforeCursor)
  // console.log('🚀 ~ Content After Cursor:', contentAfterCursor)
  // // 创建一个新的 `div`，用于容纳光标后的内容
  // const newDivVNode = createElementBlock('div', '', '')
  // const fragment = document.createDocumentFragment()

  // // 渲染新 `div`
  // renderToFragment(newDivVNode, fragment)

  // // 将光标后的内容添加到渲染后的新 `div` 中
  // const newDivElement = fragment.firstChild as HTMLElement
  // if (contentAfterCursor) {
  //   newDivElement.innerHTML = contentAfterCursor
  // }
  // parentElement!.innerHTML = contentBeforeCursor!

  // // 插入新 `div` 到当前元素之后
  // if (newDivElement && parent) {
  //   if (parent.nextSibling) {
  //     parent.insertBefore(newDivElement, target.nextSibling)
  //   } else {
  //     parent.appendChild(newDivElement)
  //   }

  //   // 聚焦新创建的 `div`，使其成为可编辑状态
  //   newDivElement.focus()

  // }
}
