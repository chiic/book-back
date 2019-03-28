<template>
  <el-slider v-model="value"></el-slider>
</template>
<script>
export default {
  name: 'verify-com',
  data () {
    return {
      value: 0
    }
  },
  watch: {
    value (val) {
      if (val === 100) {
        this.$store.dispatch('dispatchStep', {num: 1})
          .then(res => {
            this.$router.push('/modify/input')
          })
      }
    }
  }
}
</script>
