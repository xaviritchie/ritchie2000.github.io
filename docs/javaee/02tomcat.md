---
lang: zh-CN
title: Tomcat
description: javaee 02
---

### Tomcat
#### 简介
>符合Java WEB标准的最小WEB容器，开源免费，轻量级应用服务器。

#### 安装启动
>下载解压缩，运行bin目录下的startup.bat，浏览器输入localhost:8080出现tom猫就算成功。

#### IDEA集成
>Settings->Build,->Application Servers->+选择Tomcat安装目录(bin的上一级目录)

#### 安装与配置
JDK1.8用8.5.x版本，JDK11用10.1.x以上版本

bin---存放启动、停止服务器和其他脚本文件
conf---存放服务器的配置文件
lib---存放Tomcat服务器的jar包
logs---存放Tomcat服务器的日志文件
temp---存放Tomcat的临时文件
webapps---WEB应用的部署目录
work---Tomcat工作目录

‍
#### 修改tomcat端口号：

打开安装目录--conf--server.xml--修改Shutdown端口port，默认为8080，重启tomcat。

#### idea添加Tomcat
Project Structure -> Libraries -> 点+号 -> 选择tomcat安装路径的lib目录

#### 同类的还有Jetty、Undertow等