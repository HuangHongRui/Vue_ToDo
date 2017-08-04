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

// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//      words: 'Hello World!'
// }).then(function(object) {
//     console.log('LeanCloud Rocks!');
// })

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
    this.currentUser = this.getCurrentUser();

    this.fetchTodos()

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

    fetchTodos: function () {
      if(this.currentUser) {
        var query = new AV.Query('AllTodos');
        query.find()
          .then((todos) => {
          let avAllTodos = todos[0]
          let id = avAllTodos.id
          this.todoList = JSON.parse(avAllTodos.attributes.content)
          this.todoList.id = id
        }, function(error) {
          console.log(error)
        })
      }
    },

    updateTodos: function () {
      let dataString = JSON.stringify(this.todoList)
      let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
      avTodos.set('content', dataString)
      avTodos.save().then(() => {
        console.log('Update Done.')
      })
    },

    saveTodos: function () {
      let dataString = JSON.stringify(this.todoList)
      var AVTodos = AV.Object.extend('AllTodos')
      var avTodos = new AVTodos();
      var acl = new AV.ACL()
      acl.setReadAccess(AV.User.current(),true) // 只有这个 user 能读
      acl.setWriteAccess(AV.User.current(),true) // 只有这个 user 能写
      avTodos.set('content', dataString);
      avTodos.setACL(acl)
      avTodos.save().then((todo) => {
        this.todoList.id = todo.id
        // alert('Save Done.');
        console.log('Save Done.')
      }, function (error) {
        alert('Save Loser')
      })
    },

    saveOrUpdateTodos: function() {
      if (this.todoList.id) {
        this.updateTodos()
      } else {
        this.saveTodos()
      }
    },

    addTodo: function() {
      this.todoList.push({
        title: this.newTodo,
        // createdAt: new Date(),
        //   username: this.loginedUser.attributes.username,
        createTime: new Date().initDate("yyyy年-M月-D日 H:mm:ss"),
        done: false
      });
      this.newTodo = ''
      this.saveOrUpdateTodos()
    },
    removeTodo: function(todo) {
      let index = this.todoList.indexOf(todo);
      this.todoList.splice(index,1)
      this.saveOrUpdateTodos()
    },
    signUp: function() {
      let user = new AV.User();
      user.setUsername(this.formData.username);
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser) => {
        this.currentUser = this.getCurrentUser()
      }, function (error) {
          alert('注册失败')
          console.log(error)
      });
    },

    login: function () {
        AV.User.logIn(this.formData.username, this.formData.password)
          .then( (loginedUser) => {
          this.currentUser = this.getCurrentUser();
          this.fetchTodos();
            console.log(loginedUser.attributes.username);
          }, function (error) {
            alert('登录失败')
            console.log(error)
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

