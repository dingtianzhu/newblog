import { h, ref, nextTick } from 'vue'
import { highlightCode } from './highLight'
import { removeCurrentNode } from './removeNode'
import { renderToFragment } from './render'
import { mkCompositionEnd, mkCompositionStart } from './markdown'
import { restoreSelection, saveSelection } from './cursor'
export const handleCodeBlock = (type: string, codeContent: string, e: Event) => {
  // const codeContent = '' // 合并多行代码
  const node = e.target as Node
  const highlightedCode = highlightCode(codeContent) // 高亮代码
  const vNode = h('div', { class: 'code-block-class' }, [
    h('div', { class: 'code-header' }, type), // 顶部样式
    h(
      'button',
      {
        class: 'delete-button',
        onClick: (e) => {
          removeCurrentNode(e, '', true)
        }
      },
      '移除' // 复制代码按钮
    ),
    h(
      'button',
      {
        class: 'copy-button',
        onClick: handleCopyClick
      },
      '复制代码' // 复制代码按钮
    ),
    h('pre', { class: 'code-content-class' }, [
      h(
        'div',
        {
          class: 'code-line placeholders',
          contenteditable: 'plaintext-only',
          tabindex: '0',
          onInput: mkBlackCodeInput,
          onCompositionend: mkCompositionEnd,
          onCompositionstart: mkCompositionStart
          // onKeydown: keydown || mkKeydown
        },
        highlightedCode
      )
    ]) // 代码块
  ])
  const fragment = document.createDocumentFragment()
  renderToFragment(vNode, fragment)
  node?.parentNode?.insertBefore(fragment, node)
  const f = node?.previousSibling?.lastChild?.firstChild as HTMLElement
  f.focus()
  // 在 endNode 的后面插入新的代码块
  if (!node?.nextSibling) {
    node!.textContent = null
  } else {
    removeCurrentNode(e, '')
  }

  // }
}
const handleCopyClick = (e: Event) => {
  const cnode = e.target as Node
  const text = cnode.parentNode?.lastChild?.firstChild?.textContent

  navigator.clipboard
    .writeText(text!)
    .then(() => {
      // copyText.value = '已复制'
      const button = e.target as HTMLElement
      button.innerText = '已复制'
      // copyText.value =

      // 一段时间后恢复“复制代码”按钮文本
      setTimeout(() => {
        // copyText.value = '复制代码'
        button.innerText = '复制代码'
      }, 2000) // 2秒后恢复
    })
    .catch((error) => {
      console.error('复制失败:', error)
    })
}
export const mkBlackCodeInput = (e: Event, str: string = '</span>') => {
  const el = e.target as HTMLElement
  const content = el.textContent
  const lastSpanIndex = content?.lastIndexOf(str) || 0
  // 根据最后一个 </span> 分割字符串
  if (lastSpanIndex !== -1) {
    const part1 = content?.substring(0, lastSpanIndex + 7) // 包含 </span> 的部分
    const part2 = content?.substring(lastSpanIndex + 7) || '' // 剩余部分
    const res = highlightCode(part2)
    el.innerHTML = part1 + res
    return
  }

  const res = highlightCode(content!)
  const savedSelection = saveSelection(el)
  el.innerHTML = res
  if (savedSelection) {
    restoreSelection(el, savedSelection) // 恢复光标位置
  }
}
