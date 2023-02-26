---
lang: zh-CN
title: CSS
description: web 02
---
## CSS简介
>CSS全称为"层叠样式表"(Cascading[kæˈskeɪdɪŋ] Style Sheets),它主要作用是定义HTML内容在浏览器内的显示样式,如文字大小、颜色、字体加粗等。

## CSS基础语法
~~~css
p { color: blue}
~~~
>p选择符: 又称选择器,指明网页中应用样式规则的元素(标签)  
{ } : 声明,在大括号中给元素设置样式,格式为key:value键值对方式,多个key:value时使用分号分割  
color: 属性  
blue: 值

~~~
给一个标签元素添加样式的方式有三种:
	第一种: 直接在标签元素上添加样式,所有的HTML标签都有style属性,这个属性是给标签添加样式的基本属性. 例如: <p style="color:red;">一段话</p>
	第二种: 在HTML模板的head标签中,声明一个style标签,语法如下:
		<style type="text/css">
			/* 编写CSS样式 */
		</style>
	第三种: 创建css文件的方式,在外部创建一个以.css结尾的文件.例如xxx.css,然后在HTML文件的head标签中使用link标签引入,语法如下:
		<link rel="stylesheet" type="text/css" href="xxx.css"/>
~~~

## CSS注释
~~~
/* CSS注释 */
~~~

### CSS的选择器

#### 选择器的介绍
~~~
<pre>
CSS样式定义由两部分组成,形式如下:
<span style="color:red;">选择器</span>{
    样式;
}


在{}之前的部分就是<span style="color:red;">"选择器"</span>,<span style="color:red;">"选择器"</span>指明了{}中的<span style="color:red;">"样式"</span>的作用对象,也就是<span style="color:red;">"样式"</span>作用于网页中的哪些标签。
</pre>
~~~

#### 选择器的分类

```
1、标签选择器 语法: p{}
	选择器就是标签名,例如给p标签添加样式,案例如下:
	
	p{
		/* 给所有p标签的文本内容设置成红色 */
		color: red;
	}
	
2、类选择器  语法: .className{}
	HTML中的所有标签都有class属性,可以设置class的类名,多个标签可以设置相同的class类名,案例如下:
	
	<div class="container">我是一个div标签我的类名为container</div>
	.container{
		color: red;
	}
	注意事项: 类选择器类名前一定要加一个点(.)这是类选择器的标记语法.
	
3、ID选择器 (全局唯一) 语法: #id{}
   HTML中的所有标签都有id属性,可以设置id的名称,在同一个html文件中id的名称是唯一的,不能有两个标签的id名称相同,案例如下：
   
   <div id="show">我是一个div标签,我的id属性值为show</div>
   #show{
   	color: red;
   }
   注意事项: id选择器id属性名前一定要加一个#这是id选择器的标记语法.
   
4、子选择器 > (表示第一代子元素)    语法:  #id>p{} 
   HTML标签是可以嵌套使用的,嵌套的HTML标签之间就构成了子父类的关系,这时候我们如果知道父标签,就可以直接通过父标签使用子选择器找到他的儿子. 案例如下:
   
   <div id="box">
   	<div>
   		我是div1
   		<p>我是p标签</p>
		<div>我是div2</div>
   	</div>
   </div>
   给id是box的div下的div元素(大于号左右两侧可以是任意选择器,不局限与id和标签选择器),设置宽度和高度
   #box>div{
   	/* 只给了子div添加了样式,孙子的没有添加上 */
   	height: 100px;
   	width: 100px;
   }
5、后代选择器   语法:  #id p{}
   后代选择器和子类选择器类似,他是将某一个元素标签下的所有的目标元素添加样式,不论是儿子还是孙子等 案例如下:
   
   <div id="box">
   	<div>
   		我是div1
   		<p>我是p标签</p>
   		<div>我是div2</div>
   	</div>
   </div>
   #box div{
   	/* 给id为box的后代中的所有div添加样式 */
   	height: 100px;
   	width: 100px;
   }
   
6、通用选择器 *    语法:  *{}  星号(*)匹配所有的标签元素

*{
	font-size:14px;
}

7、伪类选择器 :hover    语法:  p:hover{}
   HTML所有标签元素都可以添加伪类选择器,伪类的意义是当鼠标悬停到当前标签下时,呈现的样式 案例如下:
   
   <div id="box"> 我是hover伪类 </div>
   #box:hover{
   	font-size: 100px;
   }

8、分组选择器 h1,h2,p  语法:  h1,h2,p{}
   分组选择器是给一组HTML标签添加样式,多个选择器使用逗号分隔
   
   <div id="box">我是div</div>
   <p class="pName">我是p标签</p>
   <span>我是span标签</span>
   <h1>我是h1标签</h1>
   #box,.pName,span,h1{
   	color: red;
   }
```

### CSS的继承,优先级和重要性

#### 继承

```
<div style="color: red;font-size: 100px;">
	<p> 测试继承关系 </p>
</div>
```

#### 优先级

* 权值

```
1、标签的权值为1
2、类选择符的权值为10
3、ID选择符的权值最高为100
如果样式作用在一个标签上,根据权值来应用使用哪个样式(应用权值高的)


<style type="text/css">
	/* 
		如果权值相同,那么下面会覆盖上面的样式
		如果权值不同,谁大谁生效,和上下顺序无关
	*/
	p{color:red;}
	.first{color:green;}
</style>
<p class="first">三年级时，我还是一个<span>胆小如鼠</span>的小女孩。</p>
```

* 层叠

```
当作用在同一个标签上的样式权值相同时,那么遵循就近原则,谁离标签近,谁的样式就会生效
```

#### 重要性

```
有时候,在某些特殊情况下,在权值相同的情况下,要让某些样式的设置生效,这时候可以使用!important来设置他的最高权值

<style type="text/css">
	p{color:red !important;}
	p{color:green;}
</style>

<p class="first">三年级时，我还是一个<span>胆小如鼠</span>的小女孩。</p>
```

### CSS字体/段落/单位和值

#### 字体/段落样式

```
文字—字体:  
    font-family: "microsoft yahei";
文字—字号颜色:    
    font-size: 12px;
	color: #FF0000;
文字—粗体:
    font-weight: bold;
文字—斜体:
    font-style: italic;
文字-下划线
    text-decoration: underline;
文字-删除线
    text-decoration: line-through;
段落-缩进
    text-indent: 2em;
段落-行间距(行高)
    line-height: 1.5em;
段落-中文字间距、字母间距
    1、letter-spacing:50px;    中文或者是英文字母之间的间距
    2、word-spacing:50px;      英文单词之间的间距
段落-对齐
    text-align: left|center|right; 段落文本的左对齐|居中|右对齐
```

#### 单位和值

* 颜色值

```
1、英文命令颜色
    p{color:red;}
2、RGB颜色
    p{color:rgb(133,45,200);}
3、RGBA颜色
    p{color:rgba(133,45,200,1);}
    rgba颜色有4位,最后一位为颜色的透明度,取值范围为0~1,1:不透明,0:全透明
4、十六进制颜色
    p{color:#00ffff;}
```

* 字体大小/长度单位

```
字体大小的单位一般我们前端使用px或者em表示
盒子高度/宽度的单位我们一般使用px或者%表示

px表示像素
像素的介绍: 咱们的显示器的屏幕是由很多点组成的,像素就是组成图像的最小单元,单位是px.

注意: 
1、em表示一个固定值,如果当前的文字的font-size为14px,那么1em=14px,例如当面的首行缩进,当前段落的字体大小为14px,那么首行缩进text-indent:2em,就是24px,正好是两个字体大小,一般取离他最近的字体作为参照.
2、%一般表示宽度,它会以父元素作为参照计算;如果父元素宽度200px,子元素宽度为50%,那么子元素宽度就为200*0.5=100px
```

### 元素(标签)分类

#### 元素分类

```
标签元素,分为块状元素和内联元素以及内联块状元素

块状元素特点: 
	1. 块状元素默认独占一行
	2. 块状元素有宽度和高度
常见的块状元素: <div>、<p>、<h1>~<h6>、<ol>、<ul>、<table>、<form>

内联元素特点:
	1. 不会独占一行,多个内联元素会水平顺序排列
	2. 没有宽度和高度
常见内联元素: <a>、<span>、<em>、<strong>、<label>

内联块状元素特点:
	1. 可以设置宽高
	2. 不占一整行
常见内联块状元素: <img>、<input>
```

#### 元素转换

```
display属性可以将一个元素转换成其它元素类型
	1、块状转内联
	2、内联转块状
	3、display: inline | block | inline-block;
```

#### 元素的隐藏/显示

```
display: none; 设置display属性为none,当前标签就会隐藏
```

### CSS布局模型

#### CSS盒模型

```
盒模型是CSS布局的基石,它规定了网页元素如何显示以及元素间相互关系(用于前端布局),所有的块状元素都具有盒子模型的特点
```

<img src="https://note.youdao.com/yws/api/personal/file/91B9F1C034C24541BF159D28E6C89A8E?method=download&shareKey=33ac7d5675081a662dbe7c9a0c8aabc3">

#### CSS的布局

* 流动模型(Flow)

```
流动模型，流动（Flow）是默认的网页布局模式。也就是说网页在默认状态下的 HTML网页元素都是根据流动模型来分布网页内容的

流动模型的特点
1、块状元素独占一行
2、内联元素不会独占一行而是从左向右排列
```

* 浮动模型(Float)

```
正常情况下块状元素独占一行,那么怎么能让块状元素并排显示呢?这时候就用到了浮动模型

实现浮动的css属性
float:left|right

高度塌陷问题处理
clear：left | right | both;
```

~~~html
<table>
	<tr>
		<td style="width:50%;">
			<img src="https://note.youdao.com/yws/api/personal/file/76B722328420401FAEEA19783EF8265C?method=download&shareKey=f2c0a37470437223d93908bdabcd361c">
		</td>
		<td style="width:50%;">
			<img src="https://note.youdao.com/yws/api/personal/file/9CB359B9A07948D993B167934F42F98E?method=download&shareKey=94e2e67350ae7a943c36a48c98c532f0">
		</td>
	</tr>
</table>
~~~

* 层模型(Layer)
* * 绝对定位(position: absolute)
~~~html
<table>
	<tr>
		<td colspan="2" style="font-size:13px;">
			position:absolute(表示绝对定位),这条语句的作用将元素从文档流中拖出来,然后使用left、right、top、bottom属性相对于其最接近的一个具有定位属性的父包含块进行绝对定位.如果不存在这样的包含块,则相对于body元素,即相对于浏览器窗口.
		</td>
	</tr>
	<tr>
		<td style="width:50%;">
			<pre>		
div{
    width:200px;
    height:200px;
    border:2px red solid;
    position:absolute;
    left:100px;
    top:50px;
}
			</pre>
		</td>
		<td style="width:50%;">
			<img src="https://note.youdao.com/yws/api/personal/file/WEBf3378068267d3914e1a0d0e18a90a0cf?method=download&shareKey=89fb1be6d4f0e60c82017b53601bb9a4">
		</td>
	</tr>
</table>
~~~

* * 相对定位(position: relative)
~~~html
<table>
	<tr>
		<td colspan="2" style="font-size:13px;">
			position:relative(表示相对定位),它通过left、right、top、bottom属性确定元素在正常文档流中的偏移位置。相对定位完成的过程是首先按static(float)方式生成一个元素(并且元素像层一样浮动了起来),然后相对于以前的位置移动,移动的方向和幅度由left、right、top、bottom属性确定,偏移前的位置保留不动
		</td>
	</tr>
	<tr>
		<td style="width:50%;">
			<pre>		
div{
    width:200px;
    height:200px;
    border:2px red solid;
    position:relative;
    left:100px;
    top:50px;
}
			</pre>
		</td>
		<td style="width:50%;">
			<img src="https://note.youdao.com/yws/api/personal/file/WEBa97139fd033f5c7d0347fffbad26910f?method=download&shareKey=2d87b3136656deaed9733a19f25d2433">
		</td>
	</tr>
</table>
~~~

* * 固定定位(position: fixed)
~~~html
<table>
	<tr>
		<td style="width:50%;" style="font-size:13px;">
			fixed：表示固定定位，与absolute定位类型类似，但它的相对移动的坐标是窗口。由于窗口本身是固定的，它不会随浏览器窗口的滚动条滚动而变化
		</td>
		<td style="width:50%;">
<pre>
	div{
		width: 200px;
		height: 200px;
		border: 2px red solid;
		position: fixed;
		left: 100px;
		top: 100px;
	}
</pre>
		</td>
	</tr>
</table>
~~~

#### 前端布局

* 一列布局

```
<div style="width: 1200px;height: 500px;background-color: pink;margin: 0 auto;"></div>
```

* 二列布局

```
<div style="width: 100%;height: 500px;background-color: pink;margin: 0 auto;">
	<div style="width: 50%;height: 500px;background-color: red;float: left;"></div>
	<div style="width: 50%;height: 500px;background-color: blue;float: left;"></div>
</div>
```

* 三列布局

```
<div style="width: 100%;height: 500px;background-color: pink;margin: 0 auto;">
	<div style="width: 33.33%;height: 500px;background-color: red;float: left;"></div>
	<div style="width: 33.33%;height: 500px;background-color: blue;float: left;"></div>
	<div style="width: 33.33%;height: 500px;background-color: yellow;float: left;"></div>
</div>
```

## CSS样式设置小技巧

* 水平居中设置-行内元素

```
被设置元素为文本、图片等行内元素时，水平居中是通过给父元素设置 text-align:center 来实现的
```

* 水平居中设置-定宽块状元素

```
定宽块状元素,设置自身为 margin-left：auto;margin-right:auto
```

* 水平居中设置-不定宽块状元素

```
<style type="text/css">
	.container{
		text-align: center;
	}
	.container>ul{
		display: inline;
	}
	
</style>

<div class="container">
	<ul>
		<li><a href="#">1</a> </li>
		<li><a href="#">2</a> </li>
		<li><a href="#">3</a> </li>
	</ul>
</div>
```

* 垂直居中-父元素高度确定的单行文本

```
父元素高度确定的单行文本的竖直居中的方法是通过设置父元素的height和line-height 高度一致来实现的

<div class="container">
	Hi 大呲花
</div>

<style type="text/css">
	.container{
		background-color: red;
		height: 50px;
		line-height: 50px;
	}
</style>
```

* 垂直居中-父元素高度确定的多行文本

```
<div class="container">
	<div>
		<p>Hi 大呲花</p>
		<p>Hi 大呲花</p>
		<p>Hi 大呲花</p>
		<p>Hi 大呲花</p>
		<p>Hi 大呲花</p>
	</div>
</div>

.container{
	background-color: red;
	height: 500px;
	display: table-cell;
	vertical-align: middle;
}
```

## Flex弹性盒模型
~~~html
<table>
	<tr>
		<td style="width:50%;font-size:12px;">
		布局的传统解决方案，基于盒状模型，依赖 display 属性 + position 属性 + float 属性。它对有些特殊布局非常不方便.2009年，W3C 提出了一种新的方案 Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能
		</td>
		<td style="width:50%;">
			<img src="https://note.youdao.com/yws/api/personal/file/WEBeea1915ed52f0a8f2b56ced3f6c9a354?method=download&shareKey=86a091daea346406f40559a6147fa9e4" >
		</td>
	</tr>
</table>
~~~

#### Flex介绍

* Flex布局是什么

```
Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性,任何一个容器都可以指定为 Flex 布局.

.box{
  display: flex;
}

Webkit 内核的浏览器，必须加上-webkit前缀(这是兼容老版本浏览器的写法)

.box{
  display: -webkit-flex; /* Safari,chrome */
  display: flex;
}

注意: 设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效
```

* 基本概念
~~~html
<table>
	<tr>
		<td colspan="2" style="font-size:13px;">
			采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。
		</td>
	</tr>
	<tr>
		<td style="width:50%;">
			<img src="https://note.youdao.com/yws/api/personal/file/WEB41a7f732428622b3ecdda1ea86b81497?method=download&shareKey=844b6db8ef95189bda74db1f3beb7bad" >
		</td>
		<td style="font-size:12px;" style="width:50%;">
			容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end
			<hr>
			项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size
		</td>
	</tr>
</table>
~~~

* 容器的属性

```
以下6个属性设置在容器上。

flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content
```

#### 容器的属性使用

* [1] flex-direction属性

```
flex-direction属性决定主轴的方向（即项目的排列方向）

.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

~~~html
<table>
	<tr>
		<td style="width:50%;">
			<img src="https://note.youdao.com/yws/api/personal/file/WEB9d7a12be7ae96b07f83f57fcd1f95001?method=download&shareKey=8bff76a0d788313212eb520ed093c400">
		</td>
		<td style="width:50%;">
			<pre>
它可能有4个值
* row（默认值）：主轴为水平方向，起点在左端。
* row-reverse：主轴为水平方向，起点在右端。
* column：主轴为垂直方向，起点在上沿。
* column-reverse：主轴为垂直方向，起点在下沿。
			</pre>
		</td>
	</tr>
</table>
~~~

* [2] flex-wrap属性

```
默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行.

.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

~~~html
<table>
	<tr>
		<td style="width:50%;">
			<img src="https://note.youdao.com/yws/api/personal/file/WEBbc11f7db7f60f9dfcbefed37f8d3d063?method=download&shareKey=88730914f36fc9d19aebf8319f42f521">
		</td>
		<td>
			<pre>
它可能取三个值
1. nowrap（默认）：不换
2. wrap：换行，第一行在上方
3. wrap-reverse：换行，第一行在下方
			</pre>
		</td>
	</tr>
	<tr>
		<td>
			<img src="https://note.youdao.com/yws/api/personal/file/WEB237c84af94d87bef0fe25eefd55a18cf?method=download&shareKey=a1afbaec3f6be2ab2f6655a9a4f0c1f3">
		</td>
		<td>
			nowrap（默认）：不换
		</td>		
	</tr>
	<tr>
		<td>
			<img src="https://note.youdao.com/yws/api/personal/file/WEB77ec43ac132771cb01e0c46627d96a60?method=download&shareKey=4040706db504611b866e9648330977a0">
		</td>
		<td>
			wrap：换行,第一行在上方
		</td>		
	</tr>
	<tr>
		<td>
			<img src="https://note.youdao.com/yws/api/personal/file/WEB6575ac2ade467686c75159faf4eb04a4?method=download&shareKey=8360b2ca52282ef3188de831dd799450">
		</td>
		<td>
			wrap-reverse：换行，第一行在下方
		</td>		
	</tr>
</table>
~~~

* [3] flex-flow属性

```
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap

.box {
  flex-flow: <flex-direction> <flex-wrap>;
}
```

* [4] justify-content属性

```
justify-content属性定义了项目在主轴上的对齐方式

.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

~~~html
<table>
	<tr>
		<td style="width:50%;">
			<img src="https://note.youdao.com/yws/api/personal/file/WEB58f5c97dbc113873b74569b541674324?method=download&shareKey=9fae04952163cae157f46b70a3c6fba6">
		</td>
		<td style="width:50%;font-size:12px;">
			<pre>
它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。
flex-start（默认值）：左对齐
flex-end：右对齐
center： 居中
space-between：两端对齐，项目之间的间隔都相等。
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
			</pre>
		</td>
	</tr>
</table>
~~~

* [5] align-items属性

```
align-items属性定义项目在交叉轴上如何对齐

.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```
~~~html
<table>
	<tr>
		<td style="width:50%;">
			<img src="https://note.youdao.com/yws/api/personal/file/WEB1bdb428615c0b536483394815dd282f1?method=download&shareKey=d9a709193ffe4fae7ed8ba101781578a">
		</td>
		<td style="width:50%;font-size:12px;">
			<pre>
它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。
flex-start：交叉轴的起点对齐。
flex-end：交叉轴的终点对齐。
center：交叉轴的中点对齐。
baseline: 项目的第一行文字的基线对齐。
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
			</pre>
		</td>
	</tr>
</table>
~~~


* [6] align-content属性

```
align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

~~~html
<table>
	<tr>
		<td style="width:50%;">
			<img src="https://note.youdao.com/yws/api/personal/file/WEBfed36f15d8781404d6107fcec1b99242?method=download&shareKey=93b8adbf6c008e051b8dd008f892500f">
		</td>
		<td style="width:50%;font-size:12px;">
			<pre>
该属性可能取6个值。
flex-start：与交叉轴的起点对齐。
flex-end：与交叉轴的终点对齐。
center：与交叉轴的中点对齐。
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
stretch（默认值）：轴线占满整个交叉轴
			</pre>
		</td>
	</tr>
</table>
~~~

## 其他常用前端属性介绍

```
1. 设置圆角
	border-radius: 3px;
	
2. 取消a标签的默认下划线
	text-decoration: none;

3. 取消无序列表的点
	list-style: none;

4. 取消input的边框以及焦点
	outline: none;
	border: none;

5. 设置背景图片
	background-image: url(img/timg.jpg);默认沿着水平方向和垂直方向进行平铺
	
	background-repeat: repeat-y; 沿着垂直方向
	background-repeat: repeat-x; 沿着水平方向
	background-repeat: no-repeat; 不平铺
```

