---
title: JVM调优
---
## JVM调优工具

jps(Java Virtual Machine Process Status Tool) ：基础工具

jstack主要用来查看某个Java进程内的线程堆栈信息。

jmap（Memory Map）和 jhat（Java Heap Analysis Tool）

jstat（JVM统计监测工具）

hprof（Heap/CPU Profiling Tool）

hprof能够展现CPU使用率，统计堆内存使用情况。


## JVM调优相关参数

-Xms2g：初始化推大小为 2g；

-Xmx2g：堆最大内存为 2g；

-XX:NewRatio=4：设置年轻的和老年代的内存比例为 1:4；

-XX:SurvivorRatio=8：设置新生代 Eden 和 Survivor 比例为 8:2；

–XX:+UseParNewGC：指定使用 ParNew + Serial Old 垃圾回收器组合；

-XX:+UseParallelOldGC：指定使用 ParNew + ParNew Old 垃圾回收器组合；

-XX:+UseConcMarkSweepGC：指定使用 CMS + Serial Old 垃圾回收器组合；

-XX:+PrintGC：开启打印 gc 信息；

-XX:+PrintGCDetails：打印 gc 详细信息。