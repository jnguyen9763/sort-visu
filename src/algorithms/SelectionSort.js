import { swap, swapAnimation } from './BubbleSort.js'

let interval = null
let length
let comparisons
let animations

const selectionSort = (array, speed) => {
	length = array.length
	comparisons = 0
	animations = []
	runSelectionSort(array)
	animate(speed)
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

const animate = (speed) => {
	let i = 0
	interval = setInterval(() => {
		if (i < animations.length) {
			switch (animations[i].type) {
				case 'curr':
					document.querySelector('#comparison').innerHTML = ++comparisons
					document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightcoral'
					if (document.getElementById(animations[i].rightIndex).style.backgroundColor !== 'lightgray')
						document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightskyblue'
					break
				case 'min':
					document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightgray'
					if (animations[i].rightIndex !== undefined) {
						document.querySelector('#comparison').innerHTML = ++comparisons
						document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightskyblue'
						document.getElementById(animations[i].extra).style.backgroundColor = 'lightskyblue'
					}
					break
				default:
					document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightgray'
					swapAnimation(animations[i].rightIndex, animations[i].extra)
					document.getElementById(length - 1).style.backgroundColor = 'lightskyblue'
					document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightskyblue'
					document.getElementById(animations[i].extra).style.backgroundColor = 'lightgreen'
			}
			i++
		} else {
			document.getElementById(length - 2).style.backgroundColor = 'lightgreen'
			document.getElementById(length - 1).style.backgroundColor = 'lightgreen'
			clearInterval(interval)
		}

	}, speed)
}

const addAnimation = (type, leftIndex, rightIndex, extra = 0) => {
	animations.push({
		type: type,
		leftIndex: leftIndex,
		rightIndex: rightIndex,
		extra: extra
	})
}

const stopSelectionSort = () => {
	if (interval !== null) clearInterval(interval)
}

export { selectionSort, stopSelectionSort }