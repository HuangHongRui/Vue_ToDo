
预览: [传送门](https://huanghongrui.github.io/Vue_ToDo/App/page.html)

需搞清楚: 如何用 Vue 进行开发!

1. 用户可以新建一个待办事项
2. 用户可以删除一个待办事项
3. 用户可以将一个待办事项标记为已完成
4. 用户刷新页面之后，待办事项还在


### 添加待办:


1. 用户输入待办内容
2. 用户按下回车
3. 新的待办出现在 ol.todos 里


`<input type="" v-model="newTodo">`
这一句将 input.value 与 data.newTodo 绑定起来了，而且是双向的：
1. 只要 input.value 被用户改了，data.newTodo 就会变成一样的值；
2. 只要 data.newTodo 被 JS 改了，input.value 就会变成一样的值。


### 绑定事件:
回车点击即可添加

### 展示新待办:

### 标记为完成:

### 删除待办&按钮:

### 保存待办:


