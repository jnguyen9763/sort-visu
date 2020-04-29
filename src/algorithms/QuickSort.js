import { swap, swapAnimation } from './BubbleSort'

let interval = null
let length
let animations

const quickSort = (array, speed) => {
	length = array.length
	animations = []
	runQuickSort(array, 0, length - 1, speed)
}

const runQuickSort = (array, start, end, speed) => {
	if (start < end) {
		let pivot = partition(array, start, end)
		runQuickSort(array, start, pivot - 1, speed)
		runQuickSort(array, pivot + 1, end, speed)
		if (start === 0 && end === array.length - 1) animate(speed)
	}
}

const animate = (speed) => {
	let i = 0
	interval = setInterval(() => {
		if (i < animations.length) {
			switch (animations[i].type) {
				case 'curr':
					document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightcoral'
					if (animations[i].rightIndex !== undefined &&
						document.getElementById(animations[i].rightIndex).style.backgroundColor !== 'lightgreen')
						document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightskyblue'
					break
				case 'swap':
					swapAnimation(animations[i].leftIndex, animations[i].rightIndex)
					document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightcoral'
					if (animations[i].extra !== undefined &&
						document.getElementById(animations[i].extra).style.backgroundColor !== 'lightgreen')
						document.getElementById(animations[i].extra).style.backgroundColor = 'lightskyblue'
					break
				default:
					swapAnimation(animations[i].leftIndex, animations[i].rightIndex)
					document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightgreen'
					// checks if left bar needs to be green
					if (animations[i].leftIndex > 0 && (animations[i].leftIndex === 1 ||
						document.getElementById(animations[i].leftIndex - 2).style.backgroundColor === 'lightgreen'))
						document.getElementById(animations[i].leftIndex - 1).style.backgroundColor = 'lightgreen'
					// checks if right bar needs to be green
					if (animations[i].leftIndex < length - 1 && (animations[i].leftIndex === length - 2 ||
						document.getElementById(animations[i].leftIndex + 2).style.backgroundColor === 'lightgreen'))
						document.getElementById(animations[i].leftIndex + 1).style.backgroundColor = 'lightgreen'
					// checks if there are any bars from previous iteration that needs to be green
					if (document.getElementById(animations[i].extra).style.backgroundColor !== 'lightgreen')
						document.getElementById(animations[i].extra).style.backgroundColor = 'lightskyblue'
					// check if any bars after pivot with the same height needs to be green
					const height = document.getElementById(animations[i].leftIndex).style.height
					let marker = animations[i].leftIndex + 1
					while (marker < length &&
						document.getElementById(marker).style.backgroundColor !== 'lightgreen' &&
						document.getElementById(marker).style.height === height) {
						document.getElementById(marker).style.backgroundColor = 'lightgreen'
						marker++
					}
			}
			i++
		} else {
			clearInterval(interval)
		}
	}, speed)
}

// return the new index the pivot is at
const partition = (array, start, end) => {
	let pivotValue = array[end]
	let newPivotIndex = start
	let i

	for (i = start; i < end; i++) {
		if (array[i] < pivotValue) {
			if (i === start) addAnimation('curr', i, undefined)
			else addAnimation('swap', newPivotIndex, i, i - 1)
			swap(array, newPivotIndex, i)
			newPivotIndex++
		} else if (i === start) {
			addAnimation('curr', i, undefined)
		} else {
			addAnimation('curr', i, i - 1)
		}
	}
	addAnimation('finish', newPivotIndex, end, i - 1)
	swap(array, newPivotIndex, end)

	return newPivotIndex
}

const addAnimation = (type, leftIndex, rightIndex, extra = 0) => {
	animations.push({
		type: type,
		leftIndex: leftIndex,
		rightIndex: rightIndex,
		extra: extra
	})
}

const stopQuickSort = () => {
	if (interval !== null) clearInterval(interval)
}

export { quickSort, stopQuickSort }