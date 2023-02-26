---
title: MyBatis
---
## 1. 什么是MyBatis?
  Mybatis是的持久层框架，它对JDBC操作数据库的过程进行封装，使开发者只需要关注sql本身
## 2、`#{}`和`${}`的区别是什么？应用场景?
  `#{}` ： 根据参数的类型进行处理，#{} 传参在进行SQL预编译时，防止 SQL注入。
  `${}` ： 将参数取出不做任何处理，直接放入语句中。
  mybatis 中优先使用 #{}；当需要动态传入 表名或列名时，再考虑使用 ${} 。
## 3. 在mapper中如何传递多个参数，都有哪几种
  1. `#{param1}`
  2. @Param("pageIndex") Integer pageIndex
  3. JavaBean
  4. Map
## 4. 说出MyBatis动态标签（至少5个）
  - if
  - choose
  - where
  - forEach
  - trim
## 5. parameterType和resultType的区别
  - resultType：主要针对于从数据库中提取相应的数据出来。
  - parameterType：主要针对于将信息存入到数据库中，如：insert 增加数据到数据库，update更新数据等
## 6. 在用MyBatis插入时，如何得到数据库自增的主键值？
  1. useGeneratedKeys：使用主键回填，默认false
  2. last_insert_id：最后一条记录的id值
## 7. MyBatis批量删除/添加时，代码实现
  在 Mapper 接口中传入 list 集合，在 mapper.xml 的 `<delete>/<insert>` 标签中使用
  `<foreach>` 遍历 list 集合，循环多次删除数据，其实就是在` delete / insert `标签中加上foreach 标签
## 8.MyBatis动态SQL执行流程和原理
  1. 读取MyBatis的配置文件
  2. 加载SQL映射文件
  3. 构造SqlSessionFactory会话工厂
  4. 创建SqlSession会话对象
  5. Executor执行器
  6. 创建MappedStatement对象
  7. 输入参数映射
  8. 输出结果映射
  原理:根据表达式的值 完成逻辑判断并动态拼接 sql 的功能。
## 9. JDBC和Mybatis性能效率哪个块？为什么
  JDBC快，因为 mybatis 需要去映射，而映射是在内存完成的，所以效率比 jdbc 慢。
## 10. MyBatis框架中用到了哪些设计模式？（3个）
	- 单例模式：例如 ErrorContext 和 LogFactory。
	- 工厂模式：例如 SqlSessionFactory、ObjectFactory。
	- 代理模式：Mybatis 实现的核心，例如 MapperProxy、ConnectionLogger。
	- Builder 模式 ：例如 SqlSessionFactoryBuilder、XMLConfigBuilder。

## 11. MyBatis 一级缓存和二级缓存的区别?
  - 一级缓存：每一个SqlSession对象单独分配内存，多个SqlSession内存不共享，该缓存无需手动开启，直接使用
  - 二级缓存：mybatis默认不开启，需要手动开启，它是mapper级别的缓存；同一个namespace下的所有操作语句，都影响着同一个Cache，即 二级缓存被多个SqlSession共享，是一个全局的变量。

## 12.Mybatis 动态 sql 有什么用？执行原理？有哪些动态 sql？
Mybatis 动态 sql 可以在 Xml 映射文件内，以标签的形式编写动态 sql，执行原理
是根据表达式的值 完成逻辑判断并动态拼接 sql 的功能。
Mybatis 提供了 9 种动态 sql 标签：trim | where | set | foreach | if | choose
| when | otherwise | bind。

## 13.MyBatis动态代理的原理？
调用的是JDK的动态代理，JDK的动态代理是基于接口的。
用户只需要创建Mapper接口，并使用Mapper接口即可。

Mybatis会对Mapper接口产生动态代理对象，这个动态代理对象实现了Mapper接口，拥有Mapper中定义的所有方法，并对这些方法进行了增强。增强的逻辑是获得sql语句和执行sql语句。
Mybatis为我们做了什么：

- 让方法和sql语句对应起来，操作数据库就如同调用方法一般简单

- 屏蔽掉JDBC的细节

>Java中提供的动态代理方式有两种：JDK自带的动态代理和CGLib实现的代理。
JDK自带的代理方式是需要实现invocationHandler接口，并且实现invoke的方法来进行的。因为 JDK 动态代理生成的代理类，会继承 Proxy 类，由于 Java 无法多继承，所以无法对类进行代理。

>CGLib代理方式提供了一种可扩展机制来控制被代理对象的访问操作，就是对对象的访问做了一层封装。这种方式则采用的是横切的逻辑。而Spring AOP（横向切面）的技术就是使用的这种动态代理模式。CGLib的使用需要引入第三方库。

Mybatis Mapper 接口没有实现类，怎么实现的动态代理？

Mybatis 会通过 Class#forname 得到 Mapper 接口 Class 对象，生成对应的动态代理对象，核心业务处理都会在 InvocationHandler#invoke 进行处理

>Mybatis 代理工厂中具体生成动态代理类具体逻辑:
根据 .xml 上关联的 namespace, 通过 Class#forName 反射的方式返回 Class 对象（不止 .xml namespace 一种方式）
将得到的 Class 对象（实际就是接口对象）传递给 Mybatis 代理工厂生成代理对象，也就是刚才 mapperInterface 属性。
Mybatis 使用接口全限定名通过 Class#forName 生成 Class 对象，这个 Class 对象类型就是接口。

动态代理过程
SqlSession.getMapper() --> MapperRegistry.getMapper() --> MapperProxyFactory.newInstance() --> Proxy.newProxyInstance()

反射过程
MapperProxy.invoke() --> MapperMethod.execute()