---
lang: zh-CN
title: Less
description: web 13
---

基于NodeJS，CSS预处理器

### 1.简介

并不是新语言，只是让CSS更高效，换了一种写法。

[中文版网页](https://less.bootcss.com/)

Less（代表Leaner样式表）是CSS的向后兼容语言扩展。

### 2.引入

>- 与Node.js一起使用：
>
>```less
>npm install -g less
>> lessc styles.less styles.css
>```
>
>- 或浏览器：
>
>```html
><link rel="stylesheet/less" type="text/css" href="xxx/styles.less" />
><script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.11.1/less.min.js" ></script>
><!-- 
>      注意：link标签的href连接less文件相对地址
>     -->
>```

### 3.注释

~~~html
//这种注释，编译后不会出现在CSS文件上

/*
 * 这种注释，编译后会出现在CSS文件上
 */
~~~

### 4.编译

>1.用第三方编译工具
>
>Koala网址http://koala-app.com/
>
>国人开发，可以把less编译成css。
>
>2.用插件编译
>
>VSCode上的easyLess
>
>Ctrl+S即可生成css文件。
>
>3.HBuilderX上也有Less插件，直接选中lss文件鼠标右键即可。

>用插件之后head就不用再引入less了，改为引入css即可：
>
>~~~html
><link rel="stylesheet" href="less/test01.css">
>~~~
>
>href是css文件的相对位置

### 5.变量

>@变量名:值
>
>用变量去定义一个属性名，名字要加{}，eg. @{bgc}：red;
>
>@imgurl:'../xx/xxx/images'; //定义图片全路径，要加引号''
>
>image:url('@{imgurl}/01.jpg'); //路径名要加{}

### 6.混合

>Bbox可以通过.Abox的方式引入Abox的样式，这样就可以同一样式复用。
>
>样式可以加参数，不写的话会默认复用。
>
>混合可以多参数
>
>后定义的样式会覆盖旧的样式

~~~less
@w:100px;
@h:120px;

.bg(@bg){
    background-color: @bg;
}

.box1{
    width: @w;
    height: @h;
    .bg(coral);
}

.bd(@w:5px){
    border: @w solid green;
}

.box2{
    width: @h;
    .bd();
}

.box3{
    height: @w;
    .bd(15px);
}

.box4{
    width: 200px;
    height: @h;
    .bg(coral);
}

.box5{
    .box4;// 直接延用box4的样式
}
~~~

### 7.匹配模式

>定义一组样式，公有部分实现复用，调用哪个实现哪个样式。
>
>@_

~~~less
.box1{
    width: 0px;
    height: 0px;
    overflow: hidden;// 不加的话背景文字会溢出

    border-width: 10px;
    border-color: transparent transparent red transparent; //transparent透明
    border-style: dashed dashed solid dashed; //dashed虚线
}
// 匹配模式
// 当满足up，right，down，left某个条件时，执行对应的代码块
.triangle(up,@w:10px,@c:red,@s:solid) {//triangle三角形
    border-width: @w;
    border-color: transparent transparent @c transparent;
    border-style: dashed dashed @s dashed; 
}
.triangle(right,@w:10px,@c:red,@s:solid) {
    border-width: @w;
    border-color: transparent transparent transparent @c;
    border-style: dashed dashed dashed @s; 
}
.triangle(down,@w:10px,@c:red,@s:solid) {
    border-width: @w;
    border-color: @c transparent transparent transparent;
    border-style: @s dashed dashed dashed; 
}
.triangle(left,@w:10px,@c:red,@s:solid) {
    border-width: @w;
    border-color: transparent @c transparent transparent;
    border-style: dashed @s dashed dashed; 
}

.box2{
    width: 0;
    height: 0;
    overflow: hidden;

    .triangle(right, 10px, green, solid)
}

// 进一步简化，讲公有样式再提取出来
// 注意：这个@_是固定格式
.triangle(@_,@w,@c,solid){
    width: 0;
    height: 0;
    overflow: hidden;
}
.box3{
    .triangle(left, 20px, coral, solid);
}
~~~

~~~less
.pos(r){
    position: relative;
}
.pos(a){
    position: absolute;
}
.pos(f){
    position: fixed;
}

.box4{
    .pos(r);
    .pos(a);
    .pos(f);
    // 后面的会将前面的覆盖掉
    left: 10px;
    top: 20px;
    width: 100px;
    height: 200px;
    background: coral;
}
~~~
### 8.嵌套

