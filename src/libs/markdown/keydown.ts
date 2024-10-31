import { handleCustomEnter } from './enter'
import { handleCustomBackspace } from './backspace'
import {
  handleCustomArrowUp,
  handleCustomArrowDown,
  handleCustomArrowLeft,
  handleCustomArrowRight
} from './direction'
export const resetInputKeydown = (event: Event) => {
  const { key, ctrlKey, shiftKey, altKey, metaKey } = event as KeyboardEvent
  console.log('🚀 ~ resetInputKeydown ~ key:', key)
  switch (key) {
    case 'Enter':
      handleCustomEnter(event)
      break
    case 'Backspace':
      handleCustomBackspace(event)
      break
    case 'ArrowUp':
      handleCustomArrowUp(event)
      break
    case 'ArrowDown':
      handleCustomArrowDown(event)
      break
    case 'ArrowLeft':
      handleCustomArrowLeft(event)
      break
    case 'ArrowRight':
      handleCustomArrowRight(event)
      break
    case 'Tab':
      event.preventDefault()
      break
    case 'a':
      if (ctrlKey) {
        // 自定义全选行为（Ctrl+A）
        event.preventDefault()
        // handleCustomSelectAll()
      }
      break
    case 'v':
      if (ctrlKey || shiftKey) {
        // 自定义粘贴行为（Ctrl+V / Shift+V）
        event.preventDefault()
        // handleCustomPaste()
      }
      break
  }
}
