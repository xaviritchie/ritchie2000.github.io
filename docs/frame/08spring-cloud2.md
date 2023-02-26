---
lang: zh-CN
title: Spring Cloud (2)
description: 学习Spring Cloud (2)
---
# 10-Config Server
分布式配置中心：
- Nacos：既能作为注册中心也能做配置中心 -- 阿里 
- Spring Cloud Config

新建一个项目，选择组件依赖：
1. Spring Web 
2. Eureka Discovery Client 
3. Config Server

启动类加`@EnableConfigServer`

新建一个Gitee仓库：
https://gitee.com/ritchiewong/cloud_config

新建三个文件：
1. 02client-dev.properties
2. 02client-prop.properties
3. 02client-test.properties

分别写：
spring.data.mysql.url=jdbc:mysql:///dev
spring.data.mysql.url=jdbc:mysql://22.22.22.22:3306/prop
spring.data.mysql.url=jdbc:mysql://11.11.11.11:3306/test

~~~sh
git add . 
git commit -m "first commit" 
git push
~~~


~~~properties
# 应用名称  
spring.application.name=configserver  
  
# 应用服务 WEB 访问端口  
server.port=7000  
  
# 远程仓库的地址  
spring.cloud.config.server.git.uri=https://gitee.com/ritchiewong/cloud_config.git  
# 远程仓库的文件夹  
spring.cloud.config.server.git.search-paths=02client  
spring.cloud.config.server.git.username=ritchiewong  
spring.cloud.config.server.git.password=Gitee.678qo  
  
spring.cloud.config.server.git.default-label=master  
  
# 注册到eureka就不用再写地址了  
eureka.client.service-url.defaultZone=http://sa:123@localhost:8080/eureka  
  
spring.security.user.name=user  
spring.security.user.password=pwd  
  
# 配置文件加密的密钥-对称  
encrypt.key=654321  
  
eureka.instance.hostname=peer1  
# 如果 Eureka 显示的是电脑用户名，可以这样定义  
eureka.instance.instance-id=${eureka.instance.hostname}:${spring.application.name}:${server.port}
~~~
# 11-Config Client
新建一个项目，选择依赖组件：
Spring Web 
Eureka Discovery Client 
Config Client 

加一个bootstrap依赖
~~~xml
<dependency>  
    <groupId>org.springframework.cloud</groupId>  
    <artifactId>spring-cloud-starter-bootstrap</artifactId>  
</dependency>

<dependency>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-jdbc</artifactId>  
</dependency>  
<dependency>  
    <groupId>com.mysql</groupId>  
    <artifactId>mysql-connector-j</artifactId>  
    <version>8.0.32</version>  
</dependency>  
<dependency>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-actuator</artifactId>  
</dependency>
~~~

bootstrap.properties
~~~properties
# 应用名称  
spring.application.name=02client  
  
#spring.cloud.config.name=02client  
spring.cloud.config.profile=dev  
spring.cloud.config.label=master  
  
# 应用服务 WEB 访问端口  
server.port=8082  
  
eureka.client.service-url.defaultZone=http://sa:123@localhost:8080/eureka  
  
# 指定配置中心的服务名称，根据这个名字去 eureka 上找地址，再调用服务获取配置文件  
spring.cloud.config.discovery.service-id=configserver  
# 开启自动查询 configserverspring.cloud.config.discovery.enabled=true  
  
# 配置访问 configserver 所需要的用户名和密码，要跟server的用户名和密码保持一致  
spring.cloud.config.username=user  
spring.cloud.config.password=pwd  
  
eureka.instance.hostname=peer2
~~~

~~~java
@RestController  
public class HelloController {  
    @Value("${spring.data.mysql.url}")  
    String url;  
  
    @Autowired  
    JdbcTemplate jdbcTemplate;  
    @GetMapping("/hello")  
    public String hello() {  
        jdbcTemplate.update("insert into student (name, score) values ('liu',66);");  
        return url;  
    }  
}
~~~



# 12-配置文件对称加密
在configServer上加 security 依赖
配置用户名和密码

浏览器访问xxx/login

对称加密 
jce

jdk安装目录：lib -> security -> jce
需要把jce文件解压放到里面

配置密钥生成： 
encrypt.key=xxxx

config-client添加actuator依赖

~~~java
@Configuration  
public class SecurityConfig {  
    @Bean  
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {  
        http.authorizeHttpRequests()  
                .anyRequest().authenticated()  
                .and()  
                .formLogin()  
                .and()  
                .httpBasic()  
                .and()  
                .csrf().disable();  
        return http.build();  
    }  
}
~~~

加密用到postman
body -> x-www -> username、password 
只能value挨个加密， 
nacos是给整个文件加密 

{cipher}生成的密钥

push后重启一下configServer


# 13-配置文件非对称加密
~~~sh
keytool -genkeypair -alias config-server -keyalg RSA -keystore D:\JavaEdu\keystore\config-server.keystore
~~~
去cmd里执行

密码：123321

一路回车，是
再把本地生成的`config-server.keystore`文件复制到resource目录下

~~~xml
<resources>  
    <resource>  
        <directory>src/main/resources</directory>  
        <includes>  
            <include>**/*.properties</include>  
            <include>**/*.yaml</include>  
            <include>**/*.yml</include>  
            <include>**/*.keystore</include>  
        </includes>  
    </resource>  
</resources>
~~~



### 失败重试
在bootstrap.properties
~~~
spring.cloud.config.retry.initial-interval=1000  
spring.cloud.config.retry.max-attempts=6  
spring.cloud.config.retry.max-interval=2000  
spring.cloud.config.retry.multiplier=1.2

# 如果请求 config-server 失败，则直接重试，不要往下执行  
spring.cloud.config.fail-fast=true
~~~

添加依赖
~~~xml
<dependency>   
	<groupId>org.springframework.boot</groupId>   
    <artifactId>spring-boot-starter-aop</artifactId> 
</dependency> 
<dependency>   
	<groupId>org.springframework.retry</groupId>   
    <artifactId>spring-retry</artifactId> 
</dependency>
~~~

本质是个aop，用环绕通知把方法裹起来。

# 14-请求失败重试
# 15-配置文件自动刷新
# 16-消息驱动的微服务
# 17-服务追踪
# 18-Nacos
