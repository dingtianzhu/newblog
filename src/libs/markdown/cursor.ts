// 移动光标到指定元素的末尾
export const moveCursorToEnd = (element: Node) => {
  const range = document.createRange()
  const selection = window.getSelection()
  range.setStartAfter(element)
  range.collapse(true)
  selection?.removeAllRanges()
  selection?.addRange(range)
}
//重置光标位置
export const rePosition = (
  target: any,
  previousSibling: HTMLElement,
  newNode: HTMLElement,
  text: string = '',
  type: boolean = false
) => {
  if (previousSibling) previousSibling.focus()

  if (!type) {
    const savedSelection = saveSelection(newNode)
    newNode.textContent! += text
    if (savedSelection) {
      restoreSelection(newNode, savedSelection) // 恢复光标位置
    }
  }
  if (target && target.parentNode) {
    // 从父节点中移除目标元素
    target.parentNode.removeChild(target)
  }
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
// // 获取光标位置的函数
// export const getCursorPosition = (containerEl: HTMLElement) => {
//   const selection = window.getSelection()

//   // 检查是否存在有效的选择范围
//   if (selection && selection.rangeCount > 0) {
//     // 获取当前的 Range 对象
//     const range = selection.getRangeAt(0)

//     // 创建一个新的 Range 对象作为副本
//     const preRange = range.cloneRange()

//     // 设置副本的范围为整个容器内容
//     preRange.selectNodeContents(containerEl)

//     // 将副本的结束位置设置为当前光标的起始位置
//     preRange.setEnd(range.startContainer, range.startOffset)

//     // 光标在整个文本内容中的位置
//     const start = preRange.toString().length

//     // 如果存在选中内容，计算结束位置
//     const end = start + range.toString().length

//     return { start, end }
//   }

//   // 如果没有选择范围，则返回 null
//   return null
// }
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
    const textContent = containerEl.textContent

    const htmlContent = containerEl.innerHTML // 获取容器内的 HTML 内容

    // 计算解析后的内容长度和输入位置的对应关系
    const mapping = []
    let currentIndex = 0
    for (let i = 0; i < htmlContent.length; i++) {
      if (htmlContent[i] === '<') {
        // 处理标签的开头
        while (htmlContent[i] !== '>' && i < htmlContent.length) {
          i++
        }
        // 处理标签结束
        mapping.push(currentIndex) // 保存标签之前的字符位置
      } else {
        currentIndex++
        mapping.push(currentIndex)
      }
    }

    return {
      start: mapping[start] || 0, // 将获取到的 start 转换为 HTML 中的实际位置
      end: mapping[start + range.toString().length] || 0
    }
  }
  return null
}
