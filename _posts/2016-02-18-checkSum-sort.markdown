---
layout: post
title: "《算法导论》第二章---二分查找算法"
date: 2016-02-17 19:18:07
info: 问题描述：给定一个有n个整数构成的集合S和另一个整数x时，判断S中是否存在有两个数其和等于x的值。
categories: articles
---

问题描述：给定一个有n个整数构成的集合S和另一个整数x时，判断S中是否存在有两个数其和等于x的值。
解决过程中用到了二分查找算法，如下：

{% highlight javascript %}
function binarySearch(arr, v, p, r) {
    if((p<r && v>arr[r] || v<arr[p]) || p>r) {
        return undefined;
    }

    var j=Math.floor((r+p)/2);
    if(v===arr[j]) {
        return j;
    } else {
        if(v<arr[j]) {
            return binarySearch(arr, v, p, j);
        } else {
            return binarySearch(arr, v, j+1, r);
        }
    }    
}

#=> 
{% endhighlight %}

我们假设x是有p和q两个元素的和，p就是S中的一个元素，然后利用上述的二分查找证明q是否也在S中。

{% highlight javascript %}
function checkSums(arr, x) {
    arr=arr.sort();
    var n=arr.length, i, temArr;
    for(i=0;i<n;i++) {
        temArr=arr.slice(0,i).concat(arr.slice(i+1,n));
        if(arr[i]>=0 && binarySearch(temArr, x-arr[i], 0, temArr.length-1)) {
            return true;
        }
    }
    return false;
}
{% endhighlight %}


