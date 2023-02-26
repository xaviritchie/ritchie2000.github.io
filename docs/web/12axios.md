---
lang: zh-CN
title: Axios
description: web 12
---

#### 1. 概述

前端通信框架
- Axios 是一个基于 *[promise](https://javascript.info/promise-basics)* 网络请求库，作用于[node.js](https://nodejs.org/) 和浏览器中。 它是 *[isomorphic](https://www.lullabot.com/articles/what-is-an-isomorphic-application)* 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。

- 异步请求：基于XMLHttpRequests对象发起的请求都是异步请求。

- 异步请求特点：页面不动，更新页面局部，多个请求之间互不影响，并行执行。


#### 2. Axios下载引入
~~~
- 使用 npm:$ npm install axios

- 使用 unpkg CDN:<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
~~~