import React, { useState, useRef, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import styles from './SortingVisualizer.module.css'
import { bubbleSort } from '../../algorithms/BubbleSort.js'
import { insertionSort } from '../../algorithms/InsertionSort.js'
import { selectionSort } from '../../algorithms/SelectionSort.js'
import { quickSort } from '../../algorithms/QuickSort.js'
import { mergeSort } from '../../algorithms/MergeSort.js'
import { stopAnimation } from '../../algorithms/Animate.js'
import { normal } from '../../algorithms/ColorScheme.js'

const barWidth = 1
const heightPercentage = 75
const navHeight = 5

const generateRandomArray = (barWidth, widthPercentage, heightPercentage) => {
	const array = []
	const length = Math.floor(widthPercentage / barWidth)
	for (let i = 0; i < length; i++) {
		array[i] = Math.floor(Math.random() * heightPercentage) + 1
		if (document.getElementById(i) !== null)
			document.getElementById(i).style.backgroundColor = normal
	}
	return array
}

function SortingVisualizer() {
	const [widthPercentage, setWidthPercentage] = useState(75)
	const [array, setArray] = useState(generateRandomArray(barWidth, widthPercentage, heightPercentage))
	const speed = useRef(null)
	const arraySize = useRef(null)

	useEffect(() => {
		speed.current.value = 1
		arraySize.current.value = widthPercentage
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
			document.getElementById(i).style.backgroundColor = normal
		}
	}

	const generate = () => {
		document.querySelector('#comparison').innerHTML = 0
		stopAnimation()
		setWidthPercentage(arraySize.current.value)
		setArray(generateRandomArray(barWidth, arraySize.current.value, heightPercentage))
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
			<NavBar
				navHeight={navHeight}
				speed={speed}
				arraySize={arraySize}
				generate={generate}
				sortCurrentArray={sortCurrentArray}
				reverseSortCurrentArray={reverseSortCurrentArray}
				runBubbleSort={runBubbleSort}
				runInsertionSort={runInsertionSort}
				runSelectionSort={runSelectionSort}
				runQuickSort={runQuickSort}
				runMergeSort={runMergeSort}
			/>
			<div>Comparisons: <span id="comparison">0</span></div>
			<div className={styles.array}
				style={{ height: `${(100 - heightPercentage - navHeight) / 2 + heightPercentage}vh` }}>
				{array.map((value, i) => {
					return <div
						id={i}
						key={i}
						style={{
							height: `${value}vh`,
							width: `${barWidth}vw`,
							backgroundColor: normal
						}}></div>
				})}
			</div>
		</>
	)
}

export default SortingVisualizer

