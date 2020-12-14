<template>
  <div class="tabs">
    <el-tag
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name !== 'personmanage'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      class="tag"
      @click="tabClick(tag)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      close: "closeTab",
    }),
    handleClose(tag) {
      this.close(tag);
      let endArr = this.tags[this.tags.length-1];
      if(this.$route.path != endArr.path){
        this.$router.push(endArr.path);
      }
    },
    tabClick(val) {
      if (val.path === this.$route.path) return;
      this.$router.push(val.path);
    },
  },
};
</script>
<style>
  .tag {
    margin-left: 10px;
    background-color: #55906f;
    color:#fff;
  }
  .el-tag .el-tag__close{
    color:#fff;
  }
</style>