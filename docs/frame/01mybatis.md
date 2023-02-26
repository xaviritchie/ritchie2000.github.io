---
lang: zh-CN
title: MyBatis
description: 学习MyBatis
---
## 概述
### 1.框架
>framework,对通用代码的封装，是提前写好的一堆接口和类。
>SSM:Spring + SpringMVC + MyBatis
>SpringBoot
>SpringCloud

>MyBatis就是封装了JDBC


### 2. 三层框架
~~~q
Web前端 -Ajax- 表现层
			   业务层
			   持久层
			   数据库
~~~
### 3.JDBC不足
~~~q
sql语句写死在java程序中，改sql就要改java代码，违背开闭原则OCP；
给？传值繁琐；
将结果集封装到java对象也繁琐。
~~~

### 4.了解ORM思想
>MyBatis是对于dao持久层的框架
>轻量级
>支持动态sql
>sql与代码分离

>MyBatis是一个半自动ORM（object relation mapping）映射的框架。对象关系映射。
>	O -> JVM中的Java对象
>	R -> 关系型数据库
>	M -> 映射【一个对象<->表中一条记录】
>半自动：sql要程序员自己写

>官网下载
>https://blog.mybatis.org/
>官方文档
>https://mybatis.net.cn/


## 入门
### 1. 建一个空项目
~~~q
1. New Project
2. Empty Project
3. Project Structure -> Project选择JDK版本
4. Settings -> Maven选择版本以及配置文件和仓库
~~~

>注意：
>如果不显示项目名
>关闭idea
>删除本地目录中该项目对应的.idea文件
>重新打开idea即可


### 2. 第一个maven项目配置
>点住空项目名。右键new Module...
>选择Maven模板
>右下角：Enable -Auto

~~~xml
<!-- 1.在pom文件中设置打包方式 --> 
<packaging>jar</packaging>
<!-- 2.引入相关依赖 -->
<dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.4.5</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.6</version>
        </dependency>
	<!-- 引入logback依赖，它实现了slf4j规范 -->
        <!-- https://mvnrepository.com/artifact/ch.qos.logback/logback-classic -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.11</version>
            <scope>test</scope>
        </dependency>
        
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.10</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.24</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
~~~

~~~
3. 编写xml核心配置文件，用于配置数据库等
mybatis-config.xml
从官网拷
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
      </dataSource>
    </environment>
  </environments>
  <mappers>
  <!-- 指定XxxMapper.xml文件的路径,从resource根路径开始找 -->
    <mapper resource="org/mybatis/example/BlogMapper.xml"/>
  </mappers>
</configuration>
~~~

~~~xml
还有一个XxxMapper.xml文件，专门用来编写sql语句
一般一个表对应一个Mapper.xml文件
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- namespace是咖啡豆的根路径 -->
<mapper namespace="org.mybatis.example.BlogMapper">
  <select id="selectBlog" resultType="Blog">
    select * from Blog where id = #{id}
  </select>
</mapper>
~~~

### 3. 目录解释
>1.environments ==>表示环境的配置 可以配置多个环境 
>2.environment id="mysql" 指定是mysql的环境 
>3.transactionManager 配置事务管理器 
>它的type有两种
>JDBC:表示使用jdbc 的方式来进行事务的管理,底层实例化JdbcTransaction对象
>MANAGED:没有做任何操作 依赖于容器 以容器的方式的来进行事务管理，底层实例化ManagedTransaction对象
>spring +mybatis ==设置参数MANAGED 表示已容器spring的方式来进行事务的管理 
>4.dataSource ==>数据源 
>POOLED ==> 表示一连接池的方式来管理连接 不会反复的创建与销毁连接 ，适用于开发测试环境。
>UNPOOLED ==> 不使用连接池的方式来进行管理连接 使用的时候都创建连接与销毁连接 ，适用于小规模。
>JNDI==>必须在web环境，依赖于web容器 在tomcat 中可以进行配置(重点)，生产环境优先使用这种。

### 4. 工具类
#### 4.1 SqlSessionFactoryUtil
~~~java
public enum SqlSessionFactoryUtil {
    // 单例
    SSF;
    private SqlSessionFactory sqlSessionFactory;

    SqlSessionFactoryUtil() {
        try {
			// 从resources根路径开始的目录
            InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    /**
     * 定义一个公有的方法返回sqlSessionFactory
     */
    public SqlSessionFactory getSqlSessionFactory() {
        return sqlSessionFactory;
    }
}
~~~

#### 4.2 CommentMapper
~~~java
public class CommentMapper {
    public SqlSession sqlSession;

    @Before
    public void before() {
		/* autoCommit是true，就表示没有开启事务，建议空着，开始事务 */
        sqlSession = SqlSessionFactoryUtil.SSF.getSqlSessionFactory().openSession(true);
    }

    @After
    public void after() {
        //关闭资源
        sqlSession.close();
    }
}
~~~

### 5. 日志logback
>1. 在pom文件中添加依赖
~~~xml
<dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.11</version>
            <scope>test</scope>
        </dependency>
~~~

>2. 引入logback必须的xml配置文件
~~~java
// 文件名必须是logback.xml或者logback-test.xml，不能是其他名字
// 必须放在类的根路径下，不能是其他位置
~~~

~~~xml
<?xml version="1.0" encoding="UTF-8"?>

<!-- 配置文件修改时重新加载，默认true -->
<configuration debug="false">

    <!-- 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder" charset="UTF-8">
            <!-- 格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg:日志消息，%n是换行符 -->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
    </appender>

    <!--    mybatis log configure-->
    <logger name="com.apache.ibatis" level="TRACE"/>
    <logger name="java.sql.Connection" level="DEBUG"/>
    <logger name="java.sql.Statement" level="DEBUG"/>
    <logger name="java.sql.PreparedStatement" level="DEBUG"/>


    <!-- 日志输出级别,LOGBACK日志级别包括五个：TRACE < DEBUG < INFO < WARN < ERROR-->
    <root level="DEBUG">
        <appender-ref ref="STDOUT"/>
        <appender-ref ref="FILE"/>
    </root>
</configuration>
~~~

### 6.老杜版本SqlSessionUtil
~~~java
public class SqlSessionUtil {
    private SqlSessionUtil() {
    }

    private static SqlSessionFactory sqlSessionFactory;

    static {
        try {
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 全局的，服务器级别的，一个服务器当中定义一个即可
     */
    private static ThreadLocal<SqlSession> local = new ThreadLocal<SqlSession>();

    public static SqlSession openSession() {
        SqlSession sqlSession = local.get();
        if (sqlSession == null) {
            sqlSession = sqlSessionFactory.openSession();
            // 将sqlSession绑定到当前线程上，只绑定一次
            local.set(sqlSession);
        }
        return sqlSession;
    }
	
	public static void close(SqlSession sqlSession){
        if (sqlSession != null) {
            sqlSession.close();
            // 注意移除SqlSession对象和当前线程的绑定关系
            // 因为Tomcat服务器支持线程池
            local.remove();
        }
    }

}
~~~

## 增删改查
>#{} 相当于JDBC里的问号？
>XxxMapper.xml里面的crud语句，注释掉的话，要用\<!-- -->
>#{abc}是去entity类里面找对应的getAbc方法

~~~java
insert
delete
update

select
~~~

>namespace是为了防止id冲突，完整的应该写成
>sqlSession.方法名(namespace.id)
>MyBatis规定namespace必须是dao接口的全限定类名，
>if必须是dao接口中的方法名。

>dao以后改叫mapper
select标签的resultType是pojo/entity的全限定名


>resource都是从根路径开始
>增删改查方法有两个参数：
>一个是sql语句的id，从XxxMapper.xml中复制过来，另一个是对象，该对象封装了sql语句中的所有占位符参数#{}

~~~java
XxxDaoImpl中的sqlSession调用的方法，传入参数，如果只有一个参数，那么在XxxMapper.xml中的sql语句里的#{}里可以随便写。
但建议见名知意。
如果是多参数，必须跟实体类Dao对应上。
~~~

~~~注意
WEB-INF目录下的web.xml文件
<web-app>标签中的metadata-complete=“false”的时候才是支持注解的，
如果是true，那么serlvet上面是不支持注解的。
~~~

#### 批量删除
拼接表名${}

deleted  from xx where id in（${}）


#### 模糊查询
xxx like “%”#{xxx}“%”

#### insert
useGeneratedKeys=''true''使用自动生成的主属性
keyProperty="id"指定主键值赋值给对象的哪个属性
insert into xxx values（null，xx，xxx）
就是给表的主属性id自动生成

## Java生成类
>是一个开源的分析、编辑和创建Java字节码的类库。通过使用Javassist对字节码操作作为JBoss实现动态“AOP”框架。

就不用写DaoImpl类

### Javassist使用
引入依赖
~~~xml
<!-- https://mvnrepository.com/artifact/org.javassist/javassist -->
<dependency>
    <groupId>org.javassist</groupId>
    <artifactId>javassist</artifactId>
    <version>3.28.0-GA</version>
</dependency>

~~~

## 类型别名（typeAliases)
~~~q
在config文件中，<typeAliases>标签，
里面的type写的是com.xxx.pojo.User
alias写的是自己指定的别名,不区分大小写
~~~

>注意：
>Mybatis核心配置文件是有顺序的！！！

~~~q
给所有类起别名，使用简明作为别名，不区分大小写。
<package name="com.xxx.pojo">
~~~

namespace不能起别名

## 参数处理
XxxMapper方法里面的参数

### Param注解
多参数用这个
eg. User selectUser(@Param("name") String name,@Param("age")int age);

### 返回Map
返回的数据没有合适的实体类对应，可采用Map集合接收，字段名是key，字段值做value。
>返回一个Map<String, Object> selectById(Long id);
返回多个List<Map<String, Object>> selectAll();

在XxxMapper接口上加一个@MapKey("id")

ResultMap封装结果映射
~~~xml
两个结果集id要一致
<resultMap id="结果集id" type="Xxx">
	
	<result property="属性名" column="数据库表名"/>
	<result property="属性名" column="数据库表名"/>
</resultMap>	
<select id="xxx" resultMap="结果集id">
</select>	
~~~

#### 开启驼峰命名自动映射
属性名必须遵循Java命名规范
~~~xml
<settings>
	<setting name="xxxx" value="true"/>
</settings>	
~~~


#### 返回总记录条数
count（1）或count（*）都可以
count（字段名）的话会去除null

## 动态SQL
### if标签
~~~xml
<select id="">
        select * from table where 1=1
        /*
            if标签中的test属性是必须的
            test值是false或true
            如果true则sql语句会拼接，反之不拼接
            @Param，有pojo就写属性名
            and表示并且，不能使用&&
        */
        <if test="uName != null and uName !=''">
            and age >= 18;
        </if>
        <if test="里面是Boolean类型">
            and
        </if>
    </select>
~~~

### where标签
~~~xml
<select id="">
        select * from table
        /* where标签可以智能的去掉前面的and，但我们写的时候，and都写上*/
        <where>
            <if test="uName != null and uName !=''">
                and age >= 18;
            </if>
            <if test="">
                and
            </if>
        </where>
    </select>
~~~

### trim标签
~~~xml
<!-- trim
        prefix:加前缀
        suffix：加后缀
        prefixOverrides：删除前缀
        suffixOverrides：删除后缀
    -->
    <select id="">
        select * from table
        <trim prefixOverrides="" suffix="" prefix="" suffixOverrides=""></trim>
        /*prefix="where" 在trim标签所有内容前加where
        suffixOverrides="and|or"把trim标签中内容的后缀and或or去掉
        */
        <trim prefix="where" suffixOverrides="and|or">
            <if test="uName != null and uName !=''">
                hobby like "%"#{hobby}"%" and
            </if>
        </trim>
    </select>
~~~

### set标签
~~~xml
<!-- set标签
        拼接set，可以智能的去掉句尾的,
     -->
    <update id="">
        update table_name
        <set>
            <if test="">
                .....,
            </if>
        </set>
        where
            id =#{id}
    </update>
~~~

### choose when otherwise标签
~~~xml
<!-- choose when otherwise -->
    <!-- 一般三个标签一起用，保证至少会有一个执行 -->
    <!-- 等同于 if ， else if ，else if, else-->
    <!-- when相当于else if ，otherwise相当于最后的else-->
    <select id="">
        select * from table_name
        <where>
            <choose>
                <when test="true">
                    // 前面不用加and
                </when>
                <otherwise>

                </otherwise>
            </choose>
        </where>
    </select>
~~~

### foreach标签
~~~xml
<!-- foreach
        collection:指定数组或集合
        item：代表数组或集合中的元素
        separator:循环之间的分隔符
        open:foreach循环拼接的所有sql语句的最前面以什么开始，eg.(
        close：foreach循环拼接的所有sql语句最后面以什么结束,eg.)
        这个括号是整个语句前面的，只有一个，循环之外
    -->
    <select id="deletedByIds">
        delete from t where id in(
        <foreach collection="" item="" separator=",">
            #{aaaa}
        </foreach>
        )
    </select>

    <!--批量插入-->
    <insert id="">
        insert into table_name values
        <foreach collection="" item="" separator=",">
            (null,#{},#{},#{})
        </foreach>
    </insert>

    <!-- 批量删除 -->
    <delete id="">
        delete from table_name where
        <foreach collection="" item="" separator="or">
            id=#{}
        </foreach>
    </delete>
~~~

### sql和include标签
~~~xml
<!--sql标签，include标签-->
    <sql id="起一个id名">
        //重复出现的代码放这里
    </sql>
    <select id="" resultMap="">
        // include到这里就可以引用了
        <include refid="起一个id名"></include>
    </select>
~~~

## 高级映射，延迟加载
>多表间的映射 -- 高级映射

>eg.学生表Student班级表Clazz
>多个学生对一个班级
**如何分主表和副表？**
>谁在前谁就是主表
>多在前多就是主表，一在前依旧是主表

### 多对一
>多是主表

~~~xml
<!--多对一，方式1：一条SQL，级联属性映射-->
    <resultMap id="studentResultMap" type="student">
        <!--column里面查的值赋给property-->
        <id property="sid" column="sid"></id>
        <result property="sname" column="sid"/>
        <!--clazz是student类里的班级属性-->
        <result property="clazz.cid" column="cid"/>
        <result property="clazz.cname" column="cname"/>
    </resultMap>
    <select id="selectById" resultMap="studentResultMap">
        select
            s.sid, s.sname, c.cid, c.cname
        from
        /*左外连接就是左表为主表，on后面是条件*/
            t_stu s left join t_clz c on s.cid = c.cid
        where
            s.sid = #{sid}
    </select>
~~~

~~~xml
<!--多对一，方式二：一条SQL，association-->
    <resultMap id="studentResultMapAssociation" type="Studnet">
        <id property="sid" column="sid"/>
        <result property="sname" column="sname"/>
        <!--一个Student关联一个Clazz,javaType用来指定需要映射的java类型-->
        <association property="clazz" javaType="Clazz">
            <id property="cid" column="cid"/>
            <result property="cname" column="cname"/>
        </association>
    </resultMap>
    <select id="selectByIdAssociation" resultMap="studentResultMapAssociation">
        select
            s.sid, s.sname, c.cid, c.cname
        from
            t_stu s left join t_clz c on s.cid = c.cid
        where
            s.sid = #{sid}
    </select>
~~~

~~~xml
<!--多对一，方式三：两条SQL分布查询，优点：可复用，支持懒加载-->
    <!--延迟加载（懒加载），用的时候载执行查询，不用的时候不查询
        实际开发中，一般都会设置全局懒加载，在<setting name="lazyLoadingEnabled" value="true">
    -->
    <!--两条SQL需要写两个Mapper.xml-->
    <resultMap id="studentResultMapByStep" type="">
        <id property="sid" column="sid"/>
        <result property="sname" column="sname"/>
        <association property="clazz"
                     select=""
                     column=""
                     fetchType="eager"/>
        <!--fetchType="eager"关闭改查询的懒加载-->
    </resultMap>

    <select id="" resultMap="studentResultMapByStep">
    </select>
~~~

### 一对多
>一是主表
~~~xml
<resultMap id="" type="">
        <id property="cid" column=""/>
        <result property="cname" column="cname"/>
        <!-- 一对多 这里用collection
        ofType属性用来指定集合当中的元素类型 -->
        <collection property="stus" ofType="Student">
            <id property="sid" column="sid"/>
            <result property="sname" column="sname"/>
        </collection>
    </resultMap>
    <select id="" resultMap="">

    </select>
~~~

~~~xml
<!--一对多，方式二-->
    <resultMap id="" type="">
        <id property="cid" column="cid"></id>
        <result property="cname" column="cname">
        </result>
        <collection property="stus"
                    select="sql语句id，就是对应接口上的方法，右键copy reference"
                    column="cid"/>
        <!--这里的cid，跟下面select 【cid】 from xxx 要对应-->
    </resultMap>

    <select id="" resultMap="">
        select cid,cname from t_clz where cid=#{cid}
    </select>
~~~

### 多对多
>分解成两个一对多

## 缓存Cache
>一级缓存：将查询的数据存储到SqlSession中
>二级缓存：将查询的数据存储到SqlSessionFactory中
>集成第三方缓存：eg.EhCache、MemCache等

缓存只针对DQL语句，也就是说缓存机制只对应select语句

只要执行一次增删改，缓存（包括一二级）就会清空
手动清空一级缓存的方法：sqlSession.clearCache();

>默认情况下，MyBatis的二级缓存是开启的
~~~xml
<setting name ="cacheEnable" vlaue="true">全局性开启或关闭所有映射器配置文件中已配置的任何缓存，默认是true，无需设置
~~~
使用二级缓存要保证实力类是可序列化的，也就是要实现Serializable接口。
SqlSession对象关闭或提交之后，一级缓存中的数据才会被写入到二级缓存中，此时二级缓存才可用。
在需要使用二级缓存的SqlMapper.xml中添加配置：
~~~xml
<cache/>
~~~


### 集成EhCache
集成第三方缓存是为了代替mybatis自带的二级缓存，一级缓存是无法替代的。

## 逆向
就是根据数据库表逆向生成Java的POJO类，SqlMapper.xml文件，以及Mapper接口等。
需要借助逆向工程插件。
#### 基础环境搭建
在pom.xml中加入插件依赖
~~~xml
<!--定制构建过程-->
    <build>
        <!--可配置多个插件-->
        <plugins>
            <!--其中的一个插件：mybatis逆向工程插件-->
            <plugin>
                <!--插件的GAV坐标-->
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>1.4.1</version>
                <!--允许覆盖-->
                <configuration>
                    <overwrite>true</overwrite>
                </configuration>
                <!--插件的依赖-->
                <dependencies>
                    <!--mysql驱动依赖-->
                    <dependency>
                        <groupId>mysql</groupId>
                        <artifactId>mysql-connector-java</artifactId>
                        <version>8.0.30</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>
~~~

在gfneratorConfig.xml中设置
~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!--
    targetRuntime有两个值：
    MyBatis3Simple：生成的是基础版，只有基本的增删改查。
    MyBatis3：生成的是增强版，除了基本的增删改查之外还有复杂的增删改查。
    -->
    <context id="DB2Tables" targetRuntime="MyBatis3">
        <!--防止生成重复代码-->
        <plugin type="org.mybatis.generator.plugins.UnmergeableXmlMappersPlugin"/>
        <commentGenerator>
            <!--是否去掉生成日期-->
            <property name="suppressDate" value="true"/>
            <!--是否去除注释-->
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>
        <!--连接数据库信息-->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/powernode"
                        userId="root"
                        password="root">
        </jdbcConnection>
        <!-- 生成pojo包名和位置 -->
        <javaModelGenerator targetPackage="com.powernode.mybatis.pojo" targetProject="src/main/java">
            <!--是否开启子包-->
            <property name="enableSubPackages" value="true"/>
            <!--是否去除字段名的前后空白-->
            <property name="trimStrings" value="true"/>
        </javaModelGenerator>
        <!-- 生成SQL映射文件的包名和位置 -->
        <sqlMapGenerator targetPackage="com.powernode.mybatis.mapper" targetProject="src/main/resources">
            <!--是否开启子包-->
            <property name="enableSubPackages" value="true"/>
        </sqlMapGenerator>
        <!-- 生成Mapper接口的包名和位置 -->
        <javaClientGenerator
                type="xmlMapper"
                targetPackage="com.powernode.mybatis.mapper"
                targetProject="src/main/java">
            <property name="enableSubPackages" value="true"/>
        </javaClientGenerator>
        <!-- 表名和对应的实体类名-->
        <table tableName="t_car" domainObjectName="Car"/>
    </context>
</generatorConfiguration>
~~~
**怎么用？**
>点开右边的maven -> plugins -> mybstis-generator -> mybatis-genrator:generate
>双击即可

查一个selectByPrimaryKey  
查所有selectByExample


## 分页PageHelper
### limit分页
~~~xml
select * from t_car limit 2；
select * from t_car limit 0，2；
这两个是等效的
第一个数字是开始的下标，第二个是需要显示的记录条数
第一条记录的下标是0
~~~
>第pageNum页：
>limit (pageNum-1)*pageSize, pageSize

### PageHelper
[官方网站](https://pagehelper.github.io/)
>第一步：引入依赖
~~~xml
<dependency>
<groupId>com.github.pagehelper</groupId>
<artifactId>pagehelper</artifactId>
<version>5.3.1</version>
</dependency>
~~~

>第二步：在mybatis-config.xml中配置分页拦截器
~~~xml
<plugins>
<plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
</plugins>
~~~

>第三步：写代码
~~~
一定要在DQL语句前，开启分页功能
int pageNum = 2;
int pageSize = 3;
// 开启分页
PageHelper.startPage(pageNum, pageSize);
// 执行查询
mapper.selectAll();
// 获取分页信息,5是代号页码
new PageInfo<>(cars, 5);
~~~

## 注释
~~~
在接口类中写，XxxMapper
1.增
@insert(里面写sql)
int insert（Car car）；

2.删
@Delete(写sql语句)
int deleteById（Long id）；

3.改
@Update（写sql）
int update(Car car)

4.查
@Select（sql语句）
@Results（{
		@Result（property=“id”, column="id"）
		@Result（property="carNum", column="car_num"）
		@Result（property="brand", column="brand"）
}）
Car selectById（Long id）；
~~~

## Druid连接池
>配置pom.xml文件
~~~xml
<!-- https://mvnrepository.com/artifact/com.alibaba/druid --> <dependency> <groupId>com.alibaba</groupId> <artifactId>druid</artifactId> <version>1.1.16</version> </dependency>
~~~

>创建DruidDataSourceFactory
>MyDruidDataSourceFactory并继承PooledDataSourceFactory，并替换数据源。
~~~java
public class MyDruidDataSourceFactory extends PooledDataSourceFactory { public MyDruidDataSourceFactory() { this.dataSource = new DruidDataSource();//替换数据源 } }
~~~

>修改mybatis-config.xml
~~~xml
<dataSource type="com.qf.xxx.utils.DruidDataSourceFactory"><!--数据源工 厂--><property name="driverClass" value="${driver}"/> <property name="jdbcUrl" value="${url}"/> <property name="username" value="${username}"/> <property name="password" value="${password}"/> </dataSource>
~~~
>注意：< property name="属性名" />属性名必须与com.alibaba.druid.pool.DruidAbstractDataSource
中一致。

