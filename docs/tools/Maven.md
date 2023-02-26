---
lang: zh-CN
title: Maven
description: tools 02
---
## Maven介绍
>maven是一个采用纯Java编写的开源项目管理工具。采用了一种被称之为POM(project object model)概念来管理项目，所有的项目配置信息都被定义在一个叫做pom.xml的文件中，通过该文件，maven可以管理项目的整个生命周期，包括编译，测试，打包，发布，运行等等。目前Apache下绝大多数项目都已经采用maven进行管理。而maven本身还支持多种插件，可以方便,灵活的控制项目。
>一句话：maven是一个项目管理和构建工具，主要对项目做编译，测试，打包，发布，运行等操作。

## Maven安装
### 下载
~~~
https://maven.apache.org/download.cgi
~~~

### 环境配置
~~~
和JDK的环境配置类似
MAVEN_HOME=maven安装路径
path=%MAVEN_HOME%\bin

然后在dos窗口：输入mvn -v查看版本号
~~~

## Maven项目创建
### 普通Java工程
~~~
mvn archetype:generate -DgroupId=com.qianfeng -DartifactId=myapp01 -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false

mvn: 指定使用maven构建工具
archetype:generate ：原型生成器
-D ： pom.xml文件中的一个属性,如果不存在就生成，如果存在就覆盖
groupId： 项目属于哪个组
artifactId：项目名称
archetypeArtifactId: 指定插件
interactiveMode: 是否开启交互模式
~~~
### JavaWeb工程
~~~
mvn archetype:generate -DgroupId=com.qianfeng -DartifactId=mywebapp01 -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
~~~

## 阿里云私服配置


### 修改本地(.m2)仓库

```
Maven的第一次运行命令的时候会从云端下载很多的文件,这些文件都保存到了我们本机的.m2这个maven的默认仓库里,这个仓库默认在windows电脑的C盘用户目录下,随着添加的依赖越来越多,这时候这个文件夹会越来越大,所以可以重新指定默认本地仓库的位置.

设置方式：
1. 找到我们Maven的安装位置
2. 里面有一个conf文件夹
3. conf里面有一个settings.xml文件
<localRepository>D:\soft\maven_repository</localRepository>
D:\soft\maven_repository是自定义的本地仓库路径
```

### 配置阿里云Maven私服镜像
```
<mirror>
  <id>alimaven</id>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>        
</mirror>
```

### 配置jdk的
~~~
<profile>
    <id>jdk-1.8</id>
    <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
    </activation>
    <properties>
        <Maven.compiler.source>1.8</Maven.compiler.source>
        <Maven.compiler.target>1.8</Maven.compiler.target>
        <Maven.compiler.compilerVersion>1.8</Maven.compiler.compilerVersion>
    </properties>
</profile>  
~~~
### 配置Tomcat
~~~
 <server>  
 <id>tomcat7</id>  
 <username>tomcat</username>  
 <password>tomcat</password>
 </server>
~~~
## 仓库
### 概念

> * 存储依赖的地方，体现形式就是本地的一个目录。
>
> * 仓库中不仅存放依赖，而且管理着每个依赖的唯一标识(坐标)，Java项目凭坐标获取依赖。

### 仓库分类

> 仓库分类如下：  
- 本地仓库 
- 私服 
- 公共仓库 
- 中央仓库

> 当需要依赖时，会从仓库中取查找，优先顺序为：
>
> 本地仓库  >  私服(如果配置了的话) > 公共仓库(如果配置了的话) > 中央仓库
>
> 本地仓库  >  公共仓库(阿里 华为)

### 本地仓库

> 即在[settings.xml]() 中配置的目录。
>
> 使用过了的依赖都会自动存储在本地仓库中，后续可以复用。

### 远程仓库

#### 中央仓库

> * Maven 中央仓库是由 Maven 社区提供的仓库，不用任何配置，maven中内置了中央仓库的地址。
>
> 其中包含了绝大多数流行的开源Java构件。
>
> * https://mvnrepository.com/ 可以搜索需要的依赖的相关信息（仓库搜索服务）
>
> http://repo.maven.apache.org/maven2/  中央仓库地址

#### 公共仓库:star:

> * 除中央仓库之外，还有其他远程仓库。
>   比如aliyun仓库（http://maven.aliyun.com/nexus/content/groups/public/）
>
> * 中央仓库在国外，下载依赖速度过慢，所以都会配置一个国内的公共仓库替代中央仓库。

## Idea-Maven
### idea配置maven
setting -> maven -> Maven home directory(maven目录) -> User settings file(配置文件) -> Local repository(本地仓库)

### 创建maven项目
创建简单的项目
创建web项目
### pom.xml 说明
~~~xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
   <!--项目的唯一的标识-->
  <groupId>com.qf</groupId>
  <artifactId>maven-02</artifactId>
  <version>1.0</version>
  <packaging>war</packaging>

  <name>maven-02 Maven Webapp</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <!--版本的锁定-->
  </properties>

  <!-- 导入JSP 和 Servlet 和 JSTL 依赖 -->
  <!--依赖 jar的坐标-->
  <!--重点-->
  <dependencies>
    <dependency>
      <!-- jstl 支持 -->
      <groupId>javax.servlet</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>
    <dependency>
      <!-- servlet编译环境 -->
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <!-- jsp编译环境 -->
      <groupId>javax.servlet</groupId>
      <artifactId>jsp-api</artifactId>
      <version>2.0</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>

  <!--构建  一般项目的插件-->

  <build>
    <finalName>maven-02</finalName>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.1.0</version>
        </plugin>
        <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.8.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-war-plugin</artifactId>
          <version>3.2.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>2.8.2</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>
~~~
### 打包方式
~~~
1.<packaging></packaging>    打包方式
2.分类
    jar ==>普通的java jar 包
    war ==>表示web项目  
    pom ==>表示是父工程  一般常用的java版本的锁定
~~~

## 依赖管理
### 基本概念
当A jar包需要用到B jar包中的类时，我们就说A对B有依赖。例如：commons-fileupload-1.3.jar依赖于commons-io-2.0.1.jar。

配置的基本形式是使用dependency标签指定目标jar包的坐标。例如：
~~~xml
<dependencies>
	<dependency>
		<!—坐标 -->
		<groupId>junit</groupId>
		<artifactId>junit</artifactId>
		<version>4.10</version>
		<!-- 依赖的范围 -->
		<scope>test</scope>
	</dependency>
</dependencies>
~~~

### 直接依赖和间接依赖

如果A依赖B，B依赖C，那么A→B和B→C都是直接依赖，而A→C是间接依赖。

### 依赖的范围

当一个Maven工程添加了对某个jar包的依赖后，这个被依赖的jar包可以对应下面几个可选的范围：

①compile

[1]main目录下的Java代码可以访问这个范围的依赖
[2]test目录下的Java代码可以访问这个范围的依赖

②test

[1]main目录下的Java代码不能访问这个范围的依赖
[2]test目录下的Java代码可以访问这个范围的依赖

③provided

[1]main目录下的Java代码可以访问这个范围的依赖
[2]test目录下的Java代码可以访问这个范围的依赖
例如：servlet-api在服务器上运行时，Servlet容器会提供相关API，所以部署的时候不需要。


### 依赖的传递性

当存在间接依赖的情况时，主工程对间接依赖的jar可以访问吗？这要看间接依赖的jar包引入时的依赖范围——只有依赖范围为compile时可以访问。例如：

### 依赖的原则：解决jar包冲突
①路径最短者优先
②路径相同时先声明者优先
这里“声明”的先后顺序指的是dependency标签配置的先后顺序。

### 依赖的排除
~~~
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>org.example</groupId>
  <artifactId>untitled3</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>

  <name>untitled3 Maven Webapp</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <!-- jstl 支持 -->
      <groupId>javax.servlet</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>
    <dependency>
      <!-- servlet编译环境 -->
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <!-- jsp编译环境 -->
      <groupId>javax.servlet</groupId>
      <artifactId>jsp-api</artifactId>
      <version>2.0</version>
      <scope>provided</scope>
      <exclusions>
        <exclusion>
          <groupId>javax.servlet</groupId>
          <artifactId>servlet-api</artifactId>
        </exclusion>
      </exclusions>
    </dependency>
  </dependencies>

  <build>

  </build>
</project>
~~~
### 统一管理jar包版本
~~~xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.itheima</groupId>
  <artifactId>maven_day02_1</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>
    <!-- 统一管理jar包版本 -->
    <properties>
      <spring.version>5.0.2.RELEASE</spring.version>
      <slf4j.version>1.6.6</slf4j.version>
      <log4j.version>1.2.12</log4j.version>
      <shiro.version>1.2.3</shiro.version>
      <mysql.version>5.1.6</mysql.version>
      <mybatis.version>3.4.5</mybatis.version>
      <spring.security.version>5.0.1.RELEASE</spring.security.version>
    </properties>

    <!--
    maven工程是可以分父子依赖关系的。
    凡是依赖别的项目后，拿到的别的项目的依赖包，都属于传递依赖。
    比如：当前A项目，被B项目依赖。那么我们A项目中所有jar包都会传递到B项目中。
    B项目开发者，如果再在B项目中导入一套ssm框架的jar包，对于B项目是直接依赖。
    那么直接依赖的jar包就会把我们A项目传递过去的jar包覆盖掉。
    为了防止以上情况的出现。我们可以把A项目中主要jar包的坐标锁住，那么其他依赖该项目的项目中，
    即便是有同名jar包直接依赖，也无法覆盖。
    -->
    <!-- 锁定jar包版本 -->
    <dependencyManagement>
      <dependencies>
        <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-context</artifactId>
          <version>${spring.version}</version>
        </dependency>
        <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-web</artifactId>
          <version>${spring.version}</version>
        </dependency>
        <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-webmvc</artifactId>
          <version>${spring.version}</version>
        </dependency>
        <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-tx</artifactId>
          <version>${spring.version}</version>
        </dependency>
        <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-test</artifactId>
          <version>${spring.version}</version>
        </dependency>
        <dependency>
          <groupId>org.mybatis</groupId>
          <artifactId>mybatis</artifactId>
          <version>${mybatis.version}</version>
        </dependency>
      </dependencies>
    </dependencyManagement>

    <!-- 项目依赖jar包 -->
    <dependencies>
      <!-- spring -->
      <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.6.8</version>
      </dependency>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-aop</artifactId>
        <version>${spring.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>${spring.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context-support</artifactId>
        <version>${spring.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>${spring.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-orm</artifactId>
        <version>${spring.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-beans</artifactId>
        <version>${spring.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>${spring.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>${spring.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>${spring.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-tx</artifactId>
        <version>${spring.version}</version>
      </dependency>
      <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
      </dependency>
      <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>${mysql.version}</version>
      </dependency>
      <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
      </dependency>
      <dependency>
        <groupId>javax.servlet.jsp</groupId>
        <artifactId>jsp-api</artifactId>
        <version>2.0</version>
        <scope>provided</scope>
      </dependency>
      <dependency>
        <groupId>jstl</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
      </dependency>
      <!-- log start -->
      <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>${log4j.version}</version>
      </dependency>
      <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>${slf4j.version}</version>
      </dependency>
      <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
        <version>${slf4j.version}</version>
      </dependency>
      <!-- log end -->
      <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>${mybatis.version}</version>
      </dependency>
      <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
        <version>1.3.0</version>
      </dependency>
      <dependency>
        <groupId>c3p0</groupId>
        <artifactId>c3p0</artifactId>
        <version>0.9.1.2</version>
        <type>jar</type>
        <scope>compile</scope>
      </dependency>
      <dependency>
        <groupId>com.github.pagehelper</groupId>
        <artifactId>pagehelper</artifactId>
        <version>5.1.2</version>
      </dependency>
      <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-web</artifactId>
        <version>${spring.security.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-config</artifactId>
        <version>${spring.security.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-core</artifactId>
        <version>${spring.security.version}</version>
      </dependency>
      <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-taglibs</artifactId>
        <version>${spring.security.version}</version>
      </dependency>
      <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.0.9</version>
      </dependency>
      <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
      </dependency>
    </dependencies>
    <!-- 添加tomcat7插件 -->
    <build>
      <plugins>
        <plugin>
          <groupId>org.apache.tomcat.maven</groupId>
          <artifactId>tomcat7-maven-plugin</artifactId>
          <version>2.2</version>
        </plugin>
      </plugins>
    </build>
</project>
~~~
## 使用命令来管理项目
~~~java
 1.mvn   compile    ==>是构建主程序的代码 不包含的test目录
 2.清除编译后的文件 
   mvn   clean  
 3.构建主程序的代码  构建test目录的代码  ==>编译这个两个目录的代码
 4. mvn   test  构建test目录
 5.mvn  package 将项目进行打包
 6.mvn   install  将项目打包放入本地仓库  提供给其它项目进行使用
~~~

## maven项目中的继承
## maven项目中聚合与拆分
## 使用内置tomcat
~~~
<plugin>
  <groupId>org.apache.tomcat.maven</groupId>
  <artifactId>tomcat7-maven-plugin</artifactId>
  <version>2.2</version>
  <configuration>
    <url>http://localhost/manager/text</url>
    <server>tomcat7</server>
    <username>tomcat</username>
    <password>tomcat</password>
    <port>80</port> ==> 修改端口号
    <path>/</path>  ==>修改访问的路径
  </configuration>
</plugin>
~~~