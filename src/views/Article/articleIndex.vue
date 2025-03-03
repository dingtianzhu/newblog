<script setup lang="ts">
import { mkKeydown, mkCompositionStart, mkCompositionEnd, mkInput } from '@libs/markdown';

const handleInput = (e: any) => {
  mkInput(e)
};


const handleKeydown = (e: Event) => {
  mkKeydown(e)
}

// 当用户开始拼音输入时
const handleCompositionStart = (e: Event) => {
  mkCompositionStart(e)
};

// 当用户结束拼音输入时
const handleCompositionEnd = (e: Event) => {
  mkCompositionEnd(e)
};
</script>
<template>
  <div id="container">
    <div ref="container" contenteditable="true" class="placeholder" tabindex="0" @input="handleInput"
      @compositionstart="handleCompositionStart" @compositionend="handleCompositionEnd" @keydown="handleKeydown">
    </div>
  </div>
</template>



<style>
#container {
  width: 60%;
  margin: auto;
  padding-top: 80px;
  box-sizing: border-box;
  border: none;
  outline: none;
  min-height: 300px;

  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

.placeholder {
  box-sizing: border-box;
  border: none;
  outline: none;
  user-select: text;
}

.placeholder:empty::before {
  content: '输入# 为标题';
  /* 这里是 placeholder 的文本 */
  color: #aaa;
  /* Placeholder 的颜色 */
  font-style: italic;

}

/* 当 div 有内容时，移除 placeholder 效果 */
.placeholder:not(:empty)::before {
  content: '';
}


.h1class {
  text-align: center;
  line-height: 1.2;
  border: none;
  outline: none;
  font-size: 2.5rem;
  /* 调整标题的字体大小 */
  font-weight: bold;
  /* 粗体显示 */
  margin-top: 20px;
  /* 上方的间距 */
  margin-bottom: 20px;
  /* 下方的间距 */
  color: #333;
  /* 标题文本颜色 */
  border-bottom: 1px solid #eaecef;
  /* 底部边框，像 Markdown 的标题样式 */
  padding-bottom: 0.3em;
  /* 底部内边距 */
}

.h2class {
  font-size: 2em;
  /* 32px */
  font-weight: bold;
  border: none;
  outline: none;
  color: #333;
  margin-bottom: 0.75em;
  line-height: 1.3;
}

.h3class {
  font-size: 1.75em;
  /* 28px */
  font-weight: bold;
  border: none;
  outline: none;
  color: #333;
  margin-bottom: 0.75em;
  line-height: 1.4;
}

.h4class {
  font-size: 1.5em;
  /* 24px */
  font-weight: bold;
  border: none;
  outline: none;
  color: #333;
  margin-bottom: 1em;
  line-height: 1.5;
}

.h5class {
  font-size: 1.25em;
  /* 20px */
  font-weight: bold;
  border: none;
  outline: none;
  color: #333;
  margin-bottom: 1em;
  line-height: 1.6;
}

.h6class {
  font-size: 1em;
  /* 16px */
  font-weight: bold;
  border: none;
  outline: none;
  color: #333;
  margin-bottom: 1em;
  line-height: 1.7;
}

.p-md-class {
  font-size: 16px;
  color: #333;
  border: none;
  outline: none;
  line-height: 1.6;
}

.code-md-class {
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
  color: #d63384;
}

.ul-md-class {
  list-style-type: disc;
  /* 默认圆点样式 */

  /* 左侧内边距 */
}

li::marker {
  padding: 40px !important;
}

.ul-md-class li {
  margin: 5px 0;
  /* 列表项之间的垂直间距 */
  font-size: 16px;
  /* 字体大小 */
  color: #333;
  /* 字体颜色 */
  line-height: 1.5;
  /* 行高 */
}


.code-block-class {
  overflow: auto;
  /* 允许滚动 */
  position: relative;
  background-color: #282c34;
  border: 1px solid #ddd;
  border-radius: 6px;
  border: none;
  outline: none;
  overflow: hidden;
  margin: 20px auto;
}

.code-header {
  background-color: #333;
  /* 顶部栏背景 */
  color: #e3e3e3;
  /* 文本颜色 */
  padding: 10px;
  font-size: 12px;
}

.code-content-class {
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace !important;
  /* 字体 */
  white-space: pre;
  padding: 10px;


  background-color: #282c34;
  overflow: auto;
  /* 保留空格 */
  color: #e3e3e3;
  /* 代码默认颜色 */
}

.code-line {
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace !important;
  white-space: pre;
  line-height: 1.5;
  font-size: 14px;
  min-height: 60px;
  border: none;
  outline: none;
  max-height: 460px;
  /* margin-bottom: 40px; */
  /* 字体 */
}

.copy-button {
  position: absolute;
  top: 5px;
  right: 10px;
  background-color: #333;
  color: #e3e3e3;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
}

.copy-button:hover {
  background-color: #555;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 90px;
  background-color: #333;
  color: #e3e3e3;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
}

.delete-button:hover {
  background-color: #555;
}

.mk-keyword {
  /* color: #d73a49; */
  color: #df3079;
  /* 高亮颜色 */
}

.mk-function {
  /* color: #6f42c1; */
  color: #07a;
  /* 高亮颜色 */
}

.mk-comment {
  /* color: #d73a49; */
  color: #aaa;
  /* 高亮颜色 */
}
</style>