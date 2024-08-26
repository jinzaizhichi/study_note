# Git 使用笔记

这篇笔记将用于记录本人在学习 Git 版本控制系统过程中的心得体会，它会被存储在在`https://github.com/owlman/study_note`项目的`SoftwareTool/VCS`目录下一个名为的`Git`目录中。

## 学习规划

- 学习基础：
  - 有一两门编程语言的使用经验。
  - 有一定的项目开发及维护经验。
- 视频资料：
  - [黑马程序员 Git 教程](https://www.bilibili.com/video/BV1MU4y1Y7h5)：哔哩哔哩上的视频教程。
- 阅读资料：
  - [《Git 权威指南》](https://book.douban.com/subject/6526452/)：本人学习所用书籍。
  - [《Git 学习指南》](https://book.douban.com/subject/26967729/)：本人参与翻译的书籍。
- 学习目标：
  - 使用 Git 维护自己的私人项目，并参与团队协作，

## 背景知识准备

在一般情况下，计算机上的程序开发项目都是从时间和空间两个维度上来进行维护的。在空间上，项目中的源代码文件以及管理依赖关系的文件（例如 makefile 文件）通常都是借由计算机操作系统以文件目录的形式来进行维护的。然而，我们应该使用什么工具来记录并管理在不同时间节点上所做的各种修改呢？答案是版本控制系统 （Version Control System，简称 VCS）。这是一种在时间维度上维护计算机程序项目的软件系统，它的功能就是方便开发者们记录并管理自己在某个特定时间节点上编写的代码，以便在必要时实现一些“有后悔药吃”的效果。

### 版本控制术语

在版本控制系统中，一系列专有的概念和操作都有特定的专业术语来描述。下面，就先来罗列一下这些术语及其所代表的含义：

- 版本（version）：指的是项目开发过程中某个被标记并存储下来的时间节点，其中包含了项目中所有文件在该时间节点上的副本。
- 仓库（Repository）：指的是用于记录并存储项目不同版本的地方，通常位于版本控制系统所在的服务器上。
- 分支（Branch）：指的是项目开发过程中的流程，项目中的每个分支都代表着一个独立的开发流程，用于解决一个独立的议题。
- 提交（Commit）：指的是开发者将在本地端所记录的版本上交至版本控制系统的服务端仓库。
- 冲突（Conflict）：指的是项目团队中的不同开发者针对同一份文件提交了时间上并行的版本，在这种情况下版本控制系统就会提出警告。
- 合并（Merge）：指的是查看引发冲突警告的并行版本，将它们所做的修改进行审查、取舍并整合为一个版本并重新提交。
- 检出（Checkout）：指的是开发者从版本控制系统的服务端仓库取出某一指定版本的文件副本到本地端，取出的可以是指定的文件，也可以是整个项目。

### 版本控制方式

从版本管理的方式上来看，版本控制系统主要可分为**集中式版本控制**和**分布式版本控制**两大类：

- 集中式版本控制系统（Centralized Version Control System）通常会在项目团队中设有一台中央版本控制服务器，并通过它来为参与该项目的所有开发者提供版本控制服务。这类版本控制系统在过去的很长一段时间内占据业界的主流，主要以 [CVS](http://www.nongnu.org/cvs) 与 [Subversion](https://subversion.apache.org/) 为代表，它们都有一个共同的缺点，即时常会因为单点造成的故障而让项目蒙受巨大损失。

- 分布式版本控制系统（Distributed Version Control System）的出现在很大程度上克服了集中式版本控制系统的缺点。这类版本控制系统会让项目团队中的每个开发者都持有项目的一个完整镜像，也就是说，现在该团队中每个参与者所使用的计算机都可以视为版本控制服务器。这样一来，即使项目团队中有某个单点因故障而失去了服务能力，其他节点还是可以继续维持版本控制系统的正常运转。这类版本控制系统主要以 [BitKeeper](https://www.bitkeeper.org/)、[Git](https://git-scm.com/) 为典型代表。

### Git 简介

由于 Linus Torvalds 一直不喜欢集中式的版本控制系统，所以在 2002年到 2005 年之间，他甚至一度不惜顶着开源社区巨大的争议压力而选择使用 BitKeeper 这个商业版本控制系统来维护 Linux 内核项目，为的是坚持分布式的开发方式。然而在 2005 年 4 月的某一天，因为 Samba 文件服务的开发者 Andrew Tridgell 为了编写一个能链接到 BitKeeper 存储库的简单交互程序，对其进行了逆向工程。由于这已经不是 Linux 项目的开发者们第一次对该商业软件进行逆向工程了，于是在多次警告无效的情况下， BitKeeper 所在的 BitMover 公司忍无可忍地终止了对 Linux 内核项目的授权。所以，Git 最初被开发出来只是因为 Linus Torvalds 急需要一个能替代 BitKeeper 的分布式版本控制工具，以便继续维护 Linux 的内核项目。后来由于这个软件的表现太过优秀，就逐步发展成为了业界最受欢迎的版本控制系统。

下面来重点讨论一下 Git 与其它主流版本控制系统之间的区别：

- 首先，它在版本迭代的过程中记录的并非是基于初始文件的变化数据，而是通过更为小型化的快照（Snapshot）文件体系来记录项目的版本历史。这样一来，如果某一份文件在版本更新后没有发生任何变化，那么它在这一新版本中的存储形式只是一个文件链接，指向的是它自身最近一次发生变化的那个副本。

- 其次，由于 Git 的操作基本上都是在本地端进行的，所以它几乎所有的操作都是瞬间完成的。例如在开发者们想要查看项目历史时，他们不需要特地去服务端抓取项目版本的历史记录，直接在本地浏览即可。这意味着，开发者们可以在本地端直接对比隶属于不同版本的文件之间的差别，可以在本地端查看过去有哪些人对指定文件作出了修改与更新等，这就很好地体现了分布式开发的优势，尤其在当有人由于没有网络条件但是又必须抓紧时间对项目进行修改与开发，同时又需要有版本管理系统来记录每次项目开发过程时，这种优势就尤为明显，Git 就满足了他所有的需求。

- 最后，Git 会使用 SHA-1 算法加密生成的 40 位字符串，而不是文件名来记录项目中的所有数据。这样做有助于加快版本历史的索引速度。

## 安装与配置

由于 Git 是一个开源的、跨平台的版本控制系统，所以它可以被部署在各种操作系统上。下面，我们将会分别来记录一下在 Windows、macOS 以及 Linux/UNIX 上安装并配置 Git 的具体步骤。要想安装 Git，首先需要做的是前往 Git 的官方下载页面，如下图所示：

![Git下载](img/git_download.png)

然后，我们可以根据自己所在的操作系统选择相应的安装向导页面，具体情况如下：

- 在 Windows 下，我们需要下载的是[Git for Windows](https://git-scm.com/download/win) 这个二进制的可执行文件，然后在本地打开其图形化向导来进行安装，初学者只需要一路选择默认选项即可。

- 在 Linux/UNIX 下，我们需要根据自己所在的 Linux/UNIX 发行版来执行相应的包管理器命令来进行安装，常见包管理器命令如下：
  
   ```bash
   # Debian/ubuntu
   apt-get install git
  
   # Fedora
   yum install git (up to Fedora 21)
   dnf install git (Fedora 22 and later)
  
   # Arch Linux
   pacman -S git
  
   # openSUSE
   zypper install git
  
   # FreeBSD
   pkg install git

   # Solaris 9/10/11 (OpenCSW)
   pkgutil -i git

   # Solaris 11 Express
   pkg install developer/versioning/git

   # OpenBSD
   pkg_add git
   ```

- 在 macOS 下，我们既可以选择下载 [git-osx-installer](https://sourceforge.net/projects/git-osx-installer/) 这个二进制的可执行文件，像在 Windows 下一样进行图形化安装，也可以在命令行终端环境中执行`brew install git`命令，像在 Linux 下一样通过包管理器来安装。需要注意的是，如果我们之前在 macOS 中已经安装了 XCode 开发环境，那么该开发环境就已经替我们安装好了 Git 版本控制系统，无需再另行安装了。

在安装完成之后，我们需要对 Git 进行一些基本配置。由于 Git 的配置命令在各种操作系统中的使用方式大同小异，所以为了减少重复劳动，我特别用 Python 写了一个自动化配置脚本，具体如下：

```Python
#! /usr/bin/env python

import os
import sys
import platform

title = "=    Starting " + sys.argv[0] + "......    ="
n = len(title)
print(n*'=')
print(title)
print(n*'=')

cmds = [
    "git config --global user.name 'owlman'" ,
    "git config --global user.email 'jie.owl2008@gmail.com'",
    "git config --global push.default simple",
    "git config --global color.ui true",
    "git config --global core.quotepath false",
    "git config --global core.editor vim",
    "git config --global i18n.logOutputEncoding utf-8",
    "git config --global i18n.commitEncoding utf-8",
    "git config --global color.diff auto",
    "git config --global color.status auto",
    "git config --global color.branch auto",
    "git config --global color.interactive auto"
]

if platform.system() == "Windows":
    cmds.append("git config --global core.autocrlf true")
else:
    cmds.append("git config --global core.autocrlf input")

for cmd in cmds:
    print(cmd)
    os.system(cmd)

print(n*'=')    
print("=     Done!" + (n-len("=     Done!")-1)*' ' + "=")
print(n*'=')
```

最后，我们可以通过在命令行终端环境中执行`git --version`命令来验证一下安装结果，如果看到其相关的版本信息表示安装成功，接下来，我们可以学习一些基本操作了。

## 单人项目管理

在学习基本操作之前，我们需要先来研究一下 Git 基本工作流程。首先需要熟悉的一件事是，受 Git 版本控制系统维护的项目文件主要存在着以下三种记录状态：

- 已修改（Modified）：该状态表示文件已经被修改，但尚未被记录为下一次要提交的版本。
- 已暂存（Staged）：该状态表示文件已被记录为下一次要提交的版本，但尚未提交到本地仓库中，
- 已提交（Committed）：该状态表示文件已经被记录为一个版本，并提交到了本地仓库中。

这三种文件记录状态会致使每个由 Git 维护的项目在文件结构上被分成了以下三个组成部分：

- 工作区域：该部分主要用于存放项目中处于已修改状态的文件。
- 暂存区域：这部分主要用于存放项目中处于已暂存状态的文件。
- 本地仓库：该部分主要用于存放项目中处于已提交状态的文件。

总而言之，在一个由 Git 维护的项目中，如果本地仓库中保存着的特定版本文件，就属于已提交状态。 如果作了修改并已放入暂存区域，就属于已暂存状态。 如果自上次检出操作之后，作了修改但还没有放到暂存区域，就是已修改状态。接下来，我将通过模拟实际的项目维护来学习一下如何完成上述工作流程。

### 项目设置

首先要做的是将要维护的项目纳入到 Git 版本控制系统中，并建立本地仓库，其操作步骤如下：

- 假设计算机上现在已经有了一个需要使用 Git 版本控制系统来维护的项目。在这里，它位于一个名为`/demo_repo`的目录中，该项目的初始结构如下：

    ```bash
    demo_repo
      ├── debug
      ├── release
      ├── src
      │   ├── main.c
      │   ├── test.c
      │   └── test.h
      ├── Makefile
      └── README.md
    ```

- 执行以下命令将`demo_repo`目录初始化为一个由 Git 维护的项目：

    ```bash
    cd demo_repo
    git init
    ```

  如果一切顺利，`demo_repo`目录下就会多出一个叫做`.git`的目录，该目录下会有个`config`文件，他的内容如下：

    ```text
    [core]
        repositoryformatversion = 0
        filemode = false
        bare = false
        logallrefupdates = true
        ignorecase = true
    ```

- 在`config`文件中配置自己在团队中的用户信息：

    ```text
    [user]
        name = <你使用的用户名>
        email = <你的电子邮件地址>
    ```

   在这里，用户信息也完全可以用命令行来配置，只需要在执行`git init`命令之前执行如下命令即可：

    ```bash
    git config –-local user.name “<你使用的用户名>”
    git config –-local user.email “<你的电子邮件地址>”
    ```

    当然了，如果之前使用`git config -global`命令配置过全局的用户信息，这里也可以选择不配置用户信息，Git 在默认情况下会直接使用用户配置的全局信息。

### 文件管理

首先，我们需要用`git status`命令来查看一下`demo_repo`项目中的各种文件当前在 Git 中的记录状态（在使用 Git 的过程中，该命令将会反复使用）：

```git
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    Makefile
    README.md
    src/

nothing added to commit but untracked files present (use "git add" to track)
```

如你所见，`git status`命令输出了当前项目在版本控制系统中的当前状态和接下来可执行的操作建议。这些信息主要由两部分组成：

- 前四行为第一部分，这部分信息告诉我们当前所处的项目分支，默认情况下是`master`分支，也就是项目的主分支。并且该项目在`master`分支下尚未提交任何版本。

- 第五行之后为第二部分。这部分信息列出了当前项目中尚未被纳入版本控制系统的文件，并且告诉我们可以使用`git add`命令将指定的文件纳入到版本控制系统的追踪列表中。

所以，下一个要执行的操作就是使用`git add`命令来添加 Git 要追踪的文件了。在这里，我们可以选择先添加单一文件来观察一下文件状态的变化。在 Git 中，我们可以通过`git add <文件名>`这种命令形式将指定名称的文件添加到 Git 的追踪列表中。例如，我们想先将`README.md`这个项目自述文件纳入版本控制系统，就只需要在`demo_repo`项目的根目录下执行`git add README.md`命令即可。然后，如果我们再执行`git status`命令，就会看到如下输出：

```git
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
    new file:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    Makefile
    src/
```

如你所见，现在`git status`命令输出信息的第二部分也变成了两个部分。第五行到第七行为第一部分，这部分信息输出的是已被 Git 追踪的文件，第八行之后依然是尚未被追踪的文件。这意味着，`README. md`文件已被 Git 监控，如果我们现在对该文件做一些修改，并再次在`demo_repo`项目的根目录下执行`git status`命令的话，其输出的第二部分信息中还会增加被修改了的文件列表，具体如下：

```git
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
    new file:   README.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
    modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    Makefile
    src/
```

需要注意的是，现在的项目中存在着两份`README.md`文件，一份是修改之前已经通过`git add`命令加入到暂存区域中的文件，一份是在执行了`git add`命令之后被修改了的文件。接下来，我们可以根据`git status`命令给出的建议执行以下可能的操作：

- 如果想撤销在执行了`git add`命令之后对`README.md`文件的修改，可以在`demo_repo`项目的根目录下执行`git restore README.md`命令。

- 如果想将这次修改也更新到暂存区域，可以在`demo_repo`项目的根目录下再次执行`git add README.md`命令。

- 如果想撤销上一次执行`git add`命令将文件添加到暂存区域的操作，可以在`demo_repo`项目的根目录下执行`git rm –cached README.md`命令。

另外，如果我们想将某一目录下的所有文件一次性地添加到 Git 的追踪列表中，也可以使用`git add <目录名>`这个命令形式来实现。例如，如果想将`demo_repo`项目中的所有文件加入到 Git 的追踪列表，就可以在该项目的根目录下执行`git add .`命令（这里的`.`代表的是当前目录）。如果这时候，我们再次执行`git status`命令，就会看到如下输出：

```git
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
    new file:   Makefile
    new file:   README.md
    new file:   src/main.c
    new file:   src/test.c
    new file:   src/test.h
```

当然了，对于`demo_repo`项目来说，其`debug`目录中通常只存放一些本地开发过程中使用到的调试信息，理应被 Git 无视。要想解决这个问题，我们可以在项目的根目录下创建一个名为`.gitignore`的特殊文件，然后把要忽略文件或目录的名称填进去。这样一来，Git 就会自动忽略这些文件或目录。

在`.gitingore`文件中，每一行的文本都指定了一条忽略规则，其忽略规则的语法如下：

- `.gitingore`文件中的空格符不参与忽略规则的模式匹配。
- 以`#`符号开头的文本代表注释信息，不参与忽略规则的模式匹配。
- 以`/`符号开头的文本是用于匹配目录及其路径的模式。
- 以`!`符号开头的文本用于定义反向匹配的忽略规则。[^1]
- 规则模式文本中的`**`符号用于匹配多级目录。
- 规则模式文本中的`?`符号用于匹配单个字符。
- 规则模式文本中的`*`符号用于匹配零个或多个字符。
- 规则模式文本中的`[]`符号用于匹配单个字符列表。

需要注意的是，`.gitignore`文件中定义的忽略规则只能忽略那些还没有被添加到 Git 追踪列表中的文件，如果目标文件或目录已经被纳入到了版本管理系统中，再去为它修改`.gitignore`文件中的规则是无效的，有效的解决方法是先将所有文件都移出 Git 的追踪列表，然后在定义忽略规则之后再重新添加它们，像这样:

```bash
git rm -r --cached .
echo "debug/" >> .gitignore
git add .
```

这样一来，当我们再看想通过`git add debug/test.log`命令将`debug`目录下的文件到 Git，就会遭到版本控制系统的拒绝，并输出以下信息告知我们这个文件被`.gitignore`文件中定义的忽略规则忽略了：

```git
The following paths are ignored by one of your .gitignore files:
debug
Use -f if you really want to add them.
````

当然了，如果我们确实想添加该文件，也可以使用`git add`命令的`-f`参数将其强制添加到 Git 的追踪列表中，像这样：

```bash
git add -f debug/test.log
```

如果我们需要找出来指定文件是被哪个规则忽略了，也可以使用`git check-ignore <文件名>`命令来检查，像这样：

```bash
$ git check-ignore -v debug/test.log
.gitignore:1:debug/    git check-ignore -v debug/test.log
```

如你所见，Git会告诉我们是`.gitignore`文件中的第 1 行规则忽略了该文件。另外需要说明的是，Git 检查忽略规则的时候可以有多个来源，它的优先级顺序如下（由高到低）：

- 从命令行中读取可用的忽略规则。
- 当前目录定义的规则。
- 父级目录定义的规则，依次递推。
- `$GIT_DIR/info/exclude`文件中定义的规则。
- `core.excludesfile`中定义的全局规则。

另外在使用 Git 维护项目的过程中，如果需要修改已经被纳入到版本控制系统的追踪列表中的文件，务必要记得不要直接使用`mv`、`rm`这样的 UNIX Shell 命令来进行普通的文件操作。在 Git 中，对于文件的位置移动和重命名操作，我们应该使用`git mv`命令，例如像这样：

```bash
$ git mv README.md README.txt
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
    renamed:    README.md -> README.txt
```

同理，对于文件的删除操作，我们也应该使用`git rm`命令，例如像这样：

```bash
$ git rm README.txt
rm 'README.txt'
$ git status 
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
    deleted:    README.txt
$ echo "hello, demo_repo" > README.md 
```

[^1]: 主要用于一些被其他规则忽略的目标。

### 版本管理

在确定了要提交为一个版本的所有文件之后，我们接下来就可以通过`git commit`命令将`demo_repo`项目的当前版本提交了。当然了，如果我们不带任何参数地执行`git commit`命令，命令行环境将会进入到一个纯文本编辑器中，让我们编写此次提交的标注信息。至于在这里具体会使用什么文本编辑器，则将取决于我们对 Git 的配置，例如通过`git config --global core.editor vim`命令可以将其默认编辑器设置为 VIM。

在通常情况下，我们只需要在以”#”开头的注释行下输入一些标注文本，用于解释此次提交的意图，这样做主要是为了方便项目团队中的其他协作者的理解我们的操作。如果要标注的内容足够简单，我们也可以通过`git commit`命令的`-m`参数来直接输入标注内容，以简化操作流程，像这样:

```bash
$ git commit -m "Initial commit."
[master (root-commit) ae3a746] Initial commit.
 5 files changed, 31 insertions(+)
 create mode 100644 Makefile
 create mode 100644 README.md
 create mode 100644 src/main.c
 create mode 100644 src/test.c
 create mode 100644 src/test.h
```

这样一来，我们就成功提交了`demo_repo`项目的第一个版本。如果再次修改项目中的文件，例如在`main.c`文件中添加一些代码，并执行`git status`命令时，就会得到如下输出：

```git
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
    modified:   src/main.c

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    .gitignore

no changes added to commit (use "git add" and/or "git commit -a")
```

如你所见，`git status`命令会告诉我们`demo_repo`项目中的`src/main.c`文件被修改过了，如果想要提交新的修改，需要再次`git add`命令添加该文件，或者直接使用`git commit`命令的`-a`参数跳过重新添加文件的步骤，将其合并到提交动作中去，像这样：

```bash
$ git commit -a -m "second commit."
[master 821a0f4] second commit.
 1 file changed, 6 insertions(+)
```

这时候，如果我们意外删除了某个文件，就可以从到`demo_repo`项目的上一个版本中将其回复，这只需要简单地通过执行`git checkout <文件名>`命令来实现，例如像这样：

```bash
$ rm -f src/main.c && ls src
test.c  test.h
$ git checkout src/main.c
Updated 1 path from the index
```

另外，在类 UNIX 系统中，几乎都会有一个叫做`diff`的、小巧便捷的文件比对工具，Git 中也有这么一个功能类似的`git diff`命令，可以用来详细比较指定文件在被修改并等待提交时与上一次提交的那个版本有什么不同。例如，我们可以在`src/main.c`文件中再添加一些代码，然后在`demo_repo`项目的根目录下执行`git diff`命令，就看到如下输出：

```bash
$ git diff
diff --git a/src/main.c b/src/main.c
index 431ff37..c0cc3f6 100644
--- a/src/main.c
+++ b/src/main.c
@@ -1,6 +1,6 @@
 #include <stdio.h>
 
-int main() {
+int main(int argc, char *argv[]) {
     printf("Hello World!");
     return 0;
 }
```

如你所见，通过`git diff`命令的输出，我们可以很清楚地看到相较于上一次提交的版本，这次对`src/main.c`文件的修改是为`main`函数添加了形参。

正如之前所提到的，版本控制系统的作用是要从时间的维度上对项目进行维护，所以学习它必须要掌握它的版本管理机制。而对于 Git 的版本管理操作，我们可以先通过`git log`命令来查看一下`demo_repo`项目的提交历史，该命令会输出如下信息：

```git
commit a172c0430ec1a606ea6f28ea87f9789a0f540c6e
Author: owlman <jie.owl2008@gmail.com>
Date:   Mon Dec 27 16:08:39 2021 +0800

    test commit.

commit cb003345a88fe32d32c356263e966c1b55e44a6e
Author: owlman <jie.owl2008@gmail.com>
Date:   Sun Dec 26 17:17:26 2021 +0800

    third commit.

commit 821a0f44b3c1b6b2768976a1704755d5dff47ee9
Author: owlman <jie.owl2008@gmail.com>
Date:   Sun Dec 26 16:36:23 2021 +0800

    second commit.

commit ae3a7460be6c61364997536c184840b43780b256
Author: owlman <jie.owl2008@gmail.com>
Date:   Sun Dec 26 15:55:28 2021 +0800

    Initial commit.
```

从上面的输出，我们可以清楚地看到`demo_repo`项目到目前为止历次提交版本的详细信息，包括其用作唯一标识的哈希值 、提交者信息、提交的时间与标注信息等。接下来，如果我们想将项目恢复到之前的某个版本，就可以使用`git reset <版本的哈希值>`命令来实现。在这里，`<版本的哈希值>`通常只需要整个哈希值的前五位，例如，如果我们想将`demo_repo`项目恢复到标注信息为“third commit.”的版本，就只需要在该项目的根目录下执行`git reset cb003`命令，其命令序列如下：

```bash
$ git reset cb003
Unstaged changes after reset:
M   src/main.c
$ git log
commit cb003345a88fe32d32c356263e966c1b55e44a6e
Author: owlman <jie.owl2008@gmail.com>
Date:   Sun Dec 26 17:17:26 2021 +0800

    third commit.

commit 821a0f44b3c1b6b2768976a1704755d5dff47ee9
Author: owlman <jie.owl2008@gmail.com>
Date:   Sun Dec 26 16:36:23 2021 +0800

    second commit.

commit ae3a7460be6c61364997536c184840b43780b256
Author: owlman <jie.owl2008@gmail.com>
Date:   Sun Dec 26 15:55:28 2021 +0800

    Initial commit.
```

### 分支管理

即使是在单人项目的开发过程中，我们也有可能会遇到需要在主要的开发任务之外执行一些支线任务的情况。例如，如果我不能确定某个不在计划内的解决方案对项目的实际影响，这时候最好的选择就是从项目的当前主任务时间线上岔开一条平行的时间线，用它来启动一个不干扰主任务的支线任务。这样一来，主任务所在的时间线还可以按照原计划进行下去，而支线任务的时间线就可专注于试验这个计划外的解决方案，看看它是否能更好地解决问题。如果试验成功，就可以选择将其转正为主任务，或者有选择地将其部分成果合并到主任务开发的时间线中。在版本控制系统中，类似这样的开发时间线的管理是通过一种被叫做分支管理的操作来实现的。

在 Git 中，分支管理是通过`git branch`命令来实现的。例如作为分支管理的第一步，我们现在可以先通过在`demo_repo`项目的根目录下执行`git branch`命令来查看一下该项目中现有的分支情况：

```bash
$ git branch
* master
```

从上述输出中可以清楚地看到，项目中目前只存在一个名为`master`的分支，该分支也是所有项目在被纳入 Git 版本控制系统时所在的默认主分支。在这里，分支名称前面带有`*`符号的代表了当前所在的分支。接下来，我们可以通过在`demo_repo`项目的根目录下继续执行`git branch test`来为其添加一个名为`test`的新分支，然后再次执行`git branch`命令查看一下分支的变化：

```bash
$ git branch test
$ git branch
* master
  test
```

从上述输出可以看到，现在项目中有了`master`和`test`两个分支，而我们当前位于`master`分支上。接下来，我们可以通过`git checkout <分支名>`命令来进行分支切换操作。例如，如果现在想将当前项目的开发时间线切换到`test`分支上，就可以这样做：

```bash
$ git checkout test
M  README.md
Switched to branch 'test'
$ git branch
  master
* test
```

当然了，如果嫌麻烦，我们也可以使用`git checkout -b <新分支名>`命令一步到位地在创建一个新分支的同时切换该分支上。例如，我们可以通过以下操作继续在当前项目中创建一个名为`new`的分支，并同时切换到该分支上：

```bash
$ git checkout -b new
Switched to a new branch 'new'
$ git branch
  master
* new
  test
```

现在我们就可以在`test`分支或`new`分支上试验计划外的解决方案了，一旦发现试验结果证明该解决方案不可行，就只需要删除这个分支即可，该分支上发生的所有事都不会影响到`master`分支。如果要删除某个指定的分支，我们可以通过`git branch -d <分支名>`命令来实现，例如我们可以像下面这样试着在项目中删除`new`分支：

```bash
$ git checkout master
M  README.md
$ git branch -d new
Deleted branch new (was 63c0da1).
$ git branch
* master
  test
```

需要注意的是，我们不能删除当前所在的分支，所以上述操作需要先切换到`master`分支上才能删除`new`分支。那么接下来的问题是：如果分支上的试验结果证明了解新决方法可以改善项目的原计划方案，又该怎么办呢？这时候就需要对这个新的解决方案进行评估，我们大致上会遇到以下两种情况。

- 第一种情况是：试验结果表明新解决方案只能对原计划方案进行局部的加强和补充。这时候可以选择将在试验分支上提交的版本合并到主分支上来，以便整合两条时间线上开发的成果。在 Git 中，分支合并操作是通过`git merge <分支名>`来实现的。例如在`demo_repo`项目，假设我们现在已经分别在`master` 和`test`分支上做了一次提交，现在先将`test` 分支合并到`master`分支上，其命令序列如下：

  ```bash
  $ git checkout master
  Switched to branch 'master'
  $ git merge test
  Merge made by the 'recursive' strategy.
    .gitignore | 1 +
    1 file changed, 1 insertion(+)
    create mode 100644 .gitignore
  ```

  在这里，我们可以通过`git log --graph --oneline`命令来查看上述两个分支的关系发展：

  ```bash
  * | 7b0f717 Merge branch 'test'
  |\| 
  | * 03e7e0e tester commit
  * | 8aab52b master commit
  |/  
  * 9d6700b test commit.
  * cb00334 third commit.
  * 821a0f4 second commit.
  * ae3a746 Initial commit.
  ```

  需要注意的是，如果 Git 在合并分支的过程中发现两个分支上的提交各自对同一个文件中的同一行内容做了修改，这时候`git merge`命令就会报告合并中存在冲突，并且把两个分支上的修改并陈在该文件中。例如，接下来我们可以分别在`master` 和`test`分支上做了一次修改了`test.txt`文件的提交，然后再进行一次同样的合并操作，其命令序列如下：

  ```bash
  $ echo "master" > test.txt
  $ git add .
  $ git commit -m "master commit"
  [master c7a7542] master commit
    1 file changed, 1 insertion(+)
    create mode 100644 test.txt
  $ git checkout test
  Switched to branch 'test'
  $ echo "tester" > test.txt
  $ git add .
  $ git commit -a -m "tester commit"
  [test 920aa87] tester commit
    1 file changed, 1 insertion(+), 1 deletion(-)
  $ git checkout master
  Switched to branch 'master'
  $ git merge test
  Auto-merging test.txt
  CONFLICT (content): Merge conflict in test.txt
  Automatic merge failed; fix conflicts and then commit the result.
  $ cat test.txt
  <<<<<<< HEAD
  master
  =======
  tester
  >>>>>>> test
  ```

  如你所见，现在`master`分支上的`test.txt`文件中已经并陈了两个分支对它的修改。其中`HEAD`指向的是当前分支，即`master`分支，我们可以看到它添加在文件第一行的内容是“master”。而`test`分支对同一行的修改内容是“tester”，这就在分支合并时产生了冲突。接下来，我们要做的就是在`master`分支上重新编辑一下`test.txt`文件，处理好被标记为冲突的文本即可，具体来说就是：先删除冲突标记，并将其整合成统一的内容，然后再重新提交该文件。

- 第二种情况是：试验结果表明新解决方案可以全面取代原计划方案。这时候就只需要直接切换到新方案所在的分支，然后将其作为主分支继续开发。当然，为了规范起见，我们也可以通过`git branch -m <旧分支名> <新分支名>`命令来进行一系列重命名工作。例如，我们可以将原本的`master`分支重命名`old`，而将`test`分支重命名为`master`，以便从命名规范上确认其为主分支，其命令序列如下：

  ```bash
  $ git branch
  * master
    test
  $ git branch -m master old
  $ git branch -m test master
  $ git checkout master
  Switched to branch 'master'
  $ git branch
  * master
    old
  ```

### 标签管理

当项目进展到一定的程度，我们终归会迎来一个可被视为“里程碑”的版本。这个里程碑既可以是一个我们自己需要特别记录的版本，也可以是一个待发行的版本，这时候就需要用到`git tag <版本标识>`这个命令为这个版本打上一个标识，以便在日后的项目维护中快速定位到它。例如，现在我们想发布`demo_repo`项目的第一个版本，就可以在项目根目录下执行`git tag "v1.0"`命令，为其打上一个版本号，其命令序列如下：

```bash
$ git tag "v1.0"
$ git tag 
v0.1
v0.2
v1.0
```

如你所见，在打完标签之后，我们只需要直接执行`git tag`命令就可以列出当前项目中已经存在的标签。接下来，我们还可以在标签过多时使用`git tag`命令的`-l`参数进行关键字查找，或者使用`git show <标签>`命令查看指定标签所在版本的具体信息，像这样：

```bash
$ git tag -l "v1.*"
v1.0
$ git show v1.0
commit 3bef2a0d3a0a6e6f1387bd52b6e72a52fb567faa
Merge: c7a7542 920aa87
Author: owlman <jie.owl2008@gmail.com>
Date:   Sun Jan 2 14:37:08 2022 +0800

    master commit

diff --cc test.txt
index 1f7391f,05fb88f..b974844
--- a/test.txt
+++ b/test.txt
@@@ -1,1 -1,1 +1,5 @@@
++<<<<<<< HEAD
 +master
++=======
+ tester
++>>>>>>> test
```

现在，我们就可以在必要的时候使用`git reset <版本的哈希值>`命令来将项目恢复到某个指定的版本了。另外，如果我们觉得某个标签已经不再被需要了，也可以使用`git tag`命令的`-d`参数将其删除。例如现在如果想删除`v1.0`这个标签，其命令序列如下：

```bash
$ git tag 
v0.1
v0.2
v1.0
$ git tag -d v1.0
Deleted tag 'v1.0' (was 3bef2a0)
$ git tag 
v0.1
v0.2
```

在项目完成了某个里程碑任务之后，我们就可以将自己的劳动成果发布到项目团队的共享版本仓库中，以便进行同行协作与审评了。也正因为如此，我们接下来对 Git 的学习也要进入到团队协作的阶段了。

## 团队项目协作

如果我们想要利用 Git 版本控制系统来参与任何一个项目的团队协作，就必须要先了解其远程仓库的操作方法。在这里，远程仓库是指托管在网络上的项目仓库。但同一个项目通常可以有多个远程仓库，所以在同他人协作开发某个项目时，我们需要管理这些远程仓库，以便在团队协作过程中推送自己的劳动成果，并拉取团队中其他成员提交的代码，分享各自的工作进展。接下来，我们就来研究 Git 在这些方面的使用方式。

### 配置 SSH 客户端

由于 Git 版本控制系统在绝大多数情况下是推荐使用 SSH 协议来进行网络通信的，所以在学习远程仓库的基本操作之前，我们通常需要先安装一下 SSH 客户端（这里推荐使用 OpenSSH Client），并在本地生成一个 SSH 密钥。其具体步骤如下：

- 在系统用户目录[^2]下查看是否已经存在一个名为`.ssh`目录（请注意，这是一个隐藏目录），该目录下通常会存有`id_rsa`和`id_rsa.pub`这两个文件。如果没有，就需要生成新的密钥了，其命令序列如下:

    ```bash
    $ ssh-keygen -t rsa -C “<你的电子邮件地址>”
    Enter file in which to save the key (~/.ssh/id_rsa):
    Enter passphrase (empty for no passphrase):<设定一个密码>
    Enter same passphrase again:<重复一遍密码>
    Your identification has been saved in ~/.ssh/id_rsa.
    Your public key has been saved in ~/.ssh/id_rsa.pub.
    The key fingerprint is:
        e8:ae:60:8f:38:c2:98:1d:6d:84:60:8c:9e:dd:47:81 <你的电子邮件地址>
    ```

- 将`id_rsa.pub`文件中的公钥（Public Key）通报给我们所需要提交的 Git 服务端（这里以 GitHub 为例，其他服务器的方式请参考相关的文档说明）。具体操作步骤是：先打开 GitHub 的设置页面，然后进入到其 SSH and GPG Key 页面中，并点击“new SSH key”按钮，最后将`id_rsa.pub`文件中的内容以纯文本字符串的形式填写到下图的表单中。
  
  ![SSH keys](img/ssh_key.png)

- 接下来，我们可以在命令行终端环境中执行以下命令来测试一下客户端的配置是否成功：

    ```bash
    $ ssh -T git@github.com
    Hi <你的用户名> You’ve successfully authenticated, but GitHub does not provide shell access.
    ```

    如果在命令行终端环境的输出中看到了类似上面这样的欢迎信息，我们面向 GitHub 的 SSH 客户端配置就算大功告成了。

[^2]: 在 Windows 7 之前的 Windows 系统中通常是指`C:\Documents and Settings\<你的用户名>\`目录，在 Windows 7 本身及其之后则是指`C:\Users\<你的用户名>\`目录。而 macOS、Linux 等其他操作系统通常都是指`/home/<你的用户名>`目录。

### 管理远程仓库

为了方便接下来的模拟操作，我先行在自己的 GitHub 中创建了一个名为`git_demo_repo`的远程仓库，详情如下图所示。

![远程仓库](img/github_repo.png)

然后，作为参与团队协作的第一步，我们需要将本地仓库与远程仓库关联起来。

#### 关联远程仓库

在 Git 中，在项目中添加关联远程仓库的操作是通过`git remote add <远程仓库标识> <远程仓库URL>`命令来实现的。在这里，远程仓库的标识可以是任意我们喜欢的名称，而 URL 则必须是我们之前在 GitHub 中创建的那个原创仓库所在的 URL，例如在之前的`demo_repo`项目中，我们可以执行以下命令将其关联到之前创建好的`git_demo_repo`远程仓库上：

```bash
$ git remote add github git@github.com:owlman/git_demo_repo.git
$ git remote
github
```

如你所见，在成功添加了项目所关联的远程仓库之后，如果想要查看当前项目关联了哪些远程仓库，就可以用`git remote`命令，后者会列出当前项目所关联远程仓库的标识。另外在执行`git remote`命令时，我们也可以利用它的`-v`参数让该命令同时列出每个远程仓库的 URL，像这样：

```bash
$ git remote -v
github  git@github.com:owlman/git_demo_repo.git (fetch)
github  git@github.com:owlman/git_demo_repo.git (push)
# 关于 fetch 和 push 的区别，我们稍后再做说明。
```

当然了，如果当前项目关联了多个远程仓库，`git remote`命令将其全部列出，例如像这样：

```bash
$ git remote -v
github  git@github.com:owlman/git_demo_repo.git (fetch)
github  git@github.com:owlman/git_demo_repo.git (push)
gitee   git@gitee.com:owlman/git_demo_repo.git (fetch)
gitee   git@gitee.com:owlman/git_demo_repo.git (push)
```

如果是参与团队协作的新成员，则就需要先执行`git clone <远程仓库URL>`命令将项目克隆到本地。在项目克隆完成之后，他们就可以在项目的根目录下通过`git remote`命令看到一个名为`origin`的远程仓库，Git 在默认情况下会使用这个标识来识别克隆到本地的源头仓库：

```bash
$ git clone git@github.com:owlman/git_demo_repo.git
Initialized empty Git repository in /home/owlman/tmp/git_demo_repo/.git/
remote: Counting objects: 595, done.
remote: Compressing objects: 100% (269/269), done.
remote: Total 595 (delta 255), reused 589 (delta 253)
Receiving objects: 100% (595/595), 73.31 KiB | 1 KiB/s, done.
Resolving deltas: 100% (255/255), done.
$ cd git_demo_repo
$ git remote
origin
```

#### 查看远程仓库

接下来，我们可以通过`git remote show <远程仓库标识>`这个命令来查看某个指定远程仓库的具体信息。例如在之前的`demo_repo`项目中，如果我们想查看`github`这个远程仓库的信息，就可以这样做：

```bash
$ git remote show github
* remote github
  Fetch URL: git@github.com:owlman/git_demo_repo.git
  Push  URL: git@github.com:owlman/git_demo_repo.git
  HEAD branch: master
  Remote branch:
    master tracked
  Local ref configured for 'git push':
    master pushes to master (up to date)
```

如你所见，除了远程仓库的 URL 外，`git remote show`命令还输出了许多额外的信息。它首先告诉了我们远程仓库当前所在的分支，然后列出了所有处于跟踪状态中的远端分支，最后还提示了我们在执行`git push`命令推送本地分支数据时的默认远程分支。当然了，在实际的项目维护过程中，`git remote show`命令输出的内容还会随着本地仓库和远程仓库中的数据而发生变化，我们稍后会在具体演示项目维护操作时具体呈现这些变化。

#### 删除和重命名

在 Git 中，我们还可以通过`git remote rename <旧标识> <新标识>`这个命令来修改某个远程仓库的标识。例如，如果我们不想使用在克隆项目时自动产生的远程仓库标识，就可以通过执行下面的操作将其为`github`：

```bash
$ git remote
origin
gitee
$ git remote rename origin github
$ git remote
github
gitee
```

需要注意的是，在改变了远程仓库的标识之后，执行数据同步操作时所对应的分支名称也会发生变化。例如在执行了上述重命名操作之后，原来要推送数据的默认远程分支就变成了`github/master`。

另外，在遇到远端仓库所在的服务器迁移、原来的克隆镜像不再使用，或者某个参与者不再贡献代码等情况时，我们就需要删除一些与当前项目关联的远程仓库，这个任务可以通过执行`git remote rm <远程仓库标识>`命令来实现。例如在之前的`demo_repo`项目中，如果我们想删除标识为`gitee`的远程仓库，就可以这样做：

```bash
$ git remote
github
gitee
$ git remote rm gitee
$ git remote
github
```

### 同步项目数据

接下来，我们就可以将本地仓库中的数据推送（push）到远程仓库了。在 Git 中，将本地数据推送到远程仓库的操作是通过`git push <远程仓库标识> <本地分支>:<远程分支>`这个命令来实现的。例如在之前的`demo_repo`项目中，如果我们想要将本地仓库的`master`分支中的数据推送到标识为`github`的远程仓库的`master`分支中，就可以在项目根目录下执行`git push github master:master`命令，具体如下：

```bash
$ git push github master:master
Enumerating objects: 11, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 16 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 613 bytes | 43.00 KiB/s, done.
Total 6 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To github.com:owlman/git_demo_repo.git
```

另外，在本地分支与远程分支同名的情况下，我们通常是可以省略本地分支的指定，采用`git push github master`这个简写的命令形式的。而且，如果本地分支要推送的原创分支是固定的，我们也可以选择先使用`git branch --set-upstream-to=github/master master`命令将它们绑定起来，然后再需要这些推送操作时就执行`git push`这个更为简写的命令即可，其具体操作演示如下：

```bash
$ git branch --set-upstream-to=github/master master
Branch 'master' set up to track remote branch 'master' from 'github'.
$ echo "tester" > test.txt
$ git add test.txt
$ git commit -m "add test.txt"
[master 6d888be] add test.txt
 1 file changed, 1 insertion(+)
 create mode 100644 test.txt
$ git push
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 16 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 274 bytes | 274.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To github.com:owlman/git_demo_repo.git
   4fdf5b9..6d888be  master -> master
```

需要注意的是，只有在拥有远程仓库的写权限时，或者同一时刻没有其他人推送数据，上述命令才能顺利完成数据的推送任务。如果上述命令执行之前前，已经有其他人推送了若干次提交，那它所推送操作就会被驳回。这时候，我们就必须先把其他人提交的数据获取到本地，与本地数据进行合并之后，形成新的提交，然后才可以再次执行推送命令。例如在`demo_repo`项目中，当我们执行了上述推送命令之后，团队中的其他成员再执行`git remote show  github`命令时，就会得到如下输出：

```git
* remote github
  Fetch URL: git@github.com:owlman/git_demo_repo.git
  Push  URL: git@github.com:owlman/git_demo_repo.git
  HEAD branch: master
  Remote branch:
    master new (next fetch will store in remotes/github)
  Local branch configured for 'git pull':
    master merges with remote master
```

如你所见，这一回`git remote show`命令输出的后四行内容告诉我们：`github`远程仓库的`master`分支中的数据已经发生了变化，并建议通过执行`git pull`命令来拉取该远程分支上的数据，并将其合并到本地仓库的`master`分支上。

在这里，`git pull`命令实际上是抓取（fetch）和合并（merge）这两个动作的组合操作命令。如果我们只想抓取远程分支上的数据，就只需要执行`git fetch <远程仓库标识> <远程分支>`命令即可。例如在上述演示情景中，团队中的其他成员只需要执行以下操作，就可以将`github/master`这个远程分支中的数据抓取到本地仓库了：

```bash
$ git fetch github master
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0
Unpacking objects: 100% (3/3), 254 bytes | 6.00 KiB/s, done.
From github.com:owlman/git_demo_repo
 * branch            master     -> FETCH_HEAD
   4fdf5b9..6d888be  master     -> github/master
```

由于上述命令会到远程仓库的指定分支上将本地仓库中还没有的数据抓取回来，所以现在`github/master`这个远程分支上的数据已经可以在本地仓库中访问了，其对应的分支名就是`github/master`。接下来，我们就可以通过执行`git merge`命令将其中的数据合并到自己的`master`支上了，其命令序列如下：

```bash
$ git checkout master
Switched to branch 'master'
$ git merge github/master
Updating 4fdf5b9..6d888be
Fast-forward
 test.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 test.txt
 ```

当然了，在大多数情况下，我们只需要直接执行`git pull <远程仓库标识> <本地分支>:<远程分支>`这个命令，将抓取和合并操作一步到位即可。例如对于之前在`demo_repo`项目中执行的抓取和合并操作，我们实际上只需要执行`git pull github master:master`这一条命令即可。同样地，如果本地分支与远程分支同名，我们在这里可以采用`git pull github master`这样的简写形式。并且，如果之前已经使用`git branch --set-upstream-to=github/master master`命令将分支进行了绑定，我们也只需要执行`git pull`这个简单的命令即可执行拉取操作了。其具体操作演示如下：

```bash
# 这里假设团队中有其他成员删除了远程仓库中的test.txt文件
$ git branch --set-upstream-to=github/master master
Branch 'master' set up to track remote branch 'master' from 'github'.
$ git pull
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 2 (delta 1), reused 2 (delta 1), pack-reused 0
Unpacking objects: 100% (2/2), 199 bytes | 8.00 KiB/s, done.
From github.com:owlman/git_demo_repo
   6d888be..9464796  master     -> github/master
Updating 6d888be..9464796
Fast-forward
 test.txt | 1 -
 1 file changed, 1 deletion(-)
 delete mode 100644 test.txt
```

最后需要说明的是，在将远程分支上的数据何必到本地分支的过程中，也有可能会遇到报告合并冲突的情况。其处理方法与解决本地分支的合并冲突是一样的，只需要在引发冲突文件中去除合并冲突产生的标记，然后将其修改成我们想要的内容，并重新提交即可。

----
#已完成
