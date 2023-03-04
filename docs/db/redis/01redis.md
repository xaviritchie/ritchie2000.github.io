---
title: Redis
---

非关系型数据库，数据结构服务器，key-value存储系统。

### redis

> 缓存工具；
> 
> NoSQL：Redis、ElasticSearch、MongoDB；
> 
> redis用的是key：value形式

> wget source路径
> 
> redis和nginx都是基于c语言写的，无法直接安装
> 
> 安装gcc，

~~~shell
cp reids.conf redis.conf.bak
vi redis.conf

/daemon #把no改成yes

src/redis-server redis.conf

ps -ef|grep redis

src/redis-cli
ping #他给你返回PONG

yum install gcc #安装gcc
~~~



## 安装
~~~shell
#安装redis
#先下载redis或从本地上传到linux
tar -zxvf redis-7.0.8.tar.gz #解压
yum install gcc #安装gcc，因为是c语言编写的，和nginx一样需要用gcc工具编辑

cd 到redis的目录
make distclean && make #清理上一次运行的结果并执行编译

#ls 里面有个src目录，此目录下有个redis-server 执行表示启动
src/redis-server

cp redis.conf redis.conf.bak #备份一下
vi redis.conf
/daemon #把no改成yes,后台启动
src/redis-server redis.conf

ps -ef|grep redis

~~~

~~~shell
vi redis.conf
/bind  #把这个注销掉 /是搜索，n查找下一个
#bind 127.0.0.1 -::1

#保护模式，默认是开启的，可以改成no或者给它添加密码
protected-mod yes 

#设置密码，取消注释，把foobared改成你自定义的密码
requirepass foobared
#比如把密码改成 123
requirepass 123


ps -ef|grep redis
kill -9 pid

src/redis-cli
#先关闭再重启
SHUTDOWN

src/redis-server redis.conf
~~~

~~~shell
src/redis-cli
ping
auth 123
ping 
#PONG
exit

src/redis-cli -a 123

set name sa
#OK
get name
#"sa"

INCR age #自增
DECR life #自减

INCRBY age 150
DECRBY life 120

ttl name
GETEX name EX 30 #30秒后过期

set kl 'hello redis'
set k2 '你好'

GETRANGE k1 2 3
GETRANGE k2 -5 -1

set k3 zhang1
set k4 zhang2
LCS k3 k4
#"zhang"

mset k5 v5 k6 v6 k7 v7
mget k5 k6 k7
#"v5"
#"v6"
#"v7"

setex k8 10 v8
#设置k8十秒后过期，值为v8
ttl k8
~~~

~~~shell
flushall #清空
key *
SETBIT k1 7 0 #位操作
BITCOUNT k1 #看他里面有几个k1

hset
hget


list 
lpush k1 12345
lpop 
linsert 插入k1 before 3 99 
lrange k1 0 -1  #-1是最后一个，表示获取所有

lpushx
；erm lrange
lset 
lrange k1 0 2  #把原本的值替换掉

ltrim k1 0  #截取一个集合出来

lpush k1 1 2 3 4
lrange k1 02 
b - block

~~~


