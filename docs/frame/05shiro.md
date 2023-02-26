---
lang: zh-CN
title: Shiro
description: 学习Shiro
---
## Shiro简介

>Apache Shiro是一个开源安全框架，提供身份验证、授权、密码学和会话管理。Shiro框架具有直观、易用等特性，同时也能提供健壮的安全性，虽然它的功能不如Spring Security那么强大，但是在普通的项目中也够用了。

### 下载
[Shiro官网](https://shiro.apache.org/)

### 演示
1.首先使用maven创建一个JavaSE工程
工程创建成功后在pom文件中添加如下依赖：

```xml
<dependency>
	<groupId>org.apache.shiro</groupId>
	<artifactId>shiro-all</artifactId>
	<version>RELEASE</version>
</dependency>
```

2.配置用户

参考quickstart项目中的shiro.ini文件，我们来配置一个用户，配置方式如下：首先在resources目录下创建一个shiro.ini文件，文件内容如下：

```
[users]
sa=123,admin
[roles]
admin=*
```

以上配置表示我们创建了一个名为sa的用户，该用户的密码是123，该用户的角色是admin，而admin具有操作所有资源的权限。
## Shiro 身份验证
即在应用中谁能证明他就是他本人。一般提供如他们的身份 ID 一些标识信息来表明他就是他本人，如提供身份证，用户名 / 密码来证明。
### 身份认证流程
- 首先调用 Subject.login(token) 进行登录，其会自动委托给 Security Manager，调用之前必须通过 SecurityUtils.setSecurityManager() 设置；
- SecurityManager 负责真正的身份验证逻辑；它会委托给 Authenticator 进行身份验证；
- Authenticator 才是真正的身份验证者，Shiro API 中核心的身份认证入口点，此处可以自定义插入自己的实现；
- Authenticator 可能会委托给相应的 AuthenticationStrategy 进行多 Realm 身份验证，默认 ModularRealmAuthenticator 会调用AuthenticationStrategy 进行多 Realm 身份验证；
- Authenticator 会把相应的 token 传入 Realm，从 Realm 获取身份验证信息，如果没有返回 / 抛出异常表示身份验证成功了。此处可以配置多个 Realm，将按照相应的顺序及策略进行访问。

## Shiro 授权
授权，也叫访问控制，即在应用中控制谁能访问哪些资源（如访问页面/编辑数据/页面操作等）。在授权中需了解的几个关键对象：主体（Subject）、资源（Resource）、权限（Permission）、角色（Role）。
### 授权方式
Shiro 支持三种方式的授权：

编程式：通过写 if/else 授权代码块完成：
~~~java
Subject subject = SecurityUtils.getSubject();
if(subject.hasRole(“admin”)) {
    //有权限
} else {
    //无权限
}
~~~
注解式：通过在执行的 Java 方法上放置相应的注解完成：
~~~java
@RequiresRoles("admin")
public void hello() {
    //有权限
}
~~~
没有权限将抛出相应的异常；

JSP/GSP 标签：在 JSP/GSP 页面通过相应的标签完成：
~~~
<shiro:hasRole name="admin">
<!— 有权限 —>
</shiro:hasRole>
~~~

## Realm
Realm：域，Shiro 从 Realm 获取安全数据（如用户、角色、权限），就是说 SecurityManager 要验证用户身份，那么它需要从 Realm 获取相应的用户进行比较以确定用户身份是否合法；也需要从 Realm 得到用户相应的角色 / 权限进行验证用户是否能进行操作；可以把 Realm 看成 DataSource，即安全数据源。在这个意义上说，**Realm 本质上是一个特定安全的DAO**：它封装了数据源的连接详细信息，使Shiro 所需的相关的数据可用。

### 登录流程
1. 应用程序代码调用Subject.login方法，传递创建好的包含终端用户的Principals(身份)和Credentials(凭证)的AuthenticationToken实例(即上文例子中的UsernamePasswordToken)。
2. Subject实例，通常是DelegatingSubject（或子类）委托应用程序的SecurityManager通过调用securityManager.login(token)开始真正的验证工作(在DelegatingSubject类的login方法中打断点即可看到)。
3. SubjectManager作为一个基本的“保护伞”的组成部分，接收token以及简单地委托给内部的Authenticator实例通过调用authenticator.authenticate(token)。这通常是一个ModularRealmAuthenticator实例，支持在身份验证中协调一个或多个Realm实例。ModularRealmAuthenticator本质上为Apache Shiro 提供了PAM-style 范式（其中在PAM 术语中每个Realm 都是一个'module'）。
4. 如果应用程序中配置了一个以上的Realm，ModularRealmAuthenticator实例将利用配置好的AuthenticationStrategy来启动Multi-Realm认证尝试。在Realms 被身份验证调用之前，期间和以后，AuthenticationStrategy被调用使其能够对每个Realm的结果作出反应。如果只有一个单一的Realm 被配置，它将被直接调用，因为没有必要为一个单一Realm的应用使用AuthenticationStrategy。
5. 每个配置的Realm用来帮助看它是否支持提交的AuthenticationToken。如果支持，那么支持Realm的getAuthenticationInfo方法将会伴随着提交的token被调用。

### Realm的继承关系
Realm的子类实际上有很多种，这里我们就来看看有代表性的几种：
1. IniRealm 
2. PropertiesRealm
3. JdbcRealm

#### 使用JdbcRealm
1. 准备工作
~~~xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>RELEASE</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.27</version>
</dependency>
~~~
2. 数据库创建
3. 配置文件处理
将shiro.ini中的所有配置注释掉，添加如下配置：
~~~properties
jdbcRealm=org.apache.shiro.realm.jdbc.JdbcRealm
dataSource=com.alibaba.druid.pool.DruidDataSource
dataSource.driverClassName=com.mysql.jdbc.Driver
dataSource.url=jdbc:mysql://localhost:3306/shiroDemo
dataSource.username=root
dataSource.password=1234
jdbcRealm.dataSource=$dataSource
jdbcRealm.permissionsLookupEnabled=true
securityManager.realms=$jdbcRealm
~~~
4. 测试
5. 自定义查询SQL

### Realm的多Realm认证策略
1. 首先获取多Realm认证策略

2. 构建一个AuthenticationInfo用来存放一会认证成功之后返回的信息

3. 遍历Realm，调用每个Realm中的getAuthenticationInfo方法，看是否能够认证成功

4. 每次获取到AuthenticationInfo之后，都调用afterAttempt方法进行结果合并

5. 遍历完所有的Realm之后，调用afterAllAttempts进行结果合并，这里主要判断下是否一个都没匹配上

## 编码/加密
Shiro 提供了 base64 和 16 进制字符串编码 / 解码的 API 支持，方便一些编码解码操作。Shiro 内部的一些数据的存储 / 表示都使用了 base64 和 16 进制字符串。
编码方式：

- 编码（Base64）
- 加密
  - 可逆加密（可以根据密文解析出明文）：
    - 对称加密：加密密钥和解密密钥一致，DES、3DES、AES
    - 非对称加密：公钥负责加密、私钥负责解密。RSA
  - 不可逆加密（根据密文无法解析出明文）
    - MD5\SHA 等都是不可逆加密

密码加密我们一般会用到散列函数，又称散列算法、哈希函数，是一种从任何一种数据中创建小的数字“指纹”的方法。
我们常用的散列函数有：
- MD5消息摘要算法
- 安全散列算法
### Shiro中如何加密
~~~java
Md5Hash md5Hash = new Md5Hash("123", null, 1024);

Sha512Hash sha512Hash = new Sha512Hash("123", null, 1024);

SimpleHash md5 = new SimpleHash("md5", "123", null, 1024);
SimpleHash sha512 = new SimpleHash("sha-512", "123", null, 1024);
~~~

## Shiro中密码加盐
不管是消息摘要算法还是安全散列算法，如果原文一样，生成密文也是一样的，这样的话，如果两个用户的密码原文一样，存到数据库中密文也就一样了，还是不安全，我们需要做进一步处理，常见解决方案就是加盐。盐从那里来呢？我们可以使用用户id（因为一般情况下，用户id是唯一的），也可以使用一个随机字符，我这里采用第一种方案。
### 如何实现加盐
在用户注册时生成密码密文时，就要加入盐，如下几种方式：
~~~java
Md5Hash md5Hash = new Md5Hash("123", "sa", 1024);
Sha512Hash sha512Hash = new Sha512Hash("123", "sa", 1024);
SimpleHash md5 = new SimpleHash("md5", "123", "sa", 1024);
SimpleHash sha512 = new SimpleHash("sha-512", "123", "sa", 1024)
~~~

| SaltStyle | 含义                                                         |
| :-------- | ------------------------------------------------------------ |
| NO_SALT   | 默认，密码不加盐                                             |
| CRYPT     | 密码是以Unix加密方式储存的                                   |
| COLUMN    | salt是单独的一列储存在数据库中                               |
| EXTERNAL  | salt没有储存在数据库中，需要通过JdbcRealm.getSaltForUser(String)函数获取 |

## Shiro整合Spring
除了Spring、SpringMVC、Shiro相关的依赖，还需要加入Shiro和Spring整合的jar
~~~xml
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-spring</artifactId>
    <version>RELEASE</version>
</dependency>
~~~
搭建好Spring+SpringMVC环境之后，整合Shiro我们主要配置两个地方：
1. web.xml中配置代理过滤器
~~~xml
<filter>
    <filter-name>shiroFilter</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
    <init-param>
        <param-name>targetFilterLifecycle</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>shiroFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
~~~
2. 配置Spring容器
在Spring容器中至少有两个Bean需要我们配置，一个就是第一步中的shiroFilter，还有一个就是SecurityManager，完整配置如下：
~~~xml
<bean class="org.apache.shiro.web.mgt.DefaultWebSecurityManager" id="securityManager">
</bean>
<bean class="org.apache.shiro.spring.web.ShiroFilterFactoryBean" id="shiroFilter">
    <property name="securityManager" ref="securityManager"/>
    <property name="loginUrl" value="/login.jsp"></property>
    <property name="successUrl" value="/success.jsp"/>
    <property name="unauthorizedUrl" value="/unauthorized.jsp"/>
    <property name="filterChainDefinitions">
        <value>
            /**=authc
        </value>
    </property>
</bean>
~~~

## Shiro处理登录的三种方式
准备工作，不管是那种登录，都离不开数据库，首先配置JdbcRealm，在applicationContext.xml中首先配置数据源，如下：
~~~xml
<context:property-placeholder location="classpath:db.properties"/>
<bean class="com.alibaba.druid.pool.DruidDataSource" id="dataSource">
    <property name="username" value="${db.username}"/>
    <property name="password" value="${db.password}"/>
    <property name="url" value="${db.url}"/>
</bean>
~~~
接下来配置JdbcRealm，如下：
~~~xml
<bean class="org.apache.shiro.realm.jdbc.JdbcRealm" id="jdbcRealm">
    <property name="dataSource" ref="dataSource"/>
    <property name="credentialsMatcher">
        <bean class="org.apache.shiro.authc.credential.HashedCredentialsMatcher">
            <property name="hashAlgorithmName" value="sha-512"/>
            <property name="hashIterations" value="1024"/>
        </bean>
    </property>
    <property name="saltStyle" value="COLUMN"/>
    <property name="authenticationQuery" value="select password, username from users where username = ?"/>
</bean>
~~~
### 基于HTTP的认证
~~~xml
<bean class="org.apache.shiro.spring.web.ShiroFilterFactoryBean" id="shiroFilter">
    <property name="securityManager" ref="securityManager"/>
    <property name="filterChainDefinitions">
        <value>
            /**=authcBasic
        </value>
    </property>
</bean>
~~~

### 表单登录
表单登录和基于HTTP的登录类似，都是不需要我们自己写登录逻辑的登录，但是出错的逻辑还是要稍微处理下，首先修改shiroFilter：
~~~xml
<bean class="org.apache.shiro.spring.web.ShiroFilterFactoryBean" id="shiroFilter">
    <property name="securityManager" ref="securityManager"/>
    <property name="loginUrl" value="/login"/>
    <property name="successUrl" value="/success.jsp"/>
    <property name="filterChainDefinitions">
        <value>
            /**=authc
        </value>
    </property>
</bean>
~~~
### 注销登录
注销登录比较简单，就一个过滤器，按如下方式配置：
~~~xml
<property name="filterChainDefinitions">
    <value>
        /logout=logout
        /**=authc
    </value>
</property>
~~~
### 配置权限
首先要在jdbcRealm中添加允许权限信息的查询：

```xml
<property name="permissionsLookupEnabled" value="true"/>
```

然后配置下shiroFilter：

```xml
<property name="filterChainDefinitions">
    <value>
        /admin.jsp=authc,roles[admin]
        /user.jsp=authc,roles[user]
        /userinfo.jsp=authc,perms[user:info]
        /bookinfo.jsp=authc,perms[book:info]
        /logout=logout
        /**=authc
    </value>
</property>
```

## Shiro中的JSP标签
shiro中的标签并不多，主要有如下几种：

1. shiro:guest

shiro:guest标签只有在当前未登录时显示里边的内容，如下：

```
<shiro:guest>
    欢迎【游客】访问!
</shiro:guest>
```

2. shiro:user

shiro:user是在用户登录之后显示该标签中的内容，无论是通过正常的登录还是通过Remember Me登录，如下：

```
<shiro:user>
    欢迎【<shiro:principal/>】访问!
</shiro:user>
```

3. shiro:principal

shiro:principal用来获取当前登录用户的信息，显示效果如下：


4. shiro:authenticated

和shiro:user相比，shiro:authenticated的范围变小，当用户认证成功且不是通过Remember Me认证成功，这个标签中的内容才会显示出来：

```
<shiro:authenticated>
    用户【<shiro:principal/>】身份认证通过，不是通过Remember Me认证!
</shiro:authenticated>
```

5. shiro:notAuthenticated

shiro:notAuthenticated也是在用户未认证的情况下显示内容，和shiro:guest不同的是，对于通过Remember Me方式进行的认证，shiro:guest不会显示内容，而shiro:notAuthenticated会显示内容(因为此时并不是游客，但是又确实未认证)，如下：

```
<shiro:notAuthenticated>
    用户未进行身份认证
</shiro:notAuthenticated>
```

6. shiro:lacksRole

当用户不具备某个角色时候，显示内容，如下：

```
<shiro:lacksRole name="admin">
    用户不具备admin角色
</shiro:lacksRole>
```

7. shiro:lacksPermission

当用户不具备某个权限时显示内容：

```
<shiro:lacksPermission name="book:info">
    用户不具备book:info权限
</shiro:lacksPermission>
```

8. shiro:hasRole

当用户具备某个角色时显示的内容：

```
<shiro:hasRole name="admin">
    <h3><a href="/admin.jsp">admin.jsp</a></h3>
</shiro:hasRole>
```

9. shiro:hasAnyRoles

当用户具备多个角色中的某一个时显示的内容：

```
<shiro:hasAnyRoles name="user,aaa">
    <h3><a href="/user.jsp">user.jsp</a></h3>
</shiro:hasAnyRoles>
```

10. shiro:hasPermission

当用户具备某一个权限时显示的内容：

```
<shiro:hasPermission name="book:info">
    <h3><a href="/bookinfo.jsp">bookinfo.jsp</a></h3>
</shiro:hasPermission>
```

## Shiro 中的缓存机制

### 添加依赖

使用缓存，首先需要添加相关依赖，如下：

```xml
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-ehcache</artifactId>
    <version>1.4.0</version>
</dependency>
```

### 添加配置文件

ehcache的配置文件主要参考官方的配置，在resources目录下创建ehcache.xml文件，内容如下：

```xml
<ehcache>
    <diskStore path="java.io.tmpdir/shiro-spring-sample"/>
    <defaultCache
            maxElementsInMemory="10000"
            eternal="false"
            timeToIdleSeconds="120"
            timeToLiveSeconds="120"
            overflowToDisk="false"
            diskPersistent="false"
            diskExpiryThreadIntervalSeconds="120"
    />
    <cache name="shiro-activeSessionCache"
           maxElementsInMemory="10000"
           eternal="true"
           overflowToDisk="true"
           diskPersistent="true"
           diskExpiryThreadIntervalSeconds="600"/>
    <cache name="org.apache.shiro.realm.SimpleAccountRealm.authorization"
           maxElementsInMemory="100"
           eternal="false"
           timeToLiveSeconds="600"
           overflowToDisk="false"/>
</ehcache>
```

这些都是ehcache缓存中常规的配置，含义我就不一一解释了，文末下载源码有注释。

### 缓存配置

接下来我们只需要在applicationContext中简单配置下缓存即可，配置方式如下：

```xml
<bean class="org.apache.shiro.cache.ehcache.EhCacheManager" id="cacheManager">
    <property name="cacheManagerConfigFile" value="classpath:ehcache.xml"/>
</bean>
<bean class="org.apache.shiro.web.mgt.DefaultWebSecurityManager" id="securityManager">
    <property name="realm" ref="jdbcRealm"/>
    <property name="cacheManager" ref="cacheManager"/>
</bean>
```

首先配置EhCacheManager类，指定缓存位置，然后在DefaultWebSecurityManager中引入cacheManager即可，如此之后，我们的缓存就应用上了。
