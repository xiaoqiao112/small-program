<!--瀑布流组件-->
<template>
  <div :class="{'waterfall-wrap': true, row: row}" ref="cascadeFlow">
    <!--如果是横向瀑布流-->
    <template v-if="row">
      <div v-for="(item, index) of list" :key="index" class="row-item">
        <img :src="item.url" :style="{height: `${height}px`}">
      </div>
      <div :style="{height: `${height}px`}" class="last-box">
      </div>
    </template>
    <!--纵向瀑布流-->
    <template v-else>
      <div v-for="(item, index) of list" :key="index" class="column-item">
        <img :src="item.url" alt="">
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'cascadeFlow',
  data() {
    return {
      itemWidth: 0,
      columnData: []
    }
  },
  props: {
    // 图片列表
    list: {
      type: Array,
      required: true
    },
    // 是否横向排列
    row: {
      type: Boolean,
      default: false
    },
    // 如果不是横向排列,column代表分为几列（默认4列）
    column: {
      type: Number,
      default: 4
    },
    // 如果是横向排列,height为每行应该占得高度（默认为225px）
    height: {
      type: Number,
      default: 225
    }
  },
  watch: {
    list(val) {
      this.renderList()
    }
  },
  mounted () {
    this.renderList()
  },
  computed: {},
  methods: {
    renderList() {
      // 横向排列使用css进行排列

      // 纵向排列使用绝对定位排列
      if (!this.row) {
        this.columnData = []; // 存储每列已排列的高度
        // 计算出每列应该占总宽度的百分比
        this.itemWidth = `${100 / this.column}%`;
        this.$nextTick(() => {
          // 对所有盒子进行计算绝对定位的位置
          const boxes = this.$refs.cascadeFlow.getElementsByClassName('column-item');
          for (let i = 0; i < boxes.length; i++) {
            this.setElementStyle(boxes[i], this.list[i], i)
          }
        })
      }
    },
    // offsetWidth是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。
    setElementStyle (element, img, index) {
      // 计算出图片实际在项目中显示的高
      const w = this.$refs.cascadeFlow.offsetWidth / 4;
      const h = ((w - 6) / img.width) * img.height + 6;
      if (index < this.column) {
        element.style.left = `${index * (100 / this.column)}%`;
        this.columnData[index] = this.columnData[index] ? this.columnData[index] + h : h
      } else {
        // 找出最小高度的列
        let min = {};
        for (let i = 0; i < this.columnData.length; i++) {
          if (!min.hasOwnProperty('index')) {
            min = {index: i, value: this.columnData[i]}
          } else {
            if (this.columnData[i] < min.value) {
              min = {index: i, value: this.columnData[i]}
            }
          }
        }
        element.style.left = `${min.index * (100 / this.column)}%`;
        element.style.top = `${min.value}px`;
        this.columnData[min.index] += h
      }
      element.style.width = this.itemWidth
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .waterfall-wrap {
    position: relative;
    .column-item {
      position: absolute;
      padding: 3px;
      font-size: 0;
      box-sizing: border-box;
      transition: all .3s ease;
      img {
        max-width: 100%;
      }
    }
    &.row {
      display: flex;
      flex-wrap: wrap;
      .row-item {
        margin: 5px;
        flex-grow: 1;
        font-size: 0;
        box-sizing: border-box;
        transition: all .3s ease;
        img {
          min-height: 100%;
          min-width: 100%;
          object-fit: cover;
        }
      }
      .last-box {
        margin: 5px;
        flex-grow: 999;
      }
    }
  }
</style>
