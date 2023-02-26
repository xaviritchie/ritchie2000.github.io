---
lang: zh-CN
title: Lambda表达式
description: sup 07
---


### Lambda表达式

- 也称闭包closure
- 允许把函数作为一个方法的参数，使代码变的更加简洁紧凑
- 代替以前经常写的匿名内部类来实现接口，本质是一个匿名函数
- 操作符->
- 表达式 （）-> {}
```Java
(a,b)->{return a+b;}
或者
(a,b)-> a+b;
```

左侧的括号: 函数式接口里面定义的抽象方法的形参列表
箭头: Lambda表达式的操作符,看见这个箭头,就可以认为他是一个Lambda表达式
右侧Lambda体: 函数式接口中,我们实现了函数式接口抽象方法的方法体


‍

## 接口增强

#### 默认方法，静态方法，函数式接口（supplier，consumer，function，predicate）



#### 默认方法default

@FunctionalInterface
public interface XXX {
//默认方法
default int testDefaultMethod(int a,int b){
return a+b;
}
}

‍

#### 静态方法语法static

@FunctionalInterface
public interface XXX {
//静态方法
static int testStaticMethod(int a,int b){
return a+b;
}
}

‍

#### 函数式接口

- 首先的是一个接口

- 接口内有且只有一个抽象方法

- 为防止破坏函数式接口，最好是在接口上使用

- @FunctionalInterface注解修饰

#### 供给型函数接口supplier



#### 消费型函数接口consumer



#### 常见函数式接口

- java.util.function包下函数式接口

  - java.lang.Runnable

- 其他包常见的函数式接口

  - BiConsumer<T,U>代表了一个接受两个输入参数的操作,并且不返回任何结果

  - BiFunction<T,U,R>代表了一个接受两个输入参数的方法，并且返回一个结果


  

# 方法引用：：

操作符：：

对于右侧的Lambda体,仅仅只是调用一个已经存在的方法,可以使用*方法引用*的方式调用这个已经存在的方法。

- 类静态方法引用

- 实例方法引用

- 类普实例方法引用

- 构造方法引用