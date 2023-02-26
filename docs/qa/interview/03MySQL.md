---
title: MySQL
---
## 1. 描述主键、外键、超键是什么

	超键(super key):在关系中能唯一标识元组的属性集称为关系模式的超键
	候选键(candidate key): 不含有多余属性的超键称为候选键。也就是在候选键中，若再删除属性，就不是键了！
	主键(primary key):用户选作元组标识的一个候选键程序主键
	
	外键(foreign key):如果关系模式R中属性K是其它模式的主键，那么K在模式R中称为外键
	
## 2. 数据库设计的三大范式
	范式：Normal Format，符合某一种级别的关系模式的集合，表示一个关系内部各属性之间的联系的合理化程度。
	1、第一范式，确保每列保持原子性；
	2、第二范式，确保表中的每列都和主键相关，消除依赖；
	3、第三范式，确保每列都和主键列直接相关，而不是间接相关，消除传递。

## 3. drop,delete与truncate的区别
    数据恢复方面：delete 可以恢复删除的数据，而 truncate 和 drop 不能恢复删除的数据。
    执行速度方面：drop > truncate > delete。
	删除数据方面：drop 是删除整张表，包含结构和内容，而 truncate 和 delete 只删除了表数据，不删除表结构。
	添加条件方面：delete 可以使用 where 表达式添加查询条件，而 truncate 和 drop 不能添加 where 查询条件。
	重置自增列方面：在 InnoDB 引擎中，truncate 可以重置自增列，而 delete 不能重置自增列。
	
	
	
	DDL ---  Data Definition Language 定义
	DML ---  Data Manipulation Language 操纵
	
	delete： 属于数据库DML操作语言，只删除数据不删除表的结构，会走事务，执行时会触发trigger
    truncate：属于数据库DDL定义语言，不走事务。本质上是新建了一个表结构，再把原先的表删除掉
    drop：属于数据库DDL定义语言
    
## 4. SQL UNION 和 UNION ALL 区别
	并集操作
	UNION去重且排序
	UNION ALL不去重不排序
	UNION和UNION ALL关键字都是将两个结果集合并为一个，并集操作,但UNION ALL 要比UNION快很多

## 5. exists、in、any、all区别
	嵌套查询
	- exists是表示子查询是否返回结果，而不管返回的具体内容
	- in表示值是否存在子查询结果集中 
	- any是表示子查询结果中任意一个
	- all表示子查询结果中的所有

## 6. sql语句的执行顺序

	1. from 子句组装来自不同数据源的数据
	2. where 子句基于指定的条件对记录行进行筛选 
	3. group by 子句将数据划分为多个分组 
	4. 使用聚集函数进行计算  
	5. 使用 having 子句筛选分组 
	6. 计算所有的表达式  
	7. select 的字段筛选 
	8. 使用 order by 对结果集进行排序。
	9. limit
## 7. count(\*)和count(1)和count(id)区别

	count(*)、count(1) 和 count(id) 都表示返回满足条件的结果集的总行数；
	而count(字段)则表示返回满足条件的数据行里面，参数“字段”不为 NULL 的总个数。
	
	count(id)：InnoDB 引擎会遍历整张表，取值，不包括NULL
	count(1)：InnoDB 引擎遍历整张表，但不取值，包括NULL
	count(\*)：并不会把全部字段取出来，而是直接按行累加。获取表的总行数，包括NULL
	
	执行效率：count(\*) ≈  count(1) > count(id) = count(非空字段) > count(可空字段) 
	若列名为主键，count(列名)会比count(1)快 
    若列名不为主键，count(1)会比count(列名)快 
    若表多个列并且没有主键，则 count（1） 的执行效率优于 count（*） 
    若表有主键，则 count（主键）的执行效率是最优的 
    若表只有一个字段，则count（\*）最优。

## 8. SQL语句优化（不少于6条）
	1. 性能分析
	2. 用explain关键字分析你写的sql，尤其是走不走索引这块。
	3. 正确建立索引
	4. select语句指明字段名，禁用*来查询
    - 只查询一条数据的时候，使用limit
    - 避免在where子句中对字段进行null值判断，考虑用默认值代替null
    - 尽量避免在where子句中使用or来连接条件。or可能会导致索引失效，导致全表扫描
    - 尽量避免在where自居中对字段进行表达式操作，这会导致系统放弃使用索引而进行全表扫描
    - 尽量使用inner join，避免left join
    - 不建议使用%前缀模糊查询
    - insert插入多条数据时，采用手动提交事务
    - 创建表的时候使用同一编码
    - 多表关联查询时，小表在前，大表在后
    - 使用表的别名
    - 对于复杂的查询，可以使用中间临时表暂存数据
    - 尽量避免在字段开头模糊查询
    - 如果检索结果中不会有重复记录，推荐用union all代替unoin
    - 小表驱动大表
    - 高效的分页
    - 用连接查询代替子查询
    - 控制索引数量，一般不超过5个
    - 索引优化
    - 有大量重复数据的字段，不适合建立索引
    - 用varchar代替char

## 9. SQL常用函数有哪些？
	数学函数
	字符串函数
	日期和时间函数
	条件判断函数
	系统信息函数
	加密函数
	格式化函数等

## 10. 左连接 右连接 内连接的区别
	左连接 返回包括左表中的所有记录和右表中连接字段相等的记录；
	右连接 返回包括右表中的所有记录和左表中连接字段相等的记录；
	内连接 只返回两个表中连接字段相等的行； 
	全外连接 返回左右表中所有的记录和左右表中连接字段相等的记录

## 11. Mysql三种常见引擎的区别
    MySQL常见的三种存储引擎为InnoDB、MyISAM和MEMORY。其区别体现在事务安全、存储限制、空间使用、 内存使用、插入数据的速度和对外键的支持。 
    1. 事务安全：InnoDB支持事务安全，MyISAM和MEMORY两个不支持。
    2. 存储限制：InnoDB有64TB的存储限制，MyISAM和MEMORY要是具体情况而定。 
    3. 空间使用：InnoDB对空间使用程度较高，MyISAM和MEMORY对空间使用程度较低。 
    4. 内存使用：InnoDB和MEMORY对内存使用程度较高，MyISAM对内存使用程度较低。 
    5. 插入数据的速度：InnoDB插入数据的速度较低，MyISAM和MEMORY插入数据的速度较高。
    6. 对外键的支持：InnoDB对外键支持情况较好，MyISAM和MEMORY两个不支持外键


## 12. sql注入
[SQL注入]（SQL Injection）是一种常见的Web安全漏洞，主要形成的原因是在数据交互中，前端的数据传入到后台处理时，没有做严格的判断，导致其传入的“数据”拼接到SQL语句中后，被当作SQL语句的一部分执行。 从而导致数据库受损（被脱库、被删除、甚至整个服务器权限陷）**。**

***\*即\**：\**注入产生的原因是后台服务器接收相关参数未经过滤直接带入数据库查询\****

1. 对输入进行严格的转义和过滤
2. 使用参数化（Parameterized）
3. PDO预处理 
4. 云端防护（如阿里云盾）
5. 通过WAF设备启用防SQL Inject注入策略（或类似防护系统）


## 1.3 mysql explain是什么？有什么作用？描述下type
	EXPLAIN :模拟Mysql优化器是如何执行SQL查询语句的，分析查询语句或表结构的性能瓶颈。
	type是查询的访问类型。是较为重要的一个指标，结果值从最好到最坏依次是： system > const > eq_ref > ref > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > range > index > ALL ，一般来说，得保证查询至少达到range级别，最好能达到 ref。
	
## 14. mysql中有哪几种锁？表锁、行锁、页锁区别？
	- 表级锁：开销小，加锁快；不会出现死锁；锁定粒度大，并发度最低；但是发生锁冲突的概率最高
	- 行级锁：开销大，加锁慢；会出现死锁；锁定粒度最小，并发度最高；但是发生锁冲突的概率最低
	- 页面锁：开销、加锁速度、锁定粒度、并发度都界于表锁和行锁之间；会出现死锁
	
## 15. 悲观锁 for update 乐观锁(version) 的区别
	- 悲观锁: 基于数据库层面的锁,每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会block阻塞。
	- 乐观锁: 每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据。
	
## 16. 什么是索引？索引的种类有哪些，描述索引的优缺点?
	在关系数据库中，索引是一种单独的、物理的对数据库表中一列或多列的值进行排序的一种存储结构，它是某个表中一列或若干列值的集合和相应的指向表中物理标识这些值的数据页的逻辑指针清单。 
	索引分为：
   
   ​		普通索引(非主键)、唯一索引、聚集索引、主键(聚簇)索引、全文索引等。
   
    - 优点
    	- 提高数据的搜索速度
    	- 加快表与表之间的连接速度
    	- 提高检索效率 
    - 缺点
     	- 需要花费时间去建立和维护索引
     	- 在创建索引的时候会占用存储空间
     	- 修改表中的数据时索引需要进行动态的维护


## 17. 设计索引的原则？(不少于4条)
	1. 选择唯一性索引
	2. 为经常需要排序、分组和联合操作的字段建立索引
	3. 为常作为查询条件的字段建立索引
	4. 限制索引的数目
	5. 尽量使用数据量少的索引
	6. 数据量小的表最好不要使用索引


## 18. 什么情况下索引会失效？（不少于4条）
	1. 复合索引未用左列字段;
	2. like以%开头;idea的maven在pluging出现两个clean2，
	3. 需要类型转换;
	4. where中索引列有运算; 
	5. where中索引列使用了函数;


## 19. Btree和Hash区别
	- BTree索引是最常用的mysql数据库索引算法，它不仅可以被用在=,>,>=,<,<=和between这 些比较操作符上，还可以用于like操作符，只要它的查询条件是一个不以通配符开头的常量 
	- Hash索引只能用于对等比较，例如=,<=>（相当于=）操作符。由于是一次定位数据，不像BTree索引需要从根节点到枝节点，最后才能访问到页节点这样多次IO访问，所以检索效率远高于BTree索引

## 20. Btree和B+tree的区别
   >B-Tree是一种多叉平衡查找树，类似普通的二叉树。
   B+Tree是在B-Tree基础上的一种优化，使其更适合实现外存储索引结构，InnoDB存储引擎就是用B+Tree实现其索引结构。
   
   **两者区别**
	1. B-Tree的关键字，指针和数据都是存储在一起的；而B+Tree的非叶子节点中只有关键字和指向下一个节点的索引，记录只放在叶子节点中。所以非叶子结点中可以存储更多的索引项，进而提高搜索的效率。
	2. B-Tree中不同的叶子之间没有连在一起；B+Tree 中所有的叶子结点通过指针连接在一起。
	3. 在B-Tree中，越靠近根节点的记录查找越快，只要找到关键字即可确定记录的存在；而B+Tree中每个记录的查找时间基本是一样的，都需要从根节点走到叶子节点，而且在叶子节点中还要再比较关键字。
   
## 21. 数据库优化方案？
	1. 优化索引，sql语句，分析慢查询 
	2. 设计表的时候严格按照数据库设计规范来设计数据库
	3. 使用缓存，把经常访问并且不需要经常变化的数据放在缓存中，能够节约磁盘IO
	4. 数据量很大的时候分库分表


## 22. 什么是存储过程？有什么优缺点？

	存储过程是在大型数据库系统中，一组为了完成特定功能的SQL 语句集，存储在数据库中，经过第一次编译后再次调用不需要再次编译，用户通过指定存储过程的名字并给出参数（如果该存储过程带有参数）来调用存储过程。
	优点
	1. 存储过程是预编译过的，执行效率高。
	2. 存储过程的代码直接存放于数据库中，通过存储过程名直接调用，减少网络通讯。
	3. 安全性高，执行存储过程需要有一定权限的用户。
	4. 存储过程可以重复使用，减少数据库开发人员的工作量
	缺点
	1. 调试麻烦，但是用 PL/SQL Developer 调试可以弥补这个缺点。
	2. 移植性差。
	3. 重新编译问题，如果带有引用关系的对象发生改变时，包将需要重新编译（可设置成运行时自动编译）。
	4. 在一个程序系统中大量的使用存储过程，随着用户需求的增加会导致数据结构的变化，维护该系统很难很 麻烦、而且代价很大。

## 23. 什么是视图，视图有什么作用？

	- 视图也被称作虚表，即虚拟的表，是一组数据的逻辑表示,其本质是对应于一条SELECT语句，结果集被赋予一个名字，即视图名字。
	- 视图本身并不包含任何数据，它只包含映射到基表的一个查询语句，当基表数据发生变化，视图数据也随之变化。
	1. 可以定制用户数据，聚焦特定的数据。
	2. 可以简化数据操作。
	3. 基表中的数据有一定的安全性
	4. 可以合并分离的数据，创建分区视图
	
	
	
## 24. 索引

>也是一张表，该表保存了主键与索引字段，并指向实体表的记录。eg.通过首字母查字典、通过身份证号查个人信息。

>索引可以大大提高MySQL的检索速度，但是会降低更新表的速度，也会占用磁盘空间的索引文件。实际应用中一般给需要经常查询的字段建立索引。

	1. 主键索引：又叫聚簇索引，叶子节点存储的是一行完整的记录；
	2. 非主键索引，又叫普通索引，不是主键索引的索引都叫做非主键索引，两者使用的数据结构都是B+Tree，叶子节点存储主键值，即id；

**回表**

先通过普通索引定位到主键值id，再通过主键索引定位到行记录。查了两次，性能更低。

**如何避免回表**

将需要的字段放在索引中去，查询的时候就能避免回表。



**为什么mysql的索引使用B+树而不是B树呢？**

>B+树更适合磁盘等外部存储设备,由于内节点(非叶子节点)不存储data，所以一个节点可以存储更多的内节点，每个节点能索引的范围更大更精确。也就是说使用B+树单次磁盘IO的信息量相比较B树更大，IO效率更高。

>mysql是关系型数据库，经常会按照区间来访问某个索引列，B+树的叶子节点间按顺序建立了链指针，加强了区间访问性，所以B+树对索引列上的区间范围查询很友好。而B树每个节点的key和data在一起，无法进行区间查找。



**其他知识点：**
三层的B+Tree可以存储2100万条数据。
单列索引：一个索引只包含单个列。
组合索引：一个索引包含多个列。
关系数据库会自动对主键创建主键索引。