
import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'csqhAn20paClt8VylwLQLkFb-gzGzoHsz';
var APP_KEY = 'PrurrzrjeRLwTlEMMUISf17c';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: [],
    currentUser: null,
    actionType: 'signUp',
    formData: {
      username: '',
      password: ''
    }
  },

  created: function() { 
    this.currentUser = this.getCurrentUser()
    this.wahaha()
    Date.prototype.initDate = function (arg) {
      var a = {
        "M": this.getMonth() + 1,
        "D": this.getDate(),
        "H": this.getHours(),
        "mm": this.getMinutes(),
        "S": this.getSeconds(),
        "Q": Math.floor((this.getMonth() + 3) / 3),
        "ss":this.getMilliseconds()
      };
      if (/(y+)/.test(arg))
        arg = arg.replace(RegExp.$1, (this.getFullYear() + "")
          .substr(4 - RegExp.$1.length));
      for (var k in a)
        if (new RegExp("(" + k + ")").test(arg))
          arg = arg.replace(RegExp.$1, (RegExp.$1.length == 1) ? (a[k]) : (("00" + a[k])
            .substr(("" + a[k]).length)));
      return arg;
    };
  },

  methods: {

    wahaha: function(){
      if(this.currentUser){
        var query = new AV.Query('AllTodos');
        query.find()
          .then((todos) => {
            let avAllTodos = todos[0] // 因为理论上 AllTodos 只有一个，所以我们取结果的第一项
            let id = avAllTodos.id
            this.todoList = JSON.parse(avAllTodos.attributes.content) // 为什么有个 attributes？因为我从控制台看到的
            this.todoList.id = id // 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
          }, function(error){
            console.error(error) 
          })
      }
    },

    updateTodos: function(){
      let dataString = JSON.stringify(this.todoList) 
      let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
      avTodos.set('content', dataString)
      avTodos.save().then(()=>{
        console.log('更新成功')
      })
    },

    saveTodos: function(){
      let dataString = JSON.stringify(this.todoList)
      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();

      var acl = new AV.ACL()
      acl.setReadAccess(AV.User.current(),true) 
      acl.setWriteAccess(AV.User.current(),true) 

      avTodos.set('content', dataString);
      avTodos.setACL(acl)
      avTodos.save().then((todo) => {
        this.todoList.id = todo.id
        console.log('保存成功');
      }, function (error) {
        alert('保存失败');
      });
    },

    saveOrUpdateTodos: function(){
      if(this.todoList.id){
        this.updateTodos()
      }else{
        this.saveTodos()
      }
    },

    addTodo: function() {
      this.todoList.push({
        title: this.newTodo,
        createTime: new Date().initDate("yyyy年-M月-D日 H:mm:ss"),
        done: false
      });
      this.newTodo = ''
      this.saveOrUpdateTodos() 
    },

    removeTodo: function(todo){
      let index = this.todoList.indexOf(todo)
      this.todoList.splice(index,1)
      this.saveOrUpdateTodos() 
    },

    signUp: function () {
      let user = new AV.User();
      user.setUsername(this.formData.username);
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser) => {
        this.currentUser = this.getCurrentUser()
      }, (error) => {
        alert('注册失败')
        console.log(error)
      });
    },

    login: function () {
      AV.User.logIn(this.formData.username, this.formData.password)
        .then((loginedUser) => {
          this.currentUser = this.getCurrentUser()
          this.wahaha()
        }, function (error) {
          alert('登录失败')
          console.log(error)
        });
    },

    // 如果不调用登出方法，当前用户的缓存将永久保存在客户端。
    getCurrentUser: function() {
      let current = AV.User.current()
      if (current) {
        let {id, createdAt, attributes: {username}} = current
        return {id, username, createdAt}
      } else {
        return null
      }
    },


    //登出
    logout: function () {
      AV.User.logOut();
      this.currentUser = null;
      window.location.reload()
    }
  }
});

/* 原
var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  // 测试双向绑定..Feel
  created: function(){
    let i = 0
    setInterval(()=>{
      //  this.newTodo = i
      //  i++
      console.log(this.newTodo)
    },1000)
  }
})
*/

      /* Demo1 点击计数 | 监听事件
var example1 = new Vue({
    el: '#example-1',
    data: {
        counter: 0
    }
});
*/
      /*方法事件处理
var example2 = new Vue({
    el: '#example-2',
    data: {
        name: 'Vue.js'
    },
  // 在 `methods` 对象中定义方法
    methods: {
        greet: function (event) {
          // `this` 在方法里指当前 Vue 实例
            alert('Hello ' + this.name + '!')
// `event` 是原生 DOM 事件
            if (event) {
                alert(event.target.tagName)
            }
        }
    }
})
// 也可以用 JavaScript 直接调用方法
example2.greet() // -> 'Hello Vue.js!'
*/
// 用 todoList 数组作为所有待办事项的容器.
//    newTask 作为 input 的值.


