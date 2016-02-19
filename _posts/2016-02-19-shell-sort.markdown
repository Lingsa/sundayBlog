---
layout: post
title: "高级算法之希尔排序"
date: 2016-02-19 15:12:15 
info: 
categories: articles
---
它的工作原理：通过定义一个间隔序列来表示在排序过程中进行比较的元素之间有多远的间隔。
Marcin Ciura 在2001年在他的论文“Best Increments for the Average Case of Shell Sort”给出的一个间隔序列[701,301,132,57,23,10,4,1] （ http://sun.aei.polsl.pl/~mciura/publikacje/shellsort.pdf）

不同于Ciura，Robert Sedgewick也给出了自己的希尔算法，详情见shellSort1 函数

{% highlight javascript %}

function shellSort(arr, gaps) {
    var g, i, j, temp;
    for(g=0; g<gaps.length; g++) {
        for(i=gaps[g]; i<arr.length;i++) {
            temp=arr[i];
            j=i;
            while(j>=gaps[g] && arr[j-gaps[g]]>temp) {
                arr[j]=arr[j-gaps[g]];
                 j-=gaps[g];
            }
            arr[j]=temp;
        }
    }
}
{% endhighlight %}

Robert Sedgewick 动态计算间隔序列的希尔算法

{% highlight javascript %}
function shellSort1(arr) {
    var N,h, j, i;
    N=arr.length;
    h=1;
    while(h<N/3) {
        h=3*h+1;
    }
    while( h >=1) {
        for(i=h;i<N; i++) {
            for(j=i;j>=h && arr[j]<arr[j-h]; j-=h) {
                swap(arr,j,j-h);
            }
        }
        h=(h-1)/3;
    }
}

function swap(arr,index1,index2) {
    var tem=arr[index1];
    arr[index1]=arr[index2];
    arr[index2]=tem;
}
{% endhighlight %}

有书说这两个算法的执行时间是等同的，那么的下面我贴出它们的计时code

{% highlight javascript %}
>=设置数组随机长度，数组元素为随机元素

function setDate(arr, len) {
  for(var i=0;i<len;i++){
    arr[i]=Math.floor(Math.random() * (len+1))
  }
}

var testArr=[];
setDate(testArr,100000);
var time1=Date.now();
shellSort(testArr,[701,301,132,57,23,10,4,1] );
var time2=Date.now();
alert(time2-time1);
testArr.length=0;
setDate(testArr,100000);
time1=Date.now();
shellSort1(testArr);
time2=Date.now();
alert(time2-time1);

{% endhighlight %}

结果是需要大量测试数字的比较，在这组数据里shellSort执行效率略胜与shellSort效率
