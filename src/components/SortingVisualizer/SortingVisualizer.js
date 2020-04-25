import React, { useState } from 'react'
import styles from './SortingVisualizer.module.css'
import { bubbleSort, stopBubbleSort } from '../../algorithms/BubbleSort.js'
import { insertionSort, stopInsertionSort } from '../../algorithms/InsertionSort.js'

const barWidth = 1
const widthPercentage = 75
const heightPercentage = 75
const speed = 1;

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
			default:
				break
		}
	}

	const generate = () => {
		stop()
		setArray(generateRandomArray())
	}

	return (
		<div className={styles.main}>
			<button onClick={() => generate()}>Generate</button>
			<button onClick={() => runBubbleSort()}>Bubble Sort</button>
			<button onClick={() => runInsertionSort()}>Insertion Sort</button>
			<div className={styles.array} style={{ height: `${(100 - heightPercentage) / 2 + heightPercentage}vh` }}>
				{array.map((value, i) => {
					return <div id={i} key={i} style={{ height: `${value}vh`, width: `${barWidth}vw` }}></div>
				})}
			</div>
		</div >
	)
}

export default SortingVisualizer

