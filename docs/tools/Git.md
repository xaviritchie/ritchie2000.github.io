---
lang: zh-CN
title: Git
description: tools 01
---

### 1.简介

>Git是目前世界上最先进的分布式版本控制(Revision control)系统（没有之一）。
>
>1.本地版本控制
>
>2.集中版本控制 SVN
>
>3.分布式版本控制 Git
>
>- 每个人都拥有全部的代码！

### 2. Git安装和卸载

使用镜像地址，速度快一些

[CNPM Binaries Mirror (npmmirror.com)](https://registry.npmmirror.com/binary.html?path=git-for-windows/)

>软件版本：
>rc是候选版
>ga是正式版
>

>*NPM*的全称是Node Package Manager，是一个NodeJS包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准。2020年3月17日，Github宣布收购*npm*，GitHub现在已经保证*npm*将永远免费。

### 3. 常用Linux命令

>pwd 打印当前目录 
>
>git config -l 查看git配置清单
>
>rm 删除文件
>
>rm -r 删除目录
>
>cd .. 返回上一级
>
>ls和ll 列出当前目录下的所有文件
>
>clear 清屏
>
>exit 退出
>
>git config --system --list查看系统级别的配置文件
>
>git config --global --list查看当前用户配置

### 4.用户配置(必须)

系统配置git安装目录etc下的gitconfig文件。

用户配置c盘user用户目录下.gitconfig目录

~~~q
git config --global user.name "wangzeyu"
git config --global user.email "wangzeyu@email.com"
~~~

### 5. 基本理论✨

>Workapce工作区
>
>Index/Stage暂存区
>
>Repository本地仓库
>
>Remote远程仓库 --> GitHub

![[image-20221108081152691.png]]

### 6. 项目搭建

>生成公钥ssh,实现免密登录
>
>$ ssh-keygen -t rsa
>在系统c盘用户目录下生成一个私钥和一个公钥文件，打开id_rsa.pub公钥，拷贝到gitee

>1. 在Gitee上新建仓库
>2. 然后克隆下载git clone gitee项目的url地址
>3. 再把克隆下来的文件复制到新建的idea项目中，或者直接使用该目录作为项目
>4. add到暂存区（在idea左下角的Terminal使用命令git add .）
>5. commit到本地仓库（git commit -m "提交新文件"）
>6. push到远程仓库（git push）
>7. 此时刷新Gitee就显示出来了

### 7.Git分支(branch)

>新建分支的方法：
>
>1. 在Gitee代码位置可以新建分支，默认主分支是master。
>
>2. idea右下角Git:master也可以新建分支，+New Branch

![[image-20221108200251297.png]]

![[image-20221108200209201.png]]

> 切换分支
>
> 选中要切换到的分支，然后点Checkout

![[image-20221108200718287.png]]

注：如果是在Gitee中新建的分支，需要在idea项目中右键Git->Repository->Fetch刷新出来。

>回退分支
>
>git reset
>
>尽量别用

>
>合并分支merge
>
>需要先切换到master主分支，然后Git->Repository->Merge
>
>上面的是本地的，下面的是服务器上的分支

![[image-20221108204034267.png]]

>自定义合并分支
>
>eg.把A,B分支合并到C分支？
>
>先Checkout选择到C分支，然后在分别把A,B两个分支Merge合并进来。最后push。


### 其他说明
一台电脑上可以配置多个SHH Key
https://gitee.com/help/articles/4229#article-header1
不同网站（例如Github和Gitee）进行SSH通信要填不同的邮箱来生成密钥对。

#### 检查现有 SSH 密钥
1.  打开Git Bash。
2.  输入 `ls -al ~/.ssh` 以查看是否存在现有的 SSH 密钥。
#### 生成新 SSH 密钥
1.  打开Git Bash。
2.  粘贴下面的文本（替换为您的 GitHub 电子邮件地址）。
    ```shell
    $ ssh-keygen -t ed25519 -C "your_email@example.com"
    ```
当系统提示您“Enter a file in which to save the key（输入要保存密钥的文件）”时，可以按 Enter 键接受默认文件位置。 请注意，如果以前创建了 SSH 密钥，则 ssh-keygen 可能会要求重写另一个密钥，在这种情况下，我们建议创建自定义命名的 SSH 密钥。 为此，请键入新的密钥保存位置，并将 自定义的密钥名称 eg.`id_rsa2`  加在后面。注意这个`id_rsa2`是文件名，不是目录名。

```shell
> Enter a file in which to save the key (/c/Users/YOU/.ssh/id_rsa2):[Press enter]
```
3. 在提示符下，键入安全密码。注意它这里密码是不显示的，连\*星号都没有。
4. 在GitHub头像 -> Settings -> SSH and GPG keys -> New SSH key -> 把生成的公钥粘进去
5. 添加后测试一下`ssh -T git@github.com`

### 为Gitee和GitHub设置不同的key
1. 打开Git Bash，`cd ~/.ssh`进入.ssh目录，如果.ssh文件夹不存在，利用`mkdir ~/.ssh`指令自动创建
2. `ssh-keygen -t ed25519 -C 'wangzeyu@tom.com' -f ~/.ssh/github_ed25519`然后回车三次，为GitHub生成公钥
3. `ssh-keygen -t ed25519 -C 'wangzeyu@tom.com' -f ~/.ssh/gitee_ed25519`也是回车三次，为Gitee生成公钥
4. 上面两个邮箱可以不同，我为了方便记忆写成一样的。
5. 分别测试一下，`ssh -T git@github.com`和`ssh -T git@gitee.com`
6. 如果报错：`git@github.com: Permission denied (publickey).`，就要添加主机到本机SSH可信列表，即将 SSH 私钥添加到 ssh-agent。
7. 输入`ssh-agent -s`，然后`ssh-add ~/.ssh/github_ed25519`，我这里的id是github
8. 如果还报错：`Could not open a connection to your authentication agent`，就执行如下命令：`ssh-agent bash`
9. 然后再执行`ssh-add ~/.ssh/github_ed25519`
10. 最后测试一下，显示Hi username！就success了。
11. 更好的办法是在.ssh目录下新建一个config文件，注意该文件无后缀！
~~~config
# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitee_ed25519
# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_ed25519
~~~



**git bash清屏**
*方法一：快捷键 Ctrl+L*
该方法只是把滚动条置于最下方，还是可以滚动屏幕看到原来操作过的命令和记录。

*方法二：输入reset命令加回车键*
该方法能实现真正的清屏，所有打印记录，所有操作过的命令可以通过上下箭头迅速查看。

*方法三：输入clear回车键*

**GitHub**
1. 先在本地文件夹，右键Git Bash输入`git init`初始化一个本地仓库
2. 另外`git status`可以查看当前仓库的文件状态，`clear`可以清屏
3. 然后把要管理的文件添加到暂存区`git add 文件名`，将当前目录下的所有文件到暂存区：`git add .`
4. 再把暂存区的文件提交到Git仓库中`git commit -m 提交的说明`
5. 先在GitHub上新建一个仓库
6. 复制给出的远程仓库地址
7. 给远程仓库起个别名，一般叫它`origin`，命令是`git remote add origin 远程仓库地址`
8. ~~在Git中`git push xxx复制的地址  master(要推送的分支名称，这里写master)``~~
9. 改分支名称`git branch -M main`
10. 添加`-u`可以帮你记住本次提交的远程仓库地址和分支名称`git push -u origin main`，下次提交只用`git push`就行
