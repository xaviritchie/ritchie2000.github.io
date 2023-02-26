---
lang: zh-CN
title: JSP
description: javaee 04
---


### 1、JSP
#### 1.1、简介
>Java Server Pages
>部署在服务器上，动态网页技术标准
>以Java语言作为脚本语言
>本质上就是Servlet

#### 1.2、语法
><% java代码块 %>
   <%= 数值 %> 输出表达式，可输出变量或字面量
   <%! 声明全局变量 %>

##### 1.2.1注释
>注释：
        显示注释
            能够在客户端查看
            <!-- HTMl风格 -->
        隐式注释
            不能在客户端查看
            <%-- JSP风格 --%>
            // Java风格 单行注释
            /* Java风格 多行注释 */


#### 1.3、指令
>- page
>	- contentType="text/html;charset=UTF-8" 页面的类型 设置编码格式 language="java" 语法
>	- import="java.util.Date" 导包 
>	- errorPage="kk.jsp" 发送异常跳转界面
>- include
>	-  include 用于引入项目中一些公共的界面
>- taglib 引入第三方的核心标签库
>	- prefix是为标签库起别名

~~~html
引入常用的jstl标签库
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"  %>
引入格式化标签库
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
~~~

### 2、JSTL标签库
#### 2.1、简介
>Java server pages standarded tag library，即JSP标准标签库
>JSTL一般要配合EL表达式一起使用

#### 2.2、使用
>导入jar包
>jstl.jar
>standard.jar
>在jsp页面顶部指令引入

### 3、EL表达式
#### 3.1、简介
>Expression Language
>为了使JSP写起来更加简单

#### 3.2、使用
>数据获取
>EL根据作用域范围依次获取，越小越先获取
>域的范围由小到大：page < request < session < application

#### 3.3、语法
~~~c
逻辑运算符 and or &&  || not !
三元运算符： ${true?  "yes"  :  "no"} 

获取Javabean 中的数据：  
${student.getName()}  
${student.name}  
本质上都是调用getName()方法  
~~~
