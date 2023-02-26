---
lang: zh-CN
title: JDBC
description: javaee 01
---

### 1、简介
>Java数据库连接，（Java Database Connectivity，简称JDBC）是Java语言中用来规范客户端程序如何来访问数据库的应用程序接口，提供了诸如查询和更新数据库中数据的方法。我们通常说的JDBC是面向关系型数据库的。

### 2、原理
>Java制定的统一规范，然后各个数据库厂商根据这个规范接口来实现。

### 3、编写步骤
>事先导入mysql-connector的jar包
>- 注册驱动Driver
>- 建立数据库连接connection
>- 创建statement对象，并用来执行sql
>- 关闭连接

#### 3.1、加载MySQL数据库的驱动
>Class.forName(“com.mysql.jdbc.Driver”);
>(MySQL5.1.6以后会自动加载，这一步可以省略，但还是建议写上，因为可能会换别的数据库驱动)

#### 3.2、建立数据库连接
~~~java
Connection connection = DriverManager.getConnection(url, user, password);
~~~
>将配置文件信息写在properties文件中，方便以后修改
~~~properties
user=root  
password=1234  
url=jdbc:mysql://127.0.0.1:3306/数据库名  
driver=com.mysql.jdbc.Driver
~~~

~~~java
// 通过properties文件获取配置信息  
Properties properties = new Properties();  
String user = properties.getProperty("user");  
String password = properties.getProperty("password");  
String driver = properties.getProperty("driver");  
String url = properties.getProperty("url");
~~~

>- url注意事项
>本机的ip可以用localhost代替
>jdbc:mysql://localhost:3306/数据库名
>仅限该连接还可以进一步省略
>jdbc:mysql:///数据库名

~~~java
// MySQL在高版本需要指明是否进行SSL连接,可以通过设置useSSL=false来显式禁用SSL  
String url = "jdbc:mysql://localhost:3306/java2207&useSSL=false";

// MySQL8.0之后要加上时区  
String url = "jdbc:mysql://localhost:3306/java2207?serverTimezone=Asia/Shanghai";
~~~

#### 3.3、Statement对象
>- Statement执行sql语句并返其生成结果的对象(有sql注入风险--- or '1'= '1万能密码)
>- 用PreparedStatement接口，预处理，可以写？占位符；解决sql注入问题；减少编译次数。

>- public interface **PreparedStatement**
>- extends Statement
>- 示预编译的 SQL 语句的对象。
>- SQL 语句被预编译并存储在 `PreparedStatement` 对象中。然后可以使用此对象多次高效地执行该语句。

~~~java
String sql = "";
PreparedStatement ps = connection.prepareStatement(sql);
~~~

#### 3.4、关闭连接
>先开后关
>.close();

### 4、JDBCUtils
>将相同操作部分封装到工具类中

~~~java
public class JdbcUtils {  
    public static Connection getConnection() throws IOException, ClassNotFoundException, SQLException {  
        // 先通过properties文件获取配置信息  
        Properties properties = new Properties();  
        properties.load(new FileInputStream("src\\jdbc.properties"));  
        String user = properties.getProperty("user");  
        String password = properties.getProperty("password");  
        String driver = properties.getProperty("driver");  
        String url = properties.getProperty("url");  
  
        // 加载驱动  
        Class.forName(driver);  
  
        // 建立数据库连接  
        Connection connection = DriverManager.getConnection(url, user, password);  
  
        return connection;  
    }  
  
    public static void closeConnection(Connection connection, Statement statement) {  
        try {  
            if (statement != null) {  
                statement.close();  
            }  
        } catch (SQLException e) {  
            e.printStackTrace();  
        }  
  
        try {  
            if (connection != null) {  
                connection.close();  
            }  
        } catch (SQLException e) {  
            e.printStackTrace();  
        }  
    }}
~~~

~~~java
public class Demo03 {  
    public static void main(String[] args){  
        Connection connection = null;  
        PreparedStatement ps = null;  
        try {  
            // 1.获取数据库连接  
            connection = JdbcUtils.getConnection();  
            // 2.预编译sql  
            String sql = "update reader set name = ? where id = ?";  
            ps = connection.prepareStatement(sql);  
            // 3.填充占位符  
            ps.setObject(1,"张三");  
            ps.setObject(2,001);  
            // 4.执行  
            ps.execute();  
        } catch (Exception e) {  
            e.printStackTrace();  
        } finally {  
            // 5.关闭连接  
            JdbcUtils.closeConnection(connection,ps);  
        }  
    }}
~~~

### 5、BasicDao
>Druid+DbUtils的方式仍有不足，sql是固定的，select操作结果集返回类型也是固定的等问题，由此引出BaseDao。

>data access object（数据访问对象），每个表有一个通用的增删改查方法xxxDao，将多个表的xxxDao再封装成一个基础的Dao，就叫basicDao，或者叫baseDao。

### 6、总结
>**导入jar包**
>	- *mysql-connector-java*
>	- *druid*
>	- *commons-dbutils*

>**配置properties文件
~~~properties
#驱动加载  
driverClassName=com.mysql.jdbc.Driver
#注册驱动  
url=jdbc:mysql://127.0.0.1:3306/db_name?characterEncoding=utf-8
#连接数据库的用户名  
username=root
#连接数据库的密码  
password=1234
#初始化时池中建立的物理连接个数。  
initialSize=5
#最大的可活跃的连接池数量  
maxActive=50
#获取连接时最大等待时间，单位毫秒，超过连接就会失效。配置了maxWait之后，缺省启用公平锁，并发效率会有所下降， 如果需要可以通过配置useUnfairLock属性为true使用非公平锁。  
maxWait=45000
~~~

>注意：这个配置文件后面不要带空格！不要带空格！

>**最终的工具类JdbcUtils**
~~~java
public class JdbcUtils {  
    // 1、导入druid.jar包  
    // 2、在druid.properties文件中编写好配置  
  
    private static DataSource dataSource;  
  
    // 3、静态代码块在类加载时执行，且只执行一次  
    static {  
        // 创建properties对象，读取配置  
        Properties properties = new Properties();  
        try {  
            // Class.getResourceAsStream(String path) ： path 不以’/'开头时默认是从此类所在的包下取资源，以’/'开头则是从ClassPath根下获取。其只是通过path构造一个绝对路径，最终还是由ClassLoader获取资源。 
//            properties.load(new FileInputStream("D:\\eclipse-workspace\\xxx\\src\\druid.properties"));  
        	properties.load(JdbcUtils.class.getResourceAsStream("/druid.properties"));
            // 创建Druid连接池  
            dataSource = DruidDataSourceFactory.createDataSource(properties);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }  
    /**  
     * 从数据库连接池中获取连接  
     * @return  
     * @throws SQLException  
     */  
    public static Connection getConnection() throws SQLException {  
    	
        return dataSource.getConnection();  
    }  
  
    /**  
     * close是把connection连接对象放回到连接池中  
     * @param connection  
     * @param statement  
     * @param resultSet  
     */  
    //    public static void closeResource(Connection connection, Statement statement, ResultSet resultSet) {  
//        DbUtils.closeQuietly(connection);  
//        DbUtils.closeQuietly(statement);  
//        DbUtils.closeQuietly(resultSet);  
//    }    
    
    /**
     * 关闭连接
     * @param connection
     */
    public static void close() {  
        DbUtils.closeQuietly(connection);   
    } 
}
~~~

>**所有DAO的父类BaseDao
~~~java
 public abstract class BaseDao<T> {  
    private QueryRunner queryRunner = new QueryRunner();  
  
    /**  
     * 通用增删改方法  
     *  
     * @param sql  
     * @param params  
     * @return  
     */  
    public int update(Connection connection, String sql, Object... params) {  
  
        try {  
            int update = queryRunner.update(connection, sql, params);  
            return update;  
        } catch (SQLException e) {  
            // 这里将编译异常转换为运行异常，抛出。调用者可以捕获也可以不捕获，采用默认的处理方式  
            throw new RuntimeException(e);  
        }  
  
    }  
    /**  
     * 通用的查询方法，返回多行  
     *  
     * @param sql  
     * @param clz  
     * @param params  
     * @return  
     */  
    public List<T> getList(Connection connection, String sql, Class<T> clz, Object... params) {  
  
        try {  
            List<T> list = queryRunner.query(connection, sql, new BeanListHandler<T>(clz), params);  
            return list;  
        } catch (SQLException e) {  
            // 这里将编译异常转换为运行异常，抛出。调用者可以捕获也可以不捕获，采用默认的处理方式  
            throw new RuntimeException(e);  
        }  
  
    }  
    /**  
     * 通用的查询方法，返回单行  
     *  
     * @param sql  
     * @param clz  
     * @param params  
     * @return  
     */  
    public T getOne(Connection connection, String sql, Class<T> clz, Object... params) {  
  
        try {  
            T t = queryRunner.query(connection, sql, new BeanHandler<T>(clz), params);  
            return t;  
        } catch (SQLException e) {  
            throw new RuntimeException(e);  
        }  
  
    }  
    /**  
     * 通用的查询方法，返回单行单列(即单值)  
     *     
     * @param sql  
     * @param params  
     * @return  
     */  
    @SuppressWarnings({"unchecked", "rawtypes"})  
    public Object getScalar(Connection connection, String sql, Object... params) {  
  
        try {  
            return queryRunner.query(connection, sql, new ScalarHandler(), params);  
        } catch (SQLException e) {  
            throw new RuntimeException(e);  
        }  
  
    }}
~~~