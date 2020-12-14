<template>
  <div id="person_box">
    <div class="header">
      <div class="l-btn">
        <span class="btn"
          ><i class="btn_i new"></i><span class="btn_tit">新增</span></span
        >
        <span class="btn" style="margin-left: 5px"
          ><i class="btn_i search"></i><span class="btn_tit">查询</span></span
        >
      </div>
      <div class="r-btn">
        <span class="btn"
          ><i class="btn_i import"></i><span class="btn_tit">导入</span></span
        >
        <span class="btn" style="margin-left: 5px"
          ><i class="btn_i export"></i><span class="btn_tit">导出</span></span
        >
        <span class="btn" style="margin-left: 5px"
          ><i class="btn_i download"></i
          ><span class="btn_tit">模板下载</span></span
        >
      </div>
    </div>
    <div class="main">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="date" label="员工编号" align="center">
        </el-table-column>
        <el-table-column prop="date" label="性别" align="center">
        </el-table-column>
        <el-table-column prop="address" label="归属部门" align="center">
        </el-table-column>
        <el-table-column prop="name" label="岗位" align="center">
        </el-table-column>
        <el-table-column prop="address" label="出生年月" align="center">
        </el-table-column>
        <el-table-column prop="name" label="状态" align="center">
        </el-table-column>
        <el-table-column prop="name" label="身份证号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="手机号码" align="center">
        </el-table-column>
        <el-table-column prop="name" label="头像" align="center">
        </el-table-column>
        <el-table-column label="编辑" align="center" width="160px">
          <template>
            <el-button type="text" size="small">
              <img
                class="control_img"
                src="../assets/images/icon-edit.png"
                alt="修改"
              />
              修改
            </el-button>
            <el-button type="text" size="small">
              <img
                class="control_img"
                src="../assets/images/icon-delete.png"
                alt="删除"
              />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :total="total"
        :page-size="pageParams.showCount"
        @handleSizeChangeSub="handleSizeChangeFun"
        @handleCurrentChangeSub="handleCurrentChangeFun"
      ></Pagination>
    </div>
  </div>
</template>
<script>
import Pagination from "./Pagination";
export default {
  name: "personmanage",
  components: { Pagination },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      total: 0,
      pageParams: {
        showCount: 10,
        currentPage: 1,
      },
    };
  },
  methods: {
    // 导出
    // exportFile() {
    //   this.$safeAxios({
    //     url: "/es/access_log/expexcel",
    //     method: "post",
    //     data: {
    //       deviceIp: this.form.deviceIp,
    //     },
    //   }).then((res) => {
    //     var downloadUrl = res.url;
    //     var anchor = document.createElement("a");
    //     anchor.href = downloadUrl;
    //     anchor.click();
    //   });
    // },
    // 表格数据
    // requestFunc() {
    //   this.$safeAxios({
    //     url: "/es/access_log/page",
    //     method: "post",
    //     data: {
    //       param: {
    //         deviceIp: this.form.deviceIp,
    //       },
    //       ...this.pageParams,
    //     },
    //   }).then((res) => {
    //     this.total = res.total;
    //     this.tableData = res.list;
    //   });
    // },
    // 每页展示数变化
    handleSizeChangeFun(v) {
      this.pageParams.showCount = v;
      this.requestFunc(); //更新列表
    },
    // 当前页变化
    handleCurrentChangeFun(v) {
      //页面点击
      this.pageParams.currentPage = v; //当前页
      this.requestFunc(); //更新列表
    },
  },
};
</script>
<style lang="scss" scoped>
#person_box {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .l-btn,
    .r-btn {
      display: flex;
      align-items: center;
    }
  }
  .main /deep/ {
    margin-top: 10px;
    .el-table th {
      width: 1682px;
      height: 80px;
      background-image: linear-gradient(#f6fbff, #f6fbff),
        linear-gradient(#f6f9ff, #f6f9ff);
      background-blend-mode: normal, normal;
    }
    .el-table tr:nth-child(even) {
      background-image: linear-gradient(#f6fbff, #f6fbff),
        linear-gradient(#f6f9ff, #f6f9ff);
      background-blend-mode: normal, normal;
    }
    .control_img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
    .cell .el-button span{
      color:#55906f;
    }
  }
}
</style>