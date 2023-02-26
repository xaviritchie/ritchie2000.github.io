

SSM 是 Spring + SpringMVC + Mybatis集成的框架。

一、entity层
同类： model层 ~ entity层 ~ domain层
作用： 用于存放我们的实体类，与数据库中的属性值基本保持一致。

二、mapper层
同类： mapper层 ~ dao层
作用： 对数据库进行数据持久化操作，他的方法语句是直接针对数据库操作的

三、service层
同类： 只有一个 service层
作用： service层 是针对 controller层的 controller，也就是针对我们使用者。service的 impl 是把mapper和service进行整合的文件。

四、controller层
同类： controller层 ~ web 层
作用： 控制器，导入service层，因为service中的方法是我们使用到的，controller通过接收前端传过来的参数进行业务操作，再将处理结果返回到前端。



SSH是2016年以前比较流行的Web应用程序开源技术， Spring + Struts + Hibernate的集成框架。
其中使用Struts作为系统的整体基础架构，负责MVC的分离，在Struts框架的模型部分，控制业务跳转，
利用Hibernate框架对持久层提供支持，
Spring做管理，管理struts和hibernate。