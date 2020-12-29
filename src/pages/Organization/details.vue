<template>
    <div class="G-col-main G-content-main">
      <el-form :model="form" :rules="rules"  ref="form" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <el-button><router-link class="G-color-black" to="/organization/list">返回</router-link></el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          city:'',
          address:'',
          mobile:'',
        },
        rules: {
          name: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
        }
      }
    },
    mounted(){
      let id = this.$route.params.id;
      if(id != 0){
        // this.editGetData(id);
      }
    },
    methods: {
        //   编辑 获取数据
      editGetData(id){
          this.$fetch(`/api/articles/${id}`)
          .then((response) => {
            if(response.status){
              this.form = response.data;
            }
          })
      },
      onSubmit(formName) {
          console.log(formName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let currentId = this.$route.params.id;
            currentId != 0 ?  this.funEditData(currentId) : this.funCreateData();
          } else {
            return false;
          }
        });
      },
      funEditData(currentId){
        this.$put(`/api/articles/${currentId}`,this.form)
        .then((response) => {
          let {status,message} = response;
          if(status){
            this.$message(message);
            this.routerPath();
          }
        })
      },
      funCreateData(){
        this.$post('/api/articles',this.form)
        .then((response) => {
          let {status,message} = response;
          if(status){
            this.$message(message);
            this.routerPath();
          }
        })
      },
      routerPath(){
        this.$router.push({
          path: '/articleText/list', 
          query: {}
        });
      }
    },
    components:{
    //   editors
    }
  }
</script>
<style>
.el-input{
  width: 260px;
}
</style>
