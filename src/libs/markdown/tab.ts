export const handleCustomTab = (event: Event) => {
  const target = event.target as HTMLElement
  const selection = window.getSelection()

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    const tabCharacter = '\u00A0\u00A0\u00A0\u00A0' // 使用四个不间断空格来模拟制表符效果

    // 插入制表符字符
    const tabNode = document.createTextNode(tabCharacter)
    range.insertNode(tabNode)

    // 将光标移到插入内容的末尾
    range.setStartAfter(tabNode)
    range.collapse(true)

    // 清除原有的选区并设置新位置
    selection.removeAllRanges()
    selection.addRange(range)
  }
}
