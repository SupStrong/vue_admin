<template>
  <div class="G-col-main G-content-main">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="圈子名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
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
      this.$fetch(`/api/animal_circles/${id}`).then((response) => {
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
      this.$put(`/api/animal_circles/${currentId}`, this.form).then((response) => {
        let { status, message } = response;
        if (status) {
          this.$message(message);
          this.routerPath();
        }
      });
    },
    funCreateData() {
      this.$post("/api/animal_circles", this.form).then((response) => {
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
        path: "/circle/list",
        query: {},
      });
    },
  },
  components: {
  },
};
</script>
<style>
.el-input {
  width: 260px;
}
</style>
