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

//插入排序用到外、内两个循环。外循环从数组的第2位到最后一位挨个移动，内循环则对外循环选中的元素与它的数组元素一一比较，
//如果外循环选中的元素比内循环选中的元素小，那么内循环数组元素会向右移动，为外循环选中的这个元素腾位

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
        swap(arr, i,min);
    }
    return arr;
}

//注：selectSortT执行效率比selectSort慢一些

//算法计时 
//给数组填充值
function setDate(arr, len) {
  for(var i=0;i<len;i++){
    arr[i]=Math.floor(Math.random() * (len+1))
  }
}
var time1=Date.now();
insertSort(testArr);
var time2=Date.now();
console.log(time2-time1);

/*=============高级算法===============*/
//快速排序  [在排列的数组长度达到40时，运行时间高达3000多毫秒]
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

/*希尔排序
 *它的工作原理：通过定义一个间隔序列来表示在排序过程中进行比较的元素之间有多远的间隔。
 *Marcin Ciura 给出的一个间隔序列[701,301,132,57,23,10,4,1]
 *Robert Sedgewick 公布了一个公式对希尔排序用到的间隔序列进行动态计算
 *详情见shellsort1
 *在排列大数据时（比如数组长度10000）是很快 用时 可以压缩到单位数 毫秒
*/
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

//计时
var testArr=[];
setDate(testArr,100000);
var time1=Date.now();
shellSort(testArr,[701,301,132,57,23,10,4,1] );
var time2=Date.now();
console.log("硬编码间隔序列的希尔排序消耗时间为："+(time2-time1)+'ms');
testArr.length=0;
setDate(testArr,100000);
time1=Date.now();
shellSort1(testArr);
time2=Date.now();
console.log("动态间隔序列的希尔排序消耗时间为："+(time2-time1)+'ms');
/*结果显示 两者的消耗时间几乎等同 shellSort1略胜shellSort*/

//合并（归并）排序

