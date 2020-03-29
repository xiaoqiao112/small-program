<template>
  <div rel="waterFall">
    <div class="options">
      竖向瀑布流：<input v-model="direction" type="radio" name="direction" value="column">
      &#12288;&#12288;&#12288;
      横向瀑布流：<input v-model="direction" type="radio" name="direction" value="row">
    </div>
    <div v-if="list.length != 0">
      <WaterFall v-show="direction==='row'" :list="list" :row="true"></WaterFall>
      <WaterFall v-show="direction==='column'" :list="list"></WaterFall>
    </div>
  </div>
</template>

<script>
  import WaterFall from '../common/cascadeFlow'
  export default {
    name: 'waterFall',
    data() {
      return {
        list: [],
        direction: 'column',
        flag: false
      }
    },
    components: {
      WaterFall
    },
    created() {
      window.onscroll = () => {
        if (this.flag) {
          return
        }
        if (document.documentElement.scrollTop + document.body.clientHeight + 150 > document.documentElement.scrollHeight) {
          this.flag = true;
          this.list = this.list.concat([
            {url: '../../../static/images/7.jpg', height: 1050, width: 1680},
            {url: '../../../static/images/2.jpg', height: 1134, width: 808},
            {url: '../../../static/images/4.jpg', height: 1000, width: 660},
            {url: '../../../static/images/6.jpg', height: 750, width: 500},
            {url: '../../../static/images/5.jpg', height: 509, width: 800},
            {url: '../../../static/images/3.jpg', height: 800, width: 1280}
          ]);
          setTimeout(() => {
            this.flag = false
          }, 500)
        }
      }
    },
    mounted() {
      this.list = [
        {url: '../../../static/images/1.jpg', height: 800, width: 1280},
        {url: '../../../static/images/3.jpg', height: 800, width: 1280},
        {url: '../../../static/images/2.jpg', height: 1134, width: 808},
        {url: '../../../static/images/5.jpg', height: 509, width: 800},
        {url: '../../../static/images/4.jpg', height: 1000, width: 660},
        {url: '../../../static/images/6.jpg', height: 750, width: 500},
        {url: '../../../static/images/7.jpg', height: 1050, width: 1680},
        {url: '../../../static/images/8.jpg', height: 3548, width: 440},
        {url: '../../../static/images/9.jpg', height: 519, width: 800},
        {url: '../../../static/images/1.jpg', height: 800, width: 1280},
        {url: '../../../static/images/2.jpg', height: 1134, width: 808},
        {url: '../../../static/images/3.jpg', height: 800, width: 1280},
        {url: '../../../static/images/4.jpg', height: 1000, width: 660},
        {url: '../../../static/images/5.jpg', height: 509, width: 800},
        {url: '../../../static/images/6.jpg', height: 750, width: 500},
        {url: '../../../static/images/7.jpg', height: 1050, width: 1680},
        {url: '../../../static/images/3.jpg', height: 800, width: 1280},
        {url: '../../../static/images/4.jpg', height: 1000, width: 660},
        {url: '../../../static/images/5.jpg', height: 509, width: 800},
        {url: '../../../static/images/6.jpg', height: 750, width: 500},
        {url: '../../../static/images/9.jpg', height: 519, width: 800},
        {url: '../../../static/images/1.jpg', height: 800, width: 1280},
        {url: '../../../static/images/2.jpg', height: 1134, width: 808},
        {url: '../../../static/images/3.jpg', height: 800, width: 1280},
        {url: '../../../static/images/4.jpg', height: 1000, width: 660},
        {url: '../../../static/images/5.jpg', height: 509, width: 800},
        {url: '../../../static/images/6.jpg', height: 750, width: 500},
        {url: '../../../static/images/7.jpg', height: 1050, width: 1680},
        {url: '../../../static/images/9.jpg', height: 519, width: 800},
        {url: '../../../static/images/1.jpg', height: 800, width: 1280},
        {url: '../../../static/images/2.jpg', height: 1134, width: 808},
        {url: '../../../static/images/3.jpg', height: 800, width: 1280},
        {url: '../../../static/images/4.jpg', height: 1000, width: 660},
        {url: '../../../static/images/5.jpg', height: 509, width: 800},
        {url: '../../../static/images/6.jpg', height: 750, width: 500},
        {url: '../../../static/images/7.jpg', height: 1050, width: 1680}
      ]
    }
  }
</script>

<style lang="scss" scoped>
  .options {
    padding: 10px;
    text-align: center;
  }
</style>
