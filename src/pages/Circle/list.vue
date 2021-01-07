<template>
  <div>
    <div class="G-col-main">
      <el-row :gutter="20">
        <el-col :span="5"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        <el-col :span="5"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        <el-col :span="12">
          <el-button type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="G-col-main G-content-main">
      <el-row class="G-M-top-10 G-M-bottom-10">
          <el-button type="primary"><router-link :to="{path:'/circle/details',query:{id:0}}">创建动物信息</router-link></el-button>
         <el-button type="success">数据详情</el-button>
      </el-row>
      <el-table
        class="G-M-top-15"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="文章id"
          width="100">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="圈子名">
        </el-table-column>
        <el-table-column
          prop="title"
          label="圈子详情">
        </el-table-column>
                <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">
            <router-link class="G-color-409EFF" :to="{path:`/circle/details/${scope.row.id}`}">编辑</router-link>
            <el-popconfirm title="手别抖!看清楚." @confirm="deleteText(scope.row.id)">
              <span class="G-M-left-5" slot="reference">删除</span>
            </el-popconfirm>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Page :all="count" :page="page" @CurrentPage="getCurrentPage"></page>
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
        page:"1",
        limit:"20",
        tableData: []
      }
    },
  name:'one',
  components: {
  },
  mounted(){
    this.getData();
  },
  methods:{
    changeSwitch(row){
      let switchId = row.id;
      this.$patch(`/api/animal_circles/${switchId}`,{status:row.status})
        .then((response) => {
          let {status,message} = response;
          if(status){
             this.$message(message);
          }
      })
    },
    deleteText(c_id){
      this.$del(`/api/animal_circles/${c_id}`)
        .then((response) => {
          let {status,message} = response;
          if(status){
             this.$message(message);
             this.tableData = this.tableData.filter(item => item.id !== c_id)
          }
      })
    },
    getData(){
      let params = {
        page:this.page,
        limit:this.limit
      }
      this.$fetch('/api/animal_circles',params)
        .then((response) => {
          this.count = response.count;
          this.tableData = response.rows;
      })
    },
    getCurrentPage(val){
      this.page = val;
      this.getData();
    }
  },
  computed: {
  }
};
</script>
<style>
  .el-row {
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