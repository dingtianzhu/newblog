import { h } from 'vue'
import { mkKeydown, mkInput, mkCompositionEnd, mkCompositionStart } from './markdown'

export const createElementBlock = (
  el: string,
  className: string,
  text: string,
  contenteditable: any = true,
  keydown: Function = mkKeydown
) => {
  return h(
    el,
    {
      class: 'delBorder ' + className,
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
