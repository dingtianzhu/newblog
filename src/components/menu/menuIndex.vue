<script setup lang="ts">
import { Item } from './menu';
import MenuItem from './menuItem.vue';


const props = defineProps({
  items: { type: Array as () => Item[], required: true }
});

</script>

<template>
  <div class="menu">
    <ul>
      <Menu-item v-for="(item, index) in items" :key="index" :item="item" />
    </ul>
  </div>
</template>



<style scoped>
.menu {
  font-family: Arial, sans-serif;
  width: 100%;
  height: 35px;


}






/* .menu ul {
  list-style: none;
  padding: 0;
} */
</style>
