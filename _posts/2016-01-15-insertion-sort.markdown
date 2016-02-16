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
#=> 测试示例 insertSort([2,1,3])   输出结果是 [3,2,1].
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

2小节 2.1-4 “A、B各存放了一个二进制n位整数的各位数值，现在通过二进制的加法对这两个数进行计算，结果以二进制的形式把各位上的数值存放在数组c中”

{% highlight javascript %}
function binaryAdd(a,b,c) {
    var flag=0,j,key,n=a.length=b.length;
    for(j=0;j<n;j++) {
        key=a[j]+b[j]+flag;
        c[j]=key % 2;
        if(key>1) { flag=1;}
    }
    if(flag===1) { c[n]=1;}
    return arrc;
}
{% endhighlight %}

>### (注意把二进制各个位置上的数值以倒序方式存放在数组中)
var arra=[1,1,1], arrb=[0,1,1], arrrc=[]; binaryAdd(arra, arrb, arrc)   ----[1, 0, 1, 1]

