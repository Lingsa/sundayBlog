//二分查找算法
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

//2.3-7
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