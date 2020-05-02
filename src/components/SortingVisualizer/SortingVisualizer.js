import React, { useState, useRef, useEffect } from 'react'
import styles from './SortingVisualizer.module.css'
import { bubbleSort } from '../../algorithms/BubbleSort.js'
import { insertionSort } from '../../algorithms/InsertionSort.js'
import { selectionSort } from '../../algorithms/SelectionSort.js'
import { quickSort } from '../../algorithms/QuickSort.js'
import { mergeSort } from '../../algorithms/MergeSort.js'
import { updateSpeed, stopAnimation } from '../../algorithms/Animate.js'

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
	const speed = useRef(null)

	useEffect(() => {
		speed.current.value = 1
	}, [])

	const runBubbleSort = () => {
		resetArrayAnimation()
		bubbleSort([...array])
	}

	const runInsertionSort = () => {
		resetArrayAnimation()
		insertionSort([...array])
	}

	const runSelectionSort = () => {
		resetArrayAnimation()
		selectionSort([...array])
	}

	const runQuickSort = () => {
		resetArrayAnimation()
		quickSort([...array])
	}

	const runMergeSort = () => {
		resetArrayAnimation()
		mergeSort([...array])
	}

	const resetArrayAnimation = () => {
		document.querySelector('#comparison').innerHTML = 0
		stopAnimation()
		for (let i = 0; i < array.length; i++) {
			document.getElementById(i).style.height = `${array[i]}vh`
			document.getElementById(i).style.backgroundColor = 'lightskyblue'
		}
	}

	const generate = () => {
		document.querySelector('#comparison').innerHTML = 0
		stopAnimation()
		setArray(generateRandomArray())
	}

	const sortCurrentArray = () => {
		const arrayCopy = [...array]
		arrayCopy.sort((a, b) => a - b)
		setArray(arrayCopy)
		resetArrayAnimation()
	}

	const reverseSortCurrentArray = () => {
		const arrayCopy = [...array]
		arrayCopy.sort((a, b) => a - b).reverse()
		setArray(arrayCopy)
		resetArrayAnimation()
	}

	return (
		<>
			<input type="range" min={1} max={1000} step={1} ref={speed} onChange={(e) => updateSpeed(e.target.value)} />
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

