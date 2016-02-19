//二分查找(折半查找)算法
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

//2.3-7 （page.37）输入有n个整数构成的集合S和一个整数x，判断出S中是否存在有两个数其和等于x的元素。
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

//插入排序 （降序）
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


//霍纳规则 (arr为常量数组，x为输入值，y为多项式相加和) y=a0+x(a1+x*(a2+... + x*(a(n-1) + x*an) ) ),arr=[a0,a1,...,an]
function horner(arr, x) {
    var i=arr.length-1, y;
    y=0;
    while(i>=0) {
        y=arr[i]+x*y;
        i--;
    }
    return y;
}

//快速排序
var testArr=[6,2,7,3,8,9];

function quickSort(array) {
  function sort(prev, numsize) {
    var nonius = prev;
    var j = numsize - 1;
    var flag = array[prev];
    if ((numsize - prev) > 1) {
      while (nonius < j) {
        for (; nonius < j; j--) {
          if (array[j] < flag) {
            array[nonius++] = array[j];　 //a[i] = a[j]; i += 1;
            break;
          };
        }
        for (; nonius < j; nonius++) {
          if (array[nonius] > flag) {
            array[j--] = array[nonius];
            break;
          }
        }
      }
      array[nonius] = flag;
      sort(0, nonius);
      sort(nonius + 1, numsize);
    }
  }
  sort(0, array.length);
  return array;
}

//选择排序
//原理：选择排序会用到嵌套循环。外循环从数组的第一个元素移动到倒数第二个元素；内循环从第二个元素移动到最后一个元素，
//查找比当前外循环所指向的元素小的元素。

//数组元素置换函数
function swap(arr,index1,index2) {
    var tem=arr[index1];
    arr[index1]=arr[index2];
    arr[index2]=tem;
}

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
}

//selectSort 简化的一种表示
function selectSortT(arr) {
    var i,min, temArr;
    for(i=0;i<arr.length-1;i++) {        
        temArr=arr.slice(i);
        min=arr.indexOf(Math.min.apply(null,temArr ));
        swap(arr, i,min)
    }
    return arr;
}
