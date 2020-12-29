<template>
  <div>
    <!-- <div class="G-col-main">
      <el-row :gutter="20">
        <el-col :span="6"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        <el-col :span="6"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        <el-col :span="12">
          <el-button type="primary">主要按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
        </el-col>
      </el-row>

    </div> -->
    <div class="G-col-main G-M-top-10">
      <el-row>
          <el-button type="primary"><router-link :to="{path:'/organization/details'}">创建详情</router-link></el-button>
      </el-row>
      <el-table
        class="G-M-top-15"
        :data="tableData"
        border
        height="600px"
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          fixed
          prop="city"
          label="城市">
        </el-table-column>
        <el-table-column
          fixed
          prop="address"
          label="详细地址">
        </el-table-column>
        <el-table-column
          fixed
          prop="mobile"
          label="联系方式">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="G-M-top-15 G-align-right"
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        bg:'',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [{
          id:'1',
          name:'大熊猫',
          city:'城市',
          address:'详细地址',
          mobile:'联系方式'
        }]
      }
    },
  name:'one',
  components: {
  },
  mounted(){
  },
  methods:{
  },
  computed: {
  }
};
</script>
<style>
  .el-row {
    margin-top:10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-select{
  width: 100%;
}
</style>