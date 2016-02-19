---
layout: post
title: "《算法导论》第二章---合并排序算法"
date: 2016-02-17 13:34:55 
info: 用JavaScript 实现 合并(归并)排序（分治法）。合并排序又称为归并排序，是高级算法之一。在《算法导论》这本书中此排序算法使用了递归地方式
categories: articles
---

合并排序又称为归并排序，是高级算法之一。在《算法导论》这本书中此排序算法使用了递归地方式，code如下：

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
    if(arr.length<2) {
        return;
    }
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

不过在《Data Structrue & Algorithms width Javascript》书中，作者指出递归式太深不适合javascript，他提出了另外一种策略。code如下：

{% highlight javascript %}
function mergeSort1(arr) {
    if(arr.length<2) {
        return;
    }
    var step=1;
    var left,right;
    while(step<arr.length) {
        left=0;
        right=step;
        while(right+step<=arr.length) {
            mergeArrays(arr, left, left+step, right, right+step);
            left=right+step;
            right=left+step;
        }
        if(right<arr.length) {
            mergeArrays(arr, left, left+step, right, arr.length);
        }
        step*=2;
    }
}

function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight) {
   var rightArr = new Array(stopRight - startRight + 1);
   var leftArr = new Array(stopLeft - startLeft + 1);
    var k,i, j, m, n;
    k=startRight;
    for(i=0;i<rightArr.length-1; i++) {
        rightArr[i]=arr[k];
        k++;
    }
    k=startLeft;
    for(i=0;i<leftArr.length-1; i++) {
        leftArr[i]=arr[k];
        k++;
    }
    rightArr[rightArr.length-1]=leftArr[leftArr.length-1]=Infinity;
    m=n=0;
    for(k=startLeft; k<stopRight; k++) {
        if(leftArr[m]<rightArr[n]) {
            arr[k]=leftArr[m];
            m++;
        }else {
            arr[k]=rightArr[n];
            n++;
        }
    }
}

{% endhighlight %}

关于它们在执行时间上的差异，可以用以下的计时code了解下，在此次案例下可以看到迭代式合并排序算法`mergeSort1`略胜递归式排序算法`mergeSort`

{% highlight javascript %}
var testArr=[];
setDate(testArr,100000);
var time1=Date.now();
mergeSort1(testArr );
var time2=Date.now();
alert("迭代式归并排序消耗时间为："+(time2-time1)+'ms');
testArr.length=0;
setDate(testArr,100000);
time1=Date.now();
mergeSort(testArr);
time2=Date.now();
alert("递归式归并排序消耗时间为："+(time2-time1)+'ms');
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


