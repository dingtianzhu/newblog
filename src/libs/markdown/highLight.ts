export const highlightCode = (code: string, type: string = 'javascript') => {
  // 这里可以实现代码高亮的逻辑
  // 例如，将特定关键字包裹在 span 标签内
  let str: RegExp
  switch (type) {
    case 'javascript':
      str =
        /(?<=^|;|\s)(const|let|var|function|if|else|return|for|while|class|import|export)(?=\s|$)/g
      break
    default:
      str =
        /(?<=^|;|\s)(const|let|var|function|if|else|return|for|while|class|import|export)(?=\s|$)/g
  }

  return code
    .replace(str, '<span class="mk-keyword">$1</span>')
    .replace(/\b([a-zA-Z_]\w*)\s*\(/g, '<span class="mk-function">$1</span>(')
    .replace(/(\/\/|#).*/g, '<i class="mk-comment">$1</i>')
}
