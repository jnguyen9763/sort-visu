import { loopAnimation } from './Animate.js'
import { swapAnimation } from './BubbleSort.js'

let i
let comparisons
let animations

const insertionSort = (array) => {
	i = 0
	comparisons = 0
	animations = []
	runInsertionSort(array)
	loopAnimation(animate)
}

const runInsertionSort = (array) => {
	let prev = 0
	for (let i = 1; i < array.length; i++) {
		let curr = array[i]
		let j = i - 1;
		addAnimation('curr', i, prev)
		while (j >= 0 && array[j] > curr) {
			addAnimation('new-height', j + 1, j)
			array[j + 1] = array[j]
			j--
		}
		prev = j + 1
		array[j + 1] = curr
	}
	addAnimation('curr', undefined, prev)
}

const animate = () => {
	if (i >= animations.length) return false
	if (animations[i].type === 'curr') {
		if (animations[i].index !== undefined) {
			document.querySelector('#comparison').innerHTML = ++comparisons
			document.getElementById(animations[i].index).style.backgroundColor = 'lightcoral'
		}
		document.getElementById(animations[i].extra).style.backgroundColor = 'lightgreen'
	} else {
		document.querySelector('#comparison').innerHTML = ++comparisons
		swapAnimation(animations[i].index, animations[i].extra)
		document.getElementById(animations[i].index).style.backgroundColor = 'lightgreen'
		document.getElementById(animations[i].extra).style.backgroundColor = 'lightcoral'
	}
	i++
	return true
}

const addAnimation = (type, index, extra) => {
	animations.push({
		type: type,
		index: index,
		extra: extra
	})
}

export { insertionSort }