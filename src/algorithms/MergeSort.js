import { loopAnimation } from './Animate.js'

let i
let length
let comparisons
let animations

const mergeSort = (array) => {
	i = 0
	length = array.length
	comparisons = 0
	animations = []
	runMergeSort(array, 0, array.length - 1)
}

const runMergeSort = (array, start, end) => {
	if (start < end) {
		let middle = Math.floor((start + end) / 2)
		runMergeSort(array, start, middle)
		runMergeSort(array, middle + 1, end)
		merge(array, start, middle, end)
		if (start === 0 && end === array.length - 1) loopAnimation(animate)
	}
}

const animate = () => {
	if (i >= animations.length) {
		for (let i = 0; i < length; i++) {
			document.getElementById(i).style.backgroundColor = 'lightgreen'
		}
		return false
	}
	switch (animations[i].type) {
		case 'new-height':
			document.querySelector('#comparison').innerHTML = ++comparisons
			document.getElementById(animations[i].index).style.backgroundColor = 'lightcoral'
			if (animations[i].index > 0)
				document.getElementById(animations[i].index - 1).style.backgroundColor = 'lightskyblue'
			document.getElementById(animations[i].index).style.height = animations[i].newHeight
			break
		default:
			document.getElementById(animations[i].index).style.backgroundColor = 'lightskyblue'
	}
	i++
	return true
}

const merge = (array, start, middle, end) => {
	const leftArray = array.slice(start, middle + 1)
	const rightArray = array.slice(middle + 1, end + 1)
	let leftCurr = 0
	let rightCurr = 0
	let index = start

	while (leftCurr < leftArray.length && rightCurr < rightArray.length) {
		if (leftArray[leftCurr] < rightArray[rightCurr]) {
			addAnimation('new-height', index, `${leftArray[leftCurr]}vh`)
			array[index++] = leftArray[leftCurr++]
		} else {
			addAnimation('new-height', index, `${rightArray[rightCurr]}vh`)
			array[index++] = rightArray[rightCurr++]
		}
	}

	while (leftCurr < leftArray.length) {
		addAnimation('new-height', index, `${leftArray[leftCurr]}vh`)
		array[index++] = leftArray[leftCurr++]
	}

	while (rightCurr < rightArray.length) {
		addAnimation('new-height', index, `${rightArray[rightCurr]}vh`)
		array[index++] = rightArray[rightCurr++]
	}

	addAnimation('rem-curr', index - 1)

}

const addAnimation = (type, id, newHeight = 0) => {
	if (type === 'new-height') {
		animations.push({
			type: type,
			index: id,
			newHeight: newHeight
		})
	} else {
		animations.push({
			type: type,
			index: id
		})
	}
}

export { mergeSort }