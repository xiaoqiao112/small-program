<!--select全选组件-->
<template rel="selectAll">
  <el-form-item :prop="bizLineOrBizType === '业务线' ? 'biz' : 'bizType'" class="select-option-style">
    <el-select
      placeholder="请选择"
      multiple
      v-model="currentModelData"
      value-key="mapping"
      size="small"
      @change="selectAll"
    >
      <el-option
        v-for="item in optionData"
        :key="item.mapping"
        :label="bizLineOrBizType === '业务线' ? item.bizLine : item.bizType"
        :value="item.mapping"
      ></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: 'selectAll',
  data() {
    return {
      oldOptions: [[]],
      currentModelData: this.modelData
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    modelData: {
      type: Array
    },
    optionData: {
      type: Array
    },
    bizLineOrBizType: {
      // 区分是业务线还是业务类型
      type: String,
      default: ''
    }
  },
  computed: {},
  watch: {
    modelData(val) {
      this.currentModelData = val
    }
  },
  mounted() {},
  methods: {
    // 选中值发生变化时触发
    selectAll(val) {
      // 目前的选中值
      // 保留所有值
      let allValues = []
      for (let item of this.optionData) {
        allValues.push(item.mapping)
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions.length === 1 ? [] : this.oldOptions[1]
      // 若是全部选择
      if (val.includes(-1)) this.currentModelData = allValues // 若是全部选择

      // 取消全部选中  上次有 当前没有 表示取消全选
      // 新老数据都有全部选中
      if (oldVal.includes(-1) && !val.includes(-1)) this.currentModelData = []
      if (oldVal.includes(-1) && val.includes(-1)) {
        const index = val.indexOf(-1)
        val.splice(index, 1)
        this.currentModelData = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes(-1) && !val.includes(-1)) {
        if (val.length === allValues.length - 1) {
          this.currentModelData = [-1].concat(val)
        }
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldOptions[1] = this.currentModelData
      this.currentModelData.sort(function(x, y) {
        // 对数组进行升序排列
        return x - y
      })
      this.$emit('selectedData', this.currentModelData)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
div[rel='selectAll'] {
  .select-option-style {
    width: 200px;
    height: 40px;
  }
}
</style>
