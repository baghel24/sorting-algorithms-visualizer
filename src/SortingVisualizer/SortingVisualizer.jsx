import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getquickSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getheapSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';

import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#69e7f8';
const PRIMARY_COLOR1 = '#f5c645';
const PRIMARY_COLOR3 = '#39FF14';
const PRIMARY_COLOR2 = 'blue';


// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';
const SECONDARY_COLOR1 = '#69e7f8';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR3;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  // Visualization function for Quicksort
  quickSort() {
    const animations = getquickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isSwap = animations[i][2]; // Indicates if elements are swapped
      
      if (isSwap) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        
        setTimeout(() => {
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIdx] = animations[i];
        const barStyle = arrayBars[barIdx].style;
        // const color = isPivot ? SECONDARY_COLOR : PRIMARY_COLOR1;
        
        setTimeout(() => {
          barStyle.backgroundColor = PRIMARY_COLOR1;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  
  heapSort() {
    const animations = getheapSortAnimations(this.state.array); // Corrected function name
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isSwap = animations[i].length === 4;
  
      if (isSwap) {
        const [barOneIdx, barTwoIdx, barOneValue, barTwoValue] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
  
        setTimeout(() => {
          // Update state to reflect the swap
          const newArray = this.state.array.slice();
          [newArray[barOneIdx], newArray[barTwoIdx]] = [barTwoValue, barOneValue];
          this.setState({ array: newArray });
  
          // Update the visual representation
          barOneStyle.height = `${barTwoValue}px`;
          barTwoStyle.height = `${barOneValue}px`;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIdx, isPivot] = animations[i];
        const barStyle = arrayBars[barIdx].style;
        const color = isPivot ? SECONDARY_COLOR1 : PRIMARY_COLOR;
  
        setTimeout(() => {
          // Update the visual representation
          barStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  
  

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    
      const animations = getBubbleSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [barOneIdx, barTwoIdx, swap] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
    
        setTimeout(() => {
          if (swap) {
            // Swap the heights of the two bars
            const tempHeight = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = tempHeight;
          } else {
            // Change the color to visualize comparison
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR2;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    
    
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      const quickSortedArray = getMergeSortAnimations(array.slice());
      const heapSortedArray = getMergeSortAnimations(array.slice());
      const BubbleSortedArray = getBubbleSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
      console.log(arraysAreEqual(javaScriptSortedArray, quickSortedArray));
      console.log(arraysAreEqual(javaScriptSortedArray, heapSortedArray));
      console.log(arraysAreEqual(javaScriptSortedArray, BubbleSortedArray));
    }
  }
  

  render() {
    const {array} = this.state;

    return (
      
    <div className="container">
      <h1>Sorting Algorithims Visualizer</h1>
        <h3>Table Represents the colors of algorithms</h3>
        <div className="right">
        <table>
        <tr>
  <th>Bar Color</th>
  <th>Alogorithim Name</th>
  <th>Time Compplexity</th>
  </tr>
  <tr>
  <td><div class="oval1"></div></td>
  <td>MergeSort</td>
  <td>O(Nlog(N))</td>
  </tr>
  <tr>
  <td><div class="oval2"></div></td>
  <td>QuikSort</td>
  <td>O(Nlog(N))</td>
  </tr>
  <tr>
  <td><div class="oval3"></div></td>
  <td>HeapSort</td>
  <td>O(Nlog(N))</td>
  </tr>
  <tr>
  <td><div class="oval4"></div></td>
  <td>BubbleSort</td>
  <td>O(N^2)</td>
  </tr>
            </table>
        </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <div className="buttons">
        <button className="button" onClick={() => this.resetArray()}>Generate New Array</button>
        <button className="button" onClick={() => this.mergeSort()}>Merge Sort</button>
        <button className="button" onClick={() => this.quickSort()}>Quick Sort</button>
        <button className="button" onClick={() => this.heapSort()}>Heap Sort</button>
        <button className="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button className="button" onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
      </div></div>
      {/* <div className="array-container1">
        {array.map((value, idx) => (
          <div
            className="array-bar1"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR1,
              height: `${value}px`,
            }}></div>
        ))}
        <div className="buttons">
        <button className="button" onClick={() => this.resetArray()}>Generate New Array</button>
        <button className="button" onClick={() => this.mergeSort()}>Merge Sort</button>
        <button className="button" onClick={() => this.quickSort()}>Quick Sort</button>
        <button className="button" onClick={() => this.heapSort()}>Heap Sort</button>
        <button className="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button className="button" onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
      </div></div> */}

      
      </div>
    );
    
    
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
