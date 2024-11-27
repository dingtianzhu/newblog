import { saveSelection, restoreSelection, getCursorRight } from './cursor'
export const removeCurrentNode = (
  e: Event,
  text: string | undefined = '',
  type: boolean = false
) => {
  let target: HTMLElement

  if (type) target = (e.target as HTMLElement).parentNode as HTMLElement
  else target = e.target as HTMLElement
  const previousSibling = target?.previousSibling as HTMLElement

  // 如果存在前一个兄弟节点且为 contenteditable
  if (previousSibling && previousSibling.isContentEditable) {
    e.preventDefault()
    const preEl =
      (previousSibling.firstChild?.firstChild as HTMLElement) || (previousSibling as HTMLElement)
    moveCursorToPreviousEditable(preEl)
    // if (!previousSibling || !previousSibling.isContentEditable) return

    // const range = document.createRange()
    // const selection = window.getSelection()

    // // 设置光标到前一个节点的末尾
    // range.selectNodeContents(preEl)
    // range.collapse(false)

    // // 清除现有选区并添加新的范围
    // selection?.removeAllRanges()
    // selection?.addRange(range)

    // 聚焦到前一个可编辑容器
    rePosition(target, previousSibling, preEl, text)

    return
  } else {
    const rightText = getCursorRight()
    if (!rightText || rightText == '\u200B') target.innerHTML = ''
    if (type) {
      const nextSibling = target.nextSibling as HTMLElement

      rePosition(target, nextSibling, nextSibling, '', type)
    }
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
export const moveCursorToPreviousEditable = (preEl: HTMLElement) => {
  // if (!preEl || !preEl.isContentEditable) return

  const range = document.createRange()
  const selection = window.getSelection()

  // 设置光标到前一个节点的末尾
  range.selectNodeContents(preEl)
  range.collapse(false)

  // 清除现有选区并添加新的范围
  selection?.removeAllRanges()
  selection?.addRange(range)
}
