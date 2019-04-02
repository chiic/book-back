<template>
  <div class="lg-wrapper">
    <el-form
      :model="Form"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <embed class="icon-input user" src="/static/img/user.svg" />
        <el-input v-model="Form.username"></el-input>
      </el-form-item>
      <el-form-item prop="psd">
        <embed class="icon-input user" src="/static/img/password.svg" />
        <el-input v-model="Form.psd" type="password"></el-input>
      </el-form-item>
      <el-form-item class="form-btn-el">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="240px"
      @closed="closeBefore"
      @opened="getMedia"
      height="200px">
      <div class="dialog-video-wp">
        <video src="" width="200px" height="200px" ref="camera-video-login"></video>
        <div class="line"></div>
      </div>
      <canvas ref="camera-canvas-login" width="300px" height="300px" class="login-cemera-canvas"></canvas>
    </el-dialog>
  </div>
</template>
<script>
import { matchRoles } from '@/service/role'
export default {
  name: 'login',
  data () {
    return {
      Form: {
        username: '',
        psd: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        psd: [{ required: true, message: '请输入密码' }]
      },
      dialogVisible: false,
      canvas: null,
      ctx: null,
      mediaStreamTrack: null,
      ismatch: false,
      timer: null
    }
  },
  methods: {
    closeBefore () {
      clearInterval(this.timer)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/back/login', this.Form)
            .then(res => {
              if (res.data && res.data.login === 'passpsd') {
                if (res.data.faceAuth) {
                  this.showCamera()
                } else {
                  this.$router.push('/')
                }
              }
            })
            .catch(err => {
              if (err.response && err.response.status === 403) {
                this.$message({
                  showClose: true,
                  message: '请输入正确的用户名和密码！',
                  type: 'error'
                })
              }
            })
        } else {
          return false
        }
      })
    },
    showCamera () {
      this.dialogVisible = true
    },
    getMedia () {
      const _this = this
      let constraints = {
        video: { width: 300, height: 300 },
        audio: false
      }
      let video = _this.$refs['camera-video-login']
      let promise = navigator.mediaDevices.getUserMedia(constraints)
      promise.then(MediaStream => {
        _this.mediaStreamTrack = MediaStream
        video.srcObject = MediaStream
        video.play()
        this.matchImg()
      })
      // navigator.getMedia = navigator.getUserMedia ||
      //           navigator.webkitGetUserMedia ||
      //           navigator.mozGetUserMedia ||
      //           navigator.msGetUserMedia
      // navigator.getMedia(constraints, (MediaStream) => {
      //   this.mediaStreamTrack = MediaStream
      //   video.srcObject = MediaStream
      //   video.play()
      //   this.matchImg()
      // }, (err) => {
      //   console.log(err)
      // })
    },
    takePhotoData () {
      // 获得Canvas对象
      let video = this.$refs['camera-video-login']
      this.canvas = this.$refs['camera-canvas-login']
      this.ctx = this.canvas.getContext('2d')
      this.ctx.drawImage(video, 0, 0, 200, 200)
      return this.canvas.toDataURL('image/jpeg')
    },
    matchImg () {
      this.timer = setInterval(() => {
        matchRoles({img: this.takePhotoData()}).then(res => {
          if (res.data.result && res.data.result.score > 85) {
            clearInterval(this.timer)
            this.$router.push('/')
          }
        })
      }, 1000)
    },
    destroyedCamera () {
      this.mediaStreamTrack.getTracks()
        .forEach(function (track) {
          track.stop()
        })
    }
  },
  destroyed () {
    this.destroyedCamera()
  }
}
</script>
<style scope>
.lg-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  background: #323a4d;
  justify-content: center;
  align-items: center;
}
.lg-wrapper .el-form-item {
  border: 1px solid #eeeeee;
  border-radius: 4px;
  width: 350px;
  height: 40px;
}
.lg-wrapper .icon-input {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 12px;
  left: 5%;
}
.lg-wrapper .el-input {
  width: 80%;
  background: transparent;
  margin: auto 10%;
}
.lg-wrapper .el-input input {
  background: transparent;
  border: 0;
  color: #ffffff;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 99999s;
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}
.lg-wrapper .form-btn-el {
  border: 0;
}
.lg-wrapper .form-btn-el button {
  width: 100%;
}
.login-cemera-canvas {
  display: none;
}
.dialog-video-wp {
  position: relative;
  border-radius: 5px;
  border: 1px solid #00ebfb;
  box-sizing: border-box;
  overflow: hidden;
}
@keyframes diglogLIne {
  0% {
    top: 0;
  }
  50% {
    top: 95%;
  }
  100% {
    top: 0;
  }
}
.dialog-video-wp .line {
  width: 90%;
  margin-left: 5%;
  height: 5px;
  background: #00ebfb;
  animation: diglogLIne 3s infinite;
  position: absolute;
}
.lg-wrapper .el-dialog {
  background: #111731;
}
.dialog-video-wp video {
  margin-bottom: -4px;
}
</style>
