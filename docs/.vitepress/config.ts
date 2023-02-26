import { defineConfig } from 'vitepress'
export default defineConfig({
    // base: '/页面路径/',
    title: 'Ritchie\'s Blog',
    description: 'Hello VitePress.',
    head: [
        // 设置 favor.ico，.vuepress/public 下
        [
            'link', { rel: 'icon', href: '/images/favicon.ico' }
        ],
    ],
    themeConfig: {
        logo: '/logo.svg',


        // 顶部导航栏
        nav: [
            { text: '首页', link: '/' },
            {
                text: 'Java',
                items: [
                    {
                        // Title for the section.
                        text: '基础', link: '/java/se/01入门.md',
                    },
                    {
                        text: '面向对象', link: '/java/obj/01封装.md',
                    },
                    {
                        text: '中级', link: '/java/sup/01数据结构.md',
                    }
                ]
            },
            {
                text: '前端', link: '/web/01html.md'
                // items: [
                //     {
                //         // You may also omit the title.
                //         items: [
                //             { text: '1', link: '' },
                //             { text: '2', link: '' }
                //         ],
                //     },
                //     // 这样的话中间就会有一道线
                //     {
                //         items: [
                //             { text: '3', link: '' },
                //         ],
                //     },
                // ]
            },
            {
                text: 'JavaEE',
                link: 'javaee/01jdbc.md',
            },
            {
                text: '框架',
                link: 'frame/01mybatis.md',
            },
            {
                text: '分布式微服务',
                link: 'tools/Linux.md',
            },
            {
                text: 'Q&A',
                link: 'qa/interview/01集合.md',
            },
        ],


        // 侧边导航栏
        sidebar:
        {
            '/java/': [
                {
                    text: 'Java',
                    items: [
                        {
                            // Title for the section.
                            text: '基础',
                            items: [
                                { text: '入门', link: '/java/se/01入门.md' },
                                { text: '环境配置', link: '/java/se/02环境配置.md' },
                                { text: '对象', link: '/java/se/03对象.md' },
                                { text: '类', link: '/java/se/04类.md' },
                                { text: '数据类型', link: '/java/se/06变量.md' },
                                { text: '变量', link: '/java/se/02环境配置.md' },
                                { text: '修饰符', link: '/java/se/07修饰符.md' },
                                { text: '运算符', link: '/java/se/08运算符.md' },
                                { text: '循环语句', link: '/java/se/09循环语句.md' },
                                { text: '条件语句', link: '/java/se/10条件语句.md' },
                                { text: '常用类', link: '/java/se/11常用类.md' },
                                { text: '正则表达式', link: '/java/se/12正则表达式.md' },
                                { text: '数组', link: '/java/se/13数组.md' },
                                { text: '方法', link: '/java/se/14方法.md' },
                                { text: '异常', link: '/java/se/15异常.md' },
                            ]
                        },
                        {
                            text: '面向对象',
                            items: [
                                { text: '封装', link: '/java/obj/01封装.md' },
                                { text: '继承', link: '/java/obj/02继承.md' },
                                { text: '多态', link: '/java/obj/03多态.md' },
                                { text: '抽象类', link: '/java/obj/04抽象类.md' },
                                { text: '接口', link: '/java/obj/05接口.md' },
                                { text: '枚举和注解', link: '/java/obj/06枚举和注解.md' },
                            ]

                        },
                        {
                            text: '中级',
                            items: [
                                { text: '数据结构', link: '/java/sup/01数据结构.md' },
                                { text: '网络编程', link: '/java/sup/02网络编程.md' },
                                { text: 'Java8新特性', link: '/java/sup/03java8新特性.md' },
                                { text: 'IO', link: '/java/sup/04io.md' },
                                { text: '集合', link: '/java/sup/05集合.md' },
                                { text: '泛型', link: '/java/sup/06泛型.md' },
                                { text: 'Lambda', link: '/java/sup/07lambda.md' },
                                { text: '多线程', link: '/java/sup/08多线程.md' },
                                { text: '反射', link: '/java/sup/09反射.md' },
                                { text: '定时器', link: '/java/sup/10定时器.md' },

                            ]
                        },
                    ]
                }
            ],
            // '/web/': [
            //     {
            //         text: 'HTML',
            //         link: '/web/01html.md',
            //     },
            //     {
            //         text: 'CSS',
            //         link: '/web/02css.md',
            //     },
            //     {
            //         text: 'JavaScript',
            //         link: '/web/03js.md',
            //     },
            //     {
            //         text: 'JSON',
            //         link: '/web/04json.md',
            //     },
            //     {
            //         text: 'Ajax',
            //         link: '/web/05ajax.md',
            //     },
            //     {
            //         text: 'jQuery',
            //         link: '/web/06jquery.md',
            //     },
            //     {
            //         text: 'BootStrap',
            //         link: '/web/07bootstrap.md',
            //     },
            //     {
            //         text: 'Vue',
            //         link: '/web/08vue.md',
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
            //     {
            //         text: 'ElementUI',
            //         link: '/web/10ele-ui.md',
            //     },
            //     {
            //         text: 'Node.js',
            //         link: '/web/11nodejs.md',
            //     }, {
            //         text: 'Axios',
            //         link: '/web/12axios.md',
            //     }, {
            //         text: 'Less',
            //         link: '/web/13less.md',
            //     },

            // ],
            // '/javaee/': [
            //     {
            //         text: 'JavaEE',
            //         items: [
            //             {
            //                 text: 'JDBC',
            //                 link: '/javaee/01jdbc.md',
            //             },
            //             {
            //                 text: 'Tomcat',
            //                 link: '/javaee/02tomcat.md',
            //             },
            //             {
            //                 text: 'Servlet',
            //                 link: '/javaee/03servlet.md',
            //             },
            //             {
            //                 text: 'JSP',
            //                 link: '/javaee/04jsp.md',
            //             },
            //             {
            //                 text: 'MySQL',
            //                 link: '/javaee/05mysql.md',
            //             },
            //         ]
            //     },
            // ],
            // '/frame/': [
            //     { text: 'MyBatis', link: '/frame/01mybatis.md' },
            //     { text: 'Spring', link: '/frame/02spring.md' },
            //     { text: 'Spring MVC', link: '/frame/03springmvc.md' },
            //     { text: 'Spring Boot', link: '/frame/04spring-boot.md' },
            //     { text: 'Shiro', link: '/frame/05shiro.md' },
            //     { text: 'Spring Security', link: '/frame/06spring-security.md' },
            //     { 
            //         text: 'Spring Cloud', 
            //         items: [
            //             { text: 'Spring Cloud(一)', link: '/frame/07spring-cloud1.md'},
            //             { text: 'Spring Cloud(二)', link: '/frame/07spring-cloud2.md'},
            //         ]
            //     },
            // ],
            // '/qa/': [
            //     {
            //         text: '面试题',
            //         items: [
            //             { text: '集合', link: '/qa/interview/01集合.md' },
            //             { text: '线程', link: '/qa/interview/02线程.md' },
            //             { text: 'MySQL', link: '/qa/interview/03MySQL.md' },
            //             { text: '锁', link: '/qa/interview/04Lock.md' },
            //             { text: '数据库', link: '/qa/interview/05数据库.md' },
            //             { text: '类', link: '/qa/interview/06类.md' },
            //             { text: 'Servlet', link: '/qa/interview/07Servlet.md' },
            //             { text: 'Maven', link: '/qa/interview/08Maven.md' },
            //             { text: 'Spring', link: '/qa/interview/09Spring.md' },
            //             { text: 'Spring MVC', link: '/qa/interview/10SpringMVC.md' },
            //             { text: 'Spring Boot', link: '/qa/interview/11SpringBoot.md' },
            //             { text: 'MyBatis', link: '/qa/interview/12MyBatis.md' },
            //             { text: '安全相关', link: '/qa/interview/13安全相关.md' },
            //             { text: 'Redis', link: '/qa/interview/14Redis.md' },
            //             { text: 'Nginx', link: '/qa/interview/15Nginx.md' },
            //             { text: 'Docker、Linux', link: '/qa/interview/16Docker+Linux.md' },
            //             { text: 'JVM', link: '/qa/interview/17JVM.md'},
            //             { text: 'Git', link: '/qa/interview/18Git.md'},
            //             { text: '其他', link: '/qa/interview/19其他.md'},
            //             { text: '微服务', link: '/qa/interview/20微服务.md'},
            //             { text: '消息中间件', link: '/qa/interview/21消息中间件.md'},
            //         ]
            //     },
            //     {
            //         text: 'other',
            //         items: [
            //             { text: '空对象模式', link: '/qa/other/空对象模式.md' },
            //         ]
            //     },
            //     {
            //         text: 'sub',
            //         items: [
            //             { text: 'qa1', link: '/qa/sub/qa1.md'},
            //             { text: 'qa2', link: '/qa/sub/qa2.md'},
            //         ]
            //     },
            // ],
            // '/tools/': [
            //     {
            //         text: '',
            //         items: [
            //             { text: '内网穿透', link: '/tools/内网穿透.md'},
            //             { text: 'Docker', link: '/tools/Docker.md'},
            //             { text: 'Git', link: '/tools/Git.md'},
            //             { text: 'Linux', link: '/tools/Linux.md'},
            //             { text: 'Maven', link: '/tools/Maven.md'},
            //             { text: 'Nginx', link: '/tools/Nginx.md'},
            //             { text: 'Redis', link: '/tools/Redis.md'},
            //         ]
            //     }
            // ],
            // '/cc/': [
            //     {
            //         text: 'a组',
            //         items: [
            //             { text: '1', link: '//' },
            //             { text: '2', link: '//' },
            //         ]
            //     },
            //     {
            //         text: 'b组',
            //         items: [
            //             { text: 'i', link: '//' },
            //             { text: 'ii', link: '//' },
            //             { text: 'iii', link: '//' },
            //         ]
            //     }
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
