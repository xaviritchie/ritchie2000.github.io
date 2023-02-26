---
lang: zh-CN
title: Servlet
description: javaee 03
---
### Servelt
#### 简介
>Server 和Applet的缩写，"服务端小程序"的意思。
>本质也是Java类。
>提供了Servlet功能的服务器，就是Servlet容器，比如Tomcat，Jetty等。

#### 新建web项目
>New Project->Java Enterprise->Web Application

#### 服务器地址配置
>IDEA右上角Tomcat->Edit->Server(改默认浏览器、端口号)->Deployment(改地址)

### Http
### Cookie
>服务端保存在客户端的信息。
>格式：键值对，用=连接，用;隔开
~~~java
// 创建cookie对象  
Cookie cookie = new Cookie("name", "123456");  
// 发送cookie对象  
resp.addCookie(cookie);

~~~

~~~java
// 获取cookie对象，得到的是一个数组  
Cookie[] cookies = req.getCookies();  
// 判断cookie是非为空  
if (cookies != null && cookies.length > 0){  
    // 遍历cookie数组  
    for (Cookie cookie : cookies) {  
        String name = cookie.getName();  
        String value = cookie.getValue();  
        System.out.println("名称：" + name + ",值：" + value);  
    }  
}
~~~

~~~java
// cookie到期时间，默认-1，浏览器退出即删除
// 正整数，单位时间s后删除
// 0，立即删除
cookie.setMaxAge(-1);
~~~
>cookie只在当前浏览器有效；
>不能存中文，除非编解码
>同名cookie会覆盖
>cookie存储大小有限,4k左右

~~~java
// cookie路径设置
// "/"表示当前服务器下任何项目都能访问到
// 只有访问路径中包含path值，才能获取到该cookie对象
cookie.setPath("/")
~~~
### Session
>
>标识一个会话，并且在一次会话（用户的多次请求）期间共享数据。
>对服务器而言，每个连接到它的客户端都是一个session。

#### 标识符jsessionid
>标识一次会话的唯一的标志。

~~~java
// 获取session对象  
HttpSession session = req.getSession();  
// 获取session的会话标识符  
String id = session.getId();  
// 获取session的创建时间  
long creationTime = session.getCreationTime();  
// 获取最后一次访问的时间  
long lastAccessedTime = session.getLastAccessedTime();  
// 判断是否是新的session对象  
boolean aNew = session.isNew();
~~~


#### session域对象
>Tomcat中session默认存活时间为30min，在安装目录conf下的web.xml中的<session-config/>中配置


~~~java
// 获取session对象  
HttpSession session = req.getSession();  
// 设置session域对象  
session.setAttribute("uanme","");  
  
// session对象的最大不活动时间  
int maxInactiveInterval = session.getMaxInactiveInterval();  
// 修改这个最大不活动时间为15秒  
session.setMaxInactiveInterval(15);  
  
// 立即销毁session  
session.invalidate();  
// session的底层cookie实现，cookie只存在浏览器内存中，关闭浏览器即失效，所以session也是一样，因为没有jsessionid与之对应  
// 关闭tomcat服务器，session也会销毁
~~~

### 文件上传和下载
~~~html
<body>  
<!--  
    文件上传：  
        1、建表单  
        2、设置提交类型为POST  
        3、设置表单类型为文件上传  
        4、设置文件提交地址  
        5、准备表单元素  
            - 普通表单项“text”  
            - 文件项“file”  
        6、设置表单元素name属性值  
-->  
<form method="post" enctype="multipart/form-data" action="uploadFile">  
    姓名：<input type="text" name="uname"><br>  
    文件：<input type="file" name="myfile"><br>  
<!--    button默认类型为提交“submit”-->  
    <button>提交</button>  
</form>  
</body>
~~~

~~~java
@WebServlet("/uploadFile") // 这里要跟前端的name保持一致  
@MultipartConfig // 文件上传，必须要就该注解  
public class UploadFile extends HttpServlet {  
	// ctrl + o 选择service-http
    @Override  
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
        // 设置请求的编码格式  
        req.setCharacterEncoding("UTF-8");  
        // 获取普通表单项（获取参数），参数跟前端页面name属性值保持一致  
        String uname = req.getParameter("uname");  
        // 获取part对象,并得到上传文件名  
        Part part = req.getPart("myfile");  
        String fileName = part.getSubmittedFileName();  
        // 得到文件存放的路径  
        String realPath = req.getServletContext().getRealPath("/");  
        // 上传文件到指定目录  
        part.write(realPath + "/" +fileName);  
    }  
}
~~~

>下载：
~~~html
<body>  
<!--  
    超链接(a标签)下载  
    如果浏览器能够识别，会显示内容，如果浏览器不能识别就下载  
    download属性  
-->  
  
<a href="">文本文件</a>  
<a href="">图片文件</a>  
<a href="">压缩文件</a>  
<a href="" download>文本文件</a>  
<a href="" download="百度.png">图片文件</a>  
  
    <form>  
        文件名：<input type="text" name="fileName" placeholder="请输入要下载的文件名">  
        <button>下载</button>  
    </form>  
</body>
~~~

~~~java
protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
    System.out.println("文件下载。。。");  
    // 设置请求的编码格式  
    req.setCharacterEncoding("UTF-8");  
    // 获取参数（得到要下载的文件名）  
    String fileName = req.getParameter("fileName");  
    // 参数的非空判断 trim():去除字符串的前后空格  
    if (fileName == null || "".equals(fileName.trim())) {  
        resp.getWriter().write("请输入要下载的文件名");  
        resp.getWriter().close();  
        return;  
    }  
    // 得到图片存放的路径  
    String realPath = req.getServletContext().getRealPath("");  
    // 通过路径得到file对象  
    File file = new File(realPath + fileName);  
    // 判断文件对象是否存在并且是一个标准文件  
    if (file.exists() && file.isFile()) {  
        // 设置响应类型  
        resp.setContentType("application/x-msdownload");  
        // 设置响应头  
        resp.setHeader("Content-Disposition","attachment;filename=" + fileName);  
        // 得到file文件输入流  
        FileInputStream inputStream = new FileInputStream(file);  
        // 得到字节输出流  
        ServletOutputStream outputStream = resp.getOutputStream();  
        // 定义byte数组  
        byte[] bytes = new byte[1024];  
        // 定义长度  
        int len = 0;  
        // 循环输出  
        while ((len = inputStream.read(bytes)) != -1) {  
            // 输出  
            outputStream.write(bytes, 0,len);  
        }  
        // 关闭资源  
        outputStream.close();  
        inputStream.close();  
    } else {  
        resp.getWriter().write("文件不存在，请重试！");  
        resp.getWriter().close();  
    }  
  
}
~~~


### Filter
### C/S、B/S
### HttpServletRequest
>用来接受客户端发来的请求信息
>- req对象用于接收客户端浏览器提交的数据，从浏览器端发出请求，取得数据。
>- resp对象将服务器端的数据发送到客户端浏览器。

request作用域
>通过该对象可以在一个请求中传递数据，作用范围：在一次请求中有效，即服务器跳转有效。

~~~java
// 设置域对象内容  
req.setAttribute("name","lee");  
req.setAttribute("age",18);  
ArrayList<String> list = new ArrayList<>();  
list.add("aaa");  
list.add("bbb");  
req.setAttribute("list",list);

// 设置请求跳转  
//        req.getRequestDispatcher("page05").forward(req,resp);  
        req.getRequestDispatcher("index.jsp").forward(req,resp);

// 获取域对象内容  
String name = (String) req.getAttribute("name");  
System.out.println("name:" + name);  
Integer age = (Integer) req.getAttribute("age");  
System.out.println("age:" + age);  
List<String> list = (List<String>) req.getAttribute("list");  
System.out.println(list.get(0));
~~~


### HttpServletResponse
web服务器收到客户端请求后，分别创建一个request和一个response。
request用于获取客户端数据
response用于向客户端输出数据
~~~java
	// 同时设置客户端和服务端的编码格式，解决中文乱码问题  
    resp.setContentType("text/html;charset=UTF-8");  
	// 字符输出流  
//        PrintWriter writer = resp.getWriter();  
//        writer.write("Hello");  

	// 字节输出流  
	ServletOutputStream outputStream = resp.getOutputStream();  
	outputStream.write("Hi".getBytes());
~~~
注：getWriter()和getOutputStream()不能同时用

##### 重定向
客户端的行为
客户端发出一个请求，服务器响应的同时，又给了客户端一个新地址，然后客户端又立刻对新地址发起第二个请求，服务器接收响应。重定向完成。
可跨域
地址栏会变化
数据不共享
~~~java
resp.sendReirect();
~~~

##### 转发
服务端的行为
地址栏不发生变化
一次请求，数据在request域中共享
~~~java
req.getRequestDispatcher().forward(req,resp);
~~~

##### Ajax
Async javascript and xml
现在已经用json代替xml

### ServletContext对象
>又称Application对象，每个web应用有且只有一个ServletContext对象。
>作用：
>1、作为域对象来共享数据
>2、该对象保存了当前应用程序的相关信息

