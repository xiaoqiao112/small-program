<template>
  <div rel="index">
    <div class="main-title">vue公用组件集合</div>
    <div class="title-name">1.select实现全选</div>
    <el-form
      :inline="true"
      :model="formSearch"
      class="demo-form-inline"
      label-position="right"
      label-width="100px"
      size="small">
      <el-row>
        <selectAll
          :name="busLine"
          :modelData="formSearch.biz"
          :optionData="allBizLineData"
          :bizLineOrBizType="busBizLine"
          @selectedData="selectedDataEventLine">
        </selectAll>
      </el-row>
    </el-form>
    <div class="title-name">2.分页实现</div>
    <pagination
      @onSizeChange="tbSizeChange"
      @onCurrentChange="tbCurrentChange"
      :currentPage="formSearch.pageNum"
      :page-size="formSearch.pageSize"
      :total="tbDataList.total">
    </pagination>
    <div class="title-name">3.上传录音</div>
    <el-form
      class="upload-voice"
      size="small"
      ref="reserveCraftContentModalForm"
      label-position="right"
      label-width="120px"
      :inline="true"
      :model="reserveCraftContentModalForm">
      <el-row>
        <uploadVoice :basicData="reserveCraftContentModalForm"></uploadVoice>
      </el-row>
    </el-form>
    <div class="title-name" @click="goToWaterFall">4.瀑布流布局实现</div>
    <div class="title-name" @click="pageScrollEvent">5.页面滚动</div>
  </div>
</template>

<script>
import selectAll from '../common/selectAll'
import pagination from '../common/pagination'
import uploadVoice from '../common/uploadVoice'

export default {
  name: 'index',
  components: {
    selectAll,
    pagination,
    uploadVoice
  },
  data() {
    return {
      busLine: '业务线',
      busBizLine: '业务线',
      formSearch: {
        biz: [],
        pageNum: 1,
        pageSize: 10
      },
      tbDataList: {},
      allBizLineData: [
        {
          bizLine: '全部',
          mapping: -1
        },
        {
          bizLine: '黄页',
          mapping: 1
        },
        {
          bizLine: '招聘',
          mapping: 2
        },
        {
          bizLine: '房产',
          mapping: 3
        },
        {
          bizLine: '安居客',
          mapping: 4
        },
        {
          bizLine: '二手车',
          mapping: 5
        }
      ],

      reserveCraftContentModalForm: {
        voiceFile: '',
        voice: ''
      }
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    // 1. selectAll全选组件
    selectedDataEventLine(val) {
      console.log(val) // 选中的value
    },

    // 2.分页组件
    tbSizeChange(val) {
      // 改变分页总条数
      this.formSearch.pageSize = val
      // 进行接口列表请求
    },
    tbCurrentChange(val) {
      // 改变页码
      this.formSearch.pageNum = val
      // 进行接口列表请求
    },
    goToWaterFall(){
      this.$router.push({
        path: '/waterFall'
      });
    },
    pageScrollEvent(){
      this.$router.push({
        path: '/scrollPage'
      })
    }
  }
}
</script>

<style lang="scss">
div[rel='index'] {
  .main-title {
    font-size: 30px;
    margin-bottom: 20px;
  }
  .title-name {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
  }
  .title-name:hover{
    cursor: pointer;
  }
  .upload-voice {
    .el-form-item__content {
      text-align: left;
      padding: 0 20px;
    }
  }
}
</style>
