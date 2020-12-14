<template>
  <div id="mainbox">
    <el-container>
      <el-aside width="initial">
        <div class="logo">
          <span v-if="isCollapse">admin</span>
          <img v-else src="../assets/images/icon_logo.png" />
        </div>
        <el-menu
          router
          :collapse="isCollapse"
          background-color="#f6fbff"
          text-color="#6d7ba0"
          active-text-color="#fff"
          :default-active="$route.path"
        >
          <el-menu-item
            :index="item.path"
            v-for="item in noChildren"
            :key="item.path"
            @click="clickMenu(item)"
          >
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>

          <el-submenu
            :index="item.path"
            v-for="item in hasChildren"
            :key="item.path"
          >
            <template slot="title">
              <i :class="'el-icon-' + item.icon"></i>
              <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="subItem.path"
                v-for="subItem in item.children"
                :key="subItem.path"
                @click="clickMenu(subItem)"
              >
                <i :class="'el-icon-' + subItem.icon"></i>
                <span slot="title">{{ subItem.label }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 左侧展示与隐藏 -->
        <el-header>
          <div class="l-content">
            <span
              class="trigger"
              :type="isCollapse ? 'menu-unfold' : 'menu-fold'"
              @click="() => (isCollapse = !isCollapse)"
            ></span>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }"
                >人员管理</el-breadcrumb-item
              >
              <el-breadcrumb-item :to="current.path" v-if="current">
                {{ current.label }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="r-content"></div>
        </el-header>
        <tab></tab>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import tab from "../components/tab";
import { mapState } from "vuex";
export default {
  name: "mainbox",
  computed: {
    noChildren() {
      return this.menulist.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menulist.filter((item) => item.children);
    },
    ...mapState({
      current: (state) => state.tab.currentMenu,
    }),
  },
  data() {
    return {
      isCollapse: false,
      menulist: [
        {
          label: "营销管理",
          path: "/",
          name: "mainbox",
          icon: "location",
          children: [
            {
              label: "营销文章",
              path: "/articleText/list",
              name: "articleTextList",
              icon: "location",
            },
            {
              label: "营销视频",
              path: "/articleVideo/list",
              name: "articleTextVideo",
              icon: "location",
            },
          ],
        },
        {
          label: "车辆管理",
          path: "/Vehicle",
          icon: "location",
          children: [
            {
              label: "车辆态势",
              path: "/Vehicle",
              name: "vehiclesituation",
              icon: "location",
            },
          ],
        },
      ],
      activeRoute: "/Vehicle",
    };
  },
  created:function() {
    this.currentTab();
  },
  methods: {
    clickMenu(item) {
      this.$store.commit("selectMenu", item);
    },
    currentTab() {
      let href = this.$route.path;
      var allItem = [];
      this.menulist.map((menu_item) =>{
        allItem.push(menu_item.children.filter((item) => item.path == href ));
      })
      let current = allItem.filter((i) =>{
        if(i.length != 0){
          return i;
        }
      })
      this.$store.commit("selectMenu", current[0][0]);
      return current[0][0];
    },
  },
  components: {
    tab,
  },
};
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  height: 100vh;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
#mainbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    zoom: 1;
  }
  .trigger {
    width: 20px;
    height: 14px;
    display: inline-block;
    background: url("~@/assets/images/pull_icn.png") no-repeat 100% 100%;
    background-size: cover;
    margin-right: 20px;
  }
  .title {
    width: 179px;
    height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #495675;
    margin-left: 5px;
  }
  .el-main {
    margin: "10px 10px";
    padding: "0px";
    background: "#fff";
  }
  .el-aside /deep/ {
    background-blend-mode: normal, normal;
    background: url("~@/assets/images/bg.png") no-repeat 100% 100% #f6f9ff;
    background-size: cover;
    .logo {
      height: 90px;
    }
    .el-menu {
      border-right: none;
    }
    .el-submenu__title:hover{
      background-color: #f6f9ff !important;
      color: #f5f5fc;
    }
    .el-menu-item:hover{
      background:none!important;
    }
    .el-menu-item.is-active {
      background-color: #55906f !important;
    }
  }
  .el-header {
    padding: 33px 0 33px 20px;
    box-shadow: 0px 5px 20px 0px rgba(155, 155, 155, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .l-content {
    display: flex;
    align-items: center;
  }
  .tabs {
    padding: 34px 0 0 10px;
  }
}
</style>