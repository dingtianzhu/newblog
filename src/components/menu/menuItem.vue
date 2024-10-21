<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Item } from './menu';
// import { MouseEvent } from 'vue';
const router = useRouter()
const props = defineProps<{
  item: Item
}>()
const handleClick = (item: Item): void => {
  // 触发点击事件
  item.showChild = !item.showChild
  if (item.text && item.children.length <= 0) {
    router.push(item.url);
  }
}
</script>

<template>
  <li @click="handleClick(props.item)" :class="props.item.menuActive" class="ul-active">
    <p>{{ props.item.text }}</p>
    <ul v-show="props.item.showChild">
      <MenuItem v-for="(childItem, index) in props.item.children" :key="index" :item="childItem"
        @click.stop="handleClick(childItem)" />
    </ul>
  </li>
</template>



<style scoped>
p {
  padding-left: 8px;
}

li {
  line-height: 35px;
  text-align: left;
  /* background: #ddd; */
  border-radius: 8px;
  user-select: none;
  box-sizing: border-box;
  white-space: nowrap;
  /* padding-left: 10px; */
  /* 强制文本在一行显示 */
  overflow: hidden;
  /* 超出部分隐藏 */
  text-overflow: ellipsis;
  /* 文本溢出时显示省略号 */
  font-size: 14px;
  cursor: pointer;

  &>ul {
    margin-left: 20px;
  }
}

.ul-active>p:hover {
  background: #ccc;
  border-radius: 8px;
}

.ul-active>p:active {
  /* pointer-events: none; */
  background: #bbb;
}
</style>
