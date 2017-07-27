# vue

## 基础

1. 单向绑定  
    `{{message}}`
    `{{* message}} (once)`
    `{{{ html_string }}}`
    `{{ message.split('') }}`
    `No: {{ var a = 1 }}`
    `{{ message | filterA 'arg1' arg2 }}`
    `<a v-bind:href="url"></a>`
    `<a :href="url"></a>`
    `<a v-bind:href.literal="/a/b/c"></a>`
    `<div class="static" v-bind:class="{ 'class-a': isA, 'class-b': isB }"></div>`
    `<div v-bind:class="[classA, { classB: isB, classC: isC }]">`
    `<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>`
2. 双向绑定  
    `<input v-model="message">`   
3. 列表  
    `<div v-for="(index, item) in items" track-by="_uid">`
    `<div v-for="(key, val) in object">`
    `<span v-for="n in 10">{{ n }} </span>`
4. 事件  
    `<button v-on:click="doSomething">`
    `<button @click="doSomething">`
    `<button v-on:click="say('hi', $event)">Say Hi</button>`
5. 条件  
    `<p v-if="flag">`
    `<h1 v-show="ok">Hello!</h1>`
    `<div v-else>`
6. VM 实例的生命周期
    1. created
    2. beforeCompile
    3. compiled
    4. ready
    5. beforeDestroy
    6. destroyed
7. VM 构造参数
    1. el
    2. data
    3. computed
    4. methods
    5. events
    6. components
8. VM 实例
    1. $watch
    2. $parent / $root
    3. $children
    4. $on / $emmit / $dispath / $broadcase
    5. $refs
9. 占位标签   
    1. `<template>`
    2. `<slot>`
    3. `<slot name="one"></slot>`
10. 动画   
    `<div v-if="show" transition="expand">hello</div>`
    `<div v-if="show" :transition="transitionName">hello</div>`
11. Props  
    `<child msg="parentMsg"></child>`
    `<child :msg="parentMsg"></child>`
    `<child :msg.sync="parentMsg"></child>`
    `<child :msg.once="parentMsg"></child>`
12. 引用  
    `<user-profile v-ref:profile></user-profile>`
13. 组件
    1. 声明：`var MyComponent = Vue.extend({})`
    2. 注册：`Vue.component('my-component', MyComponent)`
    3. 使用：
        - `<my-component></my-component>`
        - `<div is=my-component></div>`