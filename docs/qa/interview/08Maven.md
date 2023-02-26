---
title: Maven
---
## 1、Maven是什么？作用？优缺点？
  - Maven 是一个项目管理工具，可以对 Java 项目进行构建、依赖管理。maven包含了清理缓存，编译，打包，发布，运行等功能
  - 优点：
    1. 简化了项目依赖管理：
    2. 易于上手，对于新手可能一个"mvn clean package"命令就可能满足他的工作
    3. 便于与持续集成工具（jenkins）整合
    4. 便于项目升级，无论是项目本身升级还是项目使用的依赖升级。
    5. 有助于多模块项目的开发，一个模块开发好后，发布到仓库，依赖该模块时可以直接从仓库更新，而不用自己去编译。
    6. maven有很多插件，便于功能扩展，比如生产站点，自动发布版本等
  - 缺点：
    1. maven是一个庞大的构建系统，学习难度大
    2. maven采用约定优于配置的策略（convention over configuration），虽然上手容易，但是一旦出了问题，难于调试。
    3. 当依赖很多时，m2eclipse 老是搞得Eclipse很卡。
    4. 中国的网络环境差，很多repository无法访问，比如google code， jboss 仓库无法访问等。

## 2、Maven Scope的作用？
  - 依赖范围
    maven 项目在不同的阶段引入到classpath中的依赖是不同的，maven会在不同阶段将与运行相关的依赖引入classpath中，而依赖范围就是用来控制依赖于这三种classpath的关系.
    约定大于配置
    scope的默认值是compile
    Scope的作用域范围包括**compile、test、provided、runtime、system、import**。

## 3、Maven的生命周期？
Maven 有以下三个标准的生命周期：
  1. **clean周期**：主要用于清理上一次构建产生的文件，可以理解为删除target目录
      
  2. **default(或 build)默认周期**：项目部署的处理
      主要阶段包含:
      - process-resources 默认处理src/test/resources/下的文件，将其输出到测试的classpath目录中,
      - compile 编译src/main/java下的java文件，产生对应的class,
      - process-test-resources 默认处理src/test/resources/下的文件，将其输出到测试的classpath目录中,
      - test-compile 编译src/test/java下的java文件，产生对应的class,
      - test 运行测试用例,
      - package 打包构件，即生成对应的jar, war等,
      - install将构件部署到本地仓库,
      - deploy 部署构件到远程仓库
  3. **site周期**：项目站点文档创建的处理
      主要阶段包含：
      - site 产生项目的站点文档
      - site-deploy 将项目的站点文档部署到服务器
