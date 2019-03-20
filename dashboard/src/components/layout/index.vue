<template>
  <div class="ly-wrapper">
    <div class="left">
      <nav-menu></nav-menu>
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>
<script>
import NavMenu from '../views/NavMenu.vue'
export default {
  name: 'layout',
  components: {
    NavMenu
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style>
  .ly-wrapper {
    display: flex;
  }
  .ly-wrapper .left {
    height: 100vh;
    min-width: 150px;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-right: 1px solid #cccccc;
  }
  .ly-wrapper .right {
    position: relative;
  }
</style>
