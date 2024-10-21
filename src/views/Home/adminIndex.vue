<script setup lang="ts">
import { reactive } from 'vue';
import menuIndex from '../../components/menu/menuIndex.vue'
// import { Item } from '../../components/menu/menu';
const menuList = reactive([
  {
    text: '文章管理',
    url: '/article',
    showChild: false,
    menuActive: 'string',
    // noChild:false,
    icon: "string",
    children: [
      {
        text: '文章添加',
        url: '/article/add',
        showChild: false,
        menuActive: 'string',
        // noChild:false,
        icon: "string",
        children: [
        ]
      },
    ]
  },
  {
    text: '菜单管理',
    url: '/menu',
    showChild: false,
    menuActive: 'string',
    // noChild:false,
    icon: "string",
    children: []
  },
])
</script>

<template>
  <div>
    <div class="left">
      <div class="left-menu">
        <div style="height: 60px;"></div>
        <menu-index :items="menuList"></menu-index>
        <!-- <div class="menu-single">你可以使用 CSS 的文本溢出属性来实现在内容末尾显示省</div> -->
      </div>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.left {
  position: absolute;
  background-color: #eee;
  width: 14%;
  height: 100%;

  .left-menu {
    width: 90%;
    height: 100%;
    /* background: #000; */
    margin: auto;


  }
}

.right {
  left: 14%;
  position: absolute;
  /* background: red; */
  height: 100%;
  width: 86%;
}
</style>