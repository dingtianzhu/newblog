import { h, type VNode } from 'vue'
import { createElementBlock } from './createBlockElement'
import { renderToFragment } from './render'
import { moveCursorToEnd, restoreSelection, saveSelection, getCurrentNode } from './cursor'
import type { El } from './model'

// 处理元素
export const setElement = (content: string, el: El, node: Node) => {
  const match = content.match(el.reg)
  if (!match) return
  const fragment = document.createDocumentFragment()
  const parent = node.parentNode
  let endNode: Node | null = null
  // 先处理代码块
  if (el.type === 'block' && el.reg.test(content)) {
    const vNode = createElementBlock(el.el, el.class, content.replace(el.reg, '\u200B').trim())
    renderToFragment(vNode, fragment)
    endNode = fragment.firstChild
  } else if (el.type === 'inline') {
    let lastIndex = 0
    let renderedElements: ChildNode | null = null
    while (true) {
      const result = el.reg.exec(content)
      if (!result) break

      if (result.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(content.slice(lastIndex, result.index) + '\u2009')
        )
      } else {
        fragment.appendChild(document.createTextNode('\u2009'))
      }
      let text = result[2] || result[1] || result[0]
      const inlineVNode = createElementBlock(el.el, el.class, text)

      renderedElements = renderToFragment(inlineVNode, fragment)

      lastIndex = el.reg.lastIndex
    }
    endNode = document.createTextNode('\u2009')
    fragment.appendChild(endNode!)
    if (lastIndex < content.length) {
      fragment.appendChild(document.createTextNode(content.slice(lastIndex)))
    }
    const currentNode = getCurrentNode()
    currentNode?.parentNode?.replaceChild(fragment, currentNode)

    moveCursorToEnd(renderedElements!)
  } else if (el.type === 'com') {
    const ulVNode = h(
      el.el,
      { class: el.class },
      match.map((m) => createElementBlock('li', 'mk-li-class', m.slice(2) || '\u200B'))
      // h('li', { class: 'mk-li-class', tabindex: '0' }, m.slice(2) || '\u200B')) // 创建 li
    )
    renderToFragment(ulVNode, fragment)
    endNode = fragment.firstChild
    fragment.appendChild(endNode!)
  }
  if (el.type !== 'inline' && endNode && parent) {
    node.replaceChild(fragment, node.firstChild!)
    moveCursorToEnd(endNode)
  }
}
