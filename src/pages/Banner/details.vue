<template>
  <div class="G-col-main G-content-main">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="视频上传" prop="Video">
        <!-- action必选参数, 上传的地址 -->
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <P class="text">请保证视频格式正确，且不超过10M</P>
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
      imageUrl: '',
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    routerPath() {
      this.$router.push({
        path: "/articleText/list",
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
