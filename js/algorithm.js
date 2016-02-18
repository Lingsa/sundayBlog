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
function quickSort(arr) {
  if(arr.length<2) return arr;
  var i,j, key, temVal;
  i=0;j=arr.length-1;
  key=arr[0];
  while(j>i) {
     if(arr[j]<key) {
       temVal=arr[i]
       arr[i]=arr[j]
       arr[j]=temVal;
       i++;
     }
     j--;
     
     if(arr[i]>key && j>i) {
        temVal=arr[j];
        arr[i]=arr[j];
        arr[j]=temVal;
        j--;
     }
     i++;
  }
  return arr;
}
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
