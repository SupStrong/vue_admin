<template>
  <div class="G-col-main G-content-main">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-select v-model="form.author" placeholder="请选择作者">
          <el-option label="小花猪" value="小花猪"></el-option>
          <el-option label="小黑狗" value="小黑狗"></el-option>
          <el-option label="小豹豹" value="小豹豹"></el-option>
          <el-option label="小狸猫" value="小狸猫"></el-option>
          <el-option label="大笨熊" value="大笨熊"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="group">
        <el-select v-model="form.group" placeholder="请选择分类">
          <el-option label="科普知识" value="科普知识"></el-option>
          <el-option label="萌宠玩具" value="萌宠玩具"></el-option>
          <el-option label="萌宠美食" value="萌宠美食"></el-option>
          <el-option label="养宠贴士" value="养宠贴士"></el-option>
          <el-option label="风味肉食" value="风味肉食"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联" prop="relation">
        <el-select v-model="form.relation" placeholder="请选择关联">
          <el-option label="科普知识" value="1"></el-option>
          <el-option label="萌宠玩具" value="2"></el-option>
          <el-option label="萌宠美食" value="3"></el-option>
          <el-option label="养宠贴士" value="4"></el-option>
          <el-option label="风味肉食" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch 
        v-model="form.status" 
        active-color="#13ce66"
        :active-value="1"
        :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="form.type" @change="tabType($event)">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="详情" v-if="form.type == 1">
        <editors :value="form.textarea" @onEditorChange="onEditorChange($event)"></editors>
      </el-form-item>
      <el-form-item label="视频上传" prop="Video" v-else>
        <!-- action必选参数, 上传的地址 -->
        <el-upload
          class="avatar-uploader el-upload--text"
          action="/api/upload/video"
          list-type="picture-card"
          :show-file-list="false"
          :on-success="handleVideoSuccess"
          :before-upload="beforeUploadVideo"
          :on-progress="uploadVideoProcess"
        >
          <video
            v-if="videoForm.Video != '' && videoFlag == false"
            :src="videoForm.Video"
            class="avatar"
            controls="controls"
          >
            您的浏览器不支持视频播放
          </video>
          <i class="el-icon-plus"></i>
        </el-upload>
        <p class="text">请保证视频格式正确，且不超过10M</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        <el-button
          ><router-link class="G-color-black" to="/articleText/list"
            >返回</router-link
          ></el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import editors from "../../components/asstes/edit";
export default {
  data() {
    return {
      videoUploadPercent: "",
      videoFlag: true,
      videoForm: {
        videoUploadId: "",
        video: "",
      },
      form: {
        title: "",
        author: "",
        group: "",
        type: 1,
        status: 1,
        relation: "",
        textarea: "",
      },
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        author: [{ required: true, message: "请选择作者", trigger: "change" }],
        group: [{ required: true, message: "请选择分类", trigger: "change" }],
        relation: [
          { required: true, message: "请选择关联", trigger: "change" },
        ],
        type: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  mounted() {
    let id = this.$route.query.id;
    if (id != 0) {
      this.editGetData(id);
    }
  },
  methods: {
    onEditorChange(e) {
      this.form.textarea = e;
    },
    // 编辑 获取数据
    editGetData(id) {
      this.$fetch(`/api/articles/${id}`).then((response) => {
        if (response.status) {
          this.form = response.data;
        }
      });
    },
    tabType() {
      this.form.textarea = "";
      (this.videoFlag = true), (this.videoForm.video = "");
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let currentId = this.$route.query.id;
          currentId != 0 ? this.funEditData(currentId) : this.funCreateData();
        } else {
          return false;
        }
      });
    },
    funEditData(currentId) {
      this.$put(`/api/articles/${currentId}`, this.form).then((response) => {
        let { status, message } = response;
        if (status) {
          this.$message(message);
          this.routerPath();
        }
      });
    },
    funCreateData() {
      this.$post("/api/articles", this.form).then((response) => {
        let { status, message } = response;
        if (status) {
          this.$message(message);
          this.routerPath();
        }
      });
    },
    beforeUploadVideo(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt10M) {
        this.$message.error("上传视频大小不能超过10MB哦!");
        return false;
      }
    },
    uploadVideoProcess(event, file) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0);
    },
    handleVideoSuccess(res) {
      //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.status == 200) {
        this.videoForm.videoUploadId = res.data.uploadId;
        this.videoForm.Video = res.data.uploadUrl;
        this.form.textarea = res.data.uploadUrl;
      } else {
        this.$message.error("视频上传失败，请重新上传！");
      }
    },
    routerPath() {
      this.$router.push({
        path: "/articleText/list",
        query: {},
      });
    },
  },
  components: {
    editors,
  },
};
</script>
<style>
.el-input {
  width: 260px;
}
</style>
