
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

/*=============高级排序算法===============*/
//快速排序：通过递归地方式将数据依次分解为包含较小元素和较大元素的不同子序列。不断重复这个步骤直到所有数据都是有序的。  [在排列的数组长度达到40时，运行时间高达3000多毫秒]

function qSort(list) {
    if(list.length<2) {
        return [];
    }
    var lesser,greater,pivot, i;
    lesser=[];
    greater=[];
    pivot=list[0];
    for(i=1;i<list.length; i++) {
        if(list[i]<pivot) {
            lesser.push(list[i]);
        }else {
            greater.push(list[i]);
        }
    }
    return qSort(lesser).concat(pivot,qSort(greater));
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
//《数据结构与算法 javascript描述》非递归式
function mergeSort(arr) {
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

/*=============检索算法===============*/
//二分查找(折半查找)算法，相对于顺序查找它的效率更高，但是你必须在查找前花费额外的时间将列表中的元素排序
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

//没有用到递归地二分查找
function binarySearch1(arr,data) {
    var upperBound=arr.length-1;
    var lowerBound=0;
    while(lowerBound<=upperBound) {
        var mid=Math.floor((upperBound+lowerBound)/2);
        if(arr[mid]<data) {
            lowerBound=mid+1;
        }else if(arr[mid]>data) {
            upperBound=mid-1;
        }else {
            return mid;
        }
    }
    return -1;
}

//2.3-7 （算法导论page.37）输入有n个整数构成的集合S和一个整数x，判断出S中是否存在有两个数其和等于x的元素。
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

//顺序查找
function seqSearch(arr, x) {
    if(arr.length<1) {
        return;
    }
    for(var i=i;i<arr.length; i++) {
        if(arr[i]===x) {
            return true; //return i;
        }
    }
    return false; //return -1;
}

//查找最小值、最大值
function max(x,y) {
    return x>y ? x:y;
}
function searchMax(arr) {
    if(arr.length<1) {
        return;
    }
    var temp=arr[0];
    for(var i=1;i<arr.length;i++) {
        temp=max(temp, arr[i]);
    }
    return temp;
}

//帕累托分布（类似“80-20”的概率分布）
function seqSearch(arr,data) {
    for(var i=0;i<arr.length; i++) {
        if(arr[i]===data) {
            if(i>0) {
                swap(arr, i,i-1);
            }
            return true;
        }
    }
    return false;
}


/*=============高级算法===============*/
/*动态规划 
 *解决方案：从底部开始解决问题，将所有小问题解决掉，然后合并成一个整体解决方案，从而解决掉整个大问题。
 *很多使用递归去解决的编程问题，可以重写为使用动态规划的技巧去解决。
*/
function recurFib(n) {
    if(n<2) {
        return n;
    }else {
        return recurFib(n-1)+recurFib(n-2);
    }
}

function iterFib(n) {
    var i,
        last=1,
        nextlast=1,
        result=1;
    for(i=2;i<n;i++) {
        result=last+nextlast;
        last=nextlast;
        nextlast=result;
    }
    return result;
}

var time1=Date.now();
recurFib(100);
var time2=Date.now();
console.log(time2-time1);

time1=Date.now();
iterFib(100);
time2=Date.now();
console.log(time2-time1);

/*贪心算法
 *它是一种以寻找“优质解”为手段从而达到整体解决方案，也称全局最优解。
*/

//63美分的找零问题
function makechange(origAmt, coins) {
    var remainAmt=0;
    if(origAmt % .25 >0) {
        coins[0]=parseInt(origAmt / .25);
        remainAmt=origAmt % .25;
        origAmt=remainAmt;
    }
    if(origAmt % .1<origAmt) {
        coins[1]=parseInt(origAmt / .1);
        remainAmt=origAmt % .1;
        origAmt=remainAmt;        
    }
    if(origAmt % .05<origAmt) {
        coins[2]=parseInt(origAmt / .05);
        remainAmt=origAmt % .05;
        origAmt=remainAmt;        
    } 
    coins[3]=parseInt(origAmt / .01);
    return coins;
}

//背包最优解问题
function knapsack(values, weights, capacity) {
    var load=0,
        i=0,
        w=0;
    while(load<=capacity && i<values.length) {
        if(weights[i]<(capacity-load)) {
            load+=weights[i];
            w+=values[i];
        }else {
            var r=(capacity-load)/weights[i];
            w+=r*values[i];
            load+=r*weights[i]; //原文：load+=weights[i]
        }
        i++;
    }
    return w;
}

function lcs(word1,word2) {
    var i,j=word2.length-1;

    for(i=0;i<word1.length; i++) {
        var temp=word1.slice(i,i+1);
        while(j--){
            if(temp==word2.slice(j,j+1) && word1.slice(i+1,i+2)==word2.slice(j+1,j+2)) {//&& word1[i+1]==word2[j+1]
                return temp+word1.slice(i+1,i+2);
            }
        }       
    }
    return -1;
}

lcs('raven','havoc');
