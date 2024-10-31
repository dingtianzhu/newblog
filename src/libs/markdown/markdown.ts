import { ref } from 'vue'
import { resetInputKeydown } from './keydown'
import { elList, isComposing } from './state'
import { setElement } from './editLineElement'
import { handleCodeBlock } from './codeBlock'
import { getCurrentNode } from './cursor'

// let isComposing = false // 用于追踪是否在拼音输入状态
const copyText = ref('复制代码')

// 点击复制的事件处理函数

const processContent = (e: Event, content: string) => {
  if (content.match(/^```.*/g)) {
    const type = content.split('```')[1] || 'javascript'
    handleCodeBlock(type, '', e)
    // }
  } else {
    elList.forEach((el) => setElement(el, e.target as Node))
  }
}

const mkInput = (e: any) => {
  if (isComposing.value) return
  const target = e.target as HTMLElement | null
  if (!target) return
  const currentNode = getCurrentNode()
  const content = (currentNode?.parentElement as HTMLElement).innerHTML
  content && processContent(e, content)
}

const mkKeydown = (e: Event) => {
  resetInputKeydown(e)
}

// 当用户开始拼音输入时
const mkCompositionStart = (e: Event) => {
  isComposing.value = true
}

// 当用户结束拼音输入时
const mkCompositionEnd = (e: any) => {
  isComposing.value = false

  mkInput(e)
}

export { mkKeydown, mkCompositionStart, mkCompositionEnd, mkInput }
