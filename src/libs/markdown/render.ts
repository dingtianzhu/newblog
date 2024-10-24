import { h, render } from 'vue'
export const renderToFragment = (vNode: any, fragment: DocumentFragment) => {
  const tempDiv = document.createElement('div')
  render(vNode, tempDiv)
  const element = tempDiv.firstChild
  fragment.appendChild(element!)
  return element
}
