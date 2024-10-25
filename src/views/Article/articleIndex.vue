<script setup lang="ts">
import { mkKeydown, mkCompositionStart, mkCompositionEnd, mkInput } from '@libs/markdown/markdown';

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
    <div ref="container" contenteditable="true" class="placeholder custom-dot-cursor" tabindex="0" @input="handleInput"
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
</style>