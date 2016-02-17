---
layout: post
title: "《算法导论》第二章---合并排序"
date: 2016-01-15 11:18:48 
info: 用JavaScript 实现 合并排序（分治法）
categories: articles
---

用JavaScript 实现依据分之法则的合并排序算法

{% highlight javascript %}

function merge(arr, p, q, r) {
    var i, j, k;
    var arrL=arr.slice(p, q), arrR=arr.slice(q, r);
    arrL[q-p]=arrR[r-q]=Infinity;
    i=j=0;
    for(k=p; k<r; k++) {
        if(arrL[i] <= arrR[j]) {
            arr[k]=arrL[i];
            i++;
        } else {
            arr[k]=arrR[j];
            j++;       
        }
    }
}

function mergeSort(arr, p, r) {
    if(p<r) {
        var q=Math.floor((p+r)/2);
        if(q>p) {
            mergeSort(arr, p, q);
            mergeSort(arr, q, r); 
            merge(arr, p, q, r);                   
        }
    }
}
#=> var testArr=[2, 4, 5, 7, 1, 2, 3, 6]; mergeSort(testArr,0, 8); testArr;
   ---输出结果 [1, 2, 2, 3, 4, 5, 6, 7]
测试地址：https://jsfiddle.net/37mgo212/
{% endhighlight %}


