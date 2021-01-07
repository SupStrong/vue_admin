<template>
    <div class="G-col-main G-content-main">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="动物名字">
          <el-input  v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="别名">
          <el-input  v-model="form.alias"></el-input>
        </el-form-item>
        <el-form-item label="圈子">
          <el-select v-model="form.c_id" placeholder="圈子">
            <el-option v-for="(item,index) in circlelist" :key="index" :label=item.name value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="相册">
          <el-input  v-model="form.imags"></el-input>
        </el-form-item>
        <el-form-item label="保护级别">
          <el-select v-model="form.protectlevel" placeholder="请选择保护级别">
            <el-option label="一级保护动物" value="一级保护动物"></el-option>
            <el-option label="二级保护动物" value="二级保护动物"></el-option>
            <el-option label="濒危保护动物" value="濒危保护动物"></el-option>
            <el-option label="灭绝动物" value="灭绝动物"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="栖息地">
          <el-input  v-model="form.habitat"></el-input>
        </el-form-item>
        <el-form-item label="分布地区">
          <el-input  v-model="form.area"></el-input>
        </el-form-item>
        <el-form-item label="界">
          <el-select v-model="form.circles" placeholder="请选择保护级别">
            <el-option label="动物界" value="动物界"></el-option>
            <el-option label="植物界" value="植物界"></el-option>
            <el-option label="微生物界" value="微生物界"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门">
          <el-select v-model="form.door" placeholder="请选择保护级别">
            <el-option label="动物界" value="动物界"></el-option>
            <el-option label="植物界" value="植物界"></el-option>
            <el-option label="微生物界" value="微生物界"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="	亚 门">
          <el-input  v-model="form.amen"></el-input>
        </el-form-item>
        <el-form-item label="纲">
          <el-input  v-model="form.outline"></el-input>
        </el-form-item>
        <el-form-item label="	亚 纲">
          <el-input  v-model="form.subclass"></el-input>
        </el-form-item>
        <el-form-item label="目">
          <el-input  v-model="form.eye"></el-input>
        </el-form-item>
        <el-form-item label="	亚 目">
          <el-input  v-model="form.suborder"></el-input>
        </el-form-item>
        <el-form-item label="科">
          <el-input  v-model="form.section"></el-input>
        </el-form-item>
        <el-form-item label="	亚 科">
          <el-input  v-model="form.subfamily"></el-input>
        </el-form-item>
        <el-form-item label="属">
          <el-input  v-model="form.genus"></el-input>
        </el-form-item>
        <el-form-item label="种">
          <el-input  v-model="form.species"></el-input>
        </el-form-item>
        <el-form-item label="生活环境">
          <el-select v-model="form.life" placeholder="生活环境">
            <el-option label="" value="0"></el-option>
            <el-option label="陆生动物" value="1"></el-option>
            <el-option label="水生动物" value="2"></el-option>
            <el-option label="两栖动物" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="form.level" placeholder="等级">
            <el-option label="高等动物" value="1"></el-option>
            <el-option label="低等动物" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食性">
        <el-checkbox-group v-model="form.foodhabit">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        </el-form-item>
        <el-form-item label="哺乳动物">
          <el-select v-model="form.breastfeed" placeholder="哺乳动物">
            <el-option label="哺乳动物" value="1"></el-option>
            <el-option label="非哺乳动物" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="形态">
          <el-select v-model="form.shape" placeholder="形态">
            <el-option label="脊椎动物" value="1"></el-option>
            <el-option label="无脊椎动物" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="灭绝原因">
          <!-- <el-input  type="textarea" v-model="form.extinct"></el-input> -->
          <editors @input="change($event)"></editors>
        </el-form-item>
        <el-form-item label="习性">
          <!-- <el-input  v-model="form.habit"></el-input> -->
          <editors @input="change($event)"></editors>
        </el-form-item>
        <el-form-item label="分布详情">
          <!-- <el-input  v-model="form.distribution"></el-input> -->
          <editors @input="change($event)"></editors>
        </el-form-item>
        <el-form-item label="繁殖详情">
          <!-- <el-input  v-model="form.reproduction"></el-input> -->
          <editors @input="change($event)"></editors>
        </el-form-item>
        <el-form-item label="饮食习惯">
          <!-- <el-input  v-model="form.diet"></el-input> -->
          <editors @input="change($event)"></editors>
        </el-form-item>
        <el-form-item label="历史记录">
          <!-- <el-input  v-model="form.history"></el-input> -->
          <editors @input="change($event)"></editors>
        </el-form-item>
        <el-form-item label="外形特征">
          <editors @input="change($event)"></editors>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <el-button><router-link to="/articleText/list">返回</router-link></el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import editors from '../../components/asstes/edit';
  export default {
    data() {
      return {
        videoUploadPercent:"",
        videoFlag:true,
        videoForm:{
          videoUploadId:"",
          video:''
        },
        circlelist:[],
        cities:['肉食性动物','植食性动物','腐食性动物','杂食性动物'],
        form: {
          "id": "动物id",
          "c_id": "圈子id",
          "name": "动物名字",
          "alias": "别名",
          "imags": "相册",
          "protectlevel": "保护级别",
          "habitat": "栖息地",
          "area": "分布地区",
          "circles": "界",
          "door": "门",
          "amen": "亚 门",
          "outline": "纲",
          "subclass": "亚  纲",
          "eye": "目",
          "suborder": "亚   目",
          "section": "科",
          "subfamily": "亚   科",
          "genus": "属",
          "species": "种",
          "habit": "习性",
          "distribution": "分布详情",
          "reproduction": "繁殖详情",
          "diet": "饮食习惯",
          "history": "历史记录",
          "extinct": "灭绝原因",
          "life": "水生动物",
          "level": "低等动物",
          "foodhabit": ['肉食性动物'],
          "breastfeed": "非哺乳动物",
          "shape": "脊椎动物",
          "features": "外形特征",
      },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      let id = this.$route.params.id;
      // if(id != 0){
      //   this.editGetData(id);
      // }
      this.getCircleList();
    },
    methods: {
      change(e){
          this.form.textarea = e;
      },
      // 编辑 获取数据
      // editGetData(id){
      //     this.$fetch(`/api/articles/${id}`)
      //     .then((response) => {
      //       if(response.status){
      //         this.form = response.data;
      //       }
      //     })
      // },
      // onSubmit(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       let currentId = this.$route.params.id;
      //       currentId != 0 ?  this.funEditData(currentId) : this.funCreateData();
      //     } else {
      //       return false;
      //     }
      //   });
      // },
      // funEditData(currentId){
      //   this.$put(`/api/articles/${currentId}`,this.form)
      //   .then((response) => {
      //     let {status,message} = response;
      //     if(status){
      //       this.$message(message);
      //       this.routerPath();
      //     }
      //   })
      // },
      // funCreateData(){
      //   this.$post('/api/articles',this.form)
      //   .then((response) => {
      //     let {status,message} = response;
      //     if(status){
      //       this.$message(message);
      //       this.routerPath();
      //     }
      //   })
      // },
      getCircleList(){
        this.$fetch('/api/animal_circles')
        .then((response) => {
          this.circlelist = response.rows;
        })
      },
      beforeUploadVideo(file) {
        const isLt10M = file.size / 1024 / 1024  < 10;
        if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
            this.$message.error('请上传正确的视频格式');
            return false;
        }
        if (!isLt10M) {
            this.$message.error('上传视频大小不能超过10MB哦!');
            return false;
        }
      },
      uploadVideoProcess(event, file){
          this.videoFlag = true; 
          this.videoUploadPercent = file.percentage.toFixed(0);
      },
      handleVideoSuccess(res) {
            //获取上传图片地址
          this.videoFlag = false;
          this.videoUploadPercent = 0;
          if(res.status == 200){
              this.videoForm.videoUploadId = res.data.uploadId;
              this.videoForm.Video = res.data.uploadUrl;
          }else{
              this.$message.error('视频上传失败，请重新上传！');
          }
      },
      routerPath(){
        this.$router.push({
          path: '/articleText/list', 
          query: {}
        });
      }
    },
    components:{
      editors
    }
  }
</script>
<style>
.el-input{
  width: 260px;
}
</style>
