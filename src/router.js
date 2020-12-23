import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'mainbox',
        component: () => import('./pages/MainBox.vue'),
        redirect: '/articleText/list',
        meta: {
            title: '员工管理',
            isTabsPage: true
        },
        children:[
            {
                path: '/articleText/list',
                name: '营销文章',
                component: () => import('./pages/ArticleText/list.vue'),
            },
            {
                path: '/articleText/details',
                name: '创建营销文章',
                component: () => import('./pages/ArticleText/details.vue'),
            },
            {
                path: '/organization/list',
                name: '动物机构列表',
                component: () => import('./pages/Organization/list.vue'),
            },
            {
                path: '/organization/details',
                name: '创建动物机构',
                component: () => import('./pages/Organization/details.vue'),
            },
            {
                path: '/circle/list',
                name: '动物圈子列表',
                component: () => import('./pages/Circle/list.vue'),
            },
            {
                path: '/circle/details',
                name: '创建动物圈子',
                component: () => import('./pages/Circle/details.vue'),
            },

            {
                path: '/animal/list',
                name: '动物单个列表',
                component: () => import('./pages/Animal/list.vue'),
            },
            {
                path: '/animal/details',
                name: '创建动物单个',
                component: () => import('./pages/Animal/details.vue'),
            },

            {
                path: '/goods/list',
                name: '商品列表',
                component: () => import('./pages/Goods/list.vue'),
            },
            {
                path: '/goods/details',
                name: '创建商品',
                component: () => import('./pages/Goods/details.vue'),
            },
            {
                path: '/order/list',
                name: '订单列表',
                component: () => import('./pages/Order/list.vue'),
            },
            {
                path: '/User/list',
                name: '创建商品',
                component: () => import('./pages/User/list.vue'),
            },
            {
                path: '/banner/list',
                name: '创建商品',
                component: () => import('./pages/Banner/list.vue'),
            },
            {
                path: '/banner/details',
                name: '创建商品',
                component: () => import('./pages/Banner/details.vue'),
            }
        ]
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router