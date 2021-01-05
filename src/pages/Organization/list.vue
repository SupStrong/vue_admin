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
          <el-button type="primary"><router-link :to="{path:'/Organization/details',query:{id:0}}">创建文章</router-link></el-button>
         <el-button type="success">数据详情</el-button>
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
                <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">
            <router-link class="G-color-409EFF" :to="{path:'/Organization/details',query:{id:scope.row.id}}">编辑</router-link>
            <el-popconfirm class="G-M-left-5" title="手别抖!看清楚." @confirm="deleteText(scope.row.id)">
              <span slot="reference">删除</span>
            </el-popconfirm>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        page:"1",
        limit:"20",
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
    this.getData();
  },
  methods:{
    cantype(row){
      return row.type == '1' ? '文章' : '视频'
    },
    changeSwitch(row){
      let switchId = row.id;
      this.$patch(`/api/animal_protect/${switchId}`,{status:row.status})
        .then((response) => {
          let {status,message} = response;
          if(status){
             this.$message(message);
          }
      })
    },
    deleteText(c_id){
      this.$del(`/api/animal_protect/${c_id}`)
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
      this.$fetch('/api/animal_protect',params)
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