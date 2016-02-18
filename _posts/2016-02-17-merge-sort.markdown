---
layout: post
title: "《算法导论》第二章---合并排序"
date: 2016-02-17 13:34:55 
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
{% endhighlight %}

{% highlight javascript %}
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

{% endhighlight %}

贴 可调试地址：<a href="https://jsfiddle.net/37mgo212/" target="_blank">https://jsfiddle.net/37mgo212/</a>

2小节 练习2.3-2
描述：改写MERGE过程，使之不在使用哨兵元素，而是一旦数组`L`或`R`中的所有元素都被复制回数组`A`后，就立即停止，再将另一个数组中余下的元素复制回到数组`A`中。

{% highlight javascript %}
function merge(arr, p, q, r) {
    var i, j, k, temArr;
    var arrL=arr.slice(p, q), arrR=arr.slice(q, r);
    i=j=0;
    for(k=p; k<r; k++) {
        if(i===arrL.length) {
            temArr=arrR.slice(j);
            arr=arr.slice(p,k+1).concat(temArr);
            break;
        }else if(j===arrR.length) {
            temArr=arrL.slice(i);
            arr=arr.slice(p,k).concat(temArr); 
            break;
        } else {
            if(arrL[i] <= arrR[j]) {
                arr[k]=arrL[i];
                i++;
            } else {
                arr[k]=arrR[j];
                j++;       
            }    
        }
    }    
}

{% endhighlight %}

贴 可调试地址：<a href="https://jsfiddle.net/mjrza2cx/" target="_blank">https://jsfiddle.net/mjrza2cx/</a>


