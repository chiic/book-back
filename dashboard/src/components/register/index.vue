<template>
  <el-row type="flex" class="register-wp">
  <el-col :span="6">
    <div class="register-left">
      <div class="register-img">
        <img src="/static/img/register.png"/>注册
      </div>
    </div>
  </el-col>
  <el-col :span="18">
    <div class="register-right">
      <register-form></register-form>
    </div>
  </el-col>
</el-row>
</template>
<script>
import RegisterForm from './components/registerForm'
export default {
  name: 'register-com',
  components: {
    RegisterForm
  }
}
</script>
<style>
  .register-wp {
    height: 100vh;
  }
  .register-wp .register-left {
    width: 100%;
    height: 100%;
    background: #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  .register-wp .register-left img {
    width: 64px;
    height: 64px;
    vertical-align: middle;
  }
  .register-wp .register-left .register-img {
    margin-top: -300px;
    font-size: 30px;
  }
  .register-right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>
