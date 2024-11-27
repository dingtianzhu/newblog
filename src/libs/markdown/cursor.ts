import { inlineElements } from './state'
// 移动光标到指定元素的末尾
export const moveCursorToEnd = (element: Node) => {
  const range = document.createRange()
  const selection = window.getSelection()
  range.setStartAfter(element)
  range.collapse(false)
  selection?.removeAllRanges()
  selection?.addRange(range)
}

//保存光标位置
export const saveSelection = (containerEl: HTMLElement) => {
  const selection = window.getSelection()
  if (selection!.rangeCount > 0) {
    const range = selection?.getRangeAt(0)
    const preSelectionRange = range?.cloneRange()
    preSelectionRange?.selectNodeContents(containerEl)
    preSelectionRange?.setEnd(range!.startContainer, range!.startOffset)
    const start = preSelectionRange!.toString().length

    return {
      start: start,
      end: start + range!.toString().length
    }
  }
  return null
}

export const restoreSelection = (containerEl: HTMLElement, savedSel: any) => {
  const charIndex = { count: 0 }
  const range = document.createRange()
  range.setStart(containerEl, 0)
  range.collapse(true)

  const nodeStack = [containerEl]
  let node,
    foundStart = false,
    stop = false

  while (!stop && (node = nodeStack.pop())) {
    // 检查节点是否为文本节点
    if (node.nodeType === Node.TEXT_NODE) {
      const textNode = node as unknown as Text // 现在可以安全地断言为 Text 类型
      const nextCharIndex = charIndex.count + textNode.length

      if (!foundStart && savedSel.start >= charIndex.count && savedSel.start <= nextCharIndex) {
        range.setStart(textNode, savedSel.start - charIndex.count)
        foundStart = true
      }
      if (foundStart && savedSel.end >= charIndex.count && savedSel.end <= nextCharIndex) {
        range.setEnd(textNode, savedSel.end - charIndex.count)
        stop = true
      }
      charIndex.count = nextCharIndex
    } else {
      // 如果不是文本节点，则继续处理其子节点
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        nodeStack.push(node?.childNodes[i] as HTMLElement)
      }
    }
  }

  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}

export const getCurrentNode = () => {
  const selection = window.getSelection()
  if (!selection?.rangeCount) return null

  const range = selection.getRangeAt(0)
  return range.startContainer // 获取光标所在的节点
}
//   // 移动光标到新行的开头
export const setToStart = (newDivElement: Element) => {
  const newRange = document.createRange()
  newRange.setStart(newDivElement, 0)
  newRange.collapse(true)
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(newRange)
}
export const getCursorPosition = (containerEl: HTMLElement) => {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    const preSelectionRange = range.cloneRange()
    preSelectionRange.selectNodeContents(containerEl)
    preSelectionRange.setEnd(range.startContainer, range.startOffset)

    // 获取光标位置在内容中的字符索引
    const start = preSelectionRange.toString().length
    return start - 1
  }
  return 0
}
//判断光标左侧内容是否为空
export const isCursorLeftEmpty = () => {
  const selection = window.getSelection()
  if (!selection?.rangeCount) return false

  const range = selection.getRangeAt(0)
  const { startContainer, startOffset } = range
  // 如果光标在文本节点内

  if (startContainer.nodeType === Node.TEXT_NODE) {
    const leftText = startContainer.textContent?.slice(0, startOffset)
    const previousSibling = startContainer.previousSibling
    if (leftText?.trim() === '' && previousSibling) {
      if (inlineElements.includes((previousSibling as HTMLElement).tagName.toLowerCase())) {
        return false // 行内元素视为不为空
      }
    }
  }

  // 如果光标在元素节点的起始位置，检查左侧元素
  if (startContainer.nodeType === Node.ELEMENT_NODE && startOffset === 0) {
    console.log('🚀 ~ isCursorLeftEmpty ~ nodeType:sadfasdfsad', startContainer.nodeType)
    // 检查是否为行内元素
    return true // 其他元素视为为空
  }
  if (startContainer.nodeType === Node.ELEMENT_NODE) {
    return false
  }
  // 向上遍历节点直到找到文本节点
  let textBeforeCursor = ''
  let currentNode = startContainer

  while (currentNode && currentNode !== document.body) {
    if (currentNode.nodeType === Node.TEXT_NODE) {
      textBeforeCursor = currentNode.textContent?.slice(0, startOffset) + textBeforeCursor
      break
    } else {
      // 检查当前节点的前一个兄弟节点
      if (currentNode.previousSibling) {
        currentNode = currentNode.previousSibling
        while (currentNode && currentNode.lastChild) {
          currentNode = currentNode.lastChild
        }
      } else {
        currentNode = currentNode.parentNode as Node
      }
    }
  }

  // 如果光标左侧的内容为空，则返回 true
  return textBeforeCursor.trim() === ''
}

export const getCursorRight = () => {
  const selection = window.getSelection()
  if (!selection?.rangeCount) return false

  const range = selection.getRangeAt(0)
  const { startContainer, startOffset } = range
  if (startContainer.nodeType === Node.TEXT_NODE) {
    const rightText = startContainer.textContent?.slice(startOffset)
    if (rightText?.trim()) return rightText
  }
  return false
}
