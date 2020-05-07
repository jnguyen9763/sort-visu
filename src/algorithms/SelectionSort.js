import { loopAnimation } from './Animate.js'
import { swap, swapAnimation } from './BubbleSort.js'
import { normal, curr, success, minimum } from './ColorScheme.js'

let i
let length
let comparisons
let animations

const selectionSort = (array) => {
	i = 0
	length = array.length
	comparisons = 0
	animations = []
	runSelectionSort(array)
	loopAnimation(animate)
}

const runSelectionSort = (array) => {
	let prevMin
	for (let i = 0; i < array.length - 1; i++) {
		// find min
		let min = i
		let j
		if (i === 0) addAnimation('min', min, undefined, undefined)
		else addAnimation('swap', min, prevMin, i - 1)
		for (j = i + 1; j < array.length; j++) {
			if (array[min] > array[j]) {
				addAnimation('min', j, min, j - 1)
				min = j
			} else {
				addAnimation('curr', j, j - 1)
			}
		}
		prevMin = min
		swap(array, i, min)
	}
}

const animate = () => {
	if (i >= animations.length) {
		document.getElementById(length - 2).style.backgroundColor = success
		document.getElementById(length - 1).style.backgroundColor = success
		return false
	}
	switch (animations[i].type) {
		case 'curr':
			document.querySelector('#comparison').innerHTML = ++comparisons
			document.getElementById(animations[i].leftIndex).style.backgroundColor = curr
			if (document.getElementById(animations[i].rightIndex).style.backgroundColor !== minimum)
				document.getElementById(animations[i].rightIndex).style.backgroundColor = normal
			break
		case 'min':
			document.getElementById(animations[i].leftIndex).style.backgroundColor = minimum
			if (animations[i].rightIndex !== undefined) {
				document.querySelector('#comparison').innerHTML = ++comparisons
				document.getElementById(animations[i].rightIndex).style.backgroundColor = normal
				document.getElementById(animations[i].extra).style.backgroundColor = normal
			}
			break
		default:
			document.getElementById(animations[i].leftIndex).style.backgroundColor = minimum
			swapAnimation(animations[i].rightIndex, animations[i].extra)
			document.getElementById(length - 1).style.backgroundColor = normal
			document.getElementById(animations[i].rightIndex).style.backgroundColor = normal
			document.getElementById(animations[i].extra).style.backgroundColor = success
	}
	i++
	return true
}

const addAnimation = (type, leftIndex, rightIndex, extra = 0) => {
	animations.push({
		type: type,
		leftIndex: leftIndex,
		rightIndex: rightIndex,
		extra: extra
	})
}

export { selectionSort }