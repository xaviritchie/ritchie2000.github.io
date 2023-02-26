---
lang: zh-CN
title: JSON
description: web 04
---

### JSON是什么？
JSON（JavaScript Object Notation, JS对象简谱）是一种轻量级的数据交换格式。  
JSON 是存储和交换文本信息的语法，类似 XML。  
JSON 比 XML 更小、更快，更易解析。  
JSON 易于人阅读和编写。  
C、Python、C++、Java、PHP、Go等编程语言都支持 JSON。  

作用：用于存储和交换文本信息  
数据使用键值对进行存储  
"name": "张三",  

### 语法

```
1. 数据在名称/值对中
2. 数据由逗号 , 分隔
3. 使用斜杆 \ 来转义字符
4. 大括号 {} 保存对象 例如:{"uid":10,"uname":"张三"} 
5. 中括号 [] 保存数组，数组可以包含多个对象 例如:[{"uid":10,"uname":"张三"},{"uid":11,"uname":"李四"} ]
6. 对象嵌套数组  或者是数组嵌套对象
   A.对象中嵌套数组
       {"employees": [{ "firstName":"Bill" , "lastName":"Gates" }]}
   B.数组中嵌套对象
       [{date: "Sep 18 2016", music: { title: "夜夜夜夜-齐秦"}}]
7.注意点:
    A.json是以键值对来进行存储
    B.json中每一个属性与属性值都是以冒号分割
    C.json中每一个组属性值都是以逗号分割
8.参考网站:https://www.sojson.com/json2entity.html
```



### JSON 与 XML
>相同之处：  
JSON 和 XML 数据都是 "自我描述" ，都易于理解。  
JSON 和 XML 数据都是有层次的结构  
JSON 和 XML 数据可以被大多数编程语言使用  
 
>不同之处：  
JSON 不需要结束标签  
JSON 更加简短  
JSON 读写速度更快  
JSON 可以使用数组  
XML 需要使用 XML 解析器来解析，JSON 可以使用标准的 JavaScript 函数来解析。  

##### JSON.parse(): 将一个 JSON 字符串转换为 JavaScript 对象。
>JSON 通常用于与服务端交换数据。  
在接收服务器数据时一般是字符串。  
我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象。  


##### JSON.stringify(): 将 JavaScript 值转换为 JSON 字符串。 
>JSON 通常用于与服务端交换数据。  
在向服务器发送数据时一般是字符串。  
我们可以使用 JSON.stringify() 方法将 JavaScript 对象转换为字符串。


### fastJson解析

|                     方法名称                     |         方法描述         |
| :----------------------------------------------: | :----------------------: |
| JSON.parseObject("json","需要转换的类class对象") |    将json串转换为对象    |
| JSON.parseArray("json","需要转换的类class对象")  |     将json转换为集合     |
|        JSON.toJSONString("集合或者对象")         | 将集合与对象转换为json串 |

### gson 解析

|   方法名称   |           方法描述           |
| :----------: | :--------------------------: |
| g.fromJson() |  将json转换为集合或者是对象  |
|  g.toJson()  | 将对象或者是集合转换为json串 |

