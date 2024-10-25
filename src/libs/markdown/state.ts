import { ref } from 'vue'
import type { El } from './model'

export const elList: El[] = [
  {
    reg: /^#\s+(.*?)(.*?)(?=\n|$)/g, //(^|\n)([*-])\s+(.*?)(?=\n|$)/g
    el: 'h1',
    type: 'block',
    ck: () => {},
    class: 'h1class'
  },
  {
    reg: /(^|\n)(##)\s+(.*?)(?=\n|$)/g,
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
    reg: /(^|\n)([*-])\s+(.*?)(?=\n|$)/g,
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
export const isComposing = ref(false)
export const copyText = ref('复制代码')
export const inlineElements = [
  'span',
  'strong',
  'b',
  'em',
  'i',
  'mark',
  'small',
  'del',
  'ins',
  'sub',
  'sup',
  'a',
  'cite',
  'q',
  // 'img',
  // 'audio',
  // 'video',
  // 'canvas',
  'code',
  'kbd',
  // 'pre', // 在某些情况下也可以视为行内元素
  'label'
  // 'button',
  // 'input',
  // 'select'
]
