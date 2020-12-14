<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>
// 如果需要保存分页信息和搜索数据可以在组件销毁之前用页面关键key保存在本地
// 也可以使用 keep-alive保存页面

export default {
  name: "Pagination",
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  data: () => {
    return {
      currentPage: 1,
    };
  },
  methods: {
    //每页展示条数
    handleSizeChange(val) {
      //事件传递
      this.$emit("handleSizeChangeSub", val);
    },
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      //事件传递
      this.$emit("handleCurrentChangeSub", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  padding: 10px;
  display: flex;
  background: #fff;
  flex-direction: row-reverse;
}
.el-pagination /deep/ .el-pager li {
  cursor: pointer;
}
.el-pagination /deep/ .el-pager .active {
  background-color: #55906f !important;
}
</style>
