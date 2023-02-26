---
lang: zh-CN
title: Node.js
description: web 11
---
## Node
[Node](https://nodejs.org/en/download/releases/)是一个开源、跨平台的Java Script运行时环境。基于 V8 (Google开源的JavaScript和WebAssembly引擎，用C++编写。)构建。

传统上 Web 开发者，前端用 JS 写，但是写服务器端代码的时候还必须用另外一种语言，例如 Java 等。

Node.js 是运行在服务端的 JavaScript，有了Node.js后，JS也能写后端了。

Node.js对于JS，好比JRE对于Java。

**NPM**的全称是Node Package Manager，是一个NodeJS包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准。2020年3月17日，Github宣布收购*npm*，GitHub现在已经保证*npm*将永远免费。  
类似的软件包管理器还有[*Yarn*](https://www.yarnpkg.cn/getting-started)和[*pnpm*](https://www.pnpm.cn/motivation)。

## Deno
[Deno](https://www.denojs.cn/) (/ˈdiːnoʊ/, 发音 dee-no) 是一个 JavaScript/TypeScript 的运行时，默认使用安全环境执行代码，有着卓越的开发体验。

Deno 建立在 V8、Rust 和 Tokio 的基础上。

Tokio (Rust 编程语言的异步运行时，提供异步事件驱动平台，构建快速，可靠和轻量级网络应用。)

## 两者比较
这俩作者是同一人Ryan Dahl，Deno就是Node单词反过来。

Deno 不使用 npm。

Deno 使用 URL 或文件路径引用模块。
Deno 在模块解析算法中不使用 package.json。

Deno 中的所有异步操作返回 promise，因此 Deno 提供与 Node 不同的 API。

Deno 需要显式指定文件、网络和环境变量的访问权限。

当遇到未捕获的错误发生时，Deno 总是会异常退出。

使用 ES 模块，不支持 require()。第三方模块通过 URL 导入：

`import * as log from "https://deno.land/std@$STD_VERSION/log/mod.ts";`