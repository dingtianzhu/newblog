import { h, render, nextTick, ref } from 'vue'

interface El {
  reg: RegExp
  el: string
  type: string
  ck: Function
  class: string
}
let isComposing = false // 用于追踪是否在拼音输入状态
const copyText = ref('复制代码')
const elList: El[] = [
  {
    reg: /^#\ /,
    el: 'h1',
    type: 'block',
    ck: () => {},
    class: 'h1class'
  },
  {
    reg: /^##\ /,
    el: 'h2',
    type: 'block',
    ck: () => {},
    class: 'h2class'
  },
  {
    reg: /^###\ /,
    el: 'h3',
    type: 'block',
    ck: () => {},
    class: 'h3class'
  },
  {
    reg: /^####\ /,
    el: 'h4',
    type: 'block',
    ck: () => {},
    class: 'h4class'
  },
  {
    reg: /^#####\ /,
    el: 'h5',
    type: 'block',
    ck: () => {},
    class: 'h5class'
  },
  {
    reg: /^######\ /,
    el: 'h6',
    type: 'block',
    ck: () => {},
    class: 'h6class'
  },
  {
    reg: /(?<!`)(`([^`]+)`(?!`))/g,
    el: 'code',
    type: 'inline',
    ck: () => {},
    class: 'code-md-class'
  },
  {
    reg: /(?<!\*)\*(?!\*)(?=\S)(.+?)(?<=\S)\*(?!\*)|(?<!_)_(?!_)(?=\S)(.+?)(?<=\S)_(?!_)/g,
    el: 'em',
    type: 'inline',
    ck: () => {},
    class: 'em-md-class'
  },
  {
    reg: /(\*\*|__)(?=\S)(.+?)(?<=\S)\1/g,
    el: 'b',
    type: 'inline',
    ck: () => {},
    class: 'b-md-class'
  },
  {
    reg: /(^|\n)[*-]\ +(.*?)(?=\n|$)/g,
    el: 'ul',
    type: 'com',
    ck: () => {},
    class: 'ul-li-md-class'
  },
  {
    reg: /(^|\n)```([\s\S]*?)```/g,
    el: 'pre',
    type: 'block',
    ck: () => {},
    class: 'code-block-class' // 添加代码块的配置
  }
]

// 移动光标到指定元素的末尾
const moveCursorToEnd = (element: Node) => {
  const range = document.createRange()
  const selection = window.getSelection()
  range.setStartAfter(element)
  range.collapse(true)
  selection?.removeAllRanges()
  selection?.addRange(range)
}

// 渲染虚拟节点到文档片段
const renderToFragment = (vNode: any, fragment: DocumentFragment) => {
  const tempDiv = document.createElement('div')
  render(vNode, tempDiv)
  fragment.appendChild(tempDiv.firstChild!)
}

const highlightCode = (code: string, type: string = 'javascript') => {
  // 这里可以实现代码高亮的逻辑
  // 例如，将特定关键字包裹在 span 标签内
  let str: RegExp
  switch (type) {
    case 'javascript':
      str = /(const |let |var  |function |if |else |return |for |while |class |import |export )/g
      break
    default:
      str = /(const |let |var  |function |if |else |return |for |while |class |import |export )/g
  }

  return code
    .replace(str, '<span class="mk-keyword">$1</span>')
    .replace(/([a-zA-Z_]\w*)\s*\(/g, '<span class="mk-function">$1</span>(')
    .replace(/(\/\/.*)/g, '<i class="mk-comment">$1</i>')
}

const createElementBlock = (
  el: string,
  className: string,
  text: string,
  contenteditable: any = true,
  keydown: Function = mkKeydown
) => {
  return h(
    el,
    {
      class: className,
      contenteditable,
      tabindex: '0',
      onInput: mkInput,
      onCompositionend: mkCompositionEnd,
      onCompositionstart: mkCompositionStart,
      onKeydown: keydown || mkKeydown
    },
    text
  )
}
// 处理元素
const setElement = (content: string, el: El, node: Node) => {
  const match = content.match(el.reg)
  if (!match) return
  const fragment = document.createDocumentFragment()
  const parent = node.parentNode
  let endNode: Node | null = null
  // 先处理代码块
  if (el.type === 'block' && el.reg.test(content)) {
    const vNode = createElementBlock(el.el, el.class, content.replace(el.reg, '').trim())
    renderToFragment(vNode, fragment)
    endNode = fragment.firstChild
    // }
  } else if (el.type === 'inline') {
    let lastIndex = 0
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

      renderToFragment(inlineVNode, fragment)

      lastIndex = el.reg.lastIndex
    }

    endNode = document.createTextNode('\u2009')
    fragment.appendChild(endNode)
    if (lastIndex < content.length) {
      fragment.appendChild(document.createTextNode(content.slice(lastIndex)))
    }
  } else if (el.type === 'com') {
    const ulVNode = h(
      el.el,
      { class: el.class },
      match.map((m) => h('li', {}, m[2])) // 创建 li
    )
    renderToFragment(ulVNode, fragment)
    endNode = fragment.firstChild
    fragment.appendChild(endNode!)
  }
  if (endNode && parent) {
    node.replaceChild(fragment, node!.firstChild!)
    moveCursorToEnd(endNode)
  }
}

// 点击复制的事件处理函数
const handleCopyClick = (e: Event) => {
  const cnode = e.target as Node
  const text = cnode.parentNode?.lastChild?.firstChild?.textContent

  navigator.clipboard.writeText(text!).then(() => {
    copyText.value = '已复制'

    // 一段时间后恢复“复制代码”按钮文本
    setTimeout(() => {
      copyText.value = '复制代码'
    }, 2000) // 2秒后恢复
  })
}
const handleCodeBlock = (type: string, codeContent: string, e: Event) => {
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
      copyText.value // 复制代码按钮
    ),
    h('pre', { class: 'code-content-class' }, [
      h(
        'div',
        {
          class: 'code-line placeholder',
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
const saveSelection = (containerEl: HTMLElement) => {
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
const restoreSelection = (containerEl: HTMLElement, savedSel: any) => {
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
const mkBlackCodeInput = (e: Event, str: string = '</span>') => {
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
const processContent = (e: Event, content: string) => {
  if (content.match(/^```.*/g)) {
    const type = content.split('```')[1] || 'javascript'
    handleCodeBlock(type, '', e)
    // }
  } else {
    elList.forEach((el) => setElement(content, el, e.target as Node))
  }
}

const mkInput = (e: any) => {
  if (isComposing) return
  if (!e) {
    console.error('Event is undefined')
    return
  }
  const target = e.target as HTMLElement | null
  if (!target) return
  const content = (target as HTMLElement).textContent
  console.log('🚀 ~ mkInput ~ content:', content)
  content && processContent(e, content)
}

const mkKeydown = (e: Event) => {
  setInputPrevent(e)
}

// 当用户开始拼音输入时
const mkCompositionStart = (e: Event) => {
  isComposing = true
}

// 当用户结束拼音输入时
const mkCompositionEnd = (e: any) => {
  isComposing = false

  mkInput(e)
}
const removeCurrentNode = (e: Event, text: string | undefined = '', type: boolean = false) => {
  let target: HTMLElement

  if (type) target = (e.target as HTMLElement).parentNode as HTMLElement
  else target = e.target as HTMLElement
  const previousSibling = target?.previousSibling as HTMLElement
  console.log('🚀 ~ removeCurrentNode ~ previousSibling:', previousSibling)

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

const rePosition = (
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
const setInputPrevent = (e: Event) => {
  const parent = (e.target as Node).parentNode
  const content = (e.target as HTMLElement).textContent
  const selection = window.getSelection()
  const range = selection?.getRangeAt(0)
  const currentNode = range?.startContainer
  const target = e.target as HTMLElement
  // 获取光标后的内容
  const textAfterCursor = currentNode?.textContent?.slice(range?.endOffset)

  if (e instanceof KeyboardEvent && e.key === 'Enter') {
    if (isComposing) return
    if (content?.match(/```.*/g)) {
      return
    }
    e.preventDefault() // 阻止默认的回车行为
    currentNode!.textContent = currentNode!.textContent!.slice(0, range?.endOffset)
    // 创建一个新的 div 元素
    const newDiv = createElementBlock('div', 'placeholder', textAfterCursor!)
    // 将焦点移到新的 div 上
    const fragment = document.createDocumentFragment()
    // 使用 render 函数将虚拟节点渲染为真实 DOM
    renderToFragment(newDiv, fragment)
    // 将生成的真实 DOM 插入到当前 div 的下一个兄弟节点位置
    const newDivElement = fragment.firstChild
    if (newDivElement && parent) {
      // 将生成的真实 DOM 插入到当前 div 的下一个兄弟节点位置
      if (target.nextSibling) {
        parent.insertBefore(newDivElement, target.nextSibling)
      } else {
        // 如果当前没有下一个兄弟节点，则插入到最后
        parent.appendChild(newDivElement)
      }
      const nextSibling = target.nextSibling as HTMLElement
      nextSibling.focus()
    }
  } else if (e instanceof KeyboardEvent && e.key === 'Backspace') {
    if (!currentNode!.textContent!.slice(0, range?.endOffset)) {
      removeCurrentNode(e, textAfterCursor)
    }
  }
}

export { mkKeydown, mkCompositionStart, mkCompositionEnd, mkInput }
