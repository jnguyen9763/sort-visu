import React, { useState } from 'react'
import styles from './SortingVisualizer.module.css'
import { bubbleSort, stopBubbleSort } from '../../algorithms/BubbleSort.js'
import { insertionSort, stopInsertionSort } from '../../algorithms/InsertionSort.js'
import { selectionSort, stopSelectionSort } from '../../algorithms/SelectionSort.js'
import { quickSort, stopQuickSort } from '../../algorithms/QuickSort.js'
import { mergeSort, stopMergeSort } from '../../algorithms/MergeSort.js'


const barWidth = 1
const widthPercentage = 75
const heightPercentage = 75

const generateRandomArray = () => {
	const array = []
	const length = Math.floor(widthPercentage / barWidth)
	for (let i = 0; i < length; i++) {
		array[i] = Math.floor(Math.random() * heightPercentage) + 1
		if (document.getElementById(i) !== null)
			document.getElementById(i).style.backgroundColor = 'lightskyblue'
	}
	return array
}

function SortingVisualizer() {
	const [array, setArray] = useState(generateRandomArray())
	const [currSort, setCurrSort] = useState('')
	const [speed, setSpeed] = useState(1)

	const runBubbleSort = () => {
		setCurrSort('bubbleSort')
		resetArrayAnimation()
		bubbleSort([...array], speed)
	}

	const runInsertionSort = () => {
		setCurrSort('insertionSort')
		resetArrayAnimation()
		insertionSort([...array], speed)
	}

	const runSelectionSort = () => {
		setCurrSort('selectionSort')
		resetArrayAnimation()
		selectionSort([...array], speed)
	}

	const runQuickSort = () => {
		setCurrSort('quickSort')
		resetArrayAnimation()
		quickSort([...array], speed)
	}

	const runMergeSort = () => {
		setCurrSort('mergeSort')
		resetArrayAnimation()
		mergeSort([...array], speed)
	}

	const resetArrayAnimation = () => {
		stop()
		for (let i = 0; i < array.length; i++) {
			document.getElementById(i).style.height = `${array[i]}vh`
			document.getElementById(i).style.backgroundColor = 'lightskyblue'
		}
	}

	const stop = () => {
		switch (currSort) {
			case 'bubbleSort':
				stopBubbleSort()
				break
			case 'insertionSort':
				stopInsertionSort()
				break
			case 'selectionSort':
				stopSelectionSort()
				break
			case 'quickSort':
				stopQuickSort()
				break
			case 'mergeSort':
				stopMergeSort()
				break
			default:
				break
		}
	}

	const generate = () => {
		document.querySelector('#comparison').innerHTML = 0
		stop()
		setArray(generateRandomArray())
	}

	const sortCurrentArray = () => {
		document.querySelector('#comparison').innerHTML = 0
		const arrayCopy = [...array]
		arrayCopy.sort((a, b) => a - b)
		setArray(arrayCopy)
		resetArrayAnimation()
	}

	const reverseSortCurrentArray = () => {
		document.querySelector('#comparison').innerHTML = 0
		const arrayCopy = [...array]
		arrayCopy.sort((a, b) => a - b).reverse()
		setArray(arrayCopy)
		resetArrayAnimation()
	}

	return (
		<>
			<input type="text" value={speed} onChange={(e) => setSpeed(e.target.value)} />
			<button onClick={() => generate()}>Generate</button>
			<button onClick={() => sortCurrentArray()}>Sort</button>
			<button onClick={() => reverseSortCurrentArray()}>Reverse Sort</button>
			<button onClick={() => runBubbleSort()}>Bubble Sort</button>
			<button onClick={() => runInsertionSort()}>Insertion Sort</button>
			<button onClick={() => runSelectionSort()}>Selection Sort</button>
			<button onClick={() => runQuickSort()}>Quick Sort</button>
			<button onClick={() => runMergeSort()}>Merge Sort</button>
			<div>Comparisons: <span id="comparison">0</span></div>
			<div className={styles.array} style={{ height: `${(100 - heightPercentage) / 2 + heightPercentage}vh` }}>
				{array.map((value, i) => {
					return <div
						id={i}
						key={i}
						style={{
							height: `${value}vh`,
							width: `${barWidth}vw`
						}}></div>
				})}
			</div>
		</>
	)
}

export default SortingVisualizer

