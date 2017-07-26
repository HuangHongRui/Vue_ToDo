# 配合 LeanCloud 使用Vue做出 TODO

[传送门]:()

### 需要服务器~[大概了解服务器]

- [LeanCloud](https://leancloud.cn/docs/leanstorage_guide-js.html)

### 添加&新增

 div#app > div.newTask + ol.todos
    改为:
 `div#app
   section#signInAndSignUp
   section#todo
      div.newTask + ol.todos`

### 需求

- 用户点击「〇注册」这个 radio button 的时候显示注册表单
- 用户点击「〇登入」这个 radio button 的时候显示登入表单
- 默认显示注册表单
需要加一个变量，叫做 actionType，它有两个取值：'signUp' 和 'login'

### 注册&注册&登出~

- [安装](https://leancloud.cn/docs/sdk_setup-js.html)
- [初始化](https://leancloud.cn/docs/sdk_setup-js.html#%E5%88%9D%E5%A7%8B%E5%8C%96)
- [验证 LeanCloud SDK 安装成功](https://leancloud.cn/docs/sdk_setup-js.html#%E9%AA%8C%E8%AF%81)


### 最后穿上衣服~ Done.













### 当前用户
打开微博或者微信，它不会每次都要求用户都登录，这是因为它将用户数据缓存在了客户端。 同样，只要是调用了登录相关的接口，LeanCloud SDK 都会自动缓存登录用户的数据。 例如，判断当前用户是否为空，为空就跳转到登录页面让用户登录，如果不为空就跳转到首页：
`
  var currentUser = AV.User.current();
  if (currentUser) {
     // 跳转到首页
  }
  else {
     //currentUser 为空时，可打开用户注册界面…
  }
`
//如果不调用 登出 方法，当前用户的缓存将永久保存在客户端。