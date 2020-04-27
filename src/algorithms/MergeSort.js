let interval = null
let animations
let test = []

const mergeSort = (array, speed) => {
	animations = []
	runMergeSort(array, 0, array.length - 1, 0)
}

const runMergeSort = (array, start, end, treeLevel) => {
	if (start < end) {
		let initialTreeLevel = treeLevel
		let middle = Math.floor((start + end) / 2)
		runMergeSort(array, start, middle, treeLevel + 1)
		runMergeSort(array, middle + 1, end, treeLevel + 1)
		merge(array, start, middle, end, treeLevel)
		if (initialTreeLevel === 0) animate(100)
	}
}

const animate = (speed) => {
	console.log(test.sort())
	let i = animations.length - 1
	interval = setInterval(() => {
		if (i >= 0) {
			for (let j = 0; j < animations[i].length; j++) {
				document.getElementById(animations[i][j].i).style.height = animations[i][j].newHeight
			}
			i--
		} else {
			clearInterval(interval)
		}

	}, speed)
}

const merge = (array, start, middle, end, treeLevel) => {
	test.push(treeLevel)
	// console.log("INIT", treeLevel)
	let leftArray = array.slice(start, middle + 1)
	let rightArray = array.slice(middle + 1, end + 1)
	let leftCurr = 0
	let rightCurr = 0
	let index = start

	while (leftCurr < leftArray.length && rightCurr < rightArray.length) {
		// treeLevel++
		if (leftArray[leftCurr] < rightArray[rightCurr]) {
			addAnimation('new-height', treeLevel, index, `${leftArray[leftCurr]}vh`)
			array[index++] = leftArray[leftCurr++]
		} else {
			addAnimation('new-height', treeLevel, index, `${rightArray[rightCurr]}vh`)
			array[index++] = rightArray[rightCurr++]
		}
	}

	while (leftCurr < leftArray.length) {
		// treeLevel++
		addAnimation('new-height', treeLevel, index, `${leftArray[leftCurr]}vh`)
		array[index++] = leftArray[leftCurr++]
	}

	while (rightCurr < rightArray.length) {
		// treeLevel++
		addAnimation('new-height', treeLevel, index, `${rightArray[rightCurr]}vh`)
		array[index++] = rightArray[rightCurr++]
	}
}

const addAnimation = (type, index, i, newHeight) => {
	if (animations[index] === undefined) animations[index] = []
	animations[index].push({
		type: type,
		i: i,
		newHeight: newHeight
	})
}

const stopMergeSort = () => {
	if (interval !== null) clearInterval(interval)
}

export { mergeSort, stopMergeSort }