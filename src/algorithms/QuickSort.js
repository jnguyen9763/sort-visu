let interval = null
let length
let animations

const quickSort = (array, speed) => {
	length = array.length
	animations = []
	runQuickSort(array, 0, length - 1, speed)
}

const runQuickSort = (array, start, end, speed) => {
	if (start < end) {
		let pivot = partition(array, start, end)
		addAnimation('pivot', pivot) // color pivot
		runQuickSort(array, start, pivot - 1, speed)
		runQuickSort(array, pivot + 1, end, speed)
		if (start === 0 && end === array.length - 1) animate(speed)
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
				case 'rem-curr':
					document.getElementById(animations[i].index).style.backgroundColor = 'lightskyblue'
					break
				case 'swap':
					swapAnimation(animations[i].leftIndex, animations[i].rightIndex)
					break
				default:
					document.getElementById(animations[i].index).style.backgroundColor = 'lightgreen'
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

// return the new index the pivot is at
const partition = (array, start, end) => {
	let pivotValue = array[end]
	let newPivotIndex = start

	for (let i = start; i < end; i++) {
		if (i > start) addAnimation('rem-curr', i - 1)
		addAnimation('curr', i)
		if (array[i] < pivotValue) {
			addAnimation('swap', newPivotIndex, i)
			swap(array, newPivotIndex, i)
			newPivotIndex++
		}
	}

	addAnimation('rem-curr', end - 1)
	addAnimation('swap', newPivotIndex, end)
	swap(array, newPivotIndex, end)

	return newPivotIndex
}

const addAnimation = (type, id, otherID = 0) => {
	if (type === 'swap') {
		animations.push({
			type: type,
			leftIndex: id,
			rightIndex: otherID
		})
	} else {
		animations.push({
			type: type,
			index: id
		})
	}
}

const stopQuickSort = () => {
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

export { quickSort, stopQuickSort }