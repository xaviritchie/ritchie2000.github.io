---
title: JVM
---
**JVM**，全称Java Virtual Machine（Java虚拟机）

## JVM的组成：
1. 类加载器（ClassLoader）

2. 运行时数据区（Runtime Data Area）

3. 执行引擎（Execution Engine）

4. 本地库接口（Native Interface）

## 4个主要组成部分的职责和功能：
程序在执行前需要先把java代码转换成字节码，也是就.class文件，jvm首先通过`类加载器` 把字节码加载到内存中的`运行时数据区` ，由于字节码时jvm的一套指令集规范，并不能直接交给底层操作系统执行，因此需要特定的命令解析器：`执行引擎` 把字节码翻译成底层系统指令，再交由CPU执行。而这个过程中又会调用其他语言的接口`本地库接口` 来实现整个程序的功能。

我们通常说的jvm主要是指的是`运行时数据区` ，这个区域可以由程序员调式分析。

## 运行时数据区的组成：

1、程序计数器(Program Counter Register)

存放当前线程执行到的字节码的行号。

2、虚拟机栈(VM Stacks)

Java方法执行和调用的内存模型，存储Java方法执行的相关数据。

3、本地方法栈(Native Method Stacks)

本地方法栈则是为虚拟机使用到的Native 方法(C/C++语言)服务

4、Java堆(Java Heap)

用来存放对象实例，几乎所有的对象实例都在这里分配内存

5、方法区(Method Area)

用于存放已被加载的类信息(名称、修饰符、类中的Field信息、类中的方法信息等)、常量池(类中定义为final类型)、静态变量(类中定义的static类型)、即时编译器编译后的代码等数据。



