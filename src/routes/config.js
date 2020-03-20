export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/ui', title: 'UI', icon: 'scan',
            subs: [
                {
                    key: '/app/ui/buttons', title: '按钮',
                    subs:[
                        {
                            key:'/app/ui/tabs',title:'导航',component:'Tabs'
                        }
                    ]
                },
                { key: '/app/ui/icons', title: '图标', component: 'Icons'},

            ]
        },
    ],
    others: [] // 非菜单相关路由
}