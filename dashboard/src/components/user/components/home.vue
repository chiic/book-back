<template>
  <el-row type="flex" class="content-wrapper" justify="space-around">
    <el-col :span="6">
      <div class="item-content">
        <div class="img-content-wrapper">
          <img :src="imgData" alt="">
          <i class="add-icon" @click="cameraHandler"></i>
        </div>
        <p>账号：{{$store.state.userName}}</p>
        <div class="content-btn-wrapper">
          <el-button size="mini" type="primary" @click="modifyPsd">修改密码</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="18" class="item-right">
      <h4>设置</h4>
      <ul class="item-list-wp">
        <li>
          <img src="/static/img/phone.png">
          <span>开启手机登录功能，支持微信，qq，微博登录</span>
          <el-switch
            v-model="phoneValue"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </li>
        <li>
          <img src="/static/img/camera.png">
          <span>开启摄像头功能，支持刷脸登录</span>
          <el-switch
            v-model="cameraValue"
            active-color="#13ce66"
            @change="switchValue"
            inactive-color="#ff4949">
          </el-switch>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>
<script>
import { getUserImg, changeFaceauth, getUserface } from '@/service/role'
export default {
  name: 'user-home',
  data () {
    return {
      phoneValue: false,
      cameraValue: false,
      imgData: '/static/img/default_user.png'
    }
  },
  methods: {
    modifyPsd () {
      this.$router.push('/modify')
    },
    cameraHandler () {
      this.$router.push('/userapplication/msg')
    },
    switchValue (value) {
      changeFaceauth({value}).then(
        res => {
          if (res.data && res.data.ischanged) {
            this.$message(value ? '开启成功' : '关闭成功')
          }
        }
      )
    }
  },
  mounted () {
    getUserImg().then(
      res => {
        if (res.data && res.data.imgData) {
          this.imgData = res.data.imgData
        }
      }
    )
    getUserface().then(
      res => {
        if (res.data && res.data.faceAuth) {
          this.cameraValue = res.data.faceAuth
        }
      }
    )
  }
}
</script>
<style>
  .content-wrapper {
    width: 1000px;
    padding-top: 50px;
    margin: auto;
  }
  .content-wrapper .item-content {
    height: 350px;
    width: 100%;
    box-sizing: border-box;
    background: #f4f9ff;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
  }

  .img-content-wrapper {
    width: 100%;
    height: 100px;
    position: relative;
    line-height: 100px;
    text-align: center;
  }
  .img-content-wrapper .add-icon {
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    left: 50%;
    margin-left: 25px;
    top: 80px;
    cursor: pointer;
    background: blue url('/static/img/add_user.png') no-repeat center center;
  }
  .img-content-wrapper .add-icon:hover {
    transform: scale(1.2);
  }
  .img-content-wrapper img {
    vertical-align: middle;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #cccccc;
  }
  .item-content p {
    margin-top: 20px;
    text-align: center;
  }
  .content-btn-wrapper {
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
  .item-right h4 {
    margin-left: 20px;
  }
  .item-list-wp {
    width: 100%;
  }
  .item-list-wp li {
    list-style: none;
    height: 100px;
    line-height: 50px;
    display: flex;
    padding: 0 100px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
  }
  .item-list-wp li img {
    width: 40px;
    height: 40px;
    vertical-align: middle;
  }
</style>
