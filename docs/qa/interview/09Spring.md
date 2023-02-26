---
title: Spring
---
## 1、详细描述什么是Spring? 
  - Spring是轻量级的，面向切面编程（AOP）和控制反转（IoC)的容器框架，主要负责技术的整合；
  - 它是一个容器，框架的框架，管理业务逻辑层；
  - 优点：
    1. 可以降低组件之间的耦合度，方便解耦，简化开发；
    2. 便于系统组件的维护，扩展和替换，方便集成各种优秀框架；
    3. 利用Spring容器管理Controller、Service、Dao组件；
    4. 利用IoC特性降低Service和Dao之间的关联；
    5. 利用AOP进行事务等共通部分的处理；
    6. 使用Spring框架来创建性能好、易于测试、可重用的代码。

## 2、什么是Spring IoC？
  - Inversion of Control控制反转，也可以称为依赖倒置，是一种设计思想，将设计好的对象交给容器控制
  - 控制：对象的创建、初始化、销毁和对象之间关系的指定
  - 反转：由Spring容器进行对象创建和依赖注入，将控制的逻辑交给第三方框架或者容器负责，当两个组件之间的关系发生改变时，只需要修改框架或者容器的配置
  - 正转：由程序员进行对象创建和依赖注入
  
  - 组件：具有功能的类
  - 资源：被创建的对象

## 3、什么是Spring AOP?描述其应用场景
  - OOP（Object-Oriented Programing，面向对象编程），引入封装、继承和多态性等概念来建立一种对象层次结构，用以模拟公共行为的一个集合；
  - AOP（Aspect-Oriented Programming，面向切面编程），以OOP为基础，主要关注的是Aspect方面，方面组件主要用来封装通用的逻辑，可以以低耦合的方式切入到某一批目标对象中；
  - “将应用程序中的商业逻辑同对其提供支持的通用服务进行分离”

  - 实现AOP的技术，主要分为两大类：一是采用动态代理技术；二是采用静态织入Weaving的方式，引入特定的语法创建Aspect“方面”。
  - 应用场景：
    - Authentication 权限
    - Caching 缓存
    - Context passing 内容传递
    - Error handling 错误处理 
    - Lazy loading 懒加载 
    - Debugging 调试 
    - logging, tracing, profiling and monitoring 记录跟踪 优化 校准 
    - Performance optimization 性能优化 
    - Persistence 持久化 
    - Resource pooling 资源池 
    - Synchronization 同步 
    - Transactions 事务

## 4、AOP的通知有几个，分别是什么？
  - 前置通知（Before）：方面组件在目标组件之前执行 
  - 后置通知（After）：方面组件在目标组件之后执行，目标组件方法没有抛出异常才会执行方面组件 
  - 最终通知（After-returning ）：方面组件在目标组件之后执行，目标组件不管是否发生异常都会执行 方面组件 
  - 异常通知（After-throwing）：方面组件在目标组件抛出异常之后执行 
  - 环绕通知（Around）：方面组件在目标组件之前和之后执行

## 5、描述Spring Bean的作用域？
  Spring框架支持以下五种bean的作用域： 
  - singleton : 在spring IoC容器仅存在一个Bean实例，Bean以单例方式存在，bean作用域范围的默认值；
  - prototype：每次从容器中调用Bean时，都返回一个新的实例，即每次调用getBean()时，相当于执行 newXxxBean()。以下作用域仅在基于web的Spring ApplicationContext情形下有效； 
  - request：每次HTTP请求都会创建一个新的Bean，该作用域仅适用于web的Spring WebApplicationContext环境；
  - session：同一个HTTP Session共享一个Bean，不同Session使用不同的Bean。该作用域仅适用于web 的Spring WebApplicationContext环境；
  - application：限定一个Bean的作用域为`ServletContext`的生命周期。该作用域仅适用于web的 Spring WebApplicationContext环境。

## 6、Spring Bean注入有几种方式？
  - setter注入:单例、多例
  - 构造方法注入
  - 自动装配

## 7、SpringBean 生命周期？
  - Spring Bean的生命周期指的是从一个普通的Java类变成Bean的过程
  - Spring Bean的生命周期分为四个阶段和多个扩展点。扩展点又可以分为影响多个Bean和影响单个Bean。
    - 四个阶段
      - 实例化 Instantiation
      - 属性赋值 Populate
      - 初始化 Initialization
      - 销毁 Destruction
    - 多个扩展点
      - 影响多个Bean
          - BeanPostProcessor 
            postProcessBeforeInitialization
            postProcessAfterInitialization
          - InstantiationAwareBeanPostProcessor
            postProcessBeforeInstantiation
            postProcessAfterInstantiation
            postProcessPropertyValues
          - MergedBeanDefinitionPostProcessor
            postProcessMergedBeanDefinition
          - SmartInstantiationAwareBeanPostProcessor
            determineCandidateConstructors
            getEarlyBeanReference
      - 影响单个Bean
        - Aware
          - Aware Group1（调用invokeInitMethods方法）
            BeanNameAware
            BeanClassLoaderAware
            BeanFactoryAware
          - Aware Group2（调用Aware和BeanPostProcessor#postProcessBeforeInitialization方法）
            EnvironmentAware
            EmbeddedValueResolverAware
ApplicationContextAware(ResourceLoaderAware\ApplicationEventPublisherAware\MessageSourceAware)
        - 生命周期
          InitializingBean
          DisposableBean
  
## 8、Spring框架中用到了哪些设计模式？
  - 工厂设计模式 : Spring使用工厂模式通过 `BeanFactory`、`ApplicationContext` 创建bean对象；
  - 代理设计模式 : Spring AOP 功能的实现；
  - 单例设计模式 : Spring 中的 Bean 默认都是单例的；
  - 模板方法模式 : Spring 中 `jdbcTemplate`、`hibernateTemplate` 等以 Template 结尾的对 数据库操作的类，它们就使用到了模板模式； 
  - 包装器设计模式 : 我们的项目需要连接多个数据库，而且不同的客户在每次访问中根据需要会去访问不同 的数据库。这种模式让我们可以根据客户的需求能够动态切换不同的数据源； 
  - 观察者模式: Spring 事件驱动模型就是观察者模式很经典的一个应用；
  - 适配器模式：Spring AOP 的增强或通知(Advice)使用到了适配器模式、Spring MVC 中也是用到了 适配器模式适配`Controller`。

## 9、描述Spring 7种事务传播行为？
  - PROPAGATION_`REQUIRED`(常用)：如果存在一个事务，则支持当前事务。如果没有事务则开启一个新的事务；
  - PROPAGATION_`SUPPORTS`：如果存在一个事务，支持当前事务。如果没有事务，就以非事务方式执行；
  - PROPAGATION_`MANDATORY`：强制的 使用当前的事务，如果当前没有事务，就抛出异常；
  - PROPAGATION_`REQUIRES_NEW`：需要使用 JtaTransactionManager作为事务管理器。它会开启一个新的事务。如果一个事务已经存在，则先将这个存在的事务挂起；
  - PROPAGATION_`NOT_SUPPORTED`：总是以非事务方式执行，并挂起任何存在的事务。也需要使用JtaTransactionManager作为事务管理器；
  - PROPAGATION_`NEVER`：总是以非事务方式执行，如果存在一个活动事务，则抛出异常；
  - PROPAGATION_`NESTED`：如果一个活动的事务存在，则运行在一个嵌套的事务中。如果没有活动事务, 则按TransactionDefinition.PROPAGATION_`REQUIRED`属性执行。
  
## 11、Spring事务传播行为 `REQUIRED`和`REQUIRES_NEW`区别？
  - 事务的默认传播属性是`REQUIRED`方式；
  - `REQUIRED`的事务，既受外层调用者影响，也会影响外层的事务；
  - `REQUIRES_NEW`外面的事务对其不影响，不管外层是否提交回滚，它里面的内容会根据自己的执行情况，该提交就提交，该回滚就回滚；
  - `REQUIRES_NEW`拥有自己的隔离范围，自己的锁等，适合用某个业务对象所做的事情不想影响到外层事务的情况。 

## 12、PROPAGATION_`NESTED`与PROPAGATION_`REQUIRES_NEW`的区别？
  - 它们非常类似，都像一个嵌套事务，如果不存在一个活动的事务，都会开启一个新的事务；
  - 但PROPAGATION_`REQUIRES_NEW`完全是一个新的事务, 而PROPAGATION_`NESTED`则是外部事务的子事务, 如果外部事务commit,嵌套事务也会被commit；
  - 使用PROPAGATION_`NESTED`时，外层事务的回滚可以引起内层事务的回滚。而内层事务的异常并不会导致外层事务的回滚，它是一个真正的嵌套事务；
  - 使用PROPAGATION_`REQUIRES_NEW`时，内层事务与外层事务就像两个独立的事务一样，一旦内层事务进行了提交后，外层事务不能对其进行回滚。两个事务互不影响。两个事务不是一个真正的嵌套事务。

## 13、描述Spring事务的隔离级别？
  - int ISOLATION_DEFAULT = -1; 使用数据库默认的隔离级别 
  - int ISOLATION_READ_UNCOMMITTED = 1;读未提交，A事务可以读到B事务未提交的数据 
  - int ISOLATION_READ_COMMITTED = 2;读提交,A事务可以读到B事务已提交的数据 
  - int ISOLATION_REPEATABLE_READ = 4;可重复读，A事务读不到B事务已提交的数据 
  - int ISOLATION_SERIALIZABLE = 8;串行化
  
## 14、Spring循环依赖？
  - 要明白Spring中的循环依赖，得先明白Spring中Bean的生命周期
  - Spring Framework体系，Spring中的Bean由BeanDefinition（建模的类）构建
  - Bean复杂的生命周期：Spring容器启动--扫描--BeanDefinition--存入BeanDefinition Map中--遍历--验证--创建Bean--推断最佳构造方法--反射实例化Java对象--初始化Bean--是否暴露--创建x对象--属性回填set--回调--（完成代理--发布事件）
  - 如果直接缓存x，那么拿到的就是x，很难扩展；因此我们不直接暴露x，而是暴露ObjectFactory，就能拿到我们想要的x
  - 循环依赖是支持setter单例注入、非构造方法注入

    eg.x找y，y找x，死循环
    解决循环依赖：三个Map/三级缓存
    一级缓存：用于存放完全初始化好的bean；>?缺点：无法存放半成品对象
    二级缓存：存放原始的bean对象（尚未填充属性），用于解决循环依赖；>?问题：Spring的AOP机制代理对象
    三级缓存：存放bean工厂对象，用于解决循环依赖（针对动态代理对象）。
  

## 15、Spring是如何解决循环依赖的？
循环依赖就是A依赖B，B又依赖A，两者之间的依赖关系形成了一个圆环，通常是由于不正确的编码所导致。Spring只能解决属性循环依赖问题，不能解决构造函数循环依赖问题，因为这个问题无解。

Spring解决循环依赖的关键就是在处理Bean的属性依赖时，**先将Bean存到三级缓存中，当存在循环依赖时，从三级缓存中获取到相关Bean**，然后从三级缓存中移除，存入到二级缓存中。

第三级缓存的作用：

通过ObjectFactory对象来存储单例模式下提前暴露的Bean实例的引用（正在创建中）。该缓存是对内使用的，指的就是Spring框架内部逻辑使用该缓存。此缓存是解决循环依赖最大的功臣。
