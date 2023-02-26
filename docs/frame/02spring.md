---
lang: zh-CN
title: Spring
description: 学习Spring
---

## Spring概念
>Spring是一个项目管理框架
>[官方网站](https://spring.io/)

## 搭建
>引入依赖
~~~xml
<dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.18</version>
        </dependency>
    </dependencies>
~~~

>配置文件 applicationConext.xml
~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="userService" class="com.xxx.service.UserService"></bean>

</beans>
~~~

## 控制反转
>Inversion of Control控制反转，也可以称为依赖倒置，是一种设计思想，将设计好的对象交给容器控制。

新建一个静态工厂类
~~~java
import com.xxx.entity.Student;

public class StudentFactory {
    public static Student getStudent(){
       return  new Student();
    }
}
~~~
修改配置文件
~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
       <!--工厂对象-->
<!--      <bean id="beanFactory" class="com.xxx.utils.BeanFactory" ></bean>-->
    <!--需要工厂类创建对象 由 spring进行管理-->
    <!--
         factory-bean  找到spring容器创建这个对象的工程
         factory-method 创建对象的方法
      -->
<!--    <bean id="student" factory-bean="beanFactory" factory-method="stu"></bean>-->

    <bean id="stu" class="com.xxx.utils.StudentFactory" factory-method="getStudent"></bean>


</beans>

~~~
bean的作用范围 
~~~xml
singleton：默认值，表示这个 bean 是单例的
prototype：表示这个 bean 是多例的，每次从容器中获取 bean，都会拿到一个全新的 bean
~~~
bean生命周期中的两个特殊方法 
~~~xml
初始化方法init()：是在构造方法执行后执行。
销毁方法destroy()：销毁对象之前执行。
~~~

## 依赖注入
>1.依赖注入Dependency Injection 简称DI和IoC 是一回事。指原来自己创建对象，现在让别人传给你，就相当于注入进来。
2.依赖注入有两种方式 :

A.通过构造方法
~~~xml
<bean id="user" class="com.xxx.entity.User">
        <!--通过构造方法注入值
              name 表示属性名
              value 表示属性值
         -->
        <constructor-arg name="uid" value="10"/>
        <constructor-arg name="uname" value="张三"/>
    </bean>
~~~
B.通过set方法
~~~xml
<bean id="u" class="com.xxx.entity.User">
        <property name="uid" value="12"></property>
        <property name="uname" value="您好"></property>
    </bean>
~~~

FactoryBean创建复杂对象
1,实现-FactoryBean
~~~xml
<dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.18</version>
        </dependency>
        <dependency>
            <groupId>com.squareup.okhttp3</groupId>
            <artifactId>okhttp</artifactId>
            <version>4.9.3</version>
        </dependency>

    </dependencies>
~~~
2,定义一个类 实现 FactoryBean
~~~java
public class MyFactoryBean implements FactoryBean<Request.Builder> {}
~~~


## 整合JDBC
spring jdbc中的主要类
|    类与方法    |           描述           |
| :------------: | :----------------------: |
|  JdbcTemplate  | spring提供主要操作数据库 |
|     update     |         增 删 改         |
| queryForObject |       查询一条记录       |
|     query      |         查询所有         |

整合数据源 HikariCP  
~~~xml
<!-- 比druid更快的数据源 -->
        <dependency>
            <groupId>com.zaxxer</groupId>
            <artifactId>HikariCP</artifactId>
            <version>4.0.3</version>
        </dependency>
~~~

resources -> applicationContext.xml
~~~xml
<!-- 配置数据源 -->
    <bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource">
        <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
        <property name="jdbcUrl" value="jdbc:mysql:///user?serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"/>
        <property name="username" value="root"></property>
        <property name="password" value="1234"></property>
    </bean>

    <!-- 配置jdbcTemplate -->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"></property>
    </bean>

    <!-- 配置dao -->
    <bean id="userDao" class="com.xxx.dao.impl.UserDaoImpl">
        <property name="jdbcTemplate" ref="jdbcTemplate"></property>
    </bean>

    <!-- 配置service -->
    <bean id="userService" class="com.xxx.service.impl.UserServiceImpl">
        <property name="userDao" ref="userDao"></property>
    </bean>

~~~

UserDaoImpl
~~~java
@Override
    public User selectById(Integer uId) {
        String sql = "select * from user where uid=?";
        User user = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class), uId);
        return user;
    }
~~~

## 注解配置IOC
### 注解说明
|      注解      |               说明               |
| :------------: | :------------------------------: |
| @Configuration |              配置类              |
|     @Bean      |   将对象交给spring容器进行管理   |
|   @Qualifier   | 按照名称来查找spring容器中的对象 |
|     @Scope     |           设置单例多例           |  

1，新建User实体类  
2，新建UserConfig类
~~~java
/*
*  @Configuration 表示是一个配置类
*   相当于编写的applicationContext.xml文件
* */
@Configuration
public class UserConfig {
    /*
    *     @Bean 表示将对象交给spring容器来进行管理， bean 的id 默认是方法名称。可以通过设置注解value的属性值来修改id，比如把"user"改成"u"。
    *     @Scope 设置单例或者多例。
    *
    * */
    @Bean(value = "u")
    @Scope("prototype")
    User user(){
        User user = new User();
        user.setUid(1001);
        user.setUname("张三");
        return  user;
    }
}
~~~

~~~java
@Bean
    Author author1(){
        Author a1= new Author();
        a1.setAid(1002);
        a1.setAname("李四");
        return  a1;
    }

@Bean
    Book book(@Qualifier("author1") Author a){
        Book b = new Book();
        b.setBookName("书名");
        b.setAuthor(a);
        return b;
    }
~~~

### bean实例化注解
| 注解 | 作用 | 说明 |
| ---- | ---- | ---- |
| @Component | 实例化对象 | 其他层|
| @Service | 实例化对象 | 业务层 |
| @Repository | 实例化对象 | 持久层 |
| @Controller | 实例化对象 | 表现层对象 |

#### 存活范围和生命周期
~~~java
@Component
@Scope("prototype")
Scope的默认值是singleton单例，可以设置多例prototype
~~~

#### 依赖注入的注解
|    注解    |                             说明                             |                      位置                      |
| :--------: | :----------------------------------------------------------: | :--------------------------------------------: |
| @Autowired |            先按照类型查找，找到多个再按照名字查找            |           一般用于私有字段上(spring)           |
| @Qualifier |                  只能按照指定的名称进行查找                  | 此处和@Autowired配合使用，不能单独使用(spring) |
| @Resource  | jdk提供的注解(先按照指定名称查找对象，没有找到，在按照类型查找) |               一般用于私有字段上               |

### 使用注解完成CRUD（DBUtils）
1，导入依赖
2，数据库配置文件
3，新建实体类User
4，UserDao
5，UserDaoImpl
~~~java
@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    //需要给一个名称 对应的xml中bean id
    @Qualifier("queryRunner")
    private QueryRunner queryRunner;
    public List<User> selectAllList() {
        List<User> userList = null;
        try {
            String sql="select * from  user";

            userList = queryRunner.query(sql, new BeanListHandler<User>(User.class));
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userList;
    }
}
~~~
6，UserService
7，UserServiceImpl
~~~java
@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserDaoImpl userDao;
    public List<User> selectAllList() {
        return userDao.selectAllList();
    }
}
~~~
8，配置文件
~~~xml
<!--扫描注解包-->
    <context:component-scan base-package="com.qf"/>
    <!--配置数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql:///user"/>
        <property name="username" value="root"/>
        <property name="password" value="1234"/>
    </bean>

    <!--配置QueryRunner-->
    <bean id="queryRunner" class="org.apache.commons.dbutils.QueryRunner">
        <constructor-arg name="ds" ref="dataSource"></constructor-arg>
    </bean>
~~~
9,测试类
~~~java
public class Test01 {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserServiceImpl serviceImpl = applicationContext.getBean("userServiceImpl", UserServiceImpl.class);
        List<User> userList = serviceImpl.selectAllList();
        for (User user :userList){
            System.out.println(user);
        }
    }
}
~~~

### 基于类的Spring配置  纯注解
1，新建注解类
~~~java
// 配置注解类
@Configuration
// 扫描位置
@ComponentScan(basePackages = "com.xxx")
@PropertySource(value = "classpath:jdbcConfig.properties")
public class UserConfig {

    @Value("${jdbc.driver}")
    private  String driver;
    @Value("${jdbc.url}")
    private  String url;
    @Value("${jdbc.username}")
    private  String username;
    @Value("${jdbc.password}")
    private  String password;

    @Bean
    public DataSource getDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }

    @Bean
    public QueryRunner getQueryRunner(@Qualifier("getDataSource") DataSource dataSource) {
        return new QueryRunner(dataSource);
    }
}
~~~
2，jdbcConfig.properties配置文件



### @Component
>@Component是一个元注解，意思是可以注解其他类注解，如@Controller @Service @Repository @Aspect。
>带此注解的类看为组件，当使用基于注解的配置和类路径扫描的时候，这些类就会被实例化。
>不指定bean的名称，默认为类名首字母小写。

## 代理(静态，动态)
### 静态代理
>通过代理类的对象，为原始类的对象（目标类的对象）添加辅助功能，更容易更换代理实现类、利于维护。
>代理类数量过多，不利于项目的管理。
>多个代理类的辅助功能代码冗余，修改时，维护性差。

![代理图示](/frameimg/代理.png)

### 动态代理
#### JDK动态代理
>官方提供的，可以直接使用，不需要添加依赖。

#### CGLIB动态代理
>无论类是否有接口，都支持通过 CGLIB 创建代理对象。使用时需要添加第三方依赖。
~~~java
public class Teacher {
    public void showInfo() {
        System.out.println("这是需要被增强的方法");
    }
}
~~~

~~~java
public class MyMethodInterceptor implements MethodInterceptor {

    private Object object;

    public MyMethodInterceptor(Object obj) {
        this.object = obj;
    }

    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {

        System.out.println("前置增强");
        methodProxy.invoke(object, objects);
        System.out.println("后置增强");
        return null;
    }
}

~~~

~~~java
public class TestCglib {
    public static void main(String[] args) {
        Teacher teacher = new Teacher();

        // 创建动态代理增强类，用于创建代理对象
        Enhancer enhancer = new Enhancer();

        // 设置被代理对象的类加载器
        enhancer.setClassLoader(teacher.getClass().getClassLoader());

        // 设置被代理类
        enhancer.setSuperclass(teacher.getClass());

        // 设置方法的拦截
        enhancer.setCallback(new MyMethodInterceptor(teacher));

        // 创建代理对象
        Teacher teacher1 = (Teacher) enhancer.create();
        teacher1.showInfo();
    }
}
~~~

**Spring 中的 AOP 底层就是动态代理：**
>Spring 中，如果代理的对象有接口，默认使用 JDK 动态代理；如果没有接口，就用 CGLIB 动态代理。
>Spring Boot2.0 之后中的 AOP 统一都是 CGLIB 动态代理。

## AOP面向切面
>（Aspect-Oriented Programming，面向切面编程），以OOP为基础，主要关注的是Aspect方面，方面组件主要用来封装通用的逻辑，可以以低耦合的方式切入到某一批目标对象中。

>实现AOP的技术，主要分为两大类：一是采用动态代理技术；二是采用静态织入Weaving的方式，引入特定的语法创建Aspect“方面”。

## 事务
>逻辑上的一组操作，要么都不执行，要么不执行。
是属于MySQL的，不是属于java。
引擎要是InnoDB才支持事务。
>**事务特性：ACID**
原子性（Atomicity）
一致性（Consistency）
隔离性（Isolation）
持久性（Durability）

#### Spring支持两种方式的事务管理
**1，编程式事务管理**
>1.1 基于`TransactionTemplate`

>A,引入依赖
~~~xml
<dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.18</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.3.18</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aspects</artifactId>
            <version>5.3.18</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.12</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
~~~

>B,新建applicationContext.xml
~~~xml
<!--引入数据库配置信息-->
    <context:property-placeholder location="classpath:jdbcConfig.properties"/>
    <!--配置数据源-->
    <bean class="org.springframework.jdbc.datasource.DriverManagerDataSource" id="dataSource">
        <property name="driverClassName" value="${jdbc.driver}"></property>
        <property name="url" value="${jdbc.url}"></property>
        <property name="username" value="${jdbc.username}"></property>
        <property name="password" value="${jdbc.password}"></property>
    </bean>

    <!--配置jdbcTemplate-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"></property>
    </bean>

    <!--配置事务管理器-->
    <bean class="org.springframework.jdbc.datasource.DataSourceTransactionManager" id="transactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!--配置事务模板对象-->
    <bean class="org.springframework.transaction.support.TransactionTemplate" id="transactionTemplate">
        <property name="transactionManager" ref="transactionManager"></property>
    </bean>
	<bean class="com.qf.service.AccountService" id="accountService">

        <constructor-arg name="jdbcTemplate" ref="jdbcTemplate"></constructor-arg>
        <constructor-arg name="platformTransactionManager" ref="transactionManager"></constructor-arg>
        <constructor-arg name="transactionTemplate" ref="transactionTemplate"></constructor-arg>
    </bean>
~~~


>C,新建AccountService
~~~java
public class AccountService {

    private PlatformTransactionManager  platformTransactionManager;

    private TransactionTemplate  transactionTemplate;

    private JdbcTemplate jdbcTemplate;

    public AccountService(PlatformTransactionManager platformTransactionManager, TransactionTemplate transactionTemplate, JdbcTemplate jdbcTemplate) {
        this.platformTransactionManager = platformTransactionManager;
        this.transactionTemplate = transactionTemplate;
        this.jdbcTemplate = jdbcTemplate;
    }

    public  void  udpate(){
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                try {
                    String sql ="update account set  amoney=? where aname=?";
                    jdbcTemplate.update(sql,8888,"张三");
                    System.out.println(1/0);
                } catch (DataAccessException e) {
                    //表示回滚
               status.setRollbackOnly();
                }
            }
        });
    }
}
~~~

>1.2 基于`TransactionManager`
>修改Service层代码
~~~java
public void update02(){
        TransactionStatus transactionStatus =platformTransactionManager.getTransaction(new DefaultTransactionDefinition());

        try {
            String sql ="update account set  amoney=? where aname=?";
            jdbcTemplate.update(sql,8888,"李四");
            System.out.println(1/0);
            platformTransactionManager.commit(transactionStatus);

        } catch (Exception e) {
            platformTransactionManager.rollback(transactionStatus);
        }
    }
~~~


**2，声明式事务管理**
>A.配置数据源
B.配置事务管理器
C.配置切面
D.配置Aop

修改applicationContext.xml
~~~xml
<!--配置切面-->
    <tx:advice id="tvadvice" transaction-manager="transactionManager">
        <tx:attributes>
        <!--
name="find*":匹配切入点方法。可以使用*通配符
read-only="false"：是否是只读事务。默认是false，查询方法建议为true。增删改如果
为只读，则报错。
propagation="REQUIRED"：传播行为。默认REQUIRED（增删改）。查询使用SUPPORTS
timeout="-1":事务超时时间
isolation="DEFAULT"：隔离级别
rollback-for="excep"：如果代码抛出异常，异常名字中含有excep，那么就回滚。一般
不配。
no-rollback-for="excep"：如果代码抛出异常，异常名字中含有excep，那么不回滚。一
般不配。
-->
            <tx:method name="find*"/>
            <tx:method name="update*"/>
            <tx:method name="insert*"/>
        </tx:attributes>
    </tx:advice>

    <!--配置aop 事务生效的部分是两个部分的交际-->
    <aop:config>
        <aop:pointcut id="pct" expression="execution(* com.qf.service.AccountService.*(..))"/>

        <!--引入切面-->
        <aop:advisor advice-ref="tvadvice" pointcut-ref="pct"/>
    </aop:config>
~~~

修改AccountService
~~~java
public  void  update03(){
        String sql ="update account set  amoney=? where aname=?";
        jdbcTemplate.update(sql,666,"李四");
        System.out.println(1/0);
    }
~~~

**Spring 并不直接管理事务，而是提供了多种事务管理器** 。Spring 事务管理器的接口是： **`PlatformTransactionManager`** 。
~~~java
public interface PlatformTransactionManager {
    //获得事务
    TransactionStatus getTransaction(@Nullable TransactionDefinition var1) throws TransactionException;
    //提交事务
    void commit(TransactionStatus var1) throws TransactionException;
    //回滚事务
    void rollback(TransactionStatus var1) throws TransactionException;
}
~~~

>事务管理器接口 **`PlatformTransactionManager`** 通过 **`getTransaction(TransactionDefinition definition)`** 方法来得到一个事务，这个方法里面的参数是 **`TransactionDefinition`** 类 ，这个类就定义了一些基本的事务属性。

##### 2.1 基于注解的声明式事务 
A,添加依赖
~~~xml
<dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.18</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.3.18</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aspects</artifactId>
            <version>5.3.18</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.12</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
~~~
B,新建applicationContext.xml
~~~xml
<!--引入数据库配置信息-->
    <context:property-placeholder location="classpath:jdbcConfig.properties"/>
    <!--配置数据源-->
    <bean class="org.springframework.jdbc.datasource.DriverManagerDataSource" id="dataSource">
        <property name="driverClassName" value="${jdbc.driver}"></property>
        <property name="url" value="${jdbc.url}"></property>
        <property name="username" value="${jdbc.username}"></property>
        <property name="password" value="${jdbc.password}"></property>
    </bean>

    <!--配置jdbcTemplate-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"></property>
    </bean>

    <!--配置事务管理器-->
    <bean class="org.springframework.jdbc.datasource.DataSourceTransactionManager" id="transactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!--开启事务注解的支持-->
    <tx:annotation-driven transaction-manager="transactionManager"/>
~~~

C,新建AccountService
~~~java
public interface AccountService {
      void addAccount();
}
~~~

D,新建AccountServiceImpl
~~~java
@Service("accountService")
@Transactional(readOnly = false,propagation = Propagation.REQUIRED)
public class AccountServiceImpl implements AccountService {
    @Resource
    private JdbcTemplate jdbcTemplate;
    public void addAccount() {
        String sql ="update account set amoney=? where aname=?";
        jdbcTemplate.update(sql,2222,"张三");
        System.out.println(1/0);
    }
}
~~~

E,新建测试类
~~~java
public class Test01 {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        AccountService accountService = (AccountService) applicationContext.getBean("accountService");
        accountService.addAccount();
    }
}
~~~

## MyBatis整合Spring 
### 思路
![mybatis整合spring](/frameimg/mybatis整合spring.png)

#### 1、单独搭建MyBatis
1.1，引入依赖
~~~java
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.1</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
~~~

1.2，建立mybatis的配置文件
~~~xml
<configuration>
    <typeAliases>
        <package name="com.ujiuye.domain"/>
    </typeAliases>
    <environments default="ee0608">
        <environment id="ee0608">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql:///table"/>
                <property name="username" value="root"/>
                <property name="password" value="1234"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <package name="com.ujiuye.mapper"/>
    </mappers>
</configuration>
~~~

1.3，建实体类
~~~java
public class Account implements Serializable {
    private Integer id;
    private String number;
    private Float balance;
}
~~~

1.4，新建接口
~~~java
public interface AccountMapper {
    List<Account> findAllAccounts();
}
~~~

1.5，建映射文件
~~~java
<mapper namespace="com.ujiuye.mapper.AccountMapper">
    <select id="findAllAccounts" resultType="account">
        select * from t_accounts
    </select>
</mapper>
~~~

1.6，测试
~~~java
public class AccountMapperTest {

    @Test
    public void findAllAccounts() throws Exception {
        InputStream stream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(stream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        AccountMapper mapper = sqlSession.getMapper(AccountMapper.class);
        List<Account> allAccounts = mapper.findAllAccounts();
        System.out.println(allAccounts);
        sqlSession.close();
    }
}
~~~

#### 2、单独搭建Spring
2.1，引入依赖
~~~xml
<dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.1.15.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.1.15.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.1.15.RELEASE</version>
        </dependency>
~~~

2.2，建配置文件
~~~xml
<context:component-scan base-package="com.ujiuye.service.impl"/>
~~~

2.3，建接口和实现类
~~~java
public interface AccountService {
    List<Account> findAllAccounts();
}
~~~

~~~java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class AccountServiceTest {
    @Autowired
    private AccountService accountService;
    @Test
    public void findAllAccounts() {
        List<Account> allAccounts = accountService.findAllAccounts();
        System.out.println(allAccounts);
    }
}
~~~

#### 3、MyBatis整合Spring
3.1，引入依赖
~~~xml
<dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>2.0.3</version>
        </dependency>
~~~

3.2，修改Spring配置文件
~~~xml
<context:component-scan base-package="com.qf.service.impl"/>
    <context:property-placeholder location="classpath:jdbc.properties"/>
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="${jdbc.driverClassName}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <!--接管SqlSessionFactory-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <property name="typeAliasesPackage" value="com.qf.domain"/>
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
    </bean>
    <!--扫描映射文件-->
    <bean id="scanner" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.qf.mapper"/>
    </bean>
~~~

3.3，mybatis-config.xml中的内容只留下根元素，其他删掉。

3.4，修改业务实现类
~~~java
@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountMapper accountMapper;

    public List<Account> findAllAccounts() {
        return accountMapper.findAllAccounts();
    }
}
~~~



## 条件注解
>开发，测试，生产环境切换。
### 1、自定义条件注解
1.1，新建接口
~~~java
public interface ShowCmd {
    String ShowCmd();
}
~~~

1.2，实现类
~~~java
public class WindowShowCmd implements  ShowCmd {
    public String ShowCmd() {
        return "dir";
    }
}
~~~

~~~java
public class LinuxShowCmd implements  ShowCmd {
    public String ShowCmd() {
        return "ls";
    }
}
~~~

1.3，实现Condition接口
~~~java
public class WindowsConfig implements Condition {

   //如果返回值为true 的时候  需要 WindpwConfig  创建 并且放入spring容器进行管理
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        String s = context.getEnvironment().getProperty("os.name").toLowerCase();
        System.out.println(s);
        return  s.contains("windows");
    }
}
~~~

~~~java
public class LinuxConfig implements Condition {
    //如果返回值为true 的时候  需要 WindpwConfig  创建 并且放入spring容器进行管理
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        String s = context.getEnvironment().getProperty("os.name").toLowerCase();
        System.out.println(s);
        return  s.contains("linux");
    }
}
~~~

1.4，测试
~~~java
public class Test01 {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(JavaConfig.class);
        String showCmd = applicationContext.getBean("showCmd", ShowInfoCmd.class).showCmd();
        System.out.println(showCmd);

    }
}
~~~

### 2、使用Spring提供的条件注解
2.1，新建实体类
~~~Java
public class DataSource {
    private String url;
    private String username;
    private String password;

    public DataSource() {
    }

    public DataSource(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
~~~
2.2，新建配置类
~~~java
@Configuration
public class JAVAConfig {

    @Bean("ds")
    @Profile("test")
    public      DataSource showData(){
        DataSource ds = new DataSource();
        ds.setUrl("jdbc://mysql:3306/test");
        ds.setUsername("root");
        ds.setPassword("root");
        return  ds;

    }

    @Bean("ds")
    @Profile("dev")
    public      DataSource showD(){
        DataSource ds = new DataSource();
        ds.setUrl("jdbc://mysql:3306/dev");
        ds.setUsername("root");
        ds.setPassword("root");
        return  ds;

    }


}
~~~

2.3，测试
~~~java
public class Test01 {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();
        //设置当前环境
        applicationContext.getEnvironment().setActiveProfiles("dev");
        //注册配置类
        applicationContext.register(JAVAConfig.class);
        //刷新
        applicationContext.refresh();
        DataSource dataSource = applicationContext.getBean(DataSource.class);
        System.out.println(dataSource.getUrl());
    }
}

~~~

