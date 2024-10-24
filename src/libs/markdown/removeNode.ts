import { rePosition } from './cursor'
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
    // 将特定的字符串追加到前一个节点的末尾

    // 将光标移动到前一个节点的末尾
    const range = document.createRange()
    const selection = window.getSelection()

    // 将光标设置到前一个节点的最后位置
    range.selectNodeContents(previousSibling)
    range.collapse(false) // 设置为 false 表示光标放在内容末尾

    // 清除现有的选区，并将新的范围添加到选区
    selection?.removeAllRanges()
    selection?.addRange(range)
    e.preventDefault()
    // 聚焦到前一个可编辑容器
    if (previousSibling.firstChild?.firstChild) {
      const newNode = previousSibling?.firstChild.firstChild as HTMLElement
      rePosition(target, previousSibling, newNode, text)
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
