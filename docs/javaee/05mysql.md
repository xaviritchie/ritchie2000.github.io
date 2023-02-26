---
lang: zh-CN
title: MySQL
description: 学习MySQL
---
### 1.简介

> MySQL是一个关系型数据库管理系统，由瑞典MySQL AB公司开发，属于Oracle旗下产品。

> 数据库是按照数据结构来组织、存储和管理数据的仓库。是一个长期存储在计算机内的、有组织的、有共享的、统一管理的数据集合。
>
> 数据库管理系统（DataBase Management System，DBMS）：指一种操作和管理数据库的大型软件。

> 关系结构数据库：Oracle、DB2、MySQL、SQL Server等
>
> 非关系型数据库：ElasticSearch、MongoDB、Redis等

### 2.MySQL的安装

> 下载地址https://dev.mysql.com/downloads/windows/installer/5.7.html
> 选择GA version稳定正式版

选Custom -> Next
MySQL Server -> Next
输入密码，账号默认root


在这里卸载！在这里卸载！在这里卸载！
Installer -> Remove...



### 3.SQL语言

> SQL（Structured Query Language）结构化查询语言，用于存取数据、更新、查询和管理关系数据库系统的程序设计语言。
>
> 通常执行对数据库的“增删改查”，简称C（Create）R（Read）U（Update）D（Delete）。

#### 3.1 基本命令

~~~mysql
mysql> SHOW DATABASES; #显示当前MySQL中包含的所有数据库
mysql> CREATE DATABASE mydb CHARACTER SET gbk; #创建数据库mydb并设置编码格式为gbk
mysql> SHOW CREATE DATABASE mydb; #查看创建数据库时的基本信息
mysql> ALTER DATABASE mydb CHARACTER SET utf8; #修改数据库的字符集
mysql> DROP DATABASE mydb; #删除数据库mydb
mysql> select database(); #查看当前使用的数据库
mysql> USE mydb; #使用mydb数据库

~~~

>Windows文件系统不区分大小写,所以在Windows上创建数据库，数据库名称和表名称都是不区分大小写的。
>
>Linux/Mac系统相反区分大小写。

### 4.客户端工具

> 如果只需要数据库开发的基本功能，那么选择一款免费软件即可，例如:
>
> - HeidiSQL
> - MySQL Workbench社区版
> - Sequel Pro (仅支持macOS系统)
>
> 如果需要某些高级扩展功能，进行最高效、最优质的开发和管理，可以考虑使用付费版工具，包括:
>
> - dbForge studio for MysQL
> - Navicat for MySQL
> - Toad Edge for MySQL
> - SQLyog

### 5.数据查询✨

> - 执行查询语句返回的结果集是一张虚拟表。
>
> 语法：SELECT 列名 FROM 表名

~~~mysql
#查询员工表中所有员工的编号、名字、邮箱
SELECT employee_id,first_name,email FROM t_employees;
#查询员工表中所有员工的所有信息（所有列）
SELECT * FROM t_employees;
#注意：生产环境下，不建议使用*进行查询。
~~~

> 语法：as 别名

~~~mysql
#查询员工表中所有员工的编号、名字、年薪（列名均为中文）
SELECT employee_id as "编号" , first_name as "名字" , salary*12 as "年薪"  FROM t_employees;
~~~

> - 去重
>
> 语法：DISTINCT 列名

~~~mysql
#查询员工表中所有经理的ID。查询结果去重
SELECT DISTINCT manager_id  FROM t_employees;
~~~

> - 排序查询ORDER BY
>
> 语法： SELECT 列名 FROM 表名 ORDER BY 排序列 排序规则
>
> ASC升序 DESC降序

~~~mysql
#查询员工的编号，名字，薪资。按照工资高低进行降序排序。
SELECT employee_id , first_name , salary
FROM t_employees
ORDER BY salary DESC;
~~~

> - 条件查询WHERE
>
> 语法：SELECT 列名 FROM 表名 WHERE 条件

~~~mysql
#等值判断（=）
#逻辑判断（and、or、not）
#不等值判断（> 、< 、>= 、<= 、!= 、<>）
#区间判断（between and）注意：小值在前，大值在后
#NULL 值判断（IS NULL、IS NOT NULL）

#查询员工的薪资在6000~10000之间的员工信息（编号，名字，薪资）
SELECT employee_id , first_name , salary
FROM t_employees
WHERE salary >= 6000 AND salary <= 10000;
~~~

>- 枚举查询（ IN (值 1，值 2，值 3 ) ）

~~~mysql
#查询部门编号为70、80、90的员工信息（编号，名字，薪资 , 部门编号）
SELECT employee_id , first_name , salary , department_id
FROM t_employees
WHERE department_id IN(70,80,90);
注：in的查询效率较低，可通过多条件拼接。
~~~

>- 模糊查询LIKE

~~~mysql
#查询名字以"L"开头的员工信息（编号，名字，薪资 , 部门编号）
SELECT employee_id , first_name , salary , department_id
FROM t_employees
WHERE first_name LIKE 'L%';
~~~

>- 分支结构查询
>  CASE
>  	WHEN 条件1 THEN 结果1
>  	WHEN 条件2 THEN 结果2
>  	WHEN 条件3 THEN 结果3
>  	ELSE 结果
>  END

~~~mysql
#查询员工信息（编号，名字，薪资 , 薪资级别<对应条件表达式生成>）
SELECT employee_id , first_name , salary , department_id , 
       CASE
           WHEN salary>=10000 THEN 'A'
           WHEN salary>=8000 AND salary<10000 THEN 'B'
           WHEN salary>=6000 AND salary<8000  THEN 'C'
           WHEN salary>=4000 AND salary<6000  THEN 'D'
   ELSE 'E'
       END as "LEVEL"
FROM t_employees;
~~~

>- 时间查询
>
>语法：SELECT 时间函数([参数列表]) 

| 时间函数              | 描述                                   |
| --------------------- | :------------------------------------- |
| SYSDATE()             | 当前系统时间（日、月、年、时、分、秒） |
| CURDATE()             | 获取当前日期                           |
| CURTIME()             | 获取当前时间                           |
| WEEK(DATE)            | 获取指定日期为一年中的第几周           |
| YEAR(DATE)            | 获取指定日期的年份                     |
| HOUR(TIME)            | 获取指定时间的小时值                   |
| MINUTE(TIME)          | 获取时间的分钟值                       |
| DATEDIFF(DATE1,DATE2) | 获取DATE1 和 DATE2 之间相隔的天数      |
| ADDDATE(DATE,N)       | 计算DATE 加上 N 天后的日期             |

~~~mysql
#查询当前时间
SELECT SYSDATE();
#查询当前时间
SELECT NOW();
#获取当前日期
SELECT CURDATE();
#获取当前时间
SELECT CURTIME();
~~~

>语法： SELECT 字符串函数 ([参数列表])

| 字符串函数                 | 说明                                                  |
| -------------------------- | ----------------------------------------------------- |
| CONCAT(str1,str2,str....)  | 将 多个字符串连接                                     |
| INSERT(str,pos,len,newStr) | 将str 中指定 pos 位置开始 len 长度的内容替换为 newStr |
| LOWER(str)                 | 将指定字符串转换为小写                                |
| UPPER(str)                 | 将指定字符串转换为大写                                |
| SUBSTRING(str,num,len)     | 将str 字符串指定num位置开始截取 len 个内容            |

~~~mysql
#拼接内容
SELECT CONCAT('My','S','QL');
#字符串替换
SELECT INSERT('这是一个数据库',3,2,'MySql');#结果为这是 MySql 数据库
#指定内容转换为小写
SELECT LOWER('MYSQL');#mysql
#指定内容转换为大写
SELECT UPPER('mysql');#MYSQL
#指定内容截取
SELECT SUBSTRING('JavaMySQLOracle',5,5);#MySQL
~~~

>- 聚合函数
>
>语法：SELECT 聚合函数(列名) FROM 表名;

| 聚合函数 | 说明                     |
| -------- | ------------------------ |
| SUM()    | 求所有行中单列结果的总和 |
| AVG()    | 平均值                   |
| MAX()    | 最大值                   |
| MIN()    | 最小值                   |
| COUNT()  | 求总行数                 |

~~~mysql
#统计所有员工每月的工资总和
SELECT SUM(salary) FROM t_employees;
#统计所有员工中月薪最高的工资
SELECT MAX(salary) FROM t_employees;
#统计所有员工中月薪最低的工资
SELECT MIN(salary) FROM t_employees;
#统计员工总数
SELECT COUNT(*) FROM t_employees;
#注意：聚合函数自动忽略null值，不进行统计。
~~~

>- 分组查询GROUP BY
>
>语法：SELECT 列名 FROM 表名 WHERE 条件 GROUP BY 分组依据（列）;

~~~mysql
#查询各个部门、各个岗位的人数
#思路：
#1.按照部门编号进行分组（分组依据 department_id）。
#2.按照岗位名称进行分组（分组依据 job_id）。
#3.针对每个部门中的各个岗位进行人数统计（count）。
SELECT department_id , job_id , COUNT(employee_id)
FROM t_employees
GROUP BY department_id , job_id;
#注：分组查询中，select显示的列只能是分组依据列，或者聚合函数列，不能出现其他列。
~~~

>- 分组过滤查询
>
>语法：SELECT 列名  FROM 表名 WHERE 条件  GROUP BY 分组列 HAVING 过滤规则

~~~mysql
#统计60、70、90号部门的最高工资
#思路：
#1).	确定分组依据（department_id）
#2).	对分组后的数据，过滤出部门编号是60、70、90信息
#3).	max()函数处理

SELECT department_id , MAX(salary)
FROM t_employees
GROUP BY department_id
HAVING department_id in (60,70,90)

# group确定分组依据department_id 
#having过滤出60 70 90部门
#select查看部门编号和max函数。
~~~

>- 限定查询LIMIT
>
>语法：SELECT 列名 FROM 表名 LIMIT 起始行，查询行数

~~~mysql
#查询表中前五名员工的所有信息
SELECT * FROM t_employees LIMIT 0,5;
#查询表中从第四条开始，查询 10 行
SELECT * FROM t_employees LIMIT 3,10;
~~~

>- SQL 语句编写顺序
>
>SELECT 列名 FROM 表名 WHERE 条件 GROUP BY 分组 HAVING 过滤条件 ORDER BY 排序列（asc|desc）LIMIT 起始行，总条数

~~~mysql
SQL 语句执行顺序
1.FROM ：指定数据来源表
2.WHERE : 对查询数据做第一次过滤
3.GROUP BY ： 分组
4.HAVING : 对分组后的数据第二次过滤
5.SELECT : 查询各字段的值
6.ORDER BY : 排序
7.LIMIT : 限定查询结果
~~~

>a.子查询（作为条件判断）
>
>SELECT 列名 FROM 表名  WHERE 条件 (子查询结果)
>
>b.子查询（作为一张表）
>
>SELECT 列名 FROM（子查询的结果集）WHERE 条件;
>
>c.子查询（作为枚举查询条件）
>
>SELECT 列名 FROM 表名 WHERE 列名 in(子查询结果);

~~~mysql
#查询员工表中工资排名前 5 名的员工信息
#思路：
#1.	先对所有员工的薪资进行排序（排序后的临时表）
select employee_id , first_name , salary
from t_employees
order by salary desc

#2.	再查询临时表中前5行员工信息
select employee_id , first_name , salary
from (临时表) 
limit 0,5;

#SQL：合并
select employee_id , first_name , salary
from (select employee_id , first_name , salary from t_employees order by salary desc) as temp
limit 0,5;
~~~



>- 合并查询
>
>- SELECT * FROM 表名1 UNION SELECT * FROM 表名2
>
>- SELECT * FROM 表名1 UNION ALL SELECT * FROM 表名2



>- 表连接查询
>
>语法：SELECT 列名 FROM 表1 连接方式 表2 ON 连接条件
>
>a.内连接查询（INNER JOIN ON）
>
>b.三表连接查询
>
>c.左外连接（LEFT JOIN ON）
>
>d.右外连接（RIGHT JOIN ON）
>
>说明：左外连接是以左表为主表，包含左表的全部。

~~~mysql
#查询所有员工信息，以及所对应的部门名称（没有部门的员工，也在查询结果中,部门名称以NULL 填充）
SELECT e.employee_id , e.first_name , e.salary , d.department_name FROM t_employees e
LEFT JOIN t_departments d 
ON e.department_id = d.department_id;
~~~



### 6.DML操作

#### 6.1概述

> DML(Data Manipulation Language)数据操作语言,以INSERT、UPDATE、DELETE三种指令为核心

#### 6.2新增（INSERT）

>语法：[INSERT INTO]() 表名(列 1，列 2，列 3....) VALUES(值 1，值 2，值 3......);

#### 6.3修改（UPDATE）

>语法：UPDATE 表名 SET 列 1=新值 1 ,列 2 = 新值 2,.....WHERE 条件;

#### 6.4删除（DELETE）

>语法：DELETE FROM 表名 WHERE 条件；

### 7.事务✨

#### 7.1简介

>MySQL 事务主要用于处理操作量大，复杂度高的数据。只有使用了 Innodb 数据库引擎的数据库或表才支持事务。
>
>事务是一个原子操作。是一个最小执行单元。可以由一个或多个SQL语句组成，在同一事务中，所有的SQL语句都成功执行时，事务成功，否则整个事务都执行失败。

#### 7.2事务的特性(ACID)

>- [Atomicity(原子性)]()
>
>表示一个事务内的所有操作是一个整体，要么全部成功，要么全部失败
>
>- [Consistency(一致性)]()
>
>表示一个事务内有一个操作失败时，所有的更改过的数据都必须回滚到修改前状态
>
>- [Isolation(隔离性)]()
>
>事务查看数据操作时数据所处的状态，要么是另一并发事务修改它之前的状态，要么是另一事务修改它之后的状态，事务不会查看中间状态的数据。
>
>- [Durability(持久性)]()
>
>持久性事务完成之后，它对于系统的影响是永久性的。

#### 7.3 MySQL事务处理主要有两种方法

>1. 用 BEGIN, ROLLBACK, COMMIT来实现
>
>- **BEGIN** 开始一个事务
>
>- **ROLLBACK** 事务回滚
>
>- **COMMIT** 事务确认
>
>2. 直接用 SET 来改变 MySQL 的自动提交模式:
>
>- **SET AUTOCOMMIT=0** 禁止自动提交
>
>- **SET AUTOCOMMIT=1** 开启自动提交

#### 7.4 事务的四种隔离级别

>- 脏读--读未提交(read uncommitted)：所谓的脏读，其实就是读到了别的事务回滚前的脏数据。
>
>- 不可重复读--读提交(read committed)：事务A首先读取了一条数据，然后执行逻辑的时候，事务B将这条数据改变了，然后事务A再次读取的时候，发现数据不匹配了，就是所谓的不可重复读了。
>
>- 幻读--重复读(repeatable read):事务B读不到事务A提交的数据。事务A首先根据条件索引得到N条数据，然后事务B改变了这N条数据之外的M条或者增添了M条符合事务A搜索条件的数据，导致事务A再次搜索发现有N+M条数据了，就产生了幻读。
>
>- 串行化--Serializable：最严格的隔离级别，事务串行执行，资源消耗最大。

### 8.数据表操作

#### 8.1数据类型

>MySQL支持多种类型，大致可以分为三类：数值、日期/时间和字符串(字符)类型。

##### 8.1.1数值类型

| 类型             | 大小                              | 范围（有符号）                                  | 范围（无符号）              | 用途           |
| ---------------- | --------------------------------- | ----------------------------------------------- | --------------------------- | -------------- |
| [INT]()          | 4 字节                            | (-2 147 483 648，2 147 483 647)                 | (0，4 294 967 295)          | 大整数值       |
| DOUBLE           | 8 字节                            | （-1.797E+308,-2.22E-308）                      | (0,2.22E-308,1.797E+308)    | 双精度浮点数值 |
| [DOUBLE(M,D)]()  | 8个字节，M表示长度，D表示小数位数 | 同上，受M和D的约束   DOUBLE(5,2) -999.99-999.99 | 同上，受M和D的约束          | 双精度浮点数值 |
| [DECIMAL(M,D)]() | DECIMAL(M,D)                      | 依赖于M和D的值，M最大值为65                     | 依赖于M和D的值，M最大值为65 | 小数值         |

##### 8.1.2日期类型

| 类型         | 大小 | 范围                                                         | 格式                | 用途                     |
| ------------ | :--- | ------------------------------------------------------------ | ------------------- | ------------------------ |
| [DATE]()     | 3    | 1000-01-01/9999-12-31                                        | YYYY-MM-DD          | 日期值                   |
| TIME         | 3    | '-838:59:59'/'838:59:59'                                     | HH:MM:SS            | 时间值或持续时间         |
| YEAR         | 1    | 1901/2155                                                    | YYYY                | 年份值                   |
| [DATETIME]() | 8    | 1000-01-01 00:00:00/9999-12-31 23:59:59                      | YYYY-MM-DD HH:MM:SS | 混合日期和时间值         |
| TIMESTAMP    | 4    | 1970-01-01 00:00:00/2038 结束时间是第 **2147483647** 秒北京时间 **2038-1-19 11:14:07**，格林尼治时间 2038年1月19日 凌晨 03:14:07 | YYYYMMDD HHMMSS     | 混合日期和时间值，时间戳 |

##### 8.1.3字符串类型

| 类型                            | 大小         | 用途                                                         |
| ------------------------------- | ------------ | ------------------------------------------------------------ |
| [CHAR]()                        | 0-255字符    | 定长字符串  char(10) 10个字符（例如，在定义的时候，设置字符长度为 200 个字节，那么在存储的时候，该字段总是占用 200 个字节） |
| [VARCHAR]()                     | 0-65535 字节 | 变长字符串  varchar(10)  10个字符，如果在定义的时候，设置字符串的长度为 200 个字节，但是在实际使用的过程中，只用了20个字节，那么该字段最终就只占用20个字节的存储空间。 |
| [BLOB]()（binary large object） | 0-65535字节  | 二进制形式的长文本数据，这种数据类型很少使用，了解即可。两个问题：1. 读取/写入都是通过 IO 流来完成的，执行效率特别低；2. 二进制文件无法搜索。一般来说，如果有图片需要保存，我们会搭建一个专门的图片服务器，每一个图片都有一个访问链接，我们在数据库中，可以将这个访问链接保存起来。 |
| [TEXT]()                        | 0-65535字节  | 长文本数据，例如博客表，存储博客的内容                       |

#### 8.2数据表的创建(CREATE)

>[CREATE TABLE 表名（]()
>
>​	[列名 数据类型 [约束],]()
>
>​	[列名 数据类型 [约束],]()
>
>​	....
>
>​	[列名 数据类型 [约束]]()  //最后一列的末尾不加逗号
>
>[）[charset=utf8]]();   //可根据需要指定表的字符编码集

#### 8.3 数据表的修改（ALTER）

> [ALTER]() TABLE 表名 操作;

#### 8.4 数据表的删除（DROP）

> [DROP]() TABLE 表名

### 9.约束

>
>
>[PRIMARY KEY]() 主键约束，标识表中的一行数据，此列的值不可重复，且不能为 NULL。
>
>[UNIQUE]() 唯一约束，标识表中的一行数据，不可重复，可以为 NULL。
>
>[AUTO_INCREMENT]() 自增长，给主键数值列添加自动增长。从 1 开始，每次加 1。不能单独使用，和主键配合。
>
>[NOT NULL]() 非空约束，此列必须有值。

### 10.权限

#### 10.1 创建用户

> CREATE [USER]() 用户名 [IDENTIFIED BY]() 密码

#### 10.2 授权

> [GRANT ALL ON]() 数据库.表 [TO]() 用户名;

#### 10.3 撤销权限

> [REVOKE ALL ON]() 数据库.表名 [FROM]() 用户名

#### 10.4 删除用户

> [DROP USER]() 用户名

### 11.视图

#### 11.1概念

>视图（view）是一种虚拟存在的表，是一个逻辑表，本身并不包含数据。作为一个select语句保存在数据字典中的。

#### 11.2视图的特点

>- 优点
>  - 简单化，数据所见即所得。
>  - 安全性，用户只能查询或修改他们所能见到得到的数据。
>  - 逻辑独立性，可以屏蔽真实表结构变化带来的影响。
>
>- 缺点
>  - 性能相对较差，简单的查询也会变得稍显复杂。
>  - 修改不方便，特变是复杂的聚合视图基本无法修改。

#### 11.3视图的创建

> 语法：[CREATE VIEW 视图名 AS]() 查询数据源表语句;

#### 11.4视图的修改

>- 方式一：[CREATE OR REPLACE VIEW]() 视图名 AS 查询语句
>
>- 方式二：[ALTER VIEW]() 视图名 AS 查询语句

#### 11.5视图的删除

> [DROP VIEW]()  视图名



#### MySQL版本问题
>com.mysql.jdbc.Driver 适用于 mysql-connector-java 5以前， 
com.mysql.cj.jdbc.Driver 适用于 mysql-connector-java 6以后版本。
>6以后版本需要指定时区serverTimezone,在中国，可以选择Asia/Shanghai或者Asia/Hongkong
~~~java
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/test?serverTimezone=Hongkong&?useUnicode=true&characterEncoding=utf8&useSSL=false
username=root
password=
~~~

SSL – Secure Sockets Layer（安全套接层）
>如果你不需要使用SSL连接，建议设置useSSL=false来禁用。 

