import { saveSelection, restoreSelection, moveCursorToEnd } from './cursor'
export const removeCurrentNode = (
  e: Event,
  text: string | undefined = '',
  type: boolean = false
) => {
  let target: HTMLElement

  if (type) target = (e.target as HTMLElement).parentNode as HTMLElement
  else target = e.target as HTMLElement
  const previousSibling = target?.previousSibling as HTMLElement
  console.log('🚀 ~ previousSibling:', previousSibling)

  // 如果存在前一个兄弟节点且为 contenteditable
  if (previousSibling && previousSibling.isContentEditable) {
    const range = document.createRange()
    const selection = window.getSelection()

    // 将光标设置到前一个节点的最后位置
    range.selectNodeContents(previousSibling.firstChild?.firstChild || previousSibling)
    range.collapse(false) // 设置为 false 表示光标放在内容末尾

    // 清除现有的选区，并将新的范围添加到选区
    selection?.removeAllRanges()
    selection?.addRange(range)
    // moveCursorToEnd((previousSibling.firstChild?.firstChild as Node) || (previousSibling as Node))
    e.preventDefault()
    // 聚焦到前一个可编辑容器
    if (previousSibling.firstChild?.firstChild) {
      const preNode = previousSibling?.firstChild.firstChild as HTMLElement
      rePosition(target, previousSibling, preNode, text)
    } else {
      rePosition(target, previousSibling, previousSibling, text)
    }
    return
  }

  if (type) {
    const nextSibling = target.nextSibling as HTMLElement

    rePosition(target, nextSibling, nextSibling, '', type)
  }
}
const rePosition = (
  target: any,
  previousSibling: HTMLElement,
  preNode: HTMLElement,
  text: string = '',
  type: boolean = false
) => {
  if (previousSibling) previousSibling.focus()
  if (!type && text) {
    const savedSelection = saveSelection(preNode)
    preNode.innerHTML! += text
    if (savedSelection) {
      restoreSelection(preNode, savedSelection) // 恢复光标位置
    }
  }
  if (target && target.parentNode) {
    // 从父节点中移除目标元素
    target.parentNode.removeChild(target)
  }
}
