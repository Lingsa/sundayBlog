---
layout: post
title: "《算法导论》第二章---插入排序算法习题"
date: 2016-01-15 11:18:48 
info: 用JavaScript 实现 INSERTION-SORT升序(或降序)排序
categories: articles
---

用JavaScript 实现 INSERTION-SORT升序排序

{% highlight javascript %}
function insertSort(arr) {
    var key,i,j;
    for(j=1;j<arr.length;j++) {
        key=arr[j];
        i=j-1;
        while(i>=0 && arr[i]< key) {
            arr[i+1]=arr[i];
            i--;
        }
        arr[i+1]=key;
    }
    return arr;
}

>##### 测试示例 insertSort([2,1,3])   输出结果是 [3,2,1]
{% endhighlight %}

用JavaScript 实现 INSERTION-SORT降序排序

{% highlight javascript %}
function insertSort(arr) {
    var key,i,j;
    for(j=1;j<arr.length;j++) {
        key=arr[j];
        i=j-1;
        while(i>=0 && arr[i]> key) {
            arr[i+1]=arr[i];
            i--;
        }
        arr[i+1]=key;
    }
    return arr;
}
{% endhighlight %}
