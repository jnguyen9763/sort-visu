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
			if (i > 0) addAnimation('rem-curr', i - 1, i)
			addAnimation('curr', i, i + 1)
			if (array[i] > array[i + 1]) {
				addAnimation('swap', i, i + 1)
				swap(array, i, i + 1)
				swapped = true
			}
		}
		addAnimation('finish', i - 1, i)
		iteration++
	} while (swapped)
}

const animate = (speed) => {
	let i = 0
	interval = setInterval(() => {
		if (i < animations.length) {
			switch (animations[i].type) {
				case 'curr':
					document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightcoral'
					document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightcoral'
					break
				case 'rem-curr':
					document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightskyblue'
					break
				case 'finish':
					document.getElementById(animations[i].leftIndex).style.backgroundColor = 'lightskyblue'
					document.getElementById(animations[i].rightIndex).style.backgroundColor = 'lightgreen'
					break
				default:
					swapAnimation(animations[i].leftIndex, animations[i].rightIndex)
			}
			i++
		} else {
			for (let i = 0; i < length; i++) {
				if (document.getElementById(i).style.backgroundColor !== 'lightgreen') {
					document.getElementById(i).style.backgroundColor = 'lightgreen'
				}
			}
			clearInterval(interval)
		}

	}, speed)
}

const addAnimation = (type, id, otherID) => {
	animations.push({
		type: type,
		leftIndex: id,
		rightIndex: otherID
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
}

export { bubbleSort, stopBubbleSort, swap, swapAnimation }