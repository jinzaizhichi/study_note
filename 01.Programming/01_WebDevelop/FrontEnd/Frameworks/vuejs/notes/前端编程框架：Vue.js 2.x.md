# 前端编程框架：Vue.js 2.x 学习笔记

这篇笔记将用于记录个人在学习 Vue.js 2.0 框架过程中所编写的示例代码与心得体会。为此，我会在`https://github.com/owlman/study_note`项目的`Programming/Client-Server/Frameworks`目录下创建一个名为的`vuejs`目录，并在该目录下设置以下两个子目录：

- `notes`目录用于存放 Markdown 格式的笔记。
- `examples`目录则用于存放笔记中所记录的代码示例。

## 学习规划

- 学习基础：
  - 掌握 HTML、CSS、JavaScript 相关的基础知识。
  - 掌握 Node.js 运行平台的基础知识。
  - 掌握 npm 包管理器的基本用法。
  - 掌握 webpack 构建工具的基本用法
  - 了解 B/S 应用程序架构的基本原理。
- 学习资料：
  - 视频教程：
    - [黑马程序员之 Vue.js 教学视频](https://www.bilibili.com/video/BV12J411m7MG?p=1)
  - 线上文档：
    - [Vue.js 官方教程](https://cn.vuejs.org/v2/guide/)

## 了解 Vue.js 2.0

这部分笔记将记录我对 Vue.js 2.0 框架的概念性了解，以及在项目中引入该框架的具体方法，并编写一个"Hello World"程序。

### Vue.js 简介

Vue.js 是一套用于构建用户界面的渐进式框架。该框架被设计为可以自底向上逐层应用，它的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue.js 也完全能够为复杂的单页应用提供驱动。简而言之，Vue.js 具有以下特性：

1. 使用了传统 HTML 类似的模版语法，对于新手来说，或许更易于上手。
2. 使用了虚拟的 DOM 模型，简化了对页面元素的操作方式。
3. 使用了响应式的视图组件，有助于提高程序界面的用户体验。
4. 页面渲染速度极快，能赋予应用程序良好的执行性能。
5. 既可以像 React 一样提供用于构建复杂大型应用的路由接口。
6. 也可以像 jQuery 一样提供使用简单、且封装良好的操作接口。

当然，由于 Vue.js 的作者本身是一个中国人，所以 Vue.js 社区的中文资料也相比其他 JavaScript 框架社区要丰富一些，这对于很多习惯中文阅读的用户来说，或许也是选择使用这一框架的原因。

### 引入 Vue.js 框架

和大多数 JavaScript 前端程序库和应用框架一样，在自己的项目中引入 Vue.js 框架主要有 CDN 引用和本地引用两种方式，下面分别来学习一下它们。

#### CDN 引用

CDN 是内容分发网络（Content Delivery Network 或 Content Distribution Network）的缩写，这是一种利用现有的互联网络系统中最靠近目标用户的服务器，更快、更可靠地分发音乐、图片、视频、应用程序以及其他数据资料的方式，目的是提供高性能、可扩展性及低成本的网络内容传递给用户。换而言之，在使用 CDN 这种引用方式时，Vue.js 框架文件会被存储在指定的 CDN 服务网络的某个服务器节点上，由该服务来集中负责针对该框架文件的访问负载并维护该框架的版本，而我们只要在 HTML 文档的`<script>`标签中引用相应 CDN 服务的 URL 即可，像这样：

```HTML
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<!-- 或者 -->
<!-- 生产环境版本，优化了文件大小和载入速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

在上述示例中，我测试了使用`cdn.jsdelivr.net`提供的 CDN 服务来引用 Vue.js 框架，这也是 Vue.js 官方教程中推荐的服务。至于是该引用开发环境的版本，还是生产环境的版本，这就要取决于具体的使用场景了。在通常情况下，我会选择在程序开发阶段引用反馈信息相对丰富的开发环境版本，而等到程序发布之时再切换至更追求执行效率的生产环境版本。下面来了解一下使用 CDN 这种引用方式的优势：

- CDN 的总承载量可以比单一骨干最大的带宽还要大。这使得内容分发网络可以承载的用户数量比起传统单一服务器多。
- CDN 服务器可以被放置到不同地点，这有助于减少计算机之间互连的流量，进而降低带宽成本。
- CDN 通常会指派较近、较顺畅的服务器节点将资料传输给用户。虽说距离并非影响传输的绝对因素，但这可以尽可能提高性能和用户体验。
- CDN 上存储的资料通常都会有异地备援，即当某个服务器故障时，系统将会调用其他邻近地区的服务器资料，以提高服务的可靠度。
- CDN 提供给服务提供者更多的控制权，即提供服务的人可以针对客户、地区，或是其他因素来做相应的调整。

当然了，这种引用方式归根结底都得依赖于网络环境，甚至很多时候是国外的网络环境，由于众所周知的原因，我们的网络环境经常会受到各种不可抗力的影响，所以我个人更倾向于将框架文件下载到本地来引用。

#### 本地引用

正如上面所说，如果想减少意外状况，最好的选择是将 Vue.js 的框架文件下载到本地，然后再引用它们。下载这类文件的方式有很多，现如今为了便于更新版本，人们通常会选择使用 npm 这类包管理器来下载 JavaScript 的各种程序库和应用框架。具体做法就是在之前创建的`examples`目录下执行以下命令：

```bash
npm install vue --save
# 如果需要相应的权限，可以使用 sudo 命令来提权
```

如果安装过程一切顺利，接下来就只需要在 HTML 文档的`<script>`标签中引用框架文件的路径即可，像这样：

```HTML
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="node_modules/vue/dist/vue.js"></script>
<!-- 或者 -->
<!-- 生产环境版本，优化了文件大小和载入速度 -->
<script src="node_modules/vue/dist/vue.min.js"></script>
```

同样的，我们在这里可以根据项目所处的阶段来决定是采用开发环境版本还是生产环境版本。这样一来，我们就解决了框架文件的存储方式问题。但有过 JavaScript 使用经验的读者应该知道，在 HTML 文档中直接使用`<script>`标签来加载 Vue.js 框架依然不是最理想的方式，因为这样做会导致该框架中定义的所有对象名称都被暴露在全局域中，有可能会带来一些无法预测的命名冲突问题。所以更为理想的做法应该是，先利用`<script>`标签中新增的模块类型属性（即`type="module"`）来外链一个自定义的 JavaScript 代码文件，像这样：

```HTML
<script type="module" src="main.js"></script>
```

然后在该代码文件中使用 ES6 新增的模块机制来加载 Vue.js 框架。但需要特别注意的是，Vue.js 框架在默认情况下并不支持 ES6 的模块机制，因此在使用`import`语句加载该框架时，我们必须要特别指定支持在浏览器端使用 ES6 模块机制的那个构建版本，像这样：

```JavaScript
// 加载开发环境版本，该版本包含了有帮助的命令行警告
import Vue from './node_modules/vue/dist/vue.esm.browser.js';
// 或者
// 加载生产环境版本，该版本优化了文件大小和载入速度
import Vue from './node_modules/vue/dist/vue.esm.browser.min.js';
```

当然了，这样做也就意味着接下来要编写的代码只能运行在支持 ES6 的浏览器中了，但读者也不必过于担心这方面的问题，我们将来在介绍完 Webpack 的预处理器之后就可以使用一种更具普适性的框架加载方式，眼下只是为了后面能更深入地探讨 Vue.js 前端应用的组织方式，暂时先使用 HTML + JavaScript 这种最传统的方式来组织这个项目。

#### 程序验证

现在，我将通过编写一个"Hello World"程序来验证 Vue.js 框架是否已被成功引入，具体步骤如下：

1. 在`examples`目录下创建一个名为`01_sayHello`的项目目录，并执行`npm install vue --save`命令引入框架文件，然后在该目录下设置以下两个子目录：
   - `img`目录：用于存放图片资源。
   - `js`目录：用于存放自定义 JavaScript 脚本文件。

2. 将名为`logo.png`的图标文件存储到`code/01_sayHello/img`目录中。

3. 在`code/01_sayHello`目录中创建一个名为`index.htm`的 HTML 文档，并在其中输入如下代码：

   ```HTML
    <!DOCTYPE html>
    <html lang="zh-cn">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <script type="module" src="./js/main.js"></script>
        <title>你好，Vue.js</title>
    </head>
    <body>
       <div id="app">
          <h1> {{ sayHello }} </h1>
          <img :src="vueLogo" style="width:200px">
       </div>
    </body>
    </html>
   ```

4. 在`code/01_sayHello/js`目录中创建一个名为`main.js`的 JavaScript 脚本文档，并在其中输入如下代码：

   ```JavaScript
     // 程序名称： sayHello
    // 实现目标：
    //   1. 验证 Vue.js 执行环境
    //   2. 体验构建 Vue.js 程序的基本步骤
    import Vue from './node_modules/vue/dist/vue.esm.browser.js';

    const app = new Vue({
       el: '#app',
       data:{
         sayHello: '你好，Vue.js！',
         vueLogo: 'img/logo.png'
       }
    });
   ```

接下来只需将相关的 Web 服务运行起来（该服务器可以是 Apache 或者 Nginx，也可以是 VS Code 的 Live Sever 插件），然后如果在 Web 浏览器中看到如下页面，就说明 Vue.js 框架已经被引入到了程序中，并被成功执行起来了。

   ![Hello_World](img/hello_vue.png)

## 数据驱动开发

在 Vue.js 框架中，与 HTML 页面元素的交互方式没有像原生 JavaScript 接口那么直接，它是通过先在 HTML 元素标签中嵌入一系列类似于普通标签属性的 Vue 指令属性来绑定数据，然后再通过在 JavaScript 代码中修改这些被绑定的数据来修改页面元素的显示方式与内容。在编程方法上，我们通常将这种用数据内容的变化来驱动整个程序业务运作的方式称之为"**数据驱动开发**"。这部分笔记将记录如何利用数据驱动的开发方式来完成数据绑定、事件响应，以实现控制页面元素与 CSS 样式等各项基本功能。

### 数据绑定

在之前的`01_sayHello`程序中，我们现在`<h1>`标签中使用模版语法绑定了一个名称为`sayHello`的数据，该模版语法实际上是`v-text`指令的语法糖。换句话说，该`<h1>`标签更规范的语法应该是：

```HTML
<h1 v-text="sayHello"></h1>
```

考虑到我们传统上编写 HTML 标签的习惯，使用`{{ data_name }}`这样的模版标记会是更让人舒服的做法。当然了，`v-text`指令设置的是当前元素标签下面的文本内容，如果要为标签本身的属性绑定数据，就得要使用`v-bind`指令，具体语法是在要设置的标签属性名前面加上`v-bind:`前缀。例如，如果想为`<img>`标签的`src`属性绑定数据，就可以这样做：

```HTML
<img v-bind:src="vueLogo" style="width:200px">
```

另外，`v-bind`指令还有一个简写形式，只需要在要绑定数据的标签属性名之前加一个`:`前缀即可。在之前的`01_sayHello`程序中，我采用的就是这种形式。在页面元素上绑定了数据之后，接下来就可以在相对应的 JavaScript 脚本中创建 Vue 实例了，这就是我之前在`01_sayHello`程序的`main.js`文件中编写的内容。这个 Vue 实例对象中至少要定义以下两个成员：

- **`el`成员**：该成员用于设置当前 Vue 实例所对应的元素容器，这通常是一个`<div>`元素，某些情况也可以是 HTML5 提供的`<header>`、`<footer>`等容器类标签。该成员的值可以是任何一个符合 CSS 选择器语法的字符串，例如`#ID`、`.CLASSNAME`等。
- **`data`成员**：该成员用于设置页面元素中绑定的数据，它的值本身也是一个 JSON 格式的对象，该对象的每个成员都对应一个页面元素中绑定的对象，例如在之前的`01_sayHello`程序中，我绑定了`sayHello`和`vueLogo`这两个数据，就必须要在 Vue 对象的`data`成员中为为它们设置相应的值。

### 事件处理

当然，`01_sayHello`程序目前只是一个单向显示数据的业务。如果想要让其具备交互能力，还需要为页面元素绑定事件。在 Vue.js 框架中，绑定事件首先要通过`v-on`指令来为目标元素标签注册事件处理函数，例如如果我们想在`01_sayHello`程序用一个按钮来控制`<img>`元素的显示与否，可以将该程序的`index.htm`代码修改如下：

```HTML
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script type="module" src="./js/main.js"></script>
    <title>你好，Vue.js</title>
</head>
<body>
    <div id="app">
        <h1> {{ sayHello }} </h1>
        <!-- 上述模版语法背后真正的 Vue 语法：
        <h1 v-text="sayHello"></h1>
        -->
        <img :src="vueLogo" v-show="isShow" style="width:200px">
        <!-- 上述简写指令的完整 Vue 语法：
        <img v-bind:src="vueLogo" style="width:200px">
        -->
         <input type="button" :value="isShow?'隐藏':'显示'" @click="toggleShow" />
        <!-- 上述简写指令的完整 Vue 语法：
        <input type="button" v-bind:value="isShow?'隐藏':'显示'" v-on:click="toggleShow" />
        -->
    </div>
</body>
</html>
```

在这里，我主要做了如下修改：

- 首先，在`<img>`标签中增加了一个`v-show`指令，该指令可用于绑定一个布尔类型的数据（即这里的`isShow`），以此来决定是否显示其所在的标签。
- 然后，在页面中新增了一个按钮标签，并用`v-bind`指令设置了该标签的`value`属性，该属性的值是一个条件表达式，它将根据`isShow`的值显示不同的文本。
- 最后，用`v-on`指令（`@`是该指令`v-on:`前缀的简写形式）为新增的按钮标签注册了一个名为`toggleShow`的单击事件处理函数。

下面继续来对`main.js`中的代码进行修改，具体如下：

```JavaScript
import Vue from '../node_modules/vue/dist/vue.esm.browser.js';

const app = new Vue({
    el: '#app',
    data:{
        sayHello: '你好，Vue.js！',
        vueLogo: 'img/logo.png',
        isShow: true
    },
    methods:{
        toggleShow: function() {
            this.isShow = !this.isShow;
        }
    }
});
```

在这里，我主要做了如下修改：

- 首先，在 Vue 对象的`data`成员中定义了之前绑定的布尔类型数据`isShow`，并将其默认值设置为 true。
- 然后，为 Vue 对象新增了一个名为`methods`的成员。该成员用于设置页面元素中注册的事件处理函数，它的值也是一个 JSON 格式的对象。该对象的每个成员都对应一个已在页面元素中用`v-on`指令注册的事件处理函数。在这里就是`toggleShow`，该函数每次调用都会将`isShow`的值取反。

这样一来，当我们在 Web 浏览器中打开该应用程序就会看到之前的 Vue 图标旁边多了个文本内容为`隐藏`的按钮。当按钮被单击之后，图标就会消失，按钮上的文本也变成`显示`。之后，如果该按钮再次被单击，一切又会恢复原状。

### 用户输入

对于用户来说，除了触发事件之外，允许用户在运行时输入具体的数据也是一个应用程序必不可少的一项功能。下面将通过编写一个"待办事项"的程序来学习如何使用 Vue.js 框架实现能处理用户输入数据的应用程序界面。为此，我需要在`examples`目录下创建一个名为`02_toDoList`的目录，并在该目录中创建一个名为`index.htm`的文件，其代码如下：

```HTML
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script type="module" src="./js/main.js"></script>
    <title>待办事项</title>
</head>
<body>
    <div id="app">
        <h1>待办事项</h1>
        <div id="todo">
            <ul>
                <li v-for="( task,index ) in taskList">
                    <input type="checkbox" v-model="doneList" :value="task">
                    <label :for="task">{{ task }}</label>
                    <input type="button" value="删除" @click="remove(index)">
                </li>
            </ul>
        </div>
        <div id="done" v-if="doneList.length > 0">
            <h2>已完成事项</h2>
            <ul>
                <li v-for="task in doneList">
                    <label :for="task">{{ task }}</label>
                </li>
            </ul>
        </div>
        <input type="text" v-model="newTask" @keyup.enter="addNew">
        <input type="button" value="添加新任务" @click="addNew">
    </div>
</body>
</html>
```

接下来，我会在同一目录下再创建一个名为`js`的目录，并在该目录下创建`main.js`脚本文件，其代码如下：

```JavaScript
// 程序名称： toDoList
// 实现目标：
//   1. 学习 v-model、v-for 等指令
//   2. 掌握如何处理用户输入
import Vue from '../node_modules/vue/dist/vue.esm.browser.js';

const app = new Vue({
    el: '#app',
    data:{
        newTask: '',
        taskList: [],
        doneList: []
    },
    methods:{
        addNew: function() {
            if(this.newTask !== '') {
                this.taskList.push(this.newTask);
                this.newTask = '';
            }
        },
        remove: function(index) {
            if(index >=  0) {
                this.taskList.splice(index,1);
            }
        }
    });
```

下面来具体分析一下这个程序。在通常情况下，Web 应用程序在前端接受用户输入信息的方式主要有两种：第一种方式是用文本框元素来获取用户从键盘输入的信息。在 Vue.js 框架中，我们可以用`v-model`指令将`<input type="text">`标签绑定到`newTask`数据中，该指令与`v-bind`指令不同的在于，它是一种双向绑定。也就是说，`v-model`指令不止可以让 JavaScript 代码中对绑定数据的修改反映到页面元素中，也可以让页面元素获取到的用户输入数据同步到 JavaScript 代码中。在 JavaScript 代码获取到文本框中的用户输入内容之后，我们就可以通过事件处理函数`addNew`将其加入到一个名为`taskList`的数据列表中，然后将该事件处理函数注册给输入回车和鼠标单击事件。

第二种方式是用单选钮、复选框等选择性元素来获取用户用鼠标勾选的信息。例如在上面这个程序中，我在`<div id="todo">`元素中用`v-for`指令创建了一系列`<input type="checkbox">`，它们都提供`v-model`指令将自己双向绑定到了另一个名为`doneList`数据列表上。在 Vue.js 框架中，如果一组复选框元素被`v-model`指令绑定到了一个列表类型的数据上，那么当这些复选框被选上时，它们的`value`属性值就会被自动添加到这个被绑定的数据列表中。

为了证明被选中的复选框被加入到了`doneList`数据列表中，我还在页面中添加了一个`<div id="done">`元素，并对`doneList`数据列表进行了遍历显示。需要说明的是，用于遍历数据列表的`v-for`指令主要有两种形式：

- **当我们只要遍历列表中的值时**，可以这样写：`v-for="item in dataList"`，这时候数据列表（`dataList`）中的每一项数据就会在遍历过程中逐一被迭代变量（`item`）说读取。
- **当我们需要同时获取列表值及其在列表中的索引时**，可以这样写：`v-for="( item,index ) in dataList"`，这时候数据列表（`dataList`）在遍历过程中，每一项数据的值会被`item`变量读取，而每一项数据的索引会被`index`变量读取。

最后需要说明的是，对于`<div id="done">`元素本身，我使用了`v-if`指令，它的效果与之前的`v-show`指令基本相同，唯一的区别是：`v-if`指令会直接在 DOM 树上增加或删除其所在的元素节点，而`v-show`指令则是单纯通过其所在元素的`style`属性隐藏或显示该元素而已。在执行效率上，`v-show`指令要更高效一些。在这里，我们设置了当`doneList`列表中没有数据时，程序就直接将`<div id="done">`元素从页面中移除，反之则在页面中添加该元素。下面来看一下`02_toDoList`程序运行的效果：

![待办事项](img/todolist.png)

## 学习与服务器交互

显而易见的，之前的`02_toDoList`存在着一个很致命的缺陷。那就是它的数据只存在于浏览器端，一但用户关闭或重新载入页面，他之前加入到程序中的数据就会全部丢失，一切又恢复到程序的初始状态。要想解决这个问题，就需要 Web 应用的前端在适当的时间将获得的输入数据存储到后端服务器上，然后在需要时再从服务器上获取这些数据。这部分笔记将记录如何利用 Vue.js 框架来完成 Web 应用程序的前端与后端之间的交互。这一次，我同样会通过构建一个"留言本"应用来贯穿整个学习过程。

首先需要在`examples`目录下依次执行`npm install express body-parser knex`和`npm install sqlite3@<指定的版本>`命令，安装接下来创建 Web 服务所需要的后端组件（需要注意的是，这里安装的`sqlite3`要根据`knex`安装后的提示选择对应的版本）。接下来，在`examples`目录下创建一个名为`03_Message`的目录，并在该目录下执行`npm init -y`命令，将其初始化成一个 Node.js 项目。在这里，之所以将服务端所需要的组件安装在项目目录的上一级目录中，是因为我接下来还需要在项目目录中安装前端组件，并将其开放给浏览器端访问，所以前后端所需要的组件最好分开存放。

现在，我要基于 Express 框架来创建一个 Web 服务了。具体做法就是在`code/03_Message`目录下创建一个名为`index.js`的服务器端脚本文件，并在其中输入如下代码：

```JavaScript
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const knex = require('knex');
const port = 8080;

// 创建服务器实例
const app = express();

// 配置 public 目录，将其开放给浏览器端
app.use('/', express.static(path.join(__dirname, 'public')));
// 配置 node_modules 目录，将其开放给浏览器端
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

//配置 body-parser 中间件，以便获取 POST 请求数据。
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

// 创建数据库连接对象：
const appDB = knex({
    client: 'sqlite3', // 设置要连接的数据类型
    connection: {      // 设置数据库的链接参数
        filename: path.join(__dirname, 'data/database.sqlite')
    },
    debug: true,       // 设置是否开启 debug 模式，true 表示开启
    pool: {            // 设置数据库连接池的大小，默认为{min: 2, max: 10}
        min: 2,
        max: 7
    },
    useNullAsDefault: true
});

appDB.schema.hasTable('notes')  // 查看数据库中是否已经存在 notes 表
.then(function(exists) {
    if(exists == false) { // 如果 notes 表不存在就创建它
        appDB.schema.createTable('notes', function(table) {
            // 创建 notes 表：
            table.increments('uid').primary();// 将 uid 设置为自动增长的字段，并将其设为主键。
            table.string('userName');         // 将 userName 设置为字符串类型的字段。
            table.string('noteMessage');      // 将 notes 设置为字符串类型的字段。
    });
  }
})
.then(function() {
    // 请求路由
    // 设置网站首页
    app.get('/', function(req, res) {
        res.redirect('/index.htm');
    });

    // 响应前端获取数据的 GET 请求
    app.get('/data/get', function(req, res) {
        appDB('notes').select('*')
        .then(function(data) {
            res.status(200).send(data);
        }).catch(function() {
            res.status(404).send('找不到相关数据');
        });
    });

    // 响应前端删除数据的 POST 请求
    app.post('/data/delete', function(req, res) {
        appDB('notes').delete()
        .where('uid', '=', req.body['uid'])
        .catch(function() {
            res.status(404).send('删除数据失败');
        });
        res.send(200);
    });

    // 响应前端添加数据的 POST 请求
    app.post('/data/add', function(req, res) {
        appDB('notes').insert(
            {
                userName : req.body['userName'],
                noteMessage : req.body['noteMessage']
            }
        ).catch(function() {
           res.status(404).send('添加数据失败');
        });
        res.send(200);
    });

    // 监听 8080 端口
    app.listen(port, function(){
        console.log(`访问 http://localhost:${port}/，按 Ctrl+C 终止服务！`);
    });
})
.catch(function() {
    // 断开数据库连接，并销毁 appDB 对象
    appDB.destroy();
});
```

由于 Vue.js 框架的特点，前端需要后端提供的服务除了获取指定的 HTML 和 JavaScript 文件之外，主要就是对数据库的增删改查操作了，所以在上面这个服务中，除了将`public`、`node_modules`目录整体开放给浏览器端访问之外，主要提供了一个基于 GET 请求的数据查询服务，和两个基于 POST 请求的数据添加与删除操作。

接下来，我可以开始前端部分的构建了。首先需要在`code/03_Message`目录下执行`npm install vue axios`命令，安装接下来所要用到的前端组件（该命令会自动生成一个`node_modules`目录，正如上面所说，该目录会被服务端脚本整体开放给浏览器端）。然后，继续在同一目录下创建`public`目录，并在其中创建一个名为`index.htm`的文件，其代码如下：

```HTML
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script defer="defer" src="/node_modules/axios/dist/axios.js"></script>
    <script type="module" src="./js/main.js"></script>
    <title>留言本</title>
</head>
<body>
    <div id="app">
        <h1>留言本</h1>
        <div id="showNote" v-for="note in notes">
            <span>{{ note.userName }} 说：{{ note.noteMessage }} </span>
            <input type="button" value="删除" @click="remove(note.uid)">
        </div>
        <div id="addMessage">
            <h2>请留言：</h2>
            <label :for="userName">用户名：</label>
            <input type="text" v-model="userName">
            <br>
            <label :for="Message">写留言：</label>
            <input type="text" v-model="Message"></input>
            <input type="button" value="添加留言" @click="addNew">
        </div>
    </div>
</body>
</html>
```

这个页面主要被分为了两个部分，第一部分会根据`notes`中的数据使用`v-for`指令迭代显示已被添加到数据库中的留言，并提供了一个`删除`按钮以便删除指定的留言（使用`v-on`指令绑定单击事件处理函数）。第二部分则是一个用于`添加留言`的输入界面，这里使用了`v-model`指令来获取需要用户输入的`userName`和`Message`数据。现在，我需要来创建相应的 Vue 对象实例了，为此，我会在刚才创建的`public`目录下再创建一个`js`目录，并在其中创建名为`main.js`的自定义前端脚本文件，其代码如下：

```JavaScript
// 程序名称： Message
// 实现目标：
//   1. 学习 axios 库的使用
//   2. 掌握如何与服务器进行数据交互
import Vue from '../node_modules/vue/dist/vue.esm.browser.js';

const app = new Vue({
    el: '#app',
    data:{
        userName: '',
        Message: '',
        notes: []
    },
    created: function() {
        that = this;
        axios.get('/data/get')
        .then(function(res) {
            that.notes = res.data;
        })
        .catch(function(err) {
            console.error(err);
        });
    },
    methods:{
        addNew: function() {
            if(this.userName !== '' && this.Message !== '') {
                that = this;
                axios.post('/data/add', {
                    userName: that.userName,
                    noteMessage: that.Message
                }).catch(function(err) {
                    console.error(err);
                });
                this.Message = '';
                this.userName = '';
                axios.get('/data/get')
                .then(function(res) {
                    that.notes = res.data;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }
        },
        remove: function(id) {
            if(uid > 0) {
                that = this;
                axios.post('/data/delete', {
                    uid : id
                }).catch(function(err) {
                    console.error(err);
                });
                axios.get('/data/get')
                .then(function(res) {
                    that.notes = res.data;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }
        }
    }
});
```

这个 Vue 实例与我们之前创建的大同小异，主要由以下四个成员组成：

- `el`成员：用于以 CSS 选择器的方式指定 Vue 实例所对应的元素容器，在这里，我指定的是`<div id="app">`元素。

- `data`成员：用于设置页面中绑定的数据，这里设置了以下三个数据变量：
  - `notes`：这是一个数组变量，用于存放已被添加的留言记录。
  - `userName`：这是一个字符串变量，用于获取"用户名"数据。
  - `Message`：这是一个字符串变量，用于获取"留言"数据。

- `created`成员：用于在程序载入时做初始化操作，在这里，我从服务端读取了已被添加的留言记录，并将其加载到`notes`变量中。

- `methods`成员：用于定义页面中绑定的事件处理函数，这里定义了以下两个事件处理函数：
  - `addNew`：用于添加新的留言记录，并同步更新`notes`中的数据。
  - `remove`：用于删除指定的留言记录，并同步更新`notes`中的数据。

通常情况下，我们在 Vue.js 框架中会选择使用 axios 这样的第三方组件来处理发送请求和接收响应数据的工作，引入该组件的方式与引入 Vue.js 框架的方式是一样的，可以像上面一样先下载到本地，然后使用`<script>`标签引入，也可以使用 CDN 的方式直接使用`<script>`标签引入，像这样：

```HTML
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://unpkg.com/axios/dist/axios.js"></script>
<!-- 或者 -->
<!-- 生产环境版本，优化了文件大小和载入速度 -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

需要注意的是，该引用标签在 HTML 页面中的位置必须要在自定义 JavaScript 脚本文件（即`main.js`）的引用标签之前。当然，我在上述代码中只展示了`axios.get`和`axios.post`这两个最常用方法的基本用法，由于该组件支持返回 Promise 对象，所以我们可以采用`then`方法调用链来处理响应数据和异常状况。关于 axios 组件更多的使用方法，可以参考相关文档（[http://www.axios-js.com/zh-cn/docs/](http://www.axios-js.com/zh-cn/docs/)）。

## Vue 组件基础

到目前为止，这个系列的笔记所展示的都是一些极为简单的单页面 Web 应用程序，并且页面上通常只有几个简单的交互元素。但在实际生产环境中，Web 应用程序的用户界面往往是由多个复杂的页面共同组成的。这时候，我们就需要开始注意代码的可复用性了，针对这个问题，Vue.js 框架提出的解决方案就是先将用户界面上的元素按照不同的功能划分成一个个独立的组件，例如导航栏、公告栏、数据表格、用户注册表单、用户登录界面等。这样一来，我们在之后的工作中就可以像玩乐高玩具一样，根据需要将这些组件组合成各种具体的应用程序了。总而言之，组件系统是我们在学习 Vue.js 框架中必须要掌握的一个重要概念。下面，这篇笔记将通过编写一系列实验示例来体验一下在 Vue.js 框架中构建和使用组件的基本方法。

在所有实验开始之前，我需要先在`examples`目录中创建一个名为`00_test`的目录，以便用于存放接下来的一系列实验项目，由于这些项目只能用于体验 Vue 组件的构建与使用方法，并没有实际的应用功能，所以我给了它`00`这个编号。那么，下面就来开始第一个实验吧！为此，我需要继续在`code/00_test`目录中再创建一个名为`component_1`的实验目录，并在该目录下执行`npm install vue`命令来安装 Vue.js 框架。最后，我只需在`code/00_test/component_1`目录下创建一个名为`index.htm`的文件，并输入如下代码：

```HTML
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA  -Compatible" content="ie=edge">
    <title>学习 vue 组件实验（1）：组件注册</title>
`</head>
<body>
    <div id="app">
        <say-hello :who="who"></say-hello>
        <welcome-you :who="who"></welcome-you>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        // 全局组件注册
        Vue.component('say-hello', {
            template: `<h1>你好， {{ you }}！</h1>`,
            props: ['who'],
            data: function() {
                return {
                    you: this.who
                };
            }
        });

        const app = new Vue({
            el: '#app',
            // 局部组件注册
            components: {
                'welcome-you': {
                    template: `<h2>欢迎你， {{ you }}！</h2>`,
                    props: ['who'],
                    data: function() {
                        return {
                            you: this.who
                        };
                    }
                }
            },
            data: {
                who: 'vue'
            }
        });
    </script>
</body>
</html>
```

在上述实验中，我用两种不同的方式分别创建并注册了`say-hello`和`welcome-you`两个组件。接下来就借由这两个组件来介绍一下这两种组件的使用。首先是`say-hello`组件，该组件是通过调用`Vue.component()`方法来创建并注册到应用程序中的，使用该方法创建的组件通常被称之为"全局组件"，我们在调用它的时候需要提供两个参数：

- 第一个参数应该是一个字符串对象，用于指定组件的名称，该名称也是我们要在 HTML 文档中使用的自定义标签元素，而由于 HTML 代码是大小写不敏感的，所以我个人会建议大家在给组件起名字的时候应该尽量一律使用小写字母，单词之间可以使用`-`这样分隔符进行区隔。

- 第二个参数应该是一个 JavaScript 对象，用于设置组件的各项具体参数。这里定义了以下三项最基本参数：
  
  - `template`：该参数是个字符串对象，用于指定该组件的 HTML 模版代码，需要注意的是，这段代码说对应的 DOM 对象必须有且只能有一个根节点。而这个对象在最终的 HTML 文档中将会由该组件所对应自定义标签所代表，在这里就是`<say-hello>`。
  - `props`：该参数是一个字符串数组，该数组中的每个元素都是该组件所对应的自定义标签的一个属性，该组件的用户可以通过`v-bind`指令将该属性绑定到某一数据上，以便将数据传到组件内部。例如在这里，我在`<say-hello>`标签中就用`v-bind`指令将该标签的`who`属性绑定到了 Vue 实例对象的`who`数据上，并将其传进`say-hello`组件中。
  - `data`：该参数是一个函数，用于设置组件自身的数据，例如这里的`you`，我将从调用者那里获取的`who`数据赋值给了它。对于后者，我们可以用`this`引用来获取。

  当然了，除了上面三个基本参数之外，我们还可以为组件设置更多参数，例如自定义事件及其处理函数等，这些我将会在后续的程序编写体验中展示。

下面，我们再来看`welcome-you`组件的构建。如你所见，该组件是在 vue 实例的`components`成员中构建并注册到应用程序中的，使用该方法创建的组件通常被称之为"局部组件"（它与全局组件的区别是，全局组件会在程序运行时全部加载，而局部组件只会在被实际用到时加载） 。该`components`成员的值也是一个 JSON 格式的数据对象，该数据对象中的每一个成员都是一个局部组件，这些组件采用键/值对的方式来定义,键对应的是组件的名称，值对应的是组件参数的设置。当然了，由于局部组件的命名规则与具体参数的设置方法都与全局对象一致，这里就不再重复说明了。

需要注意的是，第一个实验项目的编写方式将 HTML 代码、Vue 实例的构建代码以及组件的构建代码糅合在了一起，这对于提高代码的可复用性这个目的来说，显然是不行的。要想解决这个问题，我们可以利用 ES6 规范新增的模块规则将这三部分代码隔离开来。为了体验这种用法，我继续开始了第二个实验。具体做法就是在`code/00_test`目录中再创建一个名为`component_2`的实验目录，并在该目录下执行`npm install vue`命令来安装 Vue.js 框架。最后，我只需在`code/00_test/component_2`目录下创建一个名为`index.htm`的文件，并输入如下代码：

```HTML
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <script type="module" src="./main.js"></script>
    <title>学习 vue 组件实验（2）：以 ES6 模块的方式注册组件</title>
</head>
<body>
    <div id="app">
        <say-hello :who="who"></say-hello>
    </div>
</body>
</html>
```

在上述 HTML 代码中，我们在照常引入 vue.js 框架之后，使用模块的方式引入了`main.js`脚本文件，最好在`<div id="app">`标签中使用了后面将要定义的组件所对应的自定义标签。接下来，我只需要在相同的目录下创建一个名为`main.js`的 JavaScript 脚本文件，并在其中输入如下代码：

```JavaScript
import Vue from '../node_modules/vue/dist/vue.esm.browser.js';
import sayHello from './sayHello.js';

const app = new Vue({
    el: '#app',
    components: {
        'say-hello': sayHello
    },
    data: {
        who:'vue'
    }
});
```

在上述 JavaScript 代码中，我首先使用了 ES6 新增的`import-from`语句导入了后续要在`sayHello.js`文件中构建的组件，然后在构建 Vue 实例时将其注册成了局部组件。最后，我只需在同一目录下再创建这个`sayHello.js`脚本文件，并在其中输入如下代码：

```JavaScript
const tpl = `
    <div>
        <h1>你好， {{ you }}！</h1>
        <input type="text" v-model="you" />
    </div>
`;

const sayHello = {
    template: tpl,
    props : ['who'],
    data : function() {
        return {
            you: this.who
        }
    }
};

export default sayHello;
```

在这部分代码中，我先定义了一个局部组件，然后再使用 ES6 新增的`export default`语句将其导出为模块。当然，考虑到各种 Web 浏览器对 ES6 规范的实际支持情况，以及 Vue.js 框架本身使用的是 CommonJS 模块规范，所以上述实验依然可能不是编写 Vue.js 项目的最佳方式，其中可能还需要配置 babel 和 webpack 这样的转译和构建工具来辅助。

## 编译 Vue 组件文件

正如前面所说，直接使用 ES6 标准提供的模块规范来编写 Vue 组件在很多情况下可能并不是最佳实践。主要原因有两个，首先是市面上还有许多尚未对 ES6 标准提供完全支持的 Web 浏览器，这样做可能会导致某些用户无法使用应用程序。其次，即使将来所有的 Web 浏览器都完全支持了 ES6 标准规范，直接在 JavaScript 原生的字符串对象中编写 HTML 模版的做法也会让我们的编程工具无法对其进行高亮显示与语法检查，这不仅会让编程体验大打折扣，也会增加编码的出错概率。为了解决这个问题，Vue 社区专门定义了一种编写 Vue 组件的文件格式，例如对于`component_2`中的`sayHello.js`模块文件，我们可以将其重写为一个名为`sayHello.vue`的 Vue 组件文件，具体内容如下：

```HTML
<template>
    <div class="box">
        <h1>你好， {{ you }}！</h1>
        <input type="text" v-model="you" />
    </div>
</template>

<script>
    const sayHello = {
        name: 'sayHello',
        props : ['who'],
        data : function() {
            return {
                you: this.who
            }
        }
    };
    export default sayHello;
</script>

<style scoped>
    .box {
        height: 150px;
        width: 250px;
        background-color: #ccc;
    }
</style>
```

如你所见，这个专用文件实际上是一个 XML 格式的文件，它主要由三个标签组成：首先是`<template>`标签，用于定义组件的 HTML 模版，其作用就相当于之前在`sayHello.js`中定义的`tpl`字符串对象，区别在于该标签中的内容会被自动关联到组件对象的`template`模版属性上。接下来是`<script>`标签，用于定义组件对象本身，这部分代码与之前`sayHello.js`文件中的内容基本相同，只是无需再手动定义组件的`template`值了。最后是`<style>`标签，用于定义组件的 CSS 样式，当然了，这部分是可以省略的，如果没有样式可以定义就不必写。

在了解专用于定义 vue 组件的文件格式之后，我们接下来要面对的一个问题是，JavaScript 解释器本身并不认识这种格式的文件，所以接下来的工作是要用 babel 和 webpack 这些工具将其编译成普通的 JavaScript 代码文件。接下来，我将通过第三个实验记录一下这部分的工作，其主要步骤如下：

1. 在`code/00_test`目录中再创建一个名为`component_3`的实验目录，并在该目录下执行`npm init -y`命令将其初始化成一个 Node.js 项目。

2. 在`component_3`实验目录执行`npm install --save vue`命令将 Vue.js 框架安装到该实验项目中。

3. 在`component_3`实验目录执行`npm install --save-dev <组件名>`命令分别安装以下组件：

   - webpack、webpack-cli： 用于构建项目的专用工具。
   - babel、babel-core、babel-loader：用于将文件内容转译成普通的 JavaScript 代码。
   - html-webpack-plugin：用于处理 HTML 文档的 webpack 插件。
   - vue-loader、vue-template-compiler：用于处理 vue 组件文件格式的 webpack 插件。
   - css-loader、style-loader：用于处理 CSS 样式的 webpack 插件。

   *请注意*：以上组件的版本必须与当前使用的 Node.js 运行环境的版本相匹配，否则在后续工作中会遇到各种意想不到的麻烦。

4. 在`component_3`实验目录下创建一个名为`src`的目录，用于存放将要被编译的源代码。

5. 将之前创建的`sayHello.vue`保存在`src`原代码目录中，并在该目录下创建以下文件：

   - `index.htm`文件：

     ```HTML
     <!DOCTYPE html>
     <html lang="zh-cn">
     <head>
         <meta charset="UTF-8">
         <title>学习 vue 组件实验（3）：以专用文件格式注册组件</title>
     </head>
     <body>
         <div id="app">
             <say-hello :who="who"></say-hello>
         </div>
     </body>
     </html>
     ```

   - `main.js`文件：

     ```JavaScript
     import Vue from 'vue';
     import sayHello from './sayHello.vue';

     new Vue({
         el: '#app',
         components: {
             'say-hello': sayHello
         },
         data: {
             who:'vue'
         }
     });
     ```

6. 在`component_3`实验目录下创建一个名为`webpack.config.js`的 webpack 配置文件，并在其中输入如下代码：

   ```JavaScript
    const path = require('path');
    const VueLoaderPlugin = require('vue-loader/lib/plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    const config = {
        entry: {
            main: path.join(__dirname,'src/main.js')
        },
        output: {
            path: path.resolve(__dirname,'./public/'),
            filename:'js/[name]-bundle.js'
        },
        plugins:[
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src/index.htm')
            })
        ],
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    };

    module.exports = config;
   ```

7. 在`component_3`实验目录下将`package.json`文件中的`script`项修改如下：

   ```JavaScript
    "scripts": {
        "build": "webpack"
    }

8. 在`component_3`实验目录下创建一个名为`public`的目录，用于存放编译结果。

9. 在`component_3`实验目录下执行`npm run build`命令，就可以在`public`目录下看到编译结果了。

10. 用浏览器访问`public`目录下的`index.html`文件，就可以看到最后的结果了，如下图所示：

    ![编译 vue 组件](img/vue-webpack.png)

当然了，这里必须要强调，webpack 的配置工作是一个非常复杂和繁琐的过程，各位在这里看到的只是沧海一粟，更复杂的内容请参考 [webpack 的官方文档](https://www.webpackjs.com/concepts/)。

> 关联笔记： [[自动化打包工具：Webpack]]

## 构建略复杂一些的 Vue 组件

在掌握了如何构建与编译 Vue 组件的基础知识之后，接下来就可以试着来构建一些更具有实际用处的组件了。为了赋予组件更具实用性的功能，首先要做的就是让这些组件具备监听用户自定义事件的能力，并且允许用户为这些自定义事件注册相应的处理函数，而这一切都要从`v-on`指令在 Vue 组件中的使用说起。

### 组件中的`v-on`指令

接下来，我将会通过记录为之前的`say-hello`组件增加一个名为"show-message"的自定义事件，并为该事件注册处理函数的过程来学习如何赋予 Vue 组件事件处理能力。首先，我会暂且假设`<say-hello>`标签所对应的组件已经在监听一个名为"show-message"的自定义事件，并在`index.htm`中使用`v-on`指令为其指定了事件处理函数，具体代码如下：

```HTML
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>学习 vue 组件实验（3）：以专用文件格式注册组件</title>
</head>
<body>
    <div id="app">
        <say-hello @show-message="showMessage"
                   :who="who">
        </say-hello>
    </div>
</body>
</html>
```

然后，我只需要和之前使用 HTML 标准标签元素一样，在`main.js`中与上述页面对应的 Vue 实例中添加"show-message"事件处理函数的实现，具体代码如下：

```JavaScript
import Vue from 'vue';
import sayHello from './sayHello.vue';

new Vue({
    el: '#app',
    components: {
        'say-hello': sayHello
    },
    data: {
        who:'vue'
    },
    methods: {
        showMessage : function() {
            window.alert('Hello, ' + this.who);
        }
    }
});
```

到目前为止，大家所看到的步骤与普通的事件处理过程并没有什么区别，接下来我只需要让之前做的假设成真就可以了。换而言之，现在的任务是要真正实现让`<say-hello>`组件监听"show-message"这个自定义事件。对于此类问题，Vue.js 框架为我们提供的解决方案是：利用组件内部的某个 HTML 元素标签的标准事件来触发该组件的自定义事件。具体到当前项目中，我要做的就是对`sayHello.vue`文件做出如下修改：

```HTML
<template>
    <div class="box">
        <h1>你好， {{ you }}！</h1>
        <input type="text" v-model="you" />
        <input type="button" value="弹出对话框" @click="showMessage">
    </div>
</template>

<script>
    const sayHello = {
        name: 'sayHello',
        props : ['who'],
        data : function() {
            return {
                you: this.who
            }
        },
        methods: {
            showMessage: function() {
                this.$emit('show-message', this.who);
            }
        }
    };
    export default sayHello;
</script>

<style scoped>
    .box {
        height: 130px;
        width: 250px;
        background-color: #ccc;
    }
</style>
```

在上述代码中，我首先在组件`template`模版部分中添加了一个显示文本为"弹出对话框"的按钮元素，并为其注册了单击事件的处理函数。然后在实现该单击事件的处理函数时，我通过调用`this.$emit()`方法通知了当前组件的调用方（即`index.htm`页面）："show-message"事件被触发了。在这里，`this.$emit()`方法的第一个实参应该是一个用于指定该组件被触发的事件名称。尔后，如果还有要传递给该组件事件处理函数的实参，还可以在后面依次加上这些实参（例如这里的`this.who`）。这样一来，`<say-hello>`标签的用户只需要单击该组件中的"弹出对话框"按钮，就可以触发"show-message"事件了。

### 组件中的`v-model`指令

当然，和普通的 HTML 元素标签一样，使用`v-on`指令绑定事件的方法只能处理一些简单的操作，对于更为复杂的表单操作，还是需要用到`v-model`指令来实现。下面，我将通过记录实现一个"计数器"组件的过程来了解`v-model`指令在 Vue 组件中的使用方法。为此，我们需要开启第四个实验项目，其具体构建步骤如下：

1. **配置项目并安装依赖项**：
   首先，我需要在`code/00_test`目录中再创建一个名为`component_4`的实验目录。然后，由于`component_4`项目所需要的依赖项以及姜母结构都与`component_3`项目相同，为了免除不必要的工作量，以节省花费项目配置上的时间，我们可以直接将`component_3`目录下的`package.json`和`webpack.config.js`这两个项目配置文件拷贝至`component_4`目录下（如果需要的话，也可以稍作修改），并在`component_4`目录下执行`npm install`命令来安装已经配置在`package.json`文件中的项目依赖项。

2. **假设组件已支持`v-model`指令**：
   与之前一样，我可以暂且假设自己手里已经有了一个支持`v-model`指令的"计数器"组件，并在项目的`src/main.js`中实现 Vue 实例时将其注册成了局部组件，具体代码如下：

   ```JavaScript
    import Vue from 'vue';
    import counter from './counter.vue';

    new Vue({
        el: '#app',
        components: {
            'my-counter': counter
        },
        data: {
            num: 0
        },
        methods: {}
    });
   ```

   然后，我只需在`src/index.htm`文件中像使用普通的 HTML 元素标签一样，对其使用`v-model`指令即可，具体代码如下：

   ```HTML
    <!DOCTYPE html>
    <html lang="zh-cn">
    <head>
        <meta charset="UTF-8">
        <title>学习 vue 组件实验（4）：构建更复杂的组件</title>
    </head>
    <body>
        <div id="app">
            <my-counter v-model="num"></my-counter>
        </div>
    </body>
    </html>
   ```

3. **实现组件对`v-model`指令的支持**：
   现在的任务就是实现这个"计数器"并让其以符合之前假设的方式支持`v-model`指令。在此之前我们首先需要知道，在 Vue.js 框架的组件语义下，`v-model`指令本质上只是一个语法糖。换而言之，`<my-counter v-model="num"></my-counter>`实际上等价于：

   ```HTML
   <my-counter :value="num" @input="num = $event.target.value"></my-counter>
   ```

   所以，我们在`src/counter.vue`文件中实现"计数器"组件时只需要按照之前学习到的方法分别处理一下由`v-bind`指令绑定的`value`组件属性和由`v-on`指令注册的`input`自定义事件即可，具体代码如下：

   ```HTML
    <template>
        <div class="box">
            <input type="button" value="-" @click="changeCounter(-1)">
            <input type="text" :value="value" @input="changeInput" >
            <input type="button" value="+" @click="changeCounter(1)">
        </div>
    </template>

    <script>
        const counter = {
            name: 'counter',
            props : ['value'],
            methods: {
                changeCounter: function(count) {
                    this.$emit('input', this.value + count);
                },
                changeInput: function(event) {
                    let num = parseInt(event.target.value);
                    if(isNaN(num)) {
                        num = 0;
                    }
                    this.$emit('input', num);
                }
            }
        };
        export default counter;
    </script>

    <style scoped>
        .box {
            width: 340px;
            padding: 5px;
            background-color: #ccc;
        }
    </style>
   ```

### 组件插槽

到目前为止，大家看到的都是一些功能单一的组件，但在实际生产环境中，我们在很多时候可能需要将这些功能单一的组件组合成一个略为复杂一点的组件，这意味着我们需要像使用普通 HTML 元素标签一样嵌套使用组件的自定义标签，例如在下面这段 HTML 代码中：

```HTML
<div>
    <h1>标题</h1>
</div>
```

`<h1>`标签是被插入到`<div>`标签的内部的，要想在 Vue 组件的自定义标签中实现这样的效果，就必须要预先在用作外层标签的组件模版中预留一些插槽标签（即`<slot>`），以指定内层标签可以插入的位置。例如，我可以执行以下步骤来为上面的"计数器"组件增加一个外层盒子，以便用户可以为自己的计数器增加一个标题：

首先，在`component_4/src`目录下创建一个名为`box.vue`文件，并在其中编写如下代码：

```HTML
<template>
    <div>
        <header>
            <slot name="title"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
    </div>
</template>

<script>
    const box = {
        name: 'box'
    };
    export default box;
</script>

<style scoped>
</style>
```

然后在使用该组件之前，我同样需要先在`component_4/src/main.js`文件中将其注册为 Vue 实例的局部组件，具体代码如下：

```JavaScript
import Vue from 'vue';
import box from './box.vue'
import counter from './counter.vue'
new Vue({
    el: '#app',
    components: 
        'my-box' : box,
        'my-counter': counter
    },
    data: {
        num: 0
    },
    methods: {}
});
```

现在，我们就可以在`component_4/src/index.htm`文件中嵌套使用组件的标签了。正如大家所见，我在`box`组件中为用户预留了两种最常用的插槽，一种是带`name` 属性的`<slot>`标签，通常被称之为"具名插槽"；另一种是不带属性的`<slot>`标签，通常被称之为"默认插槽"。其中，具名插槽的作用是指定待插入元素的意义或功能，需用带`v-slot`指令的`<template>`标签来指定，而默认插槽实际上就是名称为`default`的插槽。在这里，所有被插入到`box`组件标签内部，且没有被`<template>`标签指定的元素标签都会被插入到该插槽中。例如，我们可以像下面这样为`box`组件插入内容：

```HTML
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>学习 vue 组件实验（4）：构建更复杂的组件</title>
</head>
<body>
    <div id="app">
        <my-box>
            <template v-slot:title>
                <h1>我的计数器</h1>
            </template>
            <p>这是一个"计数器"组件：</p>
            <my-counter v-model="num"></my-counter>
        </my-box>
    </div>
</body>
</html>
```

当然，如果想要让 HTML 文档的结构更清晰一些，我们也可以使用带`v-slot`指令的`<template>`标签来指定要插入到默认插槽中的内容，具体做法如下：

```HTML
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>学习 vue 组件实验（4）：构建略复杂一些的组件</title>
</head>
<body>
    <div id="app">
        <my-box>
            <template v-slot:title>
                <h1>我的计数器</h1>
            </template>
            <template v-slot:default>
                <p>这是一个"计数器"组件：</p>
                <my-counter v-model="num"></my-counter>
            </template>
        </my-box>
    </div>
</body>
</html>
```

### 使用内置组件

根据 Vue.js 框架的官方文档，该框架主要为用户提供了以下五个内置组件，让我们先来简单介绍这些组件的功能：

- **`component`组件**：该组件主要用于在用户界面中进行界面元素（包括自定义标签）的动态切换。
- **`transition`组件**：该组件主要用于定义在用户界面中切换界面元素（包括自定义标签）时的动画效果。
- **`transition-group`组件**：该组件主要用于定义在用户界面中分组切换多个界面元素（包括自定义标签）时的动画效果。
- **`keep-alive`组件**：该组件主要用于在组件切换的过程中缓存不活动的组件对象，以便该组件被切换回来时能维持之前的状态。
- **`slot`组件**：该组件主要用于在自定义组件模板预留其他组件标签或 HTML 标准标签可以插入的插槽位置。

细心的读者可能已经发现了，上述组件除了`slot`组件是用于在自定义组件时预留插槽之外（我们在之前的实验中已经演示过了该组件的使用方法），其他四个组件都与用户界面中界面元素的切换有关。这让人想到通过一个让用户在登录界面和注册界面之间来回切换的实验来演示这些内置组件的使用方法。下面先从`component`组件开始，让我们执行以下步骤来开始构建第五个实验：

1. 首先在`code/00_test`目录中再创建一个名为`component_5`的目录，并在该目录下创建`public`和`src`这两个子目录。

2. 由于`component_5`实验所需要的依赖项以及目录结构都与`component_3`实验相同，为了免除不必要的工作量，节省花费在该实验项目配置工作上的时间，我们可以直接将`component_3`目录下的`package.json`和`webpack.config.js`这两个分别与依赖项与项目打包相关的配置文件复制到`component_5`目录下（并根据需要稍作修改），然后在`component_5`目录下执行`npm install`命令来安装已经配置在`package.json`文件中的项目依赖项。

3. 在`src`目录下创建一个名为`userLogin.vue`文件，并在其中创建用于定义用户登录界面的组件。具体代码如下：

   ```HTML
    <template>
        <div id="tab-login">
            <table>
                <tr>
                    <td>用户名：</td>
                    <td><input type="text" v-model="userName"></td>
                </tr>
                <tr>
                    <td>密  码：</td>
                    <td><input type="password" v-model="password"></td>
                </tr>
                <tr>
                    <td><input type="button" value="登录" @click="login"></td>
                    <td><input type="button" value="重置" @click="reset"></td>
                </tr>
            </table>
        </div>
    </template>
    <script>
        export default {
            name: "tab-login",
            props : ['value'],
            data: function() {
                return {
                    userName: '',
                    password: ''
                };
            },
            methods: {
                login: function() {
                    if(this.userName !== '' && this.password !== '') {
                        if(this.userName === 'owlman' && this.password === '0000') {
                            this.$emit('input', true);
                        } else {
                            window.alert('用户名或密码错误！');
                            
                        }
                    } else {
                        window.alert('用户名与密码都不能为空！');

                    }
                },
                reset: function() {
                    this.userName = '';
                    this.password = '';
                }
            }
    };
    </script>
   ```

4. 在`src`目录下创建一个名为`userSignUp.vue`文件，并在其中创建用于定义用户注册界面的组件。具体代码如下：

   ```HTML
    <template>
        <div id="tab-sign">
            <table>
                <tr>
                    <td>请输入用户名：</td>
                    <td><input type="text" v-model="userName"></td>
                </tr>
                <tr>
                    <td>请设置密码：</td>
                    <td><input type="password" v-model="password"></td>
                </tr>
                <tr>
                    <td>请重复密码：</td>
                    <td><input type="password" v-model="rePassword"></td>
                </tr>
                <tr>
                    <td><input type="button" value="注册" @click="signUp"></td>
                    <td><input type="button" value="重置" @click="reset"></td>
                </tr>
            </table>
        </div>
    </template>
    <script>
        export default {
            name: "tab-sign",
            data() {
                return {
                    userName: '',
                    password: '',
                    rePassword: ''
                };
            },
            methods: {
                signUp: function() {
                    if(this.userName !== '' &&
                    this.password !== '' &&
                    this.rePassword !== '') {
                        if(this.password === this.rePassword) {
                            window.alert('用户注册');
                        } else {
                            window.alert('你两次输入的密码不一致！');
                        }
                    } else {
                        window.alert('请正确填写注册信息！');
                    }

                },
                reset: function() {
                    this.userName = '';
                    this.password = '';
                    this.rePassword = '';
                }
            }
        };
    </script>
   ```

5. 在`src`目录下创建`main.js`文件，并在实现 Vue 对象时将上面两个新建的组件注册成局部组件，具体代码如下：

   ```JavaScript
    import Vue from 'vue';
    import userLogin from './userLogin.vue';
    import userSignUp from './userSignUp.vue';

    new Vue({
        el: '#app',
        data: {
            componentId: 'login',
            isLogin: false
        },
        components: {
            login: userLogin,
            signup : userSignUp
        }
    })
   ```

6. 在`src`目录下创建`index.htm`文件，并在设计应用程序的用户界面时使用`<component>`标签指定首先要载入的组件，并用`<input>`标签在该界面中设置两个用于切换组件的按钮元素，具体代码如下：

   ```HTML
    <!DOCTYPE html>
    <html lang="zh-cn">
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    background: black;
                    color: floralwhite;
                }
                .box {
                width: 400px;
                height: 300px;
                border-radius: 14px;
                padding: 14px;
                color: black;
                background: floralwhite;
            }
            </style>
            <title>Vue 组件实验（5）：使用动态组件</title>
        </head>
        <body>
            <div id="app" class="box">
                <h1>用户登录</h1>
                <div v-show="!isLogin">
                    <input type="button" value="注册新用户"
                        @click="componentId='signup'">
                    <input type="button" value="用户登录" 
                        @click="componentId='login'">
                    <component :is="componentId" v-model="isLogin"></component>
                </div>
                <div v-show="isLogin">登录成功</div>
            </div>
        </body>
    </html>
   ```

在上述代码中，读者可以看到我们在使用`component`组件时主要设置了两个属性。首先是`is`属性，这是使用`component`组件必须要设置的属性。该属性应该是一个字符串类型的值，主要用于在一组要被切换的组件中指定当前被激活的组件。在这里，我们先用`v-bind`指令将其绑定到了 Vue 对象中一个名为`componentId`的`data`成员上，然后再通过两个按钮元素的单击事件来改变该属性的值，从而实现了在`userLoin`和`userSignUp`这两个组件之间的切换。接下来是用`v-model`指令双向绑定的 Vue 对象中另一个名为`isLogin`的`data`成员，这不是使用`component`组件必须要设置的数学，我们绑定该数据是为了记录用户的登录状态，并以此来决定应用程序是否需要在用户界面中显示与用户登录与注册功能相关的界面元素。

实验进行到这一步，我们事实上已经在应用程序的用户界面中初步实现了一个与用户登录与注册功能相关的模块，但这个模块还存在着一个小问题亟待解决，那就是组件在被切换时已经获得的用户输入会被丢失。也就是说，如果我们在用户注册界面中输入信息的过程中不小心用鼠标单击了“用户登录”按钮元素，因此切换到了用户登录界面，然后再切换回去时之前输入的信息就会全部丢失，这在用户注册时需要输入输入较多信息的应用程序中可能会带来较差的用户体验，在 Vue.js 框架中，我们可以使用`keep-alive`组件来解决这个问题，该组件的使用方法非常简单，只需要将上面的`component`组件的标签放到`keep-alive`组件的标签内部即可，像这样：

```HTML
<keep-alive>
    <component :is="componentId" v-model="isLogin"></component>
</keep-alive>
```

除此之外，程序员们还可以通过在`transition`组件在界面元素切换过程中加入一些自己想要的过渡效果。下面是我们在使用`transition`组件可以设置的主要属性：

- `name`属性：该属性是一个字符串类型的值，主要用于自动生成界面元素在切换过程中过渡样式的 CSS 类名。例如当我们将`name`属性的值设置为`'usersModule'`时，就等于自动创建了`.usersModule-enter`、`.usersModule-enter-active`等一系列样式的 CSS 类名。
- `appear`属性：该属性是一个布尔类型的值，主要用于指定是否要在用户界面初始化时就使用过渡样式。默认值为`false`。
- `css`属性：该属性是一个布尔类型的值，主要用于指定是否要使用 CSS 样式类来定义过渡效果。默认值为`true`。
- `type`属性：该属性是一个字符串类型的值，主要用于指定过渡事件类型，侦听过渡何时结束。有效值包括`transition`和`animation`。
- `mode`属性：该属性是一个字符串类型的值，主要用于控制界面元素退出/进入过渡的时间序列。有效值包括`out-in`和`in-out`。

通常情况下，我们只需依靠 CSS 样式就可以实现一些简单够用的过渡效果了。但当`transition`组件的`css`属性值为`false`或需要实现更复杂的过渡效果时，就需要通过定义一些由`transition`组件预设的事件钩子函数来定义一些需要通过 JavaScript 代码来执行的操作，下面是我们在使用`transition`组件时可以定义的主要事件钩子函数：

- `before-enter`函数：该钩子函数会在相关界面元素进入之前用户界面时被调用。
- `before-leave`函数：该钩子函数会在相关界面元素退出之前用户界面时被调用。
- `enter`函数：该钩子函数会在相关界面元素进入用户界面时被调用。
- `leave`函数：该钩子函数会在相关界面元素退出用户界面时被调用。
- `after-enter`函数：该钩子函数会在相关界面元素进入之后用户界面时被调用。
- `after-leave`函数：该钩子函数会在相关界面元素退出之后用户界面时被调用。

这里需要说明的是，以上列出的只是一些常用的属性和函数，并非是`transition`组件提供的所有属性和事件钩子函数，读者如果阅读关于该组件更全面的参考资料，还请自行去查阅 Vue.js 的官方文档。下面，我们来简单示范一下`transition`组件的基本使用方式。在之前的第五个实验中，如果想在`userLoin`和`userSignUp`这两个组件的切换过程中加入一些过渡效果，可以将要切换的组件放到`transition`组件标签内部，并根据需要设置该组件的属性，例如像这样：

```HTML
<transition name='usersModule' mode='out-in'>                
    <keep-alive>
        <component :is="componentId" v-model="isLogin"></component>
    </keep-alive>
</transition>
```

在这里，我们先将`transition`组件的`mode`属性设置成了`out-in`，使得界面元素的切换顺序变成了先退出再进入，然后在将其`name`属性设置成了`userModule`。正如之前所说，`name`属性的设置会自动创建一系列用于定义过渡效果 CSS 类名。下面，我们只需要根据项目的需要在`index.htm`文件的`<style>`标签或其外链的 CSS 文件中定义一下其中的某个类，例如像这样：

```CSS
@keyframes usersAni {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}
.usersModule-leave-active {
    animation: usersAni .5s;
}
```

如你所见，我们在上述代码中定义了一个缩小放大效果的简单过场动画，然后在名为`usersModule-leave-active`的 CSS 类中使用了它。这样一来，读者就可以在`userLoin`和`userSignUp`这两个组件的切换过程中看到类似放大镜扫过的过渡效果了。当然，当前这个实验中演示的只是最简单的过渡效果设置。在后续具体的项目实践中，我们将陆续演示如何使用`transition`组件和`transition-group`组件设置出更复杂、更具实用功能的过渡效果。

### 引入外部组件

由于 Vue.js 是一个开放性的前端框架，所以这些年在开源社区已经累积了不少既美观又好用的第三方组件库。在实际项目中，程序员们更多时候会选择从外部引入第三方的组件来构建应用程序的用户界面。下面，我们就以 Element 组件库为例来介绍一下如何在一个基于 Vue.js 框架的前端项目中引入第三方组件库。

1. 先来创建第六个实验项目所在的目录，即在`code/00_test`目录中再创建一个名为`hello_element`的目录，并在该目录下创建`public`和`src`这两个子目录。

2. 由于`hello_element`实验所需要的依赖项以及目录结构都与`component_3`实验相同，为了免除不必要的工作量，节省花费在该实验项目配置工作上的时间，我们可以直接将`component_3`目录下的`package.json`和`webpack.config.js`这两个分别与依赖项与项目打包相关的配置文件复制到`hello_element`目录下（并根据需要稍作修改），然后在`hello_element`目录下执行`npm install`命令来安装已经配置在`package.json`文件中的项目依赖项。

3. 在`hello_element`目录下执行`npm install --save element-ui`命令将 Element 组件库安装到当前实验项目中。

4. 在`src`目录下创建`main.js`文件。在该文件中，我们会先使用`import`语句分别导入 Vue.js 框架与 Element 组件库，接着再通过调用`Vue.use()`方法将 Element 组件库加载到 Vue.js 框架中。然后就可以照常创建 Vue 对象了，具体代码如下：

   ```JavaScript
    import Vue from 'vue';
    import ElementUI from 'element-ui';

    Vue.use(ElementUI);

    new Vue({
        el: '#app',
        data : {
            title: 'Element 组件库',
            message : '一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。'
        },
        methods : {
            goDocument : function() {
                window.open('https://element.faas.ele.me/#/zh-CN', '_blank');
            }
        }
    });
   ```

5. 在`src`目录下创建`index.htm`文件，并在设计应用程序的用户界面时使用 Element 组件库中的组件标签。至于该组件库中有多少可用的组件以及这些组件所对应的标签，读者可以自行查阅其官方文档[^4]。我们在这里只是简单示范了`Card`组件和`Button`组件的使用方法，为的是证明组件库已经被成功引入到项目中，具体代码如

   ```HTML
    <!DOCTYPE html>
    <html lang="zh-cn">
        <head>
            <meta charset="UTF-8">
            <!-- 在正式使用 Element 组件之前，请务必要记得加载其样式文件。 -->
            <link rel="stylesheet"
                href="../node_modules/element-ui/lib/theme-chalk/index.css">
            <title>Vue 组件实验（6）：引入第三方组件库</title>
        </head>
        <body>
            <div id="app">
                <h1>引入第三方组件库</h1>
                <el-card shadow="always">
                    <h2> {{ title }} </h2>
                    <p> {{ message }} </p>
                    <el-button type="info" @click='goDocument'>
                        查看官方文档
                    </el-button>
                </el-card>
            </div>
        </body>
    </html>
   ```

需要特别说明的是，我们在这里只是简单地介绍了如何在一个基于 Vue.js 框架的前端项目中引入第三方组件库。至于在实际生产环境中是否真的就使用 Element 组件库，还是选择别的组件库，还是要根据项目的实际需求和这些组件库的具体特性来做决定。

## 进一步研究

- [[自动化构建工具：vue-cli 与 Vite]]

----
#已完成
