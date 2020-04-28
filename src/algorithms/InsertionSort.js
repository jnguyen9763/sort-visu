import { swapAnimation } from './BubbleSort.js'

let interval = null
let animations

const insertionSort = (array, speed) => {
	animations = []
	runInsertionSort(array)
	animate(speed)
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

const animate = (speed) => {
	let i = 0
	interval = setInterval(() => {
		if (i < animations.length) {
			if (animations[i].type === 'curr') {
				if (animations[i].index !== undefined)
					document.getElementById(animations[i].index).style.backgroundColor = 'lightcoral'
				document.getElementById(animations[i].extra).style.backgroundColor = 'lightgreen'
			} else {
				swapAnimation(animations[i].index, animations[i].extra)
				document.getElementById(animations[i].index).style.backgroundColor = 'lightgreen'
				document.getElementById(animations[i].extra).style.backgroundColor = 'lightcoral'
			}
			i++
		} else {
			clearInterval(interval)
		}

	}, speed)
}

const addAnimation = (type, index, extra) => {
	animations.push({
		type: type,
		index: index,
		extra: extra
	})
}

const stopInsertionSort = () => {
	if (interval !== null) clearInterval(interval)
}

export { insertionSort, stopInsertionSort }