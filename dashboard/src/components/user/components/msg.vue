<template>
  <div>
    <div class="msg-wp-img">
      <video ref="camera-video" width="200" height="200" autoplay="autoplay" class="video-msg border-rad"></video>
      <img src="/static/img/arrow.png">
      <canvas ref="camera-canvas" width="200px" height="200px" class="canvas-msg border-rad"></canvas>
    </div>
    <el-row type="flex" justify="space-between" class="upload-btn">
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-picture" @click="takePhoto"></el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" icon="el-icon-delete" @click="removePhoto"></el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-upload" @click="uploadImg"></el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { uploadUserImg } from '@/service/role'
export default {
  name: 'user-home',
  data () {
    return {
      photoData: '',
      canupload: false,
      canvas: null,
      ctx: null,
      mediaStreamTrack: null
    }
  },
  methods: {
    navClick (path) {
      this.$router.push(path)
    },
    getMedia () {
      let constraints = {
        video: { width: 400, height: 400 },
        audio: false
      }
      // 获得video摄像头区域
      let video = this.$refs['camera-video']
      // 这个Promise对象返回成功后的回调函数带一个 MediaStream 对象作为其参数
      // then()是Promise对象里的方法
      // then()方法是异步执行，当then()前的方法执行完后再执行then()内部的程序
      // 避免数据没有获取到
      // 由于chrome必须在https协议下才能使用，所以切换为旧版本API,如果当前使用的网站为https,建议使用最新版API
      let promise = navigator.mediaDevices.getUserMedia(constraints)
      promise.then(MediaStream => {
        this.mediaStreamTrack = MediaStream
        video.srcObject = MediaStream
        video.play()
      })
      // navigator.getMedia = navigator.getUserMedia ||
      //                 navigator.webkitGetUserMedia ||
      //                 navigator.mozGetUserMedia ||
      //                 navigator.msGetUserMedia
      // navigator.getMedia(constraints, (MediaStream) => {
      //   this.mediaStreamTrack = MediaStream
      //   video.srcObject = MediaStream
      //   video.play()
      // }, (err) => {
      //   console.log(err)
      // })
    },
    takePhoto () {
      // 获得Canvas对象
      let video = this.$refs['camera-video']
      this.canvas = this.$refs['camera-canvas']
      this.ctx = this.canvas.getContext('2d')
      this.ctx.drawImage(video, 0, 0, 200, 200)
    },
    getImgdata () {
      return this.canvas.toDataURL('image/jpeg')
    },
    removePhoto () {
      this.ctx.clearRect(0, 0, 200, 200)
      this.ctx = null
    },
    uploadImg () {
      if (!this.ctx) {
        this.$message('请拍照上传')
      } else {
        const data = this.getImgdata()
        uploadUserImg({data}).then(
          res => {
            this.$router.push('/userapplication')
          }
        )
      }
    }
  },
  mounted () {
    this.getMedia()
  },
  destroyed () {
    this.mediaStreamTrack.getTracks()
      .forEach(function (track) {
        track.stop()
      })
  }
}
</script>
<style>
  .msg-wp-img {
    width: 800px;
    margin: 40px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .border-rad {
    border: 1px solid #cccccc;
    border-radius: 100px;
  }
  .upload-btn {
    width: 400px;
    margin: auto;
  }
  .upload-btn .el-button {
    width: 100%;
  }
</style>
