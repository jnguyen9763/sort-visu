let interval = null
let length
let animations

const quickSort = (array, speed) => {
	length = array.length
	animations = []
	runQuickSort(array, 0, length - 1, 0, speed)
}

const runQuickSort = (array, start, end, treeLevel, speed) => {
	if (start < end) {
		let initTreeLevel = treeLevel
		let partitionObject = partition(array, start, end, treeLevel)
		addAnimation('pivot', partitionObject.treeLevel, partitionObject.pivot) // color pivot
		runQuickSort(array, start, partitionObject.pivot - 1, partitionObject.treeLevel, speed)
		runQuickSort(array, partitionObject.pivot + 1, end, partitionObject.treeLevel, speed)
		if (initTreeLevel === 0) animate(speed)
	}
}

const animate = (speed) => {
	let i = 0
	interval = setInterval(() => {
		if (i < animations.length) {
			for (let j = 0; j < animations[i].length; j++) {
				// use switch statement
				if (animations[i][j].type === 'curr')
					document.getElementById(animations[i][j].index).style.backgroundColor = 'lightcoral'
				else if (animations[i][j].type === 'rem-curr')
					document.getElementById(animations[i][j].index).style.backgroundColor = 'lightskyblue'
				else if (animations[i][j].type === 'swap')
					swapAnimation(animations[i][j].leftIndex, animations[i][j].rightIndex)
				else
					document.getElementById(animations[i][j].index).style.backgroundColor = 'lightgreen'
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
const partition = (array, start, end, treeLevel) => {
	let pivotValue = array[end]
	let newPivotIndex = start

	for (let i = start; i < end; i++) {
		if (i > start) addAnimation('rem-curr', treeLevel, i - 1)
		addAnimation('curr', treeLevel++, i)
		if (array[i] < pivotValue) {
			addAnimation('swap', treeLevel, newPivotIndex, i)
			swap(array, newPivotIndex, i)
			newPivotIndex++
		}
	}


	addAnimation('rem-curr', treeLevel, end - 1)
	addAnimation('swap', treeLevel++, newPivotIndex, end)
	swap(array, newPivotIndex, end)

	return {
		pivot: newPivotIndex,
		treeLevel: treeLevel
	}
}

const addAnimation = (type, index, id, otherID = 0) => {
	if (animations[index] === undefined) animations[index] = []
	if (type === 'swap') {
		animations[index].push({
			type: type,
			leftIndex: id,
			rightIndex: otherID
		})
	} else {
		animations[index].push({
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
	// animations
	const height = document.getElementById(leftIndex).style.height
	document.getElementById(leftIndex).style.height = document.getElementById(rightIndex).style.height
	document.getElementById(rightIndex).style.height = height
}

export { quickSort, stopQuickSort }