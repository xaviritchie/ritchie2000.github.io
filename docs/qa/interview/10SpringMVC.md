---
title: Spring MVC
---
## 1.SpringMVC中的Bean是线程安全的吗？说出你的解决方案？
  - Spring容器中的Bean本身不具备线程安全的特性，Spring的Bean作用域（Scope）类型默认是单例的，所有线程都共享一个单例实例Bean，因此是存在资源的竞争
  - 解决方案：将bean的作用域定义为原型(prototype)

## 2.SpringMVC的执行流程？
  1. 浏览器发送请求
  2. 前端控制器：接收请求转给映射处理器
  3. 映射处理器：返回调用链到前端控制器
  4. 前端控制器-->适配器
  5. 适配器-->业务控制器
  6. 适配器-->返回给前端控制器
  7. 前端控制器-->视图解析器
  8. 视图解析器-->jsp
  9. jsp-->发送响应给浏览器
  ![image](https://img2023.cnblogs.com/blog/2968215/202212/2968215-20221221092000362-295611363.png)

  
## 3.@RequestMapping注解作用？
  - 将请求和处理请求的控制器方法关联起来，建立映射关系

## 4.@RequestBody 和@ResponseBody的区别？
  - @RequestBody：作用在形参列表上，用于将前台发送过来固定格式的数据【xml 格式或者 json等】封装为对应的 JavaBean 对象，封装时使用到的一个对象是系统默认配置的 HttpMessageConverter进行解析，然后封装到形参上
  - @ResponseBody：该方法的返回结果直接写入 HTTP response body 中，一般在异步获取数据时使用

## 5.@RequestParam和@PathViriable的区别？
  - 用法上的不同，PathVariable只能用于接收url路径上的参数，而RequestParam只能接收请求带 params 的 
  - 内部参数不同，PathVariable有value，name，required这三个参数，而RequestParam除此之外还多一个参数defaultValue 
  - PathVariable一般用于get和delete请求，RequestParam一般用于post请求。

## 6.@Resource、@Autowired、@Qualifier的区别？
  - @Autowired 根据类型注入byType 
  - @Resource 默认根据名字注入byName，其次按照类型搜索 
  - @Autowired @Qualifier("userService") 两个结合起来可以根据名字和类型注入
  - 一般@Resource单独用，@Autowired和@Qualifier一起用，当然没有冲突的话@Autowired也可以单独用。

## 7.@Controller, @Service, @Repository,@Component作用？
  - @Controller用于标注控制层，负责注册一个Bean到Spring上下文中
  - @Service用于标注服务层，主要用来进行业务的逻辑处理，是类级别的注解，用于声明Service类
  - @Repository用于标注数据访问层，也可以说用于标注数据访问组件，即DAO组件
  - @Component注解也就是“Controller注解”、“Service注解”和“Repository注解”的通用注解，可以和它们起到相同的作用

## 8.@Transactional注解作用？
  - @Transactional注解可以作用于接口、接口方法、类以及类方法上 
  - 当作用于类上时，该类的所有public方法将都具有该类型的事务属性 
  - 当作用在方法级别时会覆盖类级别的定义 
  - 当作用在接口和接口方法时则只有在使用基于接口的代理时它才会生效，也就是JDK动态代理，而不是Cglib代理 
  - 当在protected、private或者默认可见性的方法上使用 @Transactional 注解时是不会生效的，也不会抛出任何异常

## 9.@Configuration注解作用？
  - 告诉Spring这是一个配置类，相当于Spring的xml配置文件 
  - 被@Configuration注解的类，会被cglib代理进行增强 
  - @Configuration类允许通过调用同一类中的其他@Bean方法来定义Bean之间的依赖关系，保证@Bean的对象作用域受到控制，避免多例

## 10.AOP的常用注解？
  - @Aspect：把当前类声明为切面类
  - @Before：把当前方法看成是前置通知
  - @AfterReturning：把当前方法看成是后置通知
  - @AfterThrowing：把当前方法看成是异常通知
  - @After：把当前方法看成是始终通知
  - @Around：把当前方法看成是环绕通知
  - @Pointcut：指定切入点表达式

## 11.描述@ControllerAdvice@ExceptionHandler注解作用？
  - ExceptionHandler, 方法注解, 作用于Controller级别，为一个Controler定义一个异常处理器
  - ControllerAdvice, 类注解, 作用于整个Spring工程，定义了一个全局的异常处理器
