<!--上传录音组件-->
<template>
  <div rel="uploadVoice">
    <el-form-item label="录音内容" class="form-item voice-content flex-direction-style">
      <input id="uploadRedio" @change="fileChange()" type="file">
      <p>(仅支持wav格式、采样率16000hz、单声道、16bit；如何录音详见帮助中心)</p>
      <audio class="voice-video" :src="voicePath" controls="controls" v-show="voicePath"></audio>
      <el-button
        type="primary"
        v-if="this.basicData.voice"
        class="delete-voice"
        @click="deleteVoice()"
      >删除</el-button>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'uploadVoice',
  data() {
    return {
      voicePath: '',
      isSubmitClick: false
    }
  },
  props: {
    basicData: {
      type: Object
      // default: {}
    }
  },
  computed: {},
  methods: {
    // 录音上传
    fileChange() {
      const fileObj = document.querySelector('#uploadRedio')
      if (fileObj.files.length > 0) {
        let path = fileObj.value
        //本地选择的录音文件可以播放
        this.voicePath = URL.createObjectURL(fileObj.files[0])
        let pos = path.lastIndexOf('\\')
        let fileName = path.substring(pos + 1)
        let fileNameArr = fileName.split('.')
        let str = fileNameArr[fileNameArr.length - 1]
        if (fileName === '') {
          this.$message.error('文件名不可为空')
          this.isSubmitClick = false
        } else if (str.toLowerCase() !== 'wav') {
          this.$message.error('只能上传‘wav’类型文件')
          this.isSubmitClick = false
        } else {
          this.isSubmitClick = true
        }
      } else {
        this.$message.error('文件不可为空')
        this.isSubmitClick = false
      }
    },

    // 删除录音
    deleteVoice() {
      const fileObj = document.querySelector('#uploadRedio')
      fileObj.value = ''
      this.voicePath = ''
      this.basicData.voice = ''
    }
  },
  mounted() {
    this.voicePath = this.basicData.voice ? this.basicData.voice : ''
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
div[rel='uploadVoice'] {
  display: flex;
  justify-content: center;
  align-items: center;
  .form-item {
    display: block;
    position: relative;
    z-index: 2; //防止被video遮挡
  }
  .voice-content {
    position: relative;
    .voice-video {
      height: 56px;
      width: 300px;
      position: absolute;
      bottom: 25px;
      left: 250px;
      z-index: 1;
    }
    .delete-voice {
      position: absolute;
      bottom: 38px;
      left: 500px;
    }
  }
  .flex-direction-style {
    display: flex;
    flex-direction: row;
  }
}
</style>
<!--上传录音时, 提交的话需要'Content-Type': 'multipart/form-data',需要new FormData -->
