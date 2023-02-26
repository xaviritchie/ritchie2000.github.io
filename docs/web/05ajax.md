---
lang: zh-CN
title: Ajax
description: web 05
---
### Ajax是什么？
>Ajax即Asynchronous Javascript And XML（异步JavaScript和XML）  
Ajax 不是一种新的编程语言，而是一种用于创建更好更快以及交互性更强的Web应用程序的技术。  
核心是xmlHttpRequest对象。

>A. Ajax是一种动态的网页技术   
B. 主要用于实现页面的局部加载   
C. Ajax的最大的特点: 异步访问,局部刷新。  
   局部：只需要刷新网页页面的一部分  不用加载整个页面  效率高  
   同步：先获取数据 再加载页面 例如:转账   
   异步：先加载页面 再获取数据 例如:直播弹幕

### AJAX - 向服务器发送请求
XMLHttpRequest 对象用于和服务器交换数据。

向服务器发送请求  
如需将请求发送到服务器，我们使用 XMLHttpRequest 对象的 open() 和 send() 方法：
~~~
xmlhttp.open("GET","ajax_info.txt",true);
xmlhttp.send();
~~~

#### GET 还是 POST？
与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。

然而，在以下情况中，请使用 POST 请求：

- 不愿使用缓存文件（更新服务器上的文件或数据库）
- 向服务器发送大量数据（POST 没有数据量限制）
- 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

**异步 - True 或 False？**
>AJAX 指的是异步 JavaScript 和 XML（Asynchronous JavaScript and XML）。  
XMLHttpRequest 对象如果要用于 AJAX 的话，其 open() 方法的 async 参数必须设置为 true：
`xmlhttp.open("GET","ajax_test.html",true);`  
Async = true  
当使用 async=true 时，请规定在响应处于 onreadystatechange 事件中的就绪状态时执行的函数：

>Async = false  
如需使用 async=false，请将 open() 方法中的第三个参数改为 false：
`xmlhttp.open("GET","test1.txt",false);`

>不推荐使用 async=false，但是对于一些小型的请求，也是可以的。
请记住，JavaScript 会等到服务器响应就绪才继续执行。如果服务器繁忙或缓慢，应用程序会挂起或停止。
注意：当使用 async=false 时，请不要编写 onreadystatechange 函数 - 把代码放到 send() 语句后面即可：


### AJAX - 服务器 响应
| 属性 | 描述 |
| --- | --- |
|responseText | 获得字符串形式的响应数据。| 
| responseXML| 获得 XML 形式的响应数据。|
	
**responseText 属性**  
如果来自服务器的响应并非 XML，请使用 responseText 属性。  
**responseXML 属性**    
如果来自服务器的响应是 XML，而且需要作为 XML 对象进行解析，请使用 responseXML 属性。  

### 使用jQuery方式实现

```
url ==>表示请求地址
type ==>请求方式
data==>请求传递的参数
dataType==>返回数据的类型   json  text   xml
success ==> 表示成功后回调
error ==>失败后的回调
```

jQuery 提供了用于 Ajax 开发的丰富函数(方法)库。在jQuery中可以用Ajax。

~~~q
$.get和$.post是简单易用的高层实现，我们使用$.get和$.post方法，jQuery会自动封装调用底层的$.ajax。
$.get 只处理简单的 GET 请求功能以取代复杂 $.ajax；
$.post 只处理 post请求功能以取代复杂 $.ajax ；
$.get和$.post不支持出错时执行函数，否则必须使用$.ajax。

~~~