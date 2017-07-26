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
  created: function() { //保存
      // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
      window.onbeforeunload = ()=>{
        let dataString = JSON.stringify(this.todoList);https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
        window.localStorage.setItem('myTodos', dataString);// 看文档https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
      }
  },
  methods: {
    addTodo: function() {
      this.todoList.push({
        title: this.newTodo,
        createdAt: new Date(),
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
              console.log(loginedUser);
            }, function (error) {
        })
    },

      // 判断用户是否已登录
      getCurrentUser: function() {
          let {id, createdAt, attributes: {username}} = AV.User.current()
          return {id, username, createdAt}
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


