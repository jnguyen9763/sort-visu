import { swap, swapAnimation } from './BubbleSort.js'

let interval = null
let length
let animations

const selectionSort = (array, speed) => {
	length = array.length
	animations = []
	runSelectionSort(array)
	animate(speed)
}

const runSelectionSort = (array) => {
	for (let i = 0; i < array.length - 1; i++) {
		// find min
		let min = i
		let j
		addAnimation('min', min, undefined)
		for (j = i + 1; j < array.length; j++) {
			if (j === i + 1) addAnimation('curr', j, undefined)
			else addAnimation('curr', j, j - 1)
			if (array[min] > array[j]) {
				addAnimation('min', j, min)
				min = j
			}
		}
		addAnimation('finish', i, min, j - 1)
		swap(array, i, min)
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
						document.getElementById(animations[i].rightIndex).style.backgroundColor !== 'lightgray')
						document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightskyblue'
					break
				case 'min':
					document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightgray'
					if (animations[i].rightIndex !== undefined)
						document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightskyblue'
					break
				default:
					document.getElementById(animations[i].extra).style.backgroundColor = 'lightskyblue'
					swapAnimation(animations[i].leftIndex, animations[i].rightIndex)
					document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightgreen'
					if (animations[i].leftIndex === animations[i].rightIndex)
						document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightgreen'
					else
						document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightskyblue'
			}
			i++
		} else {
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