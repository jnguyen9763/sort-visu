import { loopAnimation } from './Animate.js'
import { swap, swapAnimation } from './BubbleSort'
import { normal, curr, success } from './ColorScheme.js'

let i
let length
let comparisons
let animations

const quickSort = (array) => {
	i = 0
	length = array.length
	comparisons = 0
	animations = []
	runQuickSort(array, 0, length - 1)
}

const runQuickSort = (array, start, end) => {
	if (start < end) {
		let pivot = partition(array, start, end)
		runQuickSort(array, start, pivot - 1)
		runQuickSort(array, pivot + 1, end)
		if (start === 0 && end === array.length - 1) loopAnimation(animate)
	}
}

const animate = () => {
	if (i >= animations.length) return false
	switch (animations[i].type) {
		case 'curr':
			document.querySelector('#comparison').innerHTML = ++comparisons
			document.getElementById(animations[i].leftIndex).style.backgroundColor = curr
			if (animations[i].rightIndex !== undefined &&
				document.getElementById(animations[i].rightIndex).style.backgroundColor !== success)
				document.getElementById(animations[i].rightIndex).style.backgroundColor = normal
			break
		case 'swap':
			document.querySelector('#comparison').innerHTML = ++comparisons
			swapAnimation(animations[i].leftIndex, animations[i].rightIndex)
			document.getElementById(animations[i].rightIndex).style.backgroundColor = curr
			if (animations[i].extra !== undefined &&
				document.getElementById(animations[i].extra).style.backgroundColor !== success)
				document.getElementById(animations[i].extra).style.backgroundColor = normal
			break
		default:
			swapAnimation(animations[i].leftIndex, animations[i].rightIndex)
			document.getElementById(animations[i].leftIndex).style.backgroundColor = success
			// checks if left bar needs to be green
			if (animations[i].leftIndex > 0 && (animations[i].leftIndex === 1 ||
				document.getElementById(animations[i].leftIndex - 2).style.backgroundColor === success))
				document.getElementById(animations[i].leftIndex - 1).style.backgroundColor = success
			// checks if right bar needs to be green
			if (animations[i].leftIndex < length - 1 && (animations[i].leftIndex === length - 2 ||
				document.getElementById(animations[i].leftIndex + 2).style.backgroundColor === success))
				document.getElementById(animations[i].leftIndex + 1).style.backgroundColor = success
			// checks if there are any bars from previous iteration that needs to be green
			if (document.getElementById(animations[i].extra).style.backgroundColor !== success)
				document.getElementById(animations[i].extra).style.backgroundColor = normal
	}
	i++
	return true
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

export { quickSort }