<!--分页查询组件-->
<template>
  <div rel="pagination">
    <el-pagination
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data() {
    return {
      pageSizes: [10, 20, 30, 50]
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  computed: {},
  methods: {
    onSizeChange(val) {
      this.$emit('onSizeChange', val)
    },
    onCurrentChange(val) {
      this.$emit('onCurrentChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
