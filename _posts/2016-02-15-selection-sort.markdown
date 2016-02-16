---
layout: post
title: "《算法导论》第二章---选择排序算法"
date: 2016-02-15 11:18:48 
info: 用JavaScript 实现 SELECTION-SORT排序
categories: articles
---

用JavaScript 实现 SELECTION-SORT排序

{% highlight javascript %}
function selectSort(arr) {
    var i,minValIndex, temArr, temVal;
    for(i=0;i<arr.length-1;i++) {
        temVal=arr[i];
        temArr=arr.slice(i);
        minValIndex=arr.indexOf(Math.min.apply(null,temArr ));
        arr[i]=arr[minValIndex];
        arr[minValIndex]=temVal;
    }
    return arr;
}

{% endhighlight %}


