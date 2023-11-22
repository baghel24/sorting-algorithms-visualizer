export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  // export function getBubbleSortAnimations(array) {
  //   const animations = [];
  //   if (array.length <= 1) return array;
  
  //   const auxiliaryArray = array.slice();
  
  //   bubbleSort(auxiliaryArray, animations);
  
  //   return animations;
  // }
  
  // function bubbleSort(array, animations) {
  //   const n = array.length;
  //   for (let i = 0; i < n - 1; i++) {
  //     for (let j = 0; j < n - i - 1; j++) {
  //       // Push indices for color change (comparing elements)
  //       animations.push({ type: 'comparison', indices: [j, j + 1] });
  
  //       if (array[j] > array[j + 1]) {
  //         // Push indices for swapping elements
  //         animations.push({ type: 'swap', indices: [j, j + 1] });
  
  //         // Swap elements in the array
  //         let temp = array[j];
  //         array[j] = array[j + 1];
  //         array[j + 1] = temp;
  //       }
  //     }
  //   }
  // }
  export function getBubbleSortAnimations(array) {
    const animations = [];
    // Bubble Sort algorithm implementation to populate animations array
    // Populate animations array with the indices of elements being compared and swapped
  
    // Example pseudo code:
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1 - i; j++) {
        // Compare elements at indices j and j+1
        animations.push([j, j + 1]); // For visualizing comparison
  
        if (array[j] > array[j + 1]) {
          // Swap elements
          animations.push([j, j + 1, true]); // For visualizing swap
          // Perform the swap in the array
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
  
    return animations;
  }
  
  export function getquickSortAnimations(arr) {
    const animations = [];
    if (arr.length <= 1) {
      return arr;
    }
    const auxiliaryArray = arr.slice();
    quickSortHelper(arr, 0, arr.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function quickSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx >= endIdx) {
      return;
    }
    let pivotIdx = startIdx;
    let leftIdx = startIdx + 1;
    let rightIdx = endIdx;
  
    animations.push([pivotIdx, pivotIdx, true]); // Highlight pivot element
  
    while (rightIdx >= leftIdx) {
      animations.push([leftIdx, rightIdx, false]); // Color the elements being compared
      if (auxiliaryArray[leftIdx] > auxiliaryArray[pivotIdx] && auxiliaryArray[rightIdx] < auxiliaryArray[pivotIdx]) {
        animations.push([leftIdx, rightIdx, true]); // Swap elements
        swap(auxiliaryArray, leftIdx, rightIdx);
      }
      if (auxiliaryArray[leftIdx] <= auxiliaryArray[pivotIdx]) {
        animations.push([leftIdx, leftIdx, false]); // Reset color
        leftIdx++;
      }
      if (auxiliaryArray[rightIdx] >= auxiliaryArray[pivotIdx]) {
        animations.push([rightIdx, rightIdx, false]); // Reset color
        rightIdx--;
      }
    }
  
    animations.push([pivotIdx, rightIdx, true]); // Swap pivot with rightIdx
    swap(auxiliaryArray, pivotIdx, rightIdx);
  
    // Recursion on both sides of the pivot
    const leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
    if (leftSubarrayIsSmaller) {
      quickSortHelper(mainArray, startIdx, rightIdx - 1, auxiliaryArray, animations);
      quickSortHelper(mainArray, rightIdx + 1, endIdx, auxiliaryArray, animations);
    } else {
      quickSortHelper(mainArray, rightIdx + 1, endIdx, auxiliaryArray, animations);
      quickSortHelper(mainArray, startIdx, rightIdx - 1, auxiliaryArray, animations);
    }
  }
  
  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  
  export function getheapSortAnimations(arr) {
    const animations = [];
    const n = arr.length;
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, animations);
    }
  
    for (let i = n - 1; i > 0; i--) {
      animations.push([0, i]); // Indicates comparison
      [arr[0], arr[i]] = [arr[i], arr[0]];
      animations.push([0, i, arr[0], arr[i]]); // Indicates swap
      heapify(arr, i, 0, animations);
    }
  
    return animations;
  }
  
  function heapify(arr, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
  
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
  
    if (largest !== i) {
      animations.push([i, largest]); // Indicates comparison
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      animations.push([i, largest, arr[i], arr[largest]]); // Indicates swap
      heapify(arr, n, largest, animations);
    }
  }
  