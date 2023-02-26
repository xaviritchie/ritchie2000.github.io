---
title: Docker、Linux
---

## 1.描述常见的Linux命令（说10个）并描述其作用

ls 查看目录内容                                                   rm [文件名]，删除文件或目录

cd [目录名]，进入目录                                       cp [源文件] [目标文件]，复制文件

mkdir [目录名] 创建目录                                    mv [源文件] [目标文件]，移动文件

more [文件名] ，分屏显示文件内容                 grep [word] [文件名]，搜索文本文件内容

pwd 输出当前文件夹位置                                  cat  显示文件内容

## 2.在Linux中，如何查看日志？有哪些方式和命令

more [日志文件名] ，分屏显示文件内容

sed    按照行号和时间范围查询

cat  显示整个文件

head [行数] [文件]  参数默认为10，显示前多少行内容

tail -f filename 会把 filename 文件里的最尾部的内容显示在屏幕上，并且不断刷新，只要 filename 内容更新就可以看到最新的文件内容。

## 3.Linux中浏览文本的命令有哪些？分别是什么和区别

cat  显示整个文件

tac  倒序显示文件

more  分屏显示文件

head  默认显示前十行   head  -n  显示前n行

tail  显示后十行

## 4.Linux中，查看进程的命令？查看CPU的命令？

ps aux  将以简单列表的形式显示出进程信息

top命令可以查看进程动态信息，以全屏交互式的界面显示进程排名，及时跟踪包括CPU、内存等系统资源占用情况，默认情况下每三秒刷新一次，其作用基本类似于Windows系统中的任务管理器。

1、查看cpu个数：

cat /proc/cpuinfo | grep 'physical id' | sort -u

2、查看cpu核数：

cat /proc/cpuinfo | grep 'core id' | sort -u | wc -l

3、查看cpu线程：

cat /proc/cpuinfo | grep 'processor' | sort -u | wc -l

## 5.描述什么Docker，为什么要使用Docker

Docker 是一个开源的应用容器引擎，基于Go 语言 并遵从Apache2.0协议开源。

Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。



更高效的利用系统资源

更快速的启动时间

一致的运行环境

持续交付和部署

 更轻松的迁移

更轻松的维护和扩展

## 6.描述什么是Docker镜像、什么是容器，之间的关系是什么

Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。

Docker容器就是容器，在docker里，提供了运行docker镜像的运行时环境。运行容器时，在镜像层上面增加了一个读写层，可以对运行的容器做一些更改，但这些更改不会对镜像产生影响，如果关闭或删除容器后，这些更改也不会保存。

镜像（`Image`）和容器（`Container`）的关系，就像是面向对象程序设计中的 `类` 和 `实例` 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

## 7.Docker常用命令（镜像、容器）至少说5个

docker  images 查看所有镜像

docker  pull  image_name   下载名字为image_name的镜像

docker   rmi  镜像id  删除id的镜像

docker   ps   查看运行中的容器

docker ps -a  查看所有容器

docker stop   停止容器

docker restart   重启容器

## 8.描述Docker数据卷

数据卷 ： 是一个可供一个或多个容器使用的特殊目录。

- 数据卷可以在容器之间共享和重用

- 对数据卷的修改会立马生效

- 对数据卷的更新，不会影响镜像

- 数据卷默认会一直存在，即使容器被删除

## 9.容器与宿主机之间的数据拷贝的方式有哪些？

docker  cp  [OPTIONS] CONTAINER:PATH LOCALPATH    //容器中 复制到 宿主机
docker cp  [OPTIONS] LOCALPATH|- CONTAINER:PATH  //宿主机 复制到 容器中



## 10.描述Dockerfile中常见的指令和作用（至少5个）

FROM    指定基础镜像

MAINTAINER         提供Dockerfile 制作者提供本人信息

ENV     用于为docker容器设置环境变量 ENV设置的环境变量

USER     用来切换运行属主身份的

WORKDIR      用来切换工作目录的

COPY    把宿主机中的文件复制到镜像中去

RUN     用来执行命令行命令的

## 11.你是如何利用Docker进行微服务的部署（详细）

1、构建⼀个微服务，并打包成⼀个jar包。
2、将jar包传到容器平台上。编写DockerFile脚本，并构建⼀个镜像。
3、通过镜像启动⼀个docker容器，即完成微服务的部署。
4、通过DockerFile脚本中编写的配置信息访问容器，即可实现微服务的访问。
