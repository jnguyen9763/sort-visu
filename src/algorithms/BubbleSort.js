import { loopAnimation } from './Animate.js'
import { normal, curr, success } from './ColorScheme.js'

let i
let length
let animations
let comparisons

const bubbleSort = (array) => {
	i = 0
	length = array.length
	animations = []
	comparisons = 0
	runBubbleSort(array)
	loopAnimation(animate)
}

const runBubbleSort = (array) => {
	let swapped, i
	let iteration = 0

	do {
		swapped = false
		for (i = 0; i < array.length - 1 - iteration; i++) {
			if (array[i] > array[i + 1]) {
				if (i === 0) addAnimation('swap', i, i + 1, undefined)
				else addAnimation('swap', i, i + 1, i - 1)
				swap(array, i, i + 1)
				swapped = true
			} else if (i === 0) {
				addAnimation('curr', i, i + 1, undefined)
			} else {
				addAnimation('curr', i, i + 1, i - 1)
			}
		}
		if (swapped) addAnimation('finish', i - 1, i, undefined)
		else addAnimation('finish', i - 1, i, iteration)
		iteration++
	} while (swapped)
}

const animate = () => {
	switch (animations[i].type) {
		case 'curr':
			document.querySelector('#comparison').innerHTML = ++comparisons
			document.getElementById(animations[i].leftIndex).style.backgroundColor = curr
			document.getElementById(animations[i].rightIndex).style.backgroundColor = curr
			if (animations[i].extra !== undefined)
				document.getElementById(animations[i].extra).style.backgroundColor = normal
			break
		case 'finish':
			if (animations[i].extra === undefined) {
				document.getElementById(animations[i].leftIndex).style.backgroundColor = normal
				document.getElementById(animations[i].rightIndex).style.backgroundColor = success
			} else {
				// for when bubble sort ends due to no more swaps
				for (let index = 0; index < length - animations[i].extra; index++) {
					document.getElementById(index).style.backgroundColor = success
				}
				return false
			}
			break
		default:
			document.querySelector('#comparison').innerHTML = ++comparisons
			swapAnimation(animations[i].leftIndex, animations[i].rightIndex)
			document.getElementById(animations[i].leftIndex).style.backgroundColor = curr
			document.getElementById(animations[i].rightIndex).style.backgroundColor = curr
			if (animations[i].extra !== undefined)
				document.getElementById(animations[i].extra).style.backgroundColor = normal
	}
	i++
	return true
}

const addAnimation = (type, leftIndex, rightIndex, extra) => {
	animations.push({
		type: type,
		leftIndex: leftIndex,
		rightIndex: rightIndex,
		extra: extra
	})
}

const swap = (array, leftIndex, rightIndex) => {
	const temp = array[leftIndex]
	array[leftIndex] = array[rightIndex]
	array[rightIndex] = temp
}

const swapAnimation = (leftIndex, rightIndex) => {
	const height = document.getElementById(leftIndex).style.height
	document.getElementById(leftIndex).style.height = document.getElementById(rightIndex).style.height
	document.getElementById(rightIndex).style.height = height
}

export { bubbleSort, swap, swapAnimation, addAnimation }