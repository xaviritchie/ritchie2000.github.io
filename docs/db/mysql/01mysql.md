---
title: MySQL
---
## MySQL主从搭建

~~~shell
#master主机  
docker run --name mysql01 -e MYSQL_ROOT_PASSWORD=1234 -d -p 33061:3306 mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci  
#slave从机  
docker run --name mysql02 -e MYSQL_ROOT_PASSWORD=1234 -d -p 33062:3306 mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
~~~

主机授权给从机，在mysql中操作
~~~sql
GRANT REPLICATION SLAVE ON *.* to 'rep1'@'192.168.139.128' identified by '123456';  
​  
FLUSH PRIVILEGES;  
#rep1是从机的登录用户名，必须从192.168.139.128地址登录，改成%就是不做地址限制，123是密码

~~~

~~~shell
repli  slave  
用户管理 -- 权限  
​  
binlog 1%性能损耗，  
#进入主机容器  
docker exec -it mysql01 /bin/bash  
cat /etc/my.conf  
​  
find / -name my.cnf  
#For。。。。！includedir  
#复制这段  
exit  
vi my.cnf  
#修改以下内容  
[mysql]  
log-bin=/var/lib/mysql/binlog  
server-id=1 #maysql的标识符  
binlog-do-db=db01 #要同步的库  
:wq  
​  
docker cp ./my.cnf mysql01:/etc  
docker restart mysql01  
~~~

复制的部分  
~~~shell
# For advice on how to change settings please see  
# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html  
​  
[mysqld]  
#  
# Remove leading # and set to the amount of RAM for the most important data  
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.  
# innodb_buffer_pool_size = 128M  
#  
# Remove leading # to turn on a very important data integrity option: logging  
# changes to the binary log between backups.  
# log_bin  
#  
# Remove leading # to set options mainly useful for reporting servers.  
# The server defaults are faster for transactions and fast SELECTs.  
# Adjust sizes as needed, experiment to find the optimal values.  
# join_buffer_size = 128M  
# sort_buffer_size = 2M  
# read_rnd_buffer_size = 2M  
skip-host-cache  
skip-name-resolve  
datadir=/var/lib/mysql  
socket=/var/run/mysqld/mysqld.sock  
secure-file-priv=/var/lib/mysql-files  
user=mysql  
​  
# Disabling symbolic-links is recommended to prevent assorted security risks  
symbolic-links=0  
​  
#log-error=/var/log/mysqld.log  
pid-file=/var/run/mysqld/mysqld.pid  
[client]  
socket=/var/run/mysqld/mysqld.sock  
​  
!includedir /etc/mysql/conf.d/  
!includedir /etc/mysql/mysql.conf.d/
~~~

~~~sql
#在MySQL主机里执行  
SHOW MASTER STATUS;  
#会显示一个Position数字，每次会变，eg.595  
​  
#在从机里执行  
CHANGE MASTER TO MASTER_HOST='192.168.139.128',MASTER_PORT=33061,USER='rep1',PASSWORD='123456',MASTER_LOG_FILE='binlog.000001',MASTER_LOG_POS=595;  
#主机地址、端口，从机登录主机的用户名和密码  
​  
#启动从机  
START SLAVE;  
#查看从机状态  
SHOW SLAVE STATUS;
~~~


