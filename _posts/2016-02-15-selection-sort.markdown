---
layout: post
title: "《算法导论》第二章---选择排序算法"
date: 2016-02-15 11:18:48 
info: 用JavaScript 实现 SELECTION-SORT排序
categories: articles
---

选择排序算法的执行规则是这样描述的：外循环从数组的第一个元素移动到倒数第二个元素；内循环从第二个元素移动到最后一个元素，
查找比当前外循环所指向的元素小的元素。

首先我们把其用到的置换部分独立出来
 
{% highlight javascript %}
function swap(arr,index1,index2) {
    var tem=arr[index1];
    arr[index1]=arr[index2];
    arr[index2]=tem;
}
{% endhighlight %}

下面才是算法要执行的部分

{% highlight javascript %}
function selectSort(arr) {
    var min, i, j;
    for(i=0; i<arr.length-1; i++ ) {
        min=i;
        for(j=i+1; j<arr.length;j++) {
            if(arr[j]<arr[min]) {
                min=j;
            }            
        }
        swap(arr, i, min);
    }
    return arr;
}
{% endhighlight %}

既然是在javascript的环境里，可以把它修改为下面更简单的形式

{% highlight javascript %}
function selectSortT(arr) {
    var i,min, temArr;
    for(i=0;i<arr.length-1;i++) {        
        temArr=arr.slice(i);
        min=arr.indexOf(Math.min.apply(null,temArr ));
        swap(arr, i,min)
    }
    return arr;
}

{% endhighlight %}

贴 可调试地址：<a href="https://jsfiddle.net/14o6n8j5/" target="_blank">https://jsfiddle.net/14o6n8j5/</a>
