---
lang: zh-CN
title: HTML
description: web 01
---
## web

>在服务器端编程语言中，java更适合开发大型web应用，因为更适合处理复杂的业务逻辑，有成熟的多线程模型，提供了多种开源类库，避免了重复造轮子，降低了开发成本。



>web:www(word wide web)
Internet:全球性的互联网络，基于这个网络提供了很多重要的服务，比如telnet实现远程登陆，email实现邮件收发，而www是基于Internet实现的一个多媒体信息服务，因此web是Internet提供的众多服务中的一种。



>web服务与其他服务相比的特点:
web服务是基于B/S结构的一种服务，B即Browser，S即Server，使用浏览器通过通讯协议发送请求，以获取服务器发送回来的响应，从而达到浏览器网页的目的。  
web三要素:浏览器，服务器，http通讯协议  
web浏览器:  
早期被翻译成客户，因为浏览器就是帮助(代理)我们访问者把请求交给服务器，并且将服务器返回的资源以图形化的方式在界面上显示出来。比如:服务器返回了html源代码，浏览器需要作为html解释器和内嵌脚本执行器将源码翻译成可视化的页面。  
网页编程基础:html+css+js  
html用来构建网页结构，css控制页面的外观，js为网页添加动态交互效果


## HTML

#### 概述

>hypertext markup language是一种超文本标记语言，用来构建网页文件，以.html/.htm为后缀，由浏览器解释运行，可以使用css定义样式，嵌入js代码实现动态效果。

#### HTML文件的基本格式
~~~html
<!DOCTYPE html>
<html>
	<head>
		
	</head>
	<body>
	
	</body>
</html>
~~~


#### 语法标记

```
封闭类型:双标记，比如<title>***</title>
非封闭类型:单标记或空标记，比如<meta/> <br/>
```

#### html基本结构标签

```
<html></html>:根标签
<head></head>:头标签，为页面添加全局信息，比如定义页面标题，页面刷新速度...
<body></body>:页面主题标签
```

#### head中常见的标签

```
<title></title>:文档标题，显示在浏览器的左上方
<meta/>:元数据元素，用于定义网页的基本信息，比如文档的字符编码，查询关键字，刷新速度
<style></style>:定义文档样式
<link/>:引入外部css样式
<script></script>:引入外部脚本文件
```

#### 文本元素

~~~
<h1>到<h6>:文本标题元素，当页面上的文本需要突出显示时，可以使用标题元素
<p>:段落，当页面上的一段文本需要单独使用一个段落时，并于前后文本隔开，可以使用p标记
<br/>:换行标记
<hr/>:水平线，常用于页面上为大量的文档进行分割
~~~
~~~
分组元素:span 与 div
span:行内元素，不影响原有元素的布局，原先是一行，现在还是一行
div:块级元素，它会自成一行，单独占一段落，前后元素会被顶开，变成独立的行
~~~
~~~
em    :强调        -> 默认是斜体
<em>强调</em>

strong:更强烈的强调 -> 粗体
<strong>强烈的强调</strong>
~~~
~~~
<q>短引用文本</q>:短引用文本,一句话如果引用一句经典语录,设置到此标签中
<blockquote> 长引用 </blockquote> :长引用,一句话如果引用多句经典语录,设置到此标签中
~~~

#### 图片和链接

```
1.<img src="图像的路径" width="宽" height="高"/>
注:相对路径(不以“/”开头的路径称为相对路径)以及绝对路径，不能使用物理地址

2.超级链接:点击，去往其他资源(页面)
<a href="url" target="">文字或图片</a>
target取值:_self(缺省值)，替换当前窗口的内容,有前后流程操作的时候使用，比如支付
           _blank,打开新的空白页面，显示内容，查看某个商品详情

3.锚点:当前页面的不同位置之间的跳转
第一步:使用a在目标位置定义一个锚点
      <a name="锚点名称"></a>
第二步:使用a标签，配合href=“#锚点名称”执行具体锚点位置
      <a href="#link1"></a>
      
4.直接回到页面顶端
简化写法:<a href="#">to top</a>

```

#### 列表元素

```java
什么是列表：将几项相同的内容排列在一起
所有列表都有列表类型和列表项组成:
--列表类型:有序列表<ol>和无序列表<ul>
   --ol:type[1,A,a,I,i]
   --ul:type[circle(空心圆),disc(实心圆，缺省值),square(方块)]
--列表项:<li>,用于指示具体的列表内容
--列表嵌套:
  <ul>
  	<li>one
    	<ol>
          <li>A</li>
        </ol>  
    </li>    
    <li>two</li>   
    <li>three</li>   
  </ul>
   
```

#### 表格

```java
显示网格数据，也可以用于布局
1.创建表格:
  table(定义表格)  tr(创建行)  td(创建列)
2.常用属性
  table:
  --border定义表格边框线的宽度
  --width/height
  --align:定义表格水平方向的位置
  --cellpadding:单元格边框与内容之间的间距
  --cellspacing:单元格与单元格之间的距离
    
  tr:
  align(水平方向位置left center right)/valign(垂直方向位置:top center bottom)
      
  td:
  align/valign/colspan(跨列)/rowspan(跨行)/width/height
      
3.行分组
  表格可以划分为3个部分:表头，表主体和表尾
  表头行分组:<thead></thead>
  表主体行分组:<tbody></tbody>
  表尾行分组:<tfoot></tfoot>
 --由上而下 从左到右
```

#### 表单

```java
表单用于显示，收集信息，并将信息提交到服务器。
定义表单:使用成对的<form></form>标记，表示要将此元素中所涵盖的控制中的数据传输给服务器。
主要属性:
  action:表单提交的地址
  method:设置表单数据提交的方式get(默认值)/post
  enctype:设置表单数据进行编码的方式，默认application/x-www-form-urlencoded,当表单要传数据时，enctype="multipart/form-data"
    

表单可以包含不同类型的表单控件，包括:
--input元素
  文本框，密码框，单选框，复选框，按钮，隐藏框，文件选择框
--其他元素
  标签
  --<label for="需要关联的控件的ID">文本</label>
  文本域  
  --<textarea cols="指定文本域的列数" rows="指定文本域的行数" readonly>文本</textarea>
  下拉框  
  --<select>
    	<option value="1">java</option>
        <option value="2">uid</option>
    </select>
```

#### iframe

```
在当前页面引入并显示其他页面(嵌入)，常用于类似广告页面的嵌入
语法:<iframe src="页面路径"></iframe>
```

#### 代码
```
添加一行代码,一般计算机代码放在这个标签中

<code>一行代码</code>
```
~~~
添加一段代码

<pre>多行代码</pre>
~~~