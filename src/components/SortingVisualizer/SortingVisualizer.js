import React, { useState } from 'react'
import styles from './SortingVisualizer.module.css'
import bubbleSort from '../../algorithms/BubbleSort.js'

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

	const runBubbleSort = () => {
		resetArrayAnimation()
		bubbleSort([...array])
	}

	const resetArrayAnimation = () => {
		for (let i = 0; i < array.length; i++) {
			document.getElementById(i).style.height = `${array[i]}vh`
			document.getElementById(i).style.backgroundColor = 'lightskyblue'
		}
	}

	return (
		<div className={styles.main}>
			<button onClick={() => setArray(generateRandomArray())}>Generate</button>
			<button onClick={() => runBubbleSort()}>Bubble Sort</button>
			<div className={styles.array} style={{ height: `${(100 - heightPercentage) / 2 + heightPercentage}vh` }}>
				{array.map((value, i) => {
					return <div id={i} key={i} style={{ height: `${value}vh`, width: `${barWidth}vw` }}></div>
				})}
			</div>
		</div >
	)
}

export default SortingVisualizer

