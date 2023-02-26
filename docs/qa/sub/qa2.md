---
lang: zh-CN
title: 随记02
description: qa2
---


### Serializable接口

序列化：把对象的状态信息转化为可存储或传输的形式过程，对象 --> 字节序列

反序列化：把字节数组反序列化为对象，字节序列 --> 对象

**作用：**

1，存储对象在存储介质中，以便在下次使用的时候，可以很快捷的重建一个副本。

2，便于数据传输，尤其是在远程调用的时候

Serializable接口其实是个空接口，在Java IO体系中仅起一个标记的作用。没有实现Serializable接口的对象是无法通过IO操作持久化 。

**常见的序列化技术：**

1、java 序列化

2、XML序列化

3、JSON序列化

4、Hessian 序列化框架协议

阿里巴巴服务层框架Dubbo采用的就是Hessian序列化

‍

**为什么重写equals方法，还必须要重写hashcode方法**

- hashCode主要用于提升查询效率，来确定在散列结构中对象的存储地址；

- equals()相等的两个对象，hashcode()一定相等；

- hashcode()相等，equals()不一定相等



Stiring s = “a”+“b” +“c” 在JDK1.7之前创建了5个对象。
Stiring s = “a”+“b” +“c” 在JDK1.7及之后创建了1个对象。






