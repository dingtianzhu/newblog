<template>
  <div>
    <textarea v-model="markdownText" @input="parseMarkdown"></textarea>
    <div v-html="parsedMarkdown"></div>
  </div>
</template>

<script lang="ts" setup>
import * as marked from 'marked';
import { ref } from 'vue';
const markdownText = ref('')
const parsedMarkdown = ref('')

const processContent = (children: NodeListOf<ChildNode> | undefined) => {
  if (!children) return;

  let currentCodeBlock: string[] = []; // 用于存储多行代码
  let isInCodeBlock = false; // 标识是否在代码块中

  children.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const content = node.textContent || '';

      if (content.startsWith('```')) {
        if (isInCodeBlock) {
          // 结束代码块
          const codeContent = currentCodeBlock.join('\n'); // 合并多行代码
          const highlightedCode = highlightCode(codeContent); // 高亮代码

          const vNode = h('div', { class: 'code-block-class' }, [
            h('div', { class: 'code-header' }, 'code'), // 顶部样式
            h(
              'button',
              {
                class: 'copy-button',
                onClick: () => {
                  navigator.clipboard.writeText(codeContent).then(() => {
                    alert('代码已复制！');
                  });
                }
              },
              '复制代码' // 复制代码按钮
            ),
            h('pre', { class: 'code-content-class' }, [
              h('div', { class: 'code-line', innerHTML: highlightedCode })
            ]) // 代码块
          ]);

          const fragment = document.createDocumentFragment();
          renderToFragment(vNode, fragment);
          node.parentNode?.replaceChild(fragment, node); // 替换原节点

          // 重置状态
          currentCodeBlock = [];
          isInCodeBlock = false;
        } else {
          // 进入代码块
          isInCodeBlock = true;
        }
      } else if (isInCodeBlock) {
        // 如果在代码块中，继续存储代码内容
        currentCodeBlock.push(content.trim());
      } else {
        // 正常处理非代码块行
        elList.forEach((el) => setElement(content, el, node));
      }
    } else {
      // 如果是其他节点，递归处理子节点
      processContent(node.childNodes);
    }
  });

  // 如果还在代码块中且有剩余内容，处理它
  if (isInCodeBlock && currentCodeBlock.length > 0) {
    const codeContent = currentCodeBlock.join('\n');
    const highlightedCode = highlightCode(codeContent);

    const vNode = h('div', { class: 'code-block-class' }, [
      h('div', { class: 'code-header' }, 'code'),
      h(
        'button',
        {
          class: 'copy-button',
          onClick: () => {
            navigator.clipboard.writeText(codeContent).then(() => {
              alert('代码已复制！');
            });
          }
        },
        '复制代码'
      ),
      h('pre', { class: 'code-content-class' }, [
        h('div', { class: 'code-line', innerHTML: highlightedCode })
      ])
    ]);

    const fragment = document.createDocumentFragment();
    renderToFragment(vNode, fragment);
    children[0].parentNode?.replaceChild(fragment, children[0]); // 用合并的代码块替换第一个节点
  }
};



</script>

<style>
/* 添加适当的样式 */
textarea {
  width: 100%;
  height: 200px;
}
</style>
