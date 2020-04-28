let interval = null
let length
let animations

const bubbleSort = (array, speed) => {
	length = array.length
	animations = []
	runBubbleSort(array)
	animate(speed)
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
			} else {
				if (i === 0) addAnimation('curr', i, i + 1, undefined)
				else addAnimation('curr', i, i + 1, i - 1)
			}
		}
		if (swapped) addAnimation('finish', i - 1, i, undefined)
		else addAnimation('finish', i - 1, i, iteration)
		iteration++
	} while (swapped)
}

const animate = (speed) => {
	let i = 0
	interval = setInterval(() => {
		switch (animations[i].type) {
			case 'curr':
				document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightcoral'
				document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightcoral'
				if (animations[i].extra !== undefined)
					document.getElementById(animations[i].extra).style.backgroundColor = 'lightskyblue'
				break
			case 'finish':
				if (animations[i].extra === undefined) {
					document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightskyblue'
					document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightgreen'
				} else {
					// for when bubble sort ends due to no more swaps
					for (let index = 0; index < length - animations[i].extra; index++) {
						document.getElementById(index).style.backgroundColor = 'lightgreen'
					}
					clearInterval(interval)
				}
				break
			default:
				swapAnimation(animations[i].leftIndex, animations[i].rightIndex)
				document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightcoral'
				document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightcoral'
				if (animations[i].extra !== undefined)
					document.getElementById(animations[i].extra).style.backgroundColor = 'lightskyblue'
		}
		i++
	}, speed)
}

const addAnimation = (type, leftIndex, rightIndex, extra) => {
	animations.push({
		type: type,
		leftIndex: leftIndex,
		rightIndex: rightIndex,
		extra: extra
	})
}

const stopBubbleSort = () => {
	if (interval !== null) clearInterval(interval)
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
	// document.getElementById(leftIndex).style.backgroundColor = 'orange'
	// document.getElementById(rightIndex).style.backgroundColor = 'orange'
}

export { bubbleSort, stopBubbleSort, swap, swapAnimation, addAnimation }