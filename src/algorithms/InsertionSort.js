import { swapAnimation } from './BubbleSort.js'

let interval = null
let animations

const insertionSort = (array, speed) => {
	animations = []
	runInsertionSort(array)
	animate(speed)
}

const runInsertionSort = (array) => {
	for (let i = 1; i < array.length; i++) {
		let curr = array[i]
		let j = i - 1;
		addAnimation('curr', j)
		while (j >= 0 && array[j] > curr) {
			addAnimation('new-height', j + 1, j)
			array[j + 1] = array[j]
			j--
		}
		if (j === i - 1) addAnimation('finish', i, j)
		else addAnimation('finish', i, j + 1)
		array[j + 1] = curr
	}
}

const animate = (speed) => {
	let i = 0
	interval = setInterval(() => {
		if (i < animations.length) {
			switch (animations[i].type) {
				case 'curr':
					document.getElementById(animations[i].index).style.backgroundColor = 'lightcoral'
					break
				case 'finish':
					document.getElementById(animations[i].index).style.backgroundColor = 'lightgreen'
					document.getElementById(animations[i].extra).style.backgroundColor = 'lightgreen'
					break
				default:
					document.getElementById(animations[i].index).style.backgroundColor = 'lightgreen'
					document.getElementById(animations[i].extra).style.backgroundColor = 'lightcoral'
					swapAnimation(animations[i].index, animations[i].extra)
			}
			i++
		} else {
			clearInterval(interval)
		}

	}, speed)
}

const addAnimation = (type, index, extra = 0) => {
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