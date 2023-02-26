---
lang: zh-CN
title: jQuery
description: web 06
---

### JQuery是什么

```
JQuery是一个快速、简洁的JavaScript代码库(轻量级JS框架)
JQuery设计的宗旨是"Write Less,Do More",即倡导写更少的代码,做更多的事情.
JQuery封装JavaScript常用的功能代码,提供一种简便的JavaScript操作方式,优化HTML文档操作、事件处理、动画设计和Ajax交互
```

### JQuery的优势

```
 - 轻量级
 - 强大的选择器
 - 出色的 DOM 操作的封装
 - 可靠的事件处理机制
 - 完善的 Ajax
 - 出色的浏览器兼容性
```

### JQuery的引入方式

* 离线本地引入

```
下载地址: https://www.jq22.com/jquery-info122

1. 在head中引入
2. 在body中引入

<script src="jquery-1.12.2.min.js"></script>
```

* CDN引入

```
CDN地址: https://www.jq22.com/jquery-info122

1. 在head中引入
2. 在body中引入

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
```

### JQuery入门之HelloWorld

```
<button id="btn">Hello JQuery</button>

$(function(){
	$("#btn").click(function(){
		alert("HelloWorld.");
	});
});
```

### JQuery文档使用之选择器

#### 基本选择器一

* id选择器

```
HTML:
<div id="notMe"><p>id="notMe"</p></div>
<div id="myDiv">id="myDiv"</div>

JS:
$("#myDiv");

结果:
[ <div id="myDiv">id="myDiv"</div> ]
```

* 元素(标签)选择器

```
HTML:
<div>DIV1</div>
<div>DIV2</div>
<span>SPAN</span>

JS:
$("div");

结果:
[ <div>DIV1</div>, <div>DIV2</div> ]
```

* 类选择器

```
HTML:
<div class="notMe">div class="notMe"</div>
<div class="myClass">div class="myClass"</div>
<span class="myClass">span class="myClass"</span>

JS:
$(".myClass");

结果:
[ <div class="myClass">div class="myClass"</div>, <span class="myClass">span class="myClass"</span> ]
```

* 通用选择器

```
HTML:
<div>DIV</div>
<span>SPAN</span>
<p>P</p>

JS:
$("*");

结果:
[ <div>DIV</div>, <span>SPAN</span>, <p>P</p> ]
```

* 分组选择器

```
HTML:
<div>div</div>
<p class="myClass">p class="myClass"</p>
<span>span</span>
<p class="notMyClass">p class="notMyClass"</p>

JS:
$("div,span,p.myClass")

结果:
[ <div>div</div>, <p class="myClass">p class="myClass"</p>, <span>span</span> ]
```

#### 基本选择器二

* 匹配索引值为偶数的元素

```
HTML:
<table>
  <tr><td>Header 1</td></tr>
  <tr><td>Value 1</td></tr>
  <tr><td>Value 2</td></tr>
</table>

JS:
$("tr:even")

结果:
[ <tr><td>Header 1</td></tr>, <tr><td>Value 2</td></tr> ]
```

* 匹配索引值为奇数的元素 

```
HTML:
<table>
  <tr><td>Header 1</td></tr>
  <tr><td>Value 1</td></tr>
  <tr><td>Value 2</td></tr>
</table>

JS:
$("tr:odd")

结果:
[ <tr><td>Value 1</td></tr> ]
```

#### 层级选择器

* 后代选择器

```
HTML:
<form>
  <label>Name:</label>
  <input name="name" />
  <fieldset>
      <label>Newsletter:</label>
      <input name="newsletter" />
 </fieldset>
</form>
<input name="none" />

JS:
$("form input")

结果:
[ <input name="name" />, <input name="newsletter" /> ]
```


* 子类选择器

```
HTML:
<form>
  <label>Name:</label>
  <input name="name" />
  <fieldset>
      <label>Newsletter:</label>
      <input name="newsletter" />
 </fieldset>
</form>
<input name="none" />

JS:
$("form > input")

结果:
[ <input name="name" /> ]
```

* 兄弟选择器

* * 匹配所有紧接在 prev 元素后的 next 元素

```
HTML:
<form>
  <label>Name:</label>
  <input name="name" />
  <fieldset>
      <label>Newsletter:</label>
      <input name="newsletter" />
 </fieldset>
</form>
<input name="none" />

JS:
$("label + input")

结果:
[ <input name="name" />, <input name="newsletter" /> ]
```

* * 匹配 prev 元素的所有同辈 siblings 元素

```
HTML:
<form>
  <label>Name:</label>
  <input name="name" />
  <fieldset>
      <label>Newsletter:</label>
      <input name="newsletter" />
 </fieldset>
</form>
<input name="none" />

JS:
$("form ~ input")

结果:
[ <input name="none" /> ]
```

#### 属性选择器

* 根据属性名匹配

```
HTML:
<div>
  <p>Hello!</p>
</div>
<div id="test2"></div>

JS:
$("div[id]")

结果:
[ <div id="test2"></div> ]
```

* 根据属性名和值匹配

```
HTML:
<input type="checkbox" name="newsletter"  />
<input type="checkbox" name="newsletter" />
<input type="checkbox" name="accept" />

JS:
$("input[name='newsletter']")

结果:
[ <input type="checkbox" name="newsletter"  />, <input type="checkbox" name="newsletter" /> ]
```

#### 表单选择器

* 匹配单行文本框

```
HTML:
<form>
  <input type="text" />
  <input type="checkbox" />
  <input type="radio" />
  <input type="image" />
  <input type="file" />
  <input type="submit" />
  <input type="reset" />
  <input type="password" />
  <input type="button" />
  <select><option/></select>
  <textarea></textarea>
  <button></button>
</form>

JS:
$(":text")

结果:
[ <input type="text" /> ]
```

* 匹配密码框

```
HTML:
<form>
  <input type="text" />
  <input type="checkbox" />
  <input type="radio" />
  <input type="image" />
  <input type="file" />
  <input type="submit" />
  <input type="reset" />
  <input type="password" />
  <input type="button" />
  <select><option/></select>
  <textarea></textarea>
  <button></button>
</form>

JS:
$(":password")

结果:
[ <input type="password" /> ]
```

* 匹配单选框

```
HTML:
<form>
  <input type="text" />
  <input type="checkbox" />
  <input type="radio" />
  <input type="image" />
  <input type="file" />
  <input type="submit" />
  <input type="reset" />
  <input type="password" />
  <input type="button" />
  <select><option/></select>
  <textarea></textarea>
  <button></button>
</form>

JS:
$(":radio")

结果:
[ <input type="radio" /> ]
```

* 匹配复选框

```
HTML:
<form>
  <input type="text" />
  <input type="checkbox" />
  <input type="radio" />
  <input type="image" />
  <input type="file" />
  <input type="submit" />
  <input type="reset" />
  <input type="password" />
  <input type="button" />
  <select><option/></select>
  <textarea></textarea>
  <button></button>
</form>

JS:
$(":checkbox")

结果:
[ <input type="checkbox" /> ]
```

* 匹配不可见元素

```
HTML:
<table>
  <tr style="display:none"><td>Value 1</td></tr>
  <tr><td>Value 2</td></tr>
</table>

JS:
$("tr:hidden")

结果:
[ <tr style="display:none"><td>Value 1</td></tr> ]
```

#### 表单对象属性选择器

* 匹配所有选中的元素

```
HTML:
<form>
  <input type="checkbox" name="newsletter" checked="checked" value="Daily" />
  <input type="checkbox" name="newsletter" value="Weekly" />
  <input type="checkbox" name="newsletter" checked="checked" value="Monthly" />
</form>

JS:
$("input:checked")

结果:
[ <input type="checkbox" name="newsletter" checked="checked" value="Daily" />, <input type="checkbox" name="newsletter" checked="checked" value="Monthly" /> ]
```

* 匹配所有选中的option元素

```
HTML:
<select>
  <option value="1">Flowers</option>
  <option value="2" selected="selected">Gardens</option>
  <option value="3">Trees</option>
</select>

JS:
$("select option:selected")

结果:
[ <option value="2" selected="selected">Gardens</option> ]
```

### JQuery文档使用之文档处理

* 内部插入

```
HTML:
<p>I would like to say: </p>

JS:
$("p").append("<b>Hello</b>");

结果:
[ <p>I would like to say: <b>Hello</b></p> ]
```

* 删除

```
HTML:
<p>Hello, <span>Person</span> <a href="#">and person</a></p>

JS:
$("p").empty();

结果:
<p></p>
```

### JQuery文档使用之筛选

* 查询列表中的第一个

```
HTML:
<ul>
    <li>list item 1</li>
    <li>list item 2</li>
    <li>list item 3</li>
    <li>list item 4</li>
    <li>list item 5</li>
</ul>

JS:
$('li').first()

结果:
[ <li>list item 1</li> ]
```

* 查询列表中的最后一个

```
HTML:
<ul>
    <li>list item 1</li>
    <li>list item 2</li>
    <li>list item 3</li>
    <li>list item 4</li>
    <li>list item 5</li>
</ul>

JS:
$('li').last()

结果:
[ <li>list item 5</li> ]
```

* 筛选出与指定表达式匹配的元素集合

```
HTML:
<p>Hello</p><p>Hello Again</p><p class="selected">And Again</p>

JS:
$("p").filter(".selected")

结果:
[ <p class="selected">And Again</p> ]
```

* 筛选一个包含着所有匹配元素的唯一父元素的元素集合

```
HTML:
<div><p>Hello</p><p>Hello</p></div>

JS:
$("p").parent()

结果:
[ <div><p>Hello</p><p>Hello</p></div>]
```


### JQuery文档使用之事件绑定

* 页面载入事件

```
当DOM载入就绪可以查询及操纵时绑定一个要执行的函数

$(document).ready(function(){
  // 在这里写你的代码...
});

```

* 事件绑定

* * on函数

```
$("p").on("click", function(){
	alert($(this).text());
});
```

* * bind函数

```
$("p").bind("click", function(){
  alert($(this).text());
});
```

* * 直接绑定

```
$("p").click(function(){
	alert($(this).text());
});
```

* 单击事件

```
$("p").click();
```

* 失去焦点事件

```
$("input").blur();
```

* 获取焦点事件

```
$("input").focus();
```

### JQuery文档使用之属性操作

* attr()获取/设置元素属性

```
1. 获取属性   $("img").attr("src");
2. 设置属性   $("img").attr({ src: "test.jpg", alt: "Test Image" });
```

* addClass()给元素添加类

```
$("p").addClass("selected");
$("p").addClass("selected1 selected2");
```

* html()获取/设置第一个匹配元素的html内容

```
1. 获取值  $('p').html();
2. 设置值  $("p").html("Hello <b>world</b>!");
```

* text()获取/设置第一个匹配元素的文本内容

```
1. 获取值  $('p').text();
2. 设置值  $("p").text("Hello world!");
```

* val()获取/设置input元素value属性值

```
1. 获取值  $("input").val();
2. 设置值  $("input").val("hello world!");
```

### JQuery文档使用之CSS操作

* css()获取/设置css样式

```
1. 获取值  $("p").css("color");
2. 设置值  $("p").css({ "color": "#ff0011", "background": "blue" });
```

### JQuery文档使用之效果

* 元素隐藏和显示

```
1. 显示  

HTML: <p style="display: none">Hello</p>
JS  : $("p").show()

2. 隐藏

JS  : $("p").hide()
```

* 滑动

```
1. 向上收起(隐藏) slideUp()
2. 向下展开(显示) slideDown()
3. 隐藏和显示切换 slideToggle()
```

### JQuery节点创建

```
<table border="1"></table>

//创建<tr></tr>
var trEle = $("<tr></tr>");
var thEle1 = $("<th>ID</th>");
var thEle2 = $("<th>名字</th>");
var thEle3 = $("<th>性别</th>");
trEle.append(thEle1);
trEle.append(thEle2);
trEle.append(thEle3);
var trEle2 = $("<tr></tr>");
var tdEle1 = $("<td>1001</td>");
var tdEle2 = $("<td>张三</td>");
var tdEle3 = $("<td>男</td>");
trEle2.append(tdEle1);
trEle2.append(tdEle2);
trEle2.append(tdEle3);
console.log(trEle[0]);
$("table").append(trEle);
$("table").append(trEle2);
```

### JQuery对象和DOM对象的转换

```
<button id="btn">我是一个按钮</button>

//使用jQuery选择器获取jQuery对象
var $btn = $("#btn");
console.log($btn);
//将jQuery对象转换成DOM对象
console.log($btn[0]);//方式一
console.log($btn.get(0)); //方式二
//将DOM对象转成jQuery对象
console.log($($btn[0]));
```

### jQuery中\$.get、\$.post、\$.getJSON、\$.ajax 方法区别？
~~~
jQuery.get() ：使用 HTTP GET 请求从服务器加载数据；
jQuery.post()：使用 HTTP POST 请求从服务器加载数据；

jQuery.getJSON()：使用 HTTP GET 请求从服务器加载 JSON 编码数据；
jQuery.ajax()：执行异步 HTTP (Ajax) 请求；
$ajax方法，需解析Json字符串；
$.getJSON方法需解析JSON对象；
两种方法的效果是一样的，区别在于：$ajax 的data参数格式data: "q=" + str，与$.getJSON中的参数格式{q:str}的区别，并且在返回的结果中，$ajax返回的是Json字符串，需用eval方法转化为JSON对象，而$.getJSON返回的是JSON对象，可以直接使用，而$.getJSON的写法也更加简单，推荐使用。
~~~