---
layout: post
title: "《算法导论》第二章---插入排序算法习题"
date: 2016-01-15 11:18:48 
info: post的模板在 `_layouts` 目录下，`_posts`目录下是具体文章详情
categories: articles
---

用JavaScript 实现 INSERTION-SORT升序排序

function insertSort(arr) {
    var key,i,j;
    for(j=1;j<arr.length;j++) {
        key=arr[j];
        i=j-1;
        while(i>=0 && arr[i]>key) {
            arr[i+1]=arr[i];
            i--;
        }
        arr[i+1]=key;
    }

    return arr;
}
