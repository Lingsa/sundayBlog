---
layout: post
title: "The Command Pattern"
date: 2016-03-18 18:20:38
info: 命令模式目的是把方法调用、请求或操作封装为一个对象（object）,并且使我们在自己的权衡下使用参数和方法调用。
categories: articles
---

###The Command Pattern

命令模式目的是把方法调用、请求或操作封装为一个对象（object）,并且使我们在自己的权衡下使用参数和方法调用。

Concrete classes 是基于类编程语言的最好解释，它也与抽象类相关联。一个抽象类定义一个借口，但对于它的所有member functions它不是必须提供实现的（provide implementations）.

有共同接口的所有命令模式（command objects）可以根据需要很容易进行交换，这个特性被认为此模式的最大好处。

为了演示Command Pattern 接下来我将创建一个简单的 car purchasing service.

{% highlight javascript %}
(function() {
  var carManager = {

    //request information
    requestInfo:function( model, id ){
      return "The information for" + model + "with ID " + id + "is foobar";
    },

    //purchase the car
    buyVehicle: function( model, id ){
      return "You have successfully purchased Item" + id +", a" +model;
    },

    //arrange a viewing
    arrangeViewing: function( model, id ){
      return "You have successfully booked a viewing of" + model + "(" +id +")";
    }
  };
})();

{% endhighlight %}