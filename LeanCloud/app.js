//import bar from './bar';

//bar();


import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'csqhAn20paClt8VylwLQLkFb-gzGzoHsz';
var APP_KEY = 'PrurrzrjeRLwTlEMMUISf17c';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
    words: 'Hello World!'
}).then(function(object) {
    console.log('LeanCloud Rocks!');
})

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: [],
    actionType: 'signUp',
    currentUser: null,
    formData: {
      username: '',
      password: ''
    }
  },

  created: function() { 
      window.onbeforeunload = ()=>{
        let dataString = JSON.stringify(this.todoList);
        window.localStorage.setItem('myTodos', dataString);
      };

      let oldDataString = window.localStorage.getItem('myTodos');
      let oldData = JSON.parse(oldDataString);
      this.todoList = oldData || [];

      this.currentUser = this.getCurrentUser();

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
      this.currentUser = this.getCurrentUser()
    },

  methods: {
    addTodo: function() {
      this.todoList.push({
        title: this.newTodo,
        // createdAt: new Date(),
        //   username: this.loginedUser.attributes.username,
        createTime: new Date().initDate("yyyy年-M月-D日 H:mm:ss"),
        done: false
      });
      this.newTodo = ''
    },
    removeTodo: function(todo) {
      let index = this.todoList.indexOf(todo);
      this.todoList.splice(index,1)
    },
    signUp: function() {
      let user = new AV.User();
      user.setUsername(this.formData.username);
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser) => {
        this.currentUser = this.getCurrentUser()
      }, function (error) {
          alert('注册失败')
      });
    },

    login: function () {
        AV.User.logIn(this.formData.username, this.formData.password)
          .then( (loginedUser) => {
          this.currentUser = this.getCurrentUser();
            console.log(loginedUser.attributes.username);
          }, function (error) {
            alert('登录失败')
        })
    },

      // 如果不调用登出方法，当前用户的缓存将永久保存在客户端。
      getCurrentUser: function() {
      let savecurrent = AV.User.current();
      if (savecurrent) {
         let { id, createdAt, attributes: {username} } = savecurrent
         return { id, username, createdAt }
      }
      else {
         return null
      }
          let {id, createdAt, attributes: {username}} = AV.User.current()
          return {id, username, createdAt}
       // let {id, createdAt, attributes: {username}} = AV.User.current();
       //  return {id, username, createdAt}
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


