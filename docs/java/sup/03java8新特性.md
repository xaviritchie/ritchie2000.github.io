---
lang: zh-CN
title: java8新特性
description: sup 03
---

[Java8 新特性](https://www.oracle.com/java/technologies/javase/8-whats-new.html)

Java8 新增了非常多的特性，我们主要讨论以下几个：

Lambda 表达式 − Lambda 允许把函数作为一个方法的参数（函数作为参数传递到方法中）。

方法引用 − 方法引用提供了非常有用的语法，可以直接引用已有Java类或对象（实例）的方法或构造器。与lambda联合使用，方法引用可以使语言的构造更紧凑简洁，减少冗余代码。

默认方法 − 默认方法就是一个在接口里面有了一个实现的方法。

新工具 − 新的编译工具，如：Nashorn引擎 jjs、 类依赖分析器jdeps。

Stream API −新添加的Stream API（java.util.stream） 把真正的函数式编程风格引入到Java中。

Date Time API − 加强对日期与时间的处理。

Optional 类 − Optional 类已经成为 Java 8 类库的一部分，用来解决空指针异常。

Nashorn, JavaScript 引擎 − Java 8提供了一个新的Nashorn javascript引擎，它允许我们在JVM上运行特定的javascript应用。


## Stream

Java8新加入的API,主要用于一组数据的操作，它的处理方式与传统的方式不同,称为**"数据流处理"**，关注的是对数据的筛选、查找、存储等。
就是将集合/数组/文件/函数等数据转换成流之后再处理(比如对集合数据进行过滤,排序等操作)
Stream并不是数据结构所以不能保存数据,主要目的在于计算。

Stream实例化**中间操作**（过滤、排序、映射、规约）**终止操作**（匹配查找、归约、收集）