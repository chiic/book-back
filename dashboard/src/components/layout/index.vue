<template>
  <div class="ly-wrapper">
    <div class="left">
      <nav-menu></nav-menu>
    </div>
    <div class="right">
      <keep-alive>
        <router-view />
      </keep-alive>
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
    overflow: hidden;
  }
  .ly-wrapper .left {
    height: 100vh;
    min-width: 150px;
    display: flex;
    background: #304156;
    align-items: center;
    overflow: hidden;
    color: #ffffff;
    border-right: 1px solid #cccccc;
  }
  .ly-wrapper .right {
    position: relative;
    overflow-x: hidden;
    min-width: calc(100% - 150px);
    height: 100vh;
    background: #eeeef3;
    overflow-y: auto;
    display: flex;
    align-items: center;
  }
</style>
