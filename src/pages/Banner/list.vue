<template>
  <div>
    <div class="G-col-main G-content-main">
      <el-row class="G-M-top-10 G-M-bottom-10">
          <el-button type="primary"><router-link :to="{path:'/banner/details',query:{id:0}}">创建文章</router-link></el-button>
         <el-button type="success">数据详情</el-button>
      </el-row>
      <el-table
        class="G-M-top-15"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          :formatter="cantype">
        </el-table-column>
        <el-table-column
          prop="group"
          label="分组">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者">
        </el-table-column>
        <el-table-column
          prop="browse"
          label="浏览人数">
        </el-table-column>
        <el-table-column
          prop="praise"
          label="点赞人数">
        </el-table-column>
        <el-table-column
          prop="collection"
          label="收藏人数">
        </el-table-column>
          <el-table-column
          width="180px"
          prop="create_time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
              inactive-color="#999"
              @change="changeSwitch(scope.row)"
              >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">
            <router-link class="G-color-409EFF" :to="{path:'/articleText/details',query:{id:scope.row.id}}">编辑</router-link>
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
    cantype(row){
      return row.type == '1' ? '文章' : '视频'
    },
    changeSwitch(row){
      let switchId = row.id;
      this.$patch(`/api/articles/${switchId}`,{status:row.status})
        .then((response) => {
          let {status,message} = response;
          if(status){
             this.$message(message);
          }
      })
    },
    deleteText(c_id){
      this.$del(`/api/articles/${c_id}`)
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
      this.$fetch('/api/articles',params)
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