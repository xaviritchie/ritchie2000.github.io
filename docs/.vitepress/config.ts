import { defineConfig } from 'vitepress'
export default defineConfig({
    // base: '/页面路径/',
    title: 'Ritchie\'s space',
    description: 'Hello VitePress',
    head: [
        // 设置 favor.ico，.vuepress/public 下
        [
            'link', { rel: 'icon', href: '/images/favicon.ico' }
        ],
    ],
    themeConfig: {
        logo: '/images/hero.svg',

        // 顶部导航栏
        nav: [
            { text: '首页', link: '/' },
            { text: 'Java', link: '/jvm/' },
            { text: 'DB', link: '/db/' },
            { text: '微服务', link: '/microservice/' },
            // {
            //     text: 'B', 
            //     items: [
            //         {
            //             // You may also omit the title.
            //             items: [
            //                 { text: '1', link: '' },
            //                 { text: '2', link: '' }
            //             ],
            //         },
            //         // 这样的话中间就会有一道线
            //         {
            //             items: [
            //                 { text: '3', link: '' },
            //             ],
            //         },
            //     ]
            // },
            {
                text: 'Other',
                items: [
                    {
                        // Title for the section.
                        text: '以前的博客',
                        link: 'https://ritchie2000.gitee.io/'
                    },
                    {
                        text: '博客园',
                        link: 'https://www.cnblogs.com/wang-zeyu/'
                    },
                ]
            }
        ],


        // 侧边导航栏
        sidebar:
        {
            '/jvm/': [
                { text: 'JVM', link: '/jvm/' },
                { text: 'Java', link: '/jnote/'}
            ],
            '/db/': [
                {
                    text: 'DB',
                    collapsed: false,
                    items: [
                        { text: 'MySQL', link: '/db/mysql/01mysql.md' },
                        { text: 'Redis', link: '/db/redis/01redis.md' },
                    ]
                }
            ],
            '/cloud/': [
                {
                    text: '微服务',
                    items: [
                        {
                            // Title for the section.
                            text: 'Spring Cloud',
                            items: [
                                { text: '入门', link: '/01spring-cloud.md' },
                            ]
                        },
                        {
                            text: 'Seata',
                            items: [

                            ]
                        }
                    ]
                }
            ],
            // '/web/': [
            //     {
            //         text: 'HTML',
            //         link: '/web/01html.md',
            //     },
            //     {
            //         text: 'ECharts',
            //         link: '/web/09echarts.md',
            //         items: [
            //             {
            //                 text: '柱状图',
            //                 items: [
            //                     {text: '基本柱状图', link: '/web/09-11.md'},
            //                 ]
            //             }
            //         ]
            //     },
            // ],

        },

        // 社交链接
        socialLinks: [
            { icon: 'github', link: 'https://github.com/ritchie2000' },
            // { icon: 'twitter', link: '' },
            // You can also add custom icons by passing SVG as string:
            // {
            //     icon: {
            //         svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>'
            //     },
            //     link: 'https://www.baidu.com/'
            // }
        ],

        algolia: {
            appId: '...',
            apiKey: '...',
            indexName: '...'
        },

        footer: {
            message: 'Powered by <a href="https://vitepress.vuejs.org/">VitePress</a>.',
            copyright: 'Copyright © 2022-present <a href="https://gitee.com/ritchie2000">Ritchie 王则钰</a>'
        }
    }
})
