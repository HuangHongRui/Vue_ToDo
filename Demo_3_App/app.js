//import bar from './bar';

//bar();


import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
      newTodo: '',
      todoList: []
    },
    methods: {
        addTodo: function () {
            this.todoList.push({
                title: this.newTodo,
                createTime: new Date().initDate("yyyy年-M月-D日 H:mm:ss"),
                done: false
            });
            this.newTodo = '';
        },
        removeTodo: function (todo) {
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index,1)
        }
    },
    created: function () {
        window.onbeforeunload = ()=> {
            let dataString = JSON.stringify(this.todoList);
            window.localStorage.setItem('myTodos', dataString)
        };
        let oldDataString = window.localStorage.getItem('myTodos');
        let oldData = JSON.parse(oldDataString);
        this.todoList = oldData || [];

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
        }
    }
});

// var app = new Vue({
//   el: '#app',
//   data: {
//     newTodo: '',
//     todoList: []
//   },
//   created: function() { //保存
//       // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
//       window.onbeforeunload = ()=>{
//         let dataString = JSON.stringify(this.todoList);https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
//         window.localStorage.setItem('myTodos', dataString);// 看文档https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
//       }
//   },
//   methods: {
//     addTodo: function() {
//       this.todoList.push({
//         title: this.newTodo,
//         createdAt: new Date(),
//         done: false
//       });
//       this.newTodo = ''
//     },
//     removeTodo: function(todo) {
//       let index = this.todoList.indexOf(todo)
//       this.todoList.splice(index,1)
//     }
//   }
// });

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


