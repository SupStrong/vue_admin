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
                path: '/articleText/details/:id',
                name: '创建营销文章',
                component: () => import('./pages/ArticleText/details.vue'),
            },
            // ArticleVideo 营销视频
            {
                path: '/articleVideo/list',
                name: '营销视频',
                component: () => import('./pages/ArticleVideo/list.vue'),
            },
            {
                path: '/articleVideo/details',
                name: '创建营销视频',
                component: () => import('./pages/ArticleVideo/details.vue'),
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