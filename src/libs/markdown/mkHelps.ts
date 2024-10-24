// 创建纯文本到解析内容的映射关系
const mapTextToHtml = (text: string, html: string): number[] => {
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

    // 将纯文本的索引映射到 HTML 索引
    mapping.push(htmlIndex)
    htmlIndex++
  }

  return mapping
}
