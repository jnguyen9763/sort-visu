let interval = null
let length
let animations

const mergeSort = (array, speed) => {
	length = array.length
	animations = []
	runMergeSort(array, 0, array.length - 1, speed)
}

const runMergeSort = (array, start, end, speed) => {
	if (start < end) {
		let middle = Math.floor((start + end) / 2)
		runMergeSort(array, start, middle, speed)
		runMergeSort(array, middle + 1, end, speed)
		merge(array, start, middle, end)
		if (start === 0 && end === array.length - 1) animate(speed)
	}
}

const animate = (speed) => {
	let i = 0
	interval = setInterval(() => {
		if (i < animations.length) {
			switch (animations[i].type) {
				case 'new-height':
					document.getElementById(animations[i].index).style.height = animations[i].newHeight
					break
				case 'curr':
					document.getElementById(animations[i].index).style.backgroundColor = 'lightcoral'
					break
				default:
					document.getElementById(animations[i].index).style.backgroundColor = 'lightskyblue'
			}
			i++
		} else {
			for (let i = 0; i < length; i++) {
				document.getElementById(i).style.backgroundColor = 'lightgreen'
			}
			clearInterval(interval)
		}

	}, speed)
}

const merge = (array, start, middle, end) => {
	const leftArray = array.slice(start, middle + 1)
	const rightArray = array.slice(middle + 1, end + 1)
	let leftCurr = 0
	let rightCurr = 0
	let index = start
	let leftRemain = false

	while (leftCurr < leftArray.length && rightCurr < rightArray.length) {
		if (index > start) addAnimation('rem-curr', index - 1)
		addAnimation('curr', index)
		if (leftArray[leftCurr] < rightArray[rightCurr]) {
			addAnimation('new-height', index, `${leftArray[leftCurr]}vh`)
			array[index++] = leftArray[leftCurr++]
		} else {
			addAnimation('new-height', index, `${rightArray[rightCurr]}vh`)
			array[index++] = rightArray[rightCurr++]
		}
	}

	while (leftCurr < leftArray.length) {
		leftRemain = true
		addAnimation('rem-curr', index - 1)
		addAnimation('curr', index)
		addAnimation('new-height', index, `${leftArray[leftCurr]}vh`)
		array[index++] = leftArray[leftCurr++]
	}
	if (leftRemain) addAnimation('rem-curr', index - 1)

	while (rightCurr < rightArray.length) {
		addAnimation('rem-curr', index - 1)
		addAnimation('curr', index)
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

const stopMergeSort = () => {
	if (interval !== null) clearInterval(interval)
}

export { mergeSort, stopMergeSort }