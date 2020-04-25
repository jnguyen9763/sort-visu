let interval = null

/*
let swapped

do {
	swapped = false
	for (let i = 0; i < array.length - 1; i++) {
		if (array[i] > array[i + 1]) {
			swap
			swapped = true
		}
	}
} while (swapped)
*/

const bubbleSort = (array, speed) => {
	const length = array.length
	let iterations = 0
	let i = 0
	let swapped

	interval = setInterval(() => {
		if (i > 0) document.getElementById(i - 1).style.backgroundColor = 'lightskyblue'
		if (i < length - 1 - iterations) {
			// swap if the two elements are not sorted
			document.getElementById(i).style.backgroundColor = 'lightcoral'
			document.getElementById(i + 1).style.backgroundColor = 'lightcoral'
			if (array[i] > array[i + 1]) {
				swap(array, i, i + 1)
				swapped = true
			}
			i++;
		} else {
			if (!swapped) {
				// finish sorting
				for (let j = 0; j < i + 1; j++) {
					document.getElementById(j).style.backgroundColor = 'lightgreen'
				}
				clearInterval(interval)
			} else {
				document.getElementById(i).style.backgroundColor = 'lightgreen'
				iterations++
				i = 0
				swapped = false
			}
		}
	}, speed)
}

const stopBubbleSort = () => {
	if (interval !== null) clearInterval(interval)
}

const swap = (array, leftIndex, rightIndex) => {
	const temp = array[leftIndex]
	const height = document.getElementById(leftIndex).style.height
	array[leftIndex] = array[rightIndex]
	array[rightIndex] = temp
	// animations
	document.getElementById(leftIndex).style.height = document.getElementById(rightIndex).style.height
	document.getElementById(rightIndex).style.height = height
}

export { bubbleSort, stopBubbleSort }