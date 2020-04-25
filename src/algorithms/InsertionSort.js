let interval = null

/*
	for (let i = 1; i < array.length; i++) {
		let curr = array[i]
		let j = i - 1;
		while (j >= 0 && array[j] > curr) {
			array[j + 1] = array[j]
			j--
		}
		array[j + 1] = curr
	}
*/
const insertionSort = (array, speed) => {
	let i = 1
	let setVars = true
	let currAnimation = -1
	let curr, currHeight, j

	interval = setInterval(() => {
		if (currAnimation !== -1) {
			document.getElementById(currAnimation).style.backgroundColor = 'lightgreen'
			document.getElementById(0).style.backgroundColor = 'lightgreen'
		}
		if (i < array.length) {
			if (setVars) {
				curr = array[i]
				currHeight = document.getElementById(i).style.height
				j = i - 1
				setVars = false
				currAnimation = i
			} else {
				if (j >= 0 && array[j] > curr) {
					array[j + 1] = array[j]
					document.getElementById(j + 1).style.height = document.getElementById(j).style.height
					document.getElementById(j).style.height = currHeight
					currAnimation--
					j--
				} else {
					array[j + 1] = curr
					setVars = true
					i++
				}
			}
			document.getElementById(currAnimation).style.backgroundColor = 'lightcoral'
		} else {
			// finish sorting
			clearInterval(interval)
		}
	}, speed)
}

const stopInsertionSort = () => {
	if (interval !== null) clearInterval(interval)
}

export { insertionSort, stopInsertionSort }