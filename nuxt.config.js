module.exports = {
    //清除路由规则
    router: {
        linkActiveClass:'active',
        extendRoutes(router, resolve) {
            console.log(router, resolve)
            router.splice(0);
            router.push(...[{
                path: '/',
                component: resolve(__dirname, './layouts/index.vue'),
                children: [{
                    path: '',
                    name: 'home',
                    component: resolve(__dirname, './pages/home.vue')
                },{
                    path: '/sign',
                    name: 'sign',
                    component: resolve(__dirname, './pages/sign.vue')
                }, {
                    path: '/login',
                    name: 'login',
                    component: resolve(__dirname, './pages/login.vue')
                }, {
                    path: '/profile',
                    name: 'profile',
                    component: resolve(__dirname, './pages/profile.vue')
                }, {
                    path: '/setting',
                    name: 'settting',
                    component: resolve(__dirname, './pages/setting.vue')
                }, {
                    path: '/article',
                    name: 'article',
                    component: resolve(__dirname, './pages/article.vue')
                }, {
                    path: '/editor',
                    name: 'editor',
                    component: resolve(__dirname, './pages/editor.vue')
                },]
            }])

        }
    },
    plugins:[
        '~/plugins/request.js',
        "~/plugins/moment.js"
    ]
}