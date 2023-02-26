---
lang: zh-CN
title: Spring Cloud (1)
description: 学习Spring Cloud (1)
---
# 01-微服务入门
## SpringCloud
微服务
解决：两个服务间的调用

单体项目
jenkins

A服务 -> 服务注册中心 <- B服务
A、B服务启动时，需要把信息发给注册中心，两服务之间项目调用时，只需要知道对方名字就行。
注册中心技术：
Zookeeper
Nacos
Consul
Enreka



A与B之前调用失败时，需要断路器，服务器降级（Hystrix，Resiliency4j）
如果B时集群化部署，需要从多个地址中挑一个出来，Ribbon、LoadBalanced
服务屏蔽掉，只在边界留一个服务网关，角色有点像Nginx



分布式配置中心：保存各个服务的配置
A、B启动时都要来配置中心来读取配置
Nacos
Spring Cloud Config

分布式链路追踪：Spring Cloud Sleuth、Zipkin、Skywalking


*微服务技术栈：*
Spring Cloud
Netflix
Spring Cloud Alibaba

Netflix：
	Eureka
	Ribbon
	Feign
	Hystrix
	Zuul
	
Spring Cloud：
	Spring Cloud OpeanFeign
	Spring Cloud Gateway
	Spring Cloud Sleuth
	Spring Cloud Stream
	Spring Cloud Config
	Spring Cloud Bus
	
Spring Cloud Alibaba：
	Nacos
	Sentinel
	Dubbo
	Seata
	RocketMQ


微服务的核心在于服务治理，服务治理的核心又在于注册中心。目前主流的微服务架构主要包括 Dubbo 和 Spring Cloud 两种。

1. Dubbo 支持 Zookeeper、Redis等，推荐 Zookeeper 作为注册中心。
2. Spring Cloud 支持 Zookeeper、Nacos、Consul、Eureka，推荐 Eureka 作为注册中心。

Zookeeper 的设计原则是 CP，即：强一致性和分区容错性，但舍弃了可用性。如果出现网络问题，可能会影响 Zookeeper 的选举，导致 Zookkeeper 不可用。

Eureka 的设计原则是 AP，即：可用性和分区容错性，舍弃了强一致性。各节点可能会出现数据不一致的情况（会最终一致）。



### Eureka Client：注册中心客户端
- **Register（服务注册）**
- **Renew（服务续约）**
	Eureka Client 会每隔 30 秒发送一次心跳来续约。 通过续约来告知 Eureka Server 该 Eureka Client 运行正常，没有出现问题。 默认情况下，如果 Eureka Server 在 90 秒内没有收到 Eureka Client 的续约，Server 端会将实例从其注册表中删除，此时间可配置，一般情况不建议更改
- **Eviction（服务驱逐）**
- **Cancel（服务下线）**
- **GetRegisty（获取注册列表）**
- **Remote Call（远程调用）**

# 02-Eureka
new 空的Maven
new Spring Boot
https://start.aliyun.com

组件依赖选Web、EurekaServer

启动类上加`@EnableEurekaServer`

~~~properties
# 应用名称  
spring.application.name=eureka  
  
# 应用服务 WEB 访问端口,默认是8761  
server.port=8080  
  
# 是否从 Eureka 上获取其他的服务注册信息  
eureka.client.fetch-registry=false  
# 是否将自己注册到Eureka 上  
eureka.client.register-with-eureka=false
~~~


*Eureka原理：*
1. 注册中心Eureka
~~~xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
~~~

启动类上添加 @EnableEurekaServer 注解

~~~yml
server:
  port: 8761
eureka:
  instance:
    preferIpAddress: true
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: http://localhost:${server.port}/eureka/
  server:
    enable-self-preservation: false
spring:
  application:
    name: learn-eureka-server
~~~

2. 服务提供者Provider
~~~xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
~~~

启动类上添加 @EnableDiscoveryClient 注解

~~~yml
server:
  port: 8090
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
spring:
  application:
    name: learn-eureka-client-service
~~~
http接口
~~~java
@RestController
public class SayHelloController {

    @RequestMapping("/hello/{name}")
    public String sayHello(@PathVariable("name") String name) {
        return "Hello, " + name + "!";
    }
}
~~~

3. 服务消费者Consumer
服务消费者和服务提供者的组件依赖和配置是相同的。
远程调用的时候，我们使用了 RestTemplate，该实例使用了 @LoadBalanced 注解进行修饰，目的是为了在有多个服务提供者的情况下实现负载均衡的功能。

~~~xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
~~~

~~~yml
server:
  port: 8091
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
spring:
  application:
    name: learn-eureka-client-caller
~~~

启动类上添加 @EnableDiscoveryClient 注解

配置类

~~~java
@Configuration
public class RestTemplateConfig {

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
~~~

~~~java
@RestController
public class AskController {

    @Value("${spring.application.name}")
    private String name;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private DiscoveryClient discoveryClient;

    @RequestMapping("/ask")
    public String ask() {
        String url = "http://learn-eureka-client-service/hello/{name}";
        return restTemplate.getForEntity(url, String.class, name).getBody();
    }

    @RequestMapping("/service-instances/{applicationName}")
    public List<ServiceInstance> serviceInstancesByApplicationName(
            @PathVariable("applicationName") String applicationName) {
        return discoveryClient.getInstances(applicationName);
    }
}
~~~

# 03-Eureka集群
c盘->windows -> system32 -> drivers -> etc -> hosts(不带后缀那个)
最下面加一行
127.0.0.1     peer1  peer2
先复制到桌面上改好再拖进来

application.properties
~~~properties
# 应用名称  
spring.application.name=eureka  
  
# 应用服务 WEB 访问端口,默认是8761  
server.port=8080  
  
## 是否从 Eureka 上获取其他的服务注册信息  
#eureka.client.fetch-registry=false  
## 是否将自己注册到Eureka 上  
#eureka.client.register-with-eureka=false  
spring.security.user.name=sa  
spring.security.user.password=123
~~~

application-peer1.properties
~~~properties
# 应用名称  
spring.application.name=eureka  
  
# 应用服务 WEB 访问端口,默认是8761  
server.port=1111  
eureka.instance.hostname=peer1  
# 把2注册到1上  
eureka.client.service-url.defaultZone=http://sa:123@peer2:1112/eureka
~~~

application-peer2.properties
~~~properties
# 应用名称  
spring.application.name=eureka  
  
# 应用服务 WEB 访问端口,默认是8761  
server.port=1112  
  
# 把1注册到2上  
eureka.client.service-url.defaultZone=http://sa:123@peer1:1111/eureka
~~~

关闭test，打包packa，然后在termina运行
~~~sh
java -jar .eureka-0.0.1-SNAPSHOT.jar --spring.profiles.active=peer1
java -jar .eureka-0.0.1-SNAPSHOT.jar --spring.profiles.active=peer2
~~~


开启httpBasic登录
~~~java
@Configuration  
public class securityConfig {  
    @Bean  
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {  
        httpSecurity.authorizeHttpRequests()  
                .anyRequest()  
                .authenticated()  
                .and()  
                .formLogin()  
                .and()  
                .httpBasic()  
                .and()  
                .csrf().disable();  
        return httpSecurity.build();  
    }  
}
~~~




完整url地址：
https://用户名:密码@localhost:8080/test

# 04-服务注册与消费
新建项目选择组件：
Web
Eureka Discovery Client

服务提供者Provider
~~~java
@SpringBootApplication
// 启动类上加 `@EnabledEurekaClient `注解
@EnableEurekaClient  
public class Provider01Application {  
  
    public static void main(String[] args) {  
        SpringApplication.run(Provider01Application.class, args);  
    }  
  
}
~~~

服务消费者Consumer
~~~java
@SpringBootApplication  
@EnableEurekaClient  
public class Consumer01Application {  
  
    public static void main(String[] args) {  
        SpringApplication.run(Consumer01Application.class, args);  
    }  
  
    @Bean  
    //这个注解会自动为 RestTemplate 开启负载均衡功能，将来，RestTemplate 调用一个服务地址的时候，不用写具体的服务地址，只写服务名即可，系统会自动根据服务名查询出来服务地址，并做负载均衡  
    @LoadBalanced  
    RestTemplate restTemplate() {  
        return new RestTemplate();  
    }  
}
~~~

# 05-RestTemplate

~~~java
@Autowired  
RestTemplate restTemplate;  
  
@GetMapping("/hello10")  
public void hello10() {  
    User user = new User();  
    user.setId(99);  
    restTemplate.put("http://provider01/user",user);  
    restTemplate.delete("http://provider01/user/{1}",100);  
  
}
~~~

# 06-Spring Cloud OpenFeign
Netflix Feign 是 Netflix 公司发布的一种实现*负载均衡和服务调用*的开源组件。Spring Cloud 将其与 Netflix 中的其他开源服务组件（例如 Eureka、Ribbon 以及 Hystrix 等）一起整合进 Spring Cloud Netflix 模块中，整合后全称为 Spring Cloud Netflix Feign。

OpenFeign 全称 Spring Cloud OpenFeign，它是 Spring 官方推出的一种*声明式*服务调用与负载均衡组件，它的出现就是为了替代2019年进入停更维护状态的 Feign。


~~~xml
<dependency>  
    <groupId>org.springframework.cloud</groupId>  
    <artifactId>spring-cloud-starter-openfeign</artifactId>  
</dependency>
~~~


~~~java
@SpringBootApplication  
@EnableFeignClients  
public class OpenfeignApplication {  
  
    public static void main(String[] args) {  
        SpringApplication.run(OpenfeignApplication.class, args);  
    }  
  
}
~~~


~~~java
@FeignClient("provider01")  
public interface UserService {  
    @PostMapping("/user")  
    User addUser(@RequestBody User user);  
  
    @GetMapping("/hello2")  
    String hello2(@RequestParam("name") String name);  
  
    @DeleteMapping("/user/{id}")  
    void deleteUserById(@PathVariable("id") Integer id);  
}
~~~

# 07-Hystrix
用Hystrix的话Spring 版本要选2.3以下的，
组件：Web、Eureka Discovery Client

~~~java
@SpringBootApplication  
@EnableHystrix  
@EnableFeignClients  
public class HystrixApplication {  
  
    public static void main(String[] args) {  
        SpringApplication.run(HystrixApplication.class, args);  
    }  
  
    @Bean  
    @LoadBalanced    RestTemplate restTemplate() {  
        return new RestTemplate();  
    }  
}
~~~

## 服务降级

## 异常处理
~~~java
// 服务降级，报错了就去执行error方法  
// 如果是 ArithmeticException 异常，可以不用降级  
@HystrixCommand(fallbackMethod = "error", ignoreExceptions = ArithmeticException.class)  
public String hello(String name) {  
    return restTemplate.getForObject("http://provider01/hello2?name={1}", String.class, name);  
}  
  
// 这个上面也可以加降级方法fallback  
public String error(String name, Throwable throwable) {  
    return "error:" + name + ":" + throwable.getMessage();  
}
~~~

~~~java
@Override  
protected String run() throws Exception {  
    // 自定义一个异常  
    int i = 1/0;  
    return restTemplate.getForObject("http://provider01/hello2?name={1}",String.class, name);  
}  
  
// Ctrl + O -> getFallback方法  
@Override  
protected String getFallback() {  
    return "服务降级了" + getExecutionException().getMessage();  
}

~~~



## 缓存

~~~java
// @CacheResult 注解表示会将当前方法的执行结果缓存起来，key 是方法参数， value 是返回值  
// @CacheKey 加上的话就是对某一参数，不加的话是所有参数
@CacheResult  
public String hello(@CacheKey String name) {  
    return restTemplate.getForObject("http://provider01/hello2?name={1}", String.class, name);  
}
~~~

~~~java
@GetMapping("/hello")  
public String hello() {  
    // 初始化一个 Hystrix 请求上下文，将来缓存从这里开始算  
    HystrixRequestContext hrc = HystrixRequestContext.initializeContext();  
    String sa = helloService.hello("sa");  
    System.out.println("sa = " + sa);  
    String sa2 = helloService.hello("sa");  
    System.out.println("sa2 = " + sa2);  // 第二次打印的也是 sa ，因为用的是缓存
    // 缓存到close 停止  
    hrc.close();  
    return helloService.hello("sa");  
}
~~~

## 请求合并
HystrixCommand
collection 这个参数就是已经合并了的请求

## Hystrix和OpenFeign

~~~properties
# 开启 OpenFeign 里面的服务降级  
feign.hystrix.enabled=true
~~~

~~~java
public class BookCollapseCommand extends HystrixCollapser<List<Book>, Book, Integer> {  
  
    private BookService bookService;  
  
    private Integer id;  
  
    // 200是请求等待时间，当前请求等200s看有没有下一个请求，没有就走  
    public BookCollapseCommand(BookService bookService, Integer id) {  
        super(HystrixCollapser.Setter.withCollapserKey(HystrixCollapserKey.Factory.asKey("UserCollapseCommand")).andCollapserPropertiesDefaults(HystrixCollapserProperties.Setter().withTimerDelayInMilliseconds(200)));  
        this.bookService = bookService;  
        this.id = id;  
    }  
  
    /**  
     * 获取请求参数  
     * @return  
     */  
    @Override  
    public Integer getRequestArgument() {  
        return null;  
    }  
  
    /**  
     * collection 参数就是已经合并的请求了  
     * @param collection  
     * @return  
     */  
    @Override  
    protected HystrixCommand<List<Book>> createCommand(Collection<CollapsedRequest<Book, Integer>> collection) {  
//        List<Integer> ids = new ArrayList<>(collection.size());  
//        for (CollapsedRequest<Book, Integer> bookIntegerCollapsedRequest : collection) {  
//            // getArgument 拿到请求的参数  
//            ids.add(bookIntegerCollapsedRequest.getArgument());  
//        }  
//        return new BookCommand(bookService, ids);  
  
        return new BookCommand(bookService, collection.stream().map(r -> r.getArgument()).collect(Collectors.toList()));  
    }  
  
    /**  
     * 将请求分发给不同的请求  
     * @param books  
     * @param collection  
     */  
    @Override  
    protected void mapResponseToRequests(List<Book> books, Collection<CollapsedRequest<Book, Integer>> collection) {  
  
        int index = 0;  
        for (CollapsedRequest<Book, Integer> request : collection) {  
            request.setResponse(books.get(index++));  
        }  
  
    }  
}
~~~

# 08-Zuul服务网关
请求 -> 网关 -> 服务

Spring Boot选择2.3版本

pom.xml
~~~xml
<dependency>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-web</artifactId>  
</dependency>  
<dependency>  
    <groupId>org.springframework.cloud</groupId>  
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>  
</dependency>
<dependency>  
    <groupId>org.springframework.cloud</groupId>  
    <artifactId>spring-cloud-starter-netflix-zuul</artifactId>  
    <version>2.2.10.RELEASE</version>  
</dependency>
~~~

启动类上加`@EnableZuulProxy `注解
~~~java
@SpringBootApplication  
@EnableZuulProxy  
public class ZuulApplication {  
  
    public static void main(String[] args) {  
        SpringApplication.run(ZuulApplication.class, args);  
    }  
  
}
~~~

application.properties配置
~~~properties
# 应用名称  
spring.application.name=zuul  
  
# 应用服务 WEB 访问端口  
server.port=80  
  
eureka.client.service-url.defaultZone=http://sa:123@localhost:8080/eureka

# 浏览器地址栏的provider01就可以替换成p  
zuul.routes.provider01=/p/**
~~~

~~~java
@Component  
public class AuthFilter extends ZuulFilter {  
  
  
    /**  
     * 过滤器类型：pre、post、error、route。。。  
     * @return  
     */  
    @Override  
    public String filterType() {  
        return "pre";  
    }  
  
    /**  
     * 过滤器优先级  
     * @return  
     */  
    @Override  
    public int filterOrder() {  
        return 0;  
    }  
  
    /**  
     * 当前请求是否需要拦截  
     * @return  
     */  
    @Override  
    public boolean shouldFilter() {  
        return true;  
    }  
  
    /**  
     * 真正的过滤方法  
     * @return  
     * @throws ZuulException  
     */  
    @Override  
    public Object run() throws ZuulException {  
        // zuul 里面的方法  
        RequestContext currentContext = RequestContext.getCurrentContext();  
        HttpServletRequest request = currentContext.getRequest();  
        String username = request.getParameter("username");  
        String password = request.getParameter("password");  
        if (!"sa".equals(username) && !"123".equals(password)) {  
            // 请求不合法，直接从 zuul 给出响应  
            currentContext.setSendZuulResponse(false);  
            currentContext.setResponseBody("用户名/密码不正确，请求失败");  
            currentContext.addZuulResponseHeader("content-type","text/html;charset=utf-8");  
            return null;  
  
        }  
        return null;  
    }  
}
~~~

浏览器访问：http://localhost/p/hello?username=sa&password=123

# 09-GeteWay
*zuul 和 geteway 区别?*
zuul是同步的servlet封装，spring mvc阵营

gateway是异步的servlet封装，webflux阵营，效率比zuul高。

R2DBC  JDBC

Nginx : 网关，限流可以，但是认证不行，除非用c

新建Spring Boot项目选组件依赖：
spring reactive web
eureka discovery client
gateway


application.yml
~~~yml
spring:  
  application:  
    name: gateway  
  cloud:  
    gateway:  
      discovery:  
        locator:  
#          开启自动代理  
          enabled: true  
#          默认情况下，代理的服务 ID 都是大写的，这个配置设置为 true，可以将之改为小写的  
          lower-case-service-id: true  
      routes:  
        - id: provider01  
          uri: lb://provider01  
          predicates:  
            - Path=/p/**  
          filters:  
            - StripPrefix=1  
server:  
  port: 8081  
eureka:  
  client:  
    service-url:  
      defaultZone: http://sa:123@localhost:8080/eureka  
logging:  
  level:  
    org.springframework.cloud.gateway: debug
~~~

浏览器访问：localhost:8081/p/hello