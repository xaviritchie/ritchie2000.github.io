---
lang: zh-CN
title: Spring Security
description: 学习Spring Security
---

## 介绍
跟Shiro一样，SpringSecurity也是个权限管理框架，但是重量级、配置繁琐、
门槛高，不像Shiro那样轻量、简单、易于集成。但是 Shiro 也有不足，例如对 OAuth2 支持不够，在 Spring Boot 面前无法充分展示自己的优势等等，随着现在 Spring Boot 和 Spring Cloud 的流行，Spring Security 也变得重要，并且配置得到了极大简化。


### 核心功能
对于一个权限管理框架而言，无论是 Shiro 还是 Spring Security，最最核心的功能，无非就是两方面：  
**认证-（登录）**  
Spring Security 支持多种不同的认证方式，这些认证方式有的是 Spring Security 自己提供的认证功
能，有的是第三方标准组织制订的，主要有如下一些：
一些比较常见的认证方式：
- HTTP BASIC authentication headers：基于IETF RFC 标准。
- HTTP Digest authentication headers：基于IETF RFC 标准。
- HTTP X.509 client certificate exchange：基于IETF RFC 标准。
- LDAP：跨平台身份验证。
- Form-based authentication：基于表单的身份验证。
- Run-as authentication：用户用户临时以某一个身份登录。
- OpenID authentication：去中心化认证。  

除了这些常见的认证方式之外，一些比较冷门的认证方式，Spring Security 也提供了支持。  
- Jasig Central Authentication Service：单点登录。
- Automatic "remember-me" authentication：记住我登录（允许一些非敏感操作）。
- Anonymous authentication：匿名登录。
- ......  
**授权-（权限鉴别，看看请求是否具备相应的权限。）**  
Spring Security 支持基于 URL 的请求授权（例如微人事）、支持方法访问授权以及对象访问授权。

## 入门
1. 新建项目
首先新建一个 Spring Boot 项目，创建时引入 Spring Security 依赖和 web 依赖。
2. 用户配置
在 application.properties 中配置默认的用户名密码
~~~properties
spring.security.user.name=自定义用户名
spring.security.user.password=自定义密码
~~~
3. 加密
不同于 Shiro 中需要自己处理密码加盐，在 Spring Security 中，BCryptPasswordEncoder 就自带了
盐，处理起来非常方便。
而 BCryptPasswordEncoder 就是 PasswordEncoder 接口的实现类。PasswordEncoder 这个接口中就定义了三个方法：
- encode 方法用来对明文密码进行加密，返回加密之后的密文。
- matches 方法是一个密码校对方法，在用户登录的时候，将用户传来的明文密码和数据库中保存
的密文密码作为参数，传入到这个方法中去，根据返回的 Boolean 值判断用户密码是否输入正
确。
- upgradeEncoding 是否还要进行再次加密，这个一般来说就不用了。
~~~java
@Configuration 
public class SecurityConfig extends WebSecurityConfigurerAdapter { 
    @Bean 
    PasswordEncoder passwordEncoder() { 
        return NoOpPasswordEncoder.getInstance(); 
    }
    @Override 
    protected void configure(AuthenticationManagerBuilder auth) throws Exception { 
        auth.inMemoryAuthentication() .withUser("用户名") .password("密码").roles("角色"); 
        } 
    }
~~~
4. 自定义表单登录页
~~~java
@Override 
public void configure(WebSecurity web) throws Exception { 
    web.ignoring().antMatchers("/js/**", "/css/**","/images/**"); 
}
@Override 
protected void configure(HttpSecurity http) throws Exception { 
    http.authorizeRequests() 
    .anyRequest()
    .authenticated()
    .and() 
    .formLogin() 
    .loginPage("/login.html") 
    .permitAll() 
    .and() 
    .csrf()
    .disable(); 
}
~~~

~~~
- web.ignoring() 用来配置忽略掉的 URL 地址，一般对于静态文件，我们可以采用此操作。
- 如果我们使用 XML 来配置 Spring Security ，里边会有一个重要的标签 <http> ，HttpSecurity
提供的配置方法 都对应了该标签。  
- authorizeRequests 对应了 <intercept-url> 。     
- formLogin 对应了 <formlogin> 。  
- and 方法表示结束当前标签，上下文回到HttpSecurity，开启新一轮的配置。    
- permitAll 表示登录相关的页面/接口不要被拦截。
- 最后记得关闭 csrf 。
当我们定义了登录页面为 /login.html 的时候，Spring Security 也会帮我们自动注册一个 /login.html
的接口，这个接口是 POST 请求，用来处理登录逻辑。
~~~

5. 定制 Spring Security 表单登录

在 Spring Security 中，如果我们不做任何配置，默认的登录页面和登录接口的地址都是 /login ，也
就是说，默认会存在如下两个请求：  
GET http://localhost:8080/login  
POST http://localhost:8080/login  

6. 登录回调
~~~
在 Spring Security 中，和登录成功重定向 URL 相关的方法有两个：
defaultSuccessUrl
successForwardUrl
defaultSuccessUrl 和 successForwardUrl 只需要配置一个即可
~~~
~~~
与登录成功相似，登录失败也是有两个方法：
failureForwardUrl
failureUrl
这两个方法在设置的时候也是设置一个即可。
~~~
7. 注销登录

注销登录的默认接口是 /logout ，我们也可以配置。
~~~java
.and() 
.logout() 
.logoutUrl("/logout") 
.logoutRequestMatcher(new AntPathRequestMatcher("/logout","POST")) 
.logoutSuccessUrl("/index") 
.deleteCookies() 
.clearAuthentication(true) 
.invalidateHttpSession(true) 
.permitAll() 
.and()
~~~
~~~
1. 默认注销的 URL 是 /logout ，是一个 GET 请求，我们可以通过 logoutUrl 方法来修改默认的注
销 URL。 
2. logoutRequestMatcher 方法不仅可以修改注销 URL，还可以修改请求方式，实际项目中，这个
方法和 logoutUrl 任意设置一个即可。
3. logoutSuccessUrl 表示注销成功后要跳转的页面。
4. deleteCookies 用来清除 cookie。 
5. clearAuthentication 和 invalidateHttpSession 分别表示清除认证信息和使 HttpSession 失效，
默认可以不用配置，默认就会清除。
~~~

## JSON交互
传统的通过 session 来记录用户认证信息的方式我们可以理解为这是一种有状态登录，而 JWT 则代表了
一种无状态登录。

**有状态登录**
有状态服务，即服务端需要记录每次会话的客户端信息，从而识别客户端身份，根据用户身份进行请求
的处理，典型的设计如 Tomcat 中的 Session。
- 服务端保存大量数据，增加服务端压力
- 服务端保存用户状态，不支持集群化部署

**无状态**
RESTful 风格的一个最重要的规范就是：服务的无状态性，即：
- 服务端不保存任何客户端请求者信息
- 客户端的每次请求必须具备自描述信息，通过这些信息识别客户端身份

那么这种无状态性有哪些好处呢？
- 客户端请求不依赖服务端的信息，多次请求不需要必须访问到同一台服务器
- 服务端的集群和状态对客户端透明
- 服务端可以任意的迁移和伸缩（可以方便的进行集群化部署）
- 减小服务端存储压力

使用 session 最大的优点在于方便。但是使用 session 有另外一个致命的问题就是如果你的前端是 Android、iOS、小程序等，这些 App 天
然的就没有 cookie，配置很麻烦。

### 实现无状态
无状态登录的流程：  
- 首先客户端发送账户名/密码到服务端进行认证
- 认证通过后，服务端将用户信息加密并且编码成一个 token，返回给客户端
- 以后客户端每次发送请求，都需要携带认证的 token
- 服务端对客户端发送来的 token 进行解密，判断是否有效，并且获取用户登录信息

## Spring Security 授权
授权，就是用户如果要访问某一个资源，我们要去检查用户是否具备这样的权限，如果具备就允
许访问，如果不具备，则不允许访问。

在 Spring Security 的 configure(HttpSecurity http) 方法中配置权限的拦截规则：
~~~java
http.authorizeRequests() 
    .antMatchers("/admin/**")
    .hasRole("admin") 
    .antMatchers("/user/**")
    .hasRole("user") 
    .anyRequest()
    .authenticated() 
    .and() 
    ... 
    ...
~~~

## 用户数据持久化
Spring Security 支持多种不同的数据源，这些不同的数据源最终都将被封装成 UserDetailsService 的
实例。  
JdbcUserDetailsManager 自己提供了一个数据库模型。  
数据库支持，在项目中添加如下两个依赖：  
~~~xml
<dependency> 
    <groupId>org.springframework.boot</groupId> 
    <artifactId>spring-boot-starter-jdbc</artifactId> 
</dependency>
<dependency> 
    <groupId>mysql</groupId> 
    <artifactId>mysql-connector-java</artifactId> 
</dependency>
~~~
然后再在 application.properties 中配置一下数据库连接：
~~~properties
spring.datasource.username=root 
spring.datasource.password=1234 
spring.datasource.url=jdbc:mysql:///数据库表名? useUnicode=true&characterEncoding=UTF-8&serverTimezone=Hongkong
~~~

## 结合 JPA
### 创建工程
除了Spring Security 依赖之外，我们还需要数据依赖和 Spring Data Jpa 依赖。
### 配置
~~~properties
spring.jpa.database=mysql 
spring.jpa.database-platform=mysql 
spring.jpa.hibernate.ddl-auto=update 
spring.jpa.show-sql=true 
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
~~~

## 自动登录
### 源码逻辑分析
1. 首先从登录成功的 Authentication 中提取出用户名/密码。
2. 由于登录成功之后，密码可能被擦除了，所以，如果一开始没有拿到密码，就再从
UserDetailsService 中重新加载用户并重新获取密码。
3. 再接下来去获取令牌的有效期，令牌有效期默认就是两周。
4. 再接下来调用 makeTokenSignature 方法去计算散列值，实际上就是根据 username、令牌有效
期以及 password、key 一起计算一个散列值。如果我们没有自己去设置这个 key，默认是在
RememberMeConfigurer#getKey 方法中进行设置的，它的值是一个 UUID 字符串。
5. 最后，将用户名、令牌有效期以及计算得到的散列值放入 Cookie 中。

## 自动登录风险防范
### 持久化令牌
持久化令牌就是在基本的自动登录功能基础上，又增加了新的校验参数，来提高系统的安全性，这一些
都是由开发者在后台完成的，对于用户来说，登录体验和普通的自动登录体验是一样的。

1. 首先从前端传来的 cookie 中解析出 series 和 token。 2. 根据 series 从数据库中查询出一个 PersistentRememberMeToken 实例。
3. 如果查出来的 token 和前端传来的 token 不相同，说明账号可能被人盗用（别人用你的令牌登录
之后，token 会变）。此时根据用户名移除相关的 token，相当于必须要重新输入用户名密码登录
才能获取新的自动登录权限。
4. 接下来校验 token 是否过期。
5. 构造新的 PersistentRememberMeToken 对象，并且更新数据库中的 token（这就是我们文章开
头说的，新的会话都会对应一个新的 token）。
6. 将新的令牌重新添加到 cookie 中返回。
7. 根据用户名查询用户信息，再走一波登录流程。

### 二次校验
我们可以只让用户做一些常规的不敏感操作，例如数据浏览、查看，但是不允许他做任何修改、删除操作，如果用户点击了修改、删除按钮，我们可以跳转回登录页
面，让用户重新输入密码确认身份，然后再允许他执行敏感操作。
~~~java
@RestController 
public class HelloController { 
    @GetMapping("/hello") 
    public String hello() { 
        return "hello"; 
    }
        
    @GetMapping("/admin") 
    public String admin() { 
        return "admin"; 
    }
    @GetMapping("/rememberme") 
    public String rememberme() {
        return "rememberme"; 
    } 
}
~~~

~~~java
@Override 
protected void configure(HttpSecurity http) throws Exception { 

    http.authorizeRequests()
        .antMatchers("/rememberme").rememberMe() 
        .antMatchers("/admin").fullyAuthenticated() 
        .anyRequest().authenticated() 
        .and() 
        .formLogin() 
        .and() 
        .rememberMe() 
        .key("javaboy") 
        .tokenRepository(jdbcTokenRepository()) 
        .and() 
        .csrf().disable(); 
}
~~~
>1. /rememberme 接口是需要 rememberMe 才能访问。
>2. /admin 是需要 fullyAuthenticated，fullyAuthenticated 不同于 authenticated，
fullyAuthenticated 不包含自动登录的形式，而 authenticated 包含自动登录的形式。
>3. 最后剩余的接口（/hello）都是 authenticated 就能访问。

## 自定义认证逻辑
### 认证流程
AuthenticationProvider 定义了 Spring Security 中的验证逻辑：
- authenticate 方法用来做验证，就是验证用户身份。
- supports 则用来判断当前的 AuthenticationProvider 是否支持对应的 Authentication。
### 代码实现
找一个现成的验证码库 kaptcha，添加该库的依赖，如下：
~~~xml
<dependency> 
    <groupId>com.github.penggle</groupId> 
    <artifactId>kaptcha</artifactId> 
    <version>2.3.2</version> 
</dependency>
~~~

~~~java
@Bean 
Producer verifyCode() { 
    Properties properties = new Properties(); 
    properties.setProperty("kaptcha.image.width", "150"); 
    properties.setProperty("kaptcha.image.height", "50"); 
    properties.setProperty("kaptcha.textproducer.char.string", "0123456789"); 
    properties.setProperty("kaptcha.textproducer.char.length", "4"); 

    Config config = new Config(properties); 
    DefaultKaptcha defaultKaptcha = new DefaultKaptcha(); 
    defaultKaptcha.setConfig(config); 
    return defaultKaptcha; 
}
~~~

~~~java
@RestController 

public class VerifyCodeController { 

    @Autowired 
    Producer producer; 

    @GetMapping("/vc.jpg") 
    public void getVerifyCode(HttpServletResponse resp, HttpSession session) throws IOException { 
        resp.setContentType("image/jpeg"); 
        String text = producer.createText(); 
        session.setAttribute("verify_code", text); 
        BufferedImage image = producer.createImage(text); 

        try(ServletOutputStream out = resp.getOutputStream()) { 
            ImageIO.write(image, "jpg", out); 
        }    
    } 
} 
~~~

## 查看用户登录详情
### Authentication
Authentication 接口用来保存我们的登录用户信息，实际上，它是对主体（java.security.Principal）做
了进一步的封装。
~~~java
public class MyAuthenticationProvider extends DaoAuthenticationProvider { 

    @Override 
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException { 

        HttpServletRequest req = ((ServletRequestAttributes) 
        RequestContextHolder.getRequestAttributes()).getRequest(); 
        String code = req.getParameter("code"); 
        String verify_code = (String) 
        req.getSession().getAttribute("verify_code"); 
        if (code == null || verify_code == null || !code.equals(verify_code)) { 
            throw new AuthenticationServiceException("验证码错误"); 
        }
        super.additionalAuthenticationChecks(userDetails, authentication); 

    } 
}
~~~


## Session 管理
要实现一个用户不可以同时在两台设备上登录，我们有两种思路：
- 后来的登录自动踢掉前面的登录，就像大家在QQ中看到的效果。
- 如果用户已经登录，则不允许后来者登录。

### 踢掉已经登录用户
~~~java
@Override 
protected void configure(HttpSecurity http) throws Exception { 

    http.authorizeRequests() 

        .anyRequest().authenticated() 

        .and() 

        .formLogin() 

        .loginPage("/login.html") 

        .permitAll() 

        .and() 

        .csrf().disable() 

        .sessionManagement() 

        .maximumSessions(1); 

}
~~~

### 禁止新的登录
~~~java
@Override 
protected void configure(HttpSecurity http) throws Exception { 

    http.authorizeRequests()
        .anyRequest().authenticated() 
        .and() 
        .formLogin() 
        .loginPage("/login.html") 
        .permitAll() 
        .and() 
        .csrf().disable() 
        .sessionManagement() 
        .maximumSessions(1) 
        .maxSessionsPreventsLogin(true); 
}

~~~

## 会话固定攻击
>什么是会话固定攻击？英文叫做 session fixation attack。
正常来说，只要你不关闭浏览器，并且服务端的 HttpSession 也没有过期，那么维系服务端和浏览器的
sessionid 是不会发生变化的，而会话固定攻击，则是利用这一机制，借助受害者用相同的会话 ID 获取
认证和授权，然后利用该会话 ID 劫持受害者的会话以成功冒充受害者，造成会话固定攻击。

### 防御
Spring Security 中的防御主要体现在三个方面：  
首先就是请求地址中有 `;` 请求会被直接拒绝。  
另一方面就是响应的 Set-Cookie 字段中有 HttpOnly 属性，这种方式避免了通过 XSS 攻击来获取
Cookie 中的会话信息进而达成会话固定攻击。  
第三点则是让 sessionid 变一下。既然问题是由于 sessionid 不变导致的，那我就让 sessionid 变一
下。  

### CSRF 攻击与防御
>CSRF 就是跨域请求伪造，英文全称是 Cross Site Request Forgery。
这是一种非常常见的 Web 攻击方式，其实是很好防御的，但是由于经常被很多开发者忽略，进而导致
很多网站实际上都存在 CSRF 攻击的安全隐患。

### 流程原理：
1. 假设用户打开了招商银行网上银行网站，并且登录。
2. 登录成功后，网上银行会返回 Cookie 给前端，浏览器将 Cookie 保存下来。
3. 用户在没有登出网上银行的情况下，在浏览器里边打开了一个新的选项卡，然后又去访问了一个危
险网站。
4. 这个危险网站上有一个超链接，超链接的地址指向了招商银行网上银行。
5. 用户点击了这个超链接，由于这个超链接会自动携带上浏览器中保存的 Cookie，所以用户不知不
觉中就访问了网上银行，进而可能给自己造成了损失。

### 默认方案
Spring Security 中默认实际上就提供了 csrf 防御，但是需要开发者做的事情比较多。  
首先我们来创建一个新的 Spring Boot 工程，创建时引入 Spring Security、Thymeleaf 和 web 依赖。  
在 application.properties 中配置用户名/密码：  
~~~properties
spring.security.user.name=javaboy spring.security.user.password=123
~~~

~~~java
@Controller 
public class HelloController { 

    @PostMapping("/hello") 

    @ResponseBody 
    public String hello() { 
        return "hello"; 
    } 

}
~~~

在 resources/templates 目录下，新建一个 thymeleaf 模版，如下：
~~~html
<body> 
    <form action="/hello" method="post"> 
        <input type="hidden" th:value="${_csrf.token}" th:name="${_csrf.parameterName}"> 
        <input type="submit" value="hello"> 
    </form> 
</body>
~~~

### 前后端分离方案

## JWT
### 简介
JWT，全称是 Json Web Token， 是一种 JSON 风格的轻量级的授权和身份认证规范，可实现无状态、
分布式的 Web 应用授权，JWT 作为一种规范，并没有和某一种语言绑定在一起，常用的 Java 实现是 GitHub 上的开源项目 [jjwt](https://github.com/jwtk/jjwt)。

### JWT数据格式
JWT 包含三部分数据：
- Header：头部，通常头部有两部分信息：
    - 声明类型，这里是JWT
    - 加密算法，自定义
- Payload：载荷，就是有效数据，
- Signature：签名，是整个数据的认证信息。一般根据前两步的数据，再加上服务的的密钥
secret（密钥保存在服务端，不能泄露给客户端），通过 Header 中配置的加密算法生成。用于验
证整个数据完整和可靠性。

### 交互流程
1. 应用程序或客户端向授权服务器请求授权
2. 获取到授权后，授权服务器会向应用程序返回访问令牌
3. 应用程序使用访问令牌来访问受保护资源（如 API）




