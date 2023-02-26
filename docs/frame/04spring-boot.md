---
lang: zh-CN
title: Spring Boot
description: 学习Spring Boot
---

### 介绍
Spring Boot是一个构建在Spring框架顶部的项目。它提供了一种简便，快捷的方式来设置，配置和运行基于Web的简单应用程序。

它是一个Spring模块，提供了 RAD(快速应用程序开发)功能。它用于创建独立的基于Spring的应用程序，因为它需要最少的Spring配置，因此可以运行。

SpringBoot是由Pivotal团队研发的，SpringBoot并不是一门新技术，只是将之前常用的Spring，SpringMVC，data-jpa等常用的框架封装到了一起，帮助你隐藏这些框架的整合细节，实现敏捷开发。

SpringBoot就是一个工具集。

### 特点
Spring Boot 具有以下特点：

1. 独立运行的 Spring 项目
Spring Boot 可以以 jar 包的形式独立运行，Spring Boot 项目只需通过命令“ java–jar xx.jar” 即可运行。
2. 内嵌 Servlet 容器
Spring Boot 使用嵌入式的 Servlet 容器（例如 Tomcat、Jetty 或者 Undertow 等），应用无需打成 WAR 包 。
3. 提供 starter 简化 Maven 配置
Spring Boot 提供了一系列的“starter”项目对象模型（POMS）来简化 Maven 配置。
4. 提供了大量的自动配置
Spring Boot 提供了大量的默认自动配置，来简化项目的开发，开发人员也通过配置文件修改默认配置。
5. 自带应用监控
Spring Boot 可以对正在运行的项目提供监控。
6. 无代码生成和 xml 配置
Spring Boot 不需要任何 xml 配置即可实现 Spring 的所有配置。

### SpringBoot的目录结构

#### pom.xml文件

> - 指定了一个父工程： 指定当前工程为SpringBoot，帮助我们声明了starter依赖的版本。
> - 项目的元数据：包名，项目名，版本号。
> - 指定了properties信息：指定了java的版本为1.8
> - 导入依赖：默认情况导入spring-boot-starter，spring-boot-starter-test
> - 插件：spring-boot-maven-plugin



#### .gitignore文件

> 默认帮我们忽略了一些文件和目录，避免提交到Git仓库中



#### src目录

```json
-src
  -main	  
    -java
      -包名
        启动类.java			# 需要将controller类，放在启动类的子包中或者同级包下
    -resources
      -static				  # 存放静态资源的
      -templates			   # 存储模板页面的
      application.properties	 # SpringBoot提供的唯一的配置文件
  -test   				      # 只是为了测试用的
```



### SpringBoot三种启动方式

#### 运行启动类的main方法

> 运行main方法即可



#### maven命令

```sh
mvn spring-boot:run
```



#### 采用jar包的方式运行

> 将当前项目打包成一个jar文件，并通过java -jar jar文件



### SpringBoot常用注解:sparkles:
#### @Configuration和@Bean

> - 之前使用SSM去开发时，在xml文件中编写bean标签，但是SpringBoot不推荐使用xml文件。
>
> - @Configuration注解相当于beans标签
>
> - @Bean注解相当于bean标签
>  - id=“方法名 | 注解中的name属性（优先级更高）”
>   - class=“方法的返回结果”

```java
@Configuration   // 代表当前类是一个配置类
public class UserConfig {
    
    
    @Bean(name = "user1")       // 构建一个实例，放到spring容器中
    public User user(){
        User user = new User();
        user.setId(1);
        user.setName("张三");
        return user;
    }
    
    /*
    <beans ....>            @Configuration
        <bean id="user1" class="com.qf.firstspringboot.entity.User" />
    </beans>
     */
}
```



#### @SpringBootApplication

> @SpringBootApplication就是一个组合注解：
>
> -  @SpringBootConfiguration就是@Configuration注解，代表启动类就是一个配置类。
> -  @EnableAutoConfiguration帮你实现自动装配的，SpringBoot工程启动时，运行一个SpringFactoriesLoader的类，加载META-INF/spring.factories配置类（已经开启的），通过SpringFactoriesLoader中的load方法，以for循环的方式，一个一个加载。
>    - 好处：无需编写大量的整合配置信息，只需要按照SpringBoot提供好了约定去整合即可。
>    - 坏处：如果说你导入了一个starter依赖，那么你就需要填写他必要的配置信息。
>    - 手动关闭自动装配指定内容：@SpringBootApplication(exclude = QuartzAutoConfiguration.class)
> -  @ComponentScan就相当于<context:component-scan basePackage=“包名” />，帮助扫描注解的。



### SpringBoot常用配置:sparkles:

---

#### SpringBoot的配置文件格式

> SpringBoot的配置文件支持properties和yml，甚至他还支持json。
>
> 更推荐使用yml文件格式：
>
> 1. yml文件，会根据换行和缩进帮助咱们管理配置文件所在位置
>
>   2. yml文件，相比properties更轻量级一些
>
> yml文件的劣势：
>
> 1. 严格遵循换行和缩进
>
>   2. 在填写value时，一定要在: 后面跟上空格



**类型安全的属性注入。**

传统 Spring 中的属性注入有两种：

1. xml

```xml
<context:property-placeholder location="classpath:userinfo.properties"/>
```

2.java

```java
@Component
//@PropertySource 注解的作用等价于 <context:property-placeholder location=""/>
@PropertySource("classpath:book.properties")
public class Book {
    @Value("${book.name}")
    private String name;
    @Value("${book.author}")
    private String author;
```

两种方式都是通过 @Value 注解将值注入到具体的属性上。

这种方式有一个缺陷：属性名千万不能写错。要是属性很多，就容易写错。

Spring Boot 中推出了类型安全的属性注入，这种方式可以自动识别属性名称然后自动注入。

**容器配置**





#### 多环境配置

> 在application.yml文件中添加一个配置项：

```yml
spring:
  profiles:
    active: 环境名
```

> 在resource目录下，创建多个application-环境名.yml文件即可
>
> 在部署工程时，通过 java -jar jar文件 --spring.profiles.active=环境





#### 引入外部配置文件信息

> 和传统的SSM方式一样，通过@Value的注解去获取properties/yml文件中的内容。
>
> 如果在yml文件中需要编写大量的自定义配置，并且具有统一的前缀时，采用如下方式

```java
// Java程序
@ConfigurationProperties(prefix = "aliyun")
@Component
@Data
public class AliyunProperties {

   private String xxxx;
    
   private ... ...;
}

// 配置文件
aliyun:
  xxxx: xxxxxxxxx
  ...
```

```yml

```



#### 热加载

##### 导入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```



##### settings配置
Build,Execution,Deployment -> Complier -> Build project automatically勾选，开启热部署功能

##### 重新构建工程
Build -> Build Module 'xxxx'

### SpringBoot整合Mybatis:sparkles:

----

#### xml方式整合Mybatis

> xml方式在编写复杂SQL时，更适合

##### 导入依赖。

```xml
<!--        mysql驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

<!--        druid连接-->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.10</version>
</dependency>

<!--        mybatis-->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>1.3.2</version>
</dependency>
```



##### 编写配置文件

```java
// 准备实体类
@Data
public class Air  implements Serializable {

	private Integer id;

	private Integer districtId;

	private java.util.Date monitorTime;

	private Integer pm10;

	private Integer pm25;

	private String monitoringStation;

	private java.util.Date lastModifyTime;

}
// ================================================
@Data
public class District  implements Serializable {

	private Integer id;

	private String name;

}
```



##### 准备Mybatis

```java
// 1. 接口
public interface AirMapper {

    List<Air> findAll();

}

// 2. 在启动类中添加直接，扫描Mapper接口所在的包
@MapperScan(basePackages = "com.qf.firstspringboot.mapper")

// 3. 准备映射文件
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.qf.firstspringboot.mapper.AirMapper">

<!--    List<Air> findAll();-->
    <select id="findAll" resultType="Air">
        select * from air
    </select>

</mapper>


//4. yml文件
<!-- 添加yml文件配置信息 -->
# mybatis配置
mybatis:
  # 扫描映射文件
  mapper-locations: classpath:mapper/*.xml
  # 配置别名扫描的包
  type-aliases-package: com.qf.firstspringboot.entity
  configuration:
    # 开启驼峰映射配置
    map-underscore-to-camel-case: true
# 连接数据库的信息
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql:///air?serverTimezone=UTC
    username: root
    password: root
    type: com.alibaba.druid.pool.DruidDataSource    
```





##### 测试

```java
class AirMapperTest extends FirstSpringbootApplicationTests {

    @Autowired
    private AirMapper airMapper;

    @Test
    void findAll() {
        List<Air> list = airMapper.findAll();
        for (Air air : list) {
            System.out.println(air);
        }
    }
}
```



#### 注解方式整合Mybatis

> 注解方式在编写配置简单，简单SQL推荐使用

##### 创建District的Mapper接口

```java
public interface DistrictMapper {
    
    List<District> findAll();
}
```



##### 添加Mybatis注解

> 针对增删改查：@Insert，@Delete，@Update，@Select
>
> 还是需要在启动类中添加@MapperScan注解

```java
@Select("select * from district")
List<District> findAll();


@Select("select * from district where id = #{id}")
District findOneById(@Param("id") Integer id);
```



##### 添加配置

```yml
// yml文件
logging:
  level:
    com.qf.firstspringboot.mapper: DEBUG
```



##### 测试，查看日志

```java
class DistrictMapperTest extends FirstSpringbootApplicationTests {

    @Autowired
    private DistrictMapper mapper;

    @Test
    void findAll() {
        List<District> list = mapper.findAll();
        for (District district : list) {
            System.out.println(district);
        }
    }

    @Test
    void findOneById() {
        District district = mapper.findOneById(5);
        System.out.println(district);
    }
}
```



#### SpringBoot整合分页助手

##### 导入依赖

```xml
<!--        pageHelper依赖-->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.2.5</version>
</dependency>
```



##### 测试使用

```java
@Test
public void findByPage(){
    //1. 执行分页
    PageHelper.startPage(1,5);

    //2. 执行查询
    List<Air> list = airMapper.findAll();

    //3. 封装PageInfo对象
    PageInfo<Air> pageInfo = new PageInfo<>(list);

    //4. 输出
    for (Air air : pageInfo.getList()) {
        System.out.println(air);
    }
}
```



### SpringBoot整合JSP

----

jsp、freemarker、thymeleaf

#### 需要导入依赖

```xml
<!--        JSP核心引擎依赖-->
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-jasper</artifactId>
</dependency>
<!--        JSTL-->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
</dependency>
```



#### 创建JSP页面

创建webapp --> WEB-INF --> index.jsp去存放JSP页面


#### 创建Contorller

```java
// Controller
@Controller
public class JspController {

    @GetMapping("/index")
    public String index(Model model){
        model.addAttribute("name","张三");
        return "index";
    }
}
```



#### 配置前缀和后缀

```yml
spring:
  mvc:
    # 视图的前缀和后缀
    view:
      prefix: /WEB-INF/
      suffix: .jsp
```


### 静态资源

Spring Boot 中默认提供了五个静态资源存储路径：

- classpath:/META-INF/resources/
- classpath:/resources/
- classpath:/static/
- classpath:/public/
- /（webapp）

五个位置，优先级依次降低。

如果需要自定义静态资源位置，有两种方式：

1. application.properties 中进行配置

   ```properties
   spring.mvc.static-path-pattern=/static/**
   spring.web.resources.static-locations=classpath:static/
   ```

2. 写代码配置

   ```java
   @Configuration
   public class WebMvcConfig implements WebMvcConfigurer {
       @Override
       public void addResourceHandlers(ResourceHandlerRegistry registry) {
           registry.addResourceHandler("/static/**")
                   .addResourceLocations("classpath:static/");
       }
   }
   ```

### @ControllerAdvice

   三种用法：

      1. 全局异常处理
      2. 定义全局数据
      3. 请求参数预处理

### 异常处理

整体来说两种方式：

1. 静态页面展示异常
   - 明确展示（推荐）
   - 模糊展示
2. 动态页面展示异常
   - 明确展示
   - 模糊展示（推荐）

具体查找方式：

1. 先找明确的，再找模糊的
2. 先找动态的，再找静态的

### 跨域的三种解决方案

1. @CrossOrigin 注解
2. 全局配置
3. 配置过滤器

### 过滤器的三种配置方式

1. 通过 @Component 注解注入到 Spring 容器中。这种方式有一个缺陷，无法配置拦截地址。但是这种方式可以通过 @Order 注解配置优先级。
2. 使用 @WebFilter+@ServletComponentScan 注解的方式，这种方式可以配置拦截路径，但是无法配置优先级。
3. FilterRegistrationBean：这种方式既可以配置拦截路径，也可以配置优先级。

### 构建 RESTful

Spring Boot 中提供了一个快速构建 RESTful 服务的工具，就是 

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-rest</artifactId>
</dependency>
```

该工具可以配合 Jpa、MongoDB 以及 ElasticSearch 一起使用。

以 Jpa 为例，使用时，只需要三步：

1. 在 application.properties 文件中配置数据库和 JPA的基本信息。
2. 提供一个实体类。
3. 提供一个空接口。

然后启动项目，系统会自动生成如下接口。

- GET http://localhost:8080/users ，这是一个分页查询接口，默认查询第一页，每页20条数据。users 是实体类名首字母小写后面加上 s。可以自行添加分页参数：http://localhost:8080/users?size=3&page=0
- GET http://localhost:8080/users/1，这个是根据id查询数据的接口
- POST http://localhost:8080/users，这个是添加数据的接口，添加的参数形式是 JSON。
- PUT http://localhost:8080/users/6，这个是根据 id 修改数据的接口，参数的提交方式也是 JSON。
- DELETE http://localhost:8080/users/6，这个是根据 id 删除数据。

1. 定制请求路径。

   - exported：是否暴露当前接口。
   - collectionResourceRel：生成的数据集合的名字，默认是 users。
   - itemResourceRel：生成的每一项数据的名字，默认是 user。

   ```java
   @RepositoryRestResource(exported = true,path = "us",collectionResourceRel = "us",itemResourceRel = "u")
   public interface UserDao extends JpaRepository<User, Long> {
   }
   ```

2. 定制请求方法。

   ```java
   @RepositoryRestResource(exported = true,path = "us",collectionResourceRel = "us",itemResourceRel = "u")
   public interface UserDao extends JpaRepository<User, Long> {
       List<User> findUserByUsernameStartingWith(@Param("username") String username);
   }
   ```

   此时，可以通过如下地址查看所有的查询接口。http://localhost:8080/us/search。

   可以看到，自定义的接口，调用方式如下：http://localhost:8080/us/search/findUserByUsernameStartingWith?username=王

   还可以定制方法名：

   ```java
   @RepositoryRestResource(exported = true,path = "us",collectionResourceRel = "us",itemResourceRel = "u")
   public interface UserDao extends JpaRepository<User, Long> {
       @RestResource(path = "byname")
       List<User> findUserByUsernameStartingWith(@Param("username") String username);
   }
   ```

   此时的查询路径：http://localhost:8080/us/search/byname?username=王

3. 其他配置

   ```properties
   # 配置统一前缀
   spring.data.rest.base-path=/api
   # 配置默认的页数
   spring.data.rest.default-page-size=0
   # 每页查询的记录数
   spring.data.rest.max-page-size=20
   # 分页参数的 key
   spring.data.rest.page-param-name=page
   # 分页参数 size 的key
   spring.data.rest.limit-param-name=size
   # 排序的参数的 key
   spring.data.web.sort.sort-parameter=sort
   # 创建成功时是否返回数据
   spring.data.rest.return-body-on-create=true
   # 更新成功时是否返回数据
   spring.data.rest.return-body-on-update=true
   ```

   

页面模板技术：

- Jsp
- Freemarker（SpringBoot2.2之前 .ftl，之后是 .ftlh）
- Thymeleaf

JPA：Java Persistence API

Hibernate/OpenLink/EclipseLink。。。

### Thymeleaf
## Thymeleaf 简介
Thymeleaf 是一款用于渲染 XML/XHTML/HTML5 内容的模板引擎。它与 JSP，Velocity，FreeMaker 等一样，也可以轻易地与 Spring MVC 等 Web 框架集成。但与其它模板引擎相比，Thymeleaf 最大的特点就是，即使不启动 Web 应用也可以直接在浏览器中打开并正确地显示页面。

### 语法
出于一些原因，无法显示