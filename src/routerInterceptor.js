export default function (router) {
  /*
    全局路由钩子
    访问资源时需要验证sessionStorage中是否存在token
    验证成功可以继续跳转
    失败返回登录页重新登录
 */
  router.beforeEach((to, from, next) => {
    if (to.path != "/login") {
      let token = sessionStorage.getItem('Token');
      if (!token) {
        next('/login')
      }
    }
    next();
  })
}
