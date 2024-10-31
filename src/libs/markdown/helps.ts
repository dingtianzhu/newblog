import { inlineElements } from './state'
// 创建纯文本到解析内容的映射关系
export const mapTextToHtml = (text: string, html: string): number[] => {
  const mapping: number[] = []
  let htmlIndex = 0

  // 遍历纯文本中的每个字符
  for (let i = 0; i < text.length; i++) {
    // 跳过 HTML 中的标签
    while (htmlIndex < html.length && html[htmlIndex] === '<') {
      // 移动到标签结束的地方 '>'
      while (htmlIndex < html.length && html[htmlIndex] !== '>') {
        htmlIndex++
      }
      htmlIndex++
    }
    htmlIndex++
    // 将纯文本的索引映射到 HTML 索引
    mapping.push(htmlIndex)
  }

  return mapping
}
export const isInline = (node: HTMLElement) => {
  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as HTMLElement
    if (inlineElements.includes(element.tagName.toLowerCase())) {
      return true // 在行内元素内
    }
  }
  return false
}
