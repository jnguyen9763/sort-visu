import { swap } from './BubbleSort.js'

let interval = null

/*
	for (let i = 0; i < array.length - 1; i++) {
		console.log(array)
		// find min
		let min = i
		for (let j = i + 1; j < array.length; j++) {
			if (array[min] > array[j]) {
				min = j
			}
		}
		swap(array, i, min)
	}
*/
const selectionSort = (array, speed) => {
	let i = 0
	let setMin = true
	let j = null
	let min = null

	interval = setInterval(() => {
		if (j !== null && (j - 1 !== min || i !== min))
			document.getElementById(j - 1).style.backgroundColor = 'lightskyblue'
		if (i < array.length - 1) {
			if (setMin) {
				min = i
				j = i + 1
				setMin = false
				document.getElementById(min).style.backgroundColor = 'lightgray'
			} else {
				if (j < array.length) {
					document.getElementById(j).style.backgroundColor = 'lightcoral'
					if (array[min] > array[j]) {
						document.getElementById(min).style.backgroundColor = 'lightskyblue'
						min = j
						document.getElementById(min).style.backgroundColor = 'lightgray'
					}
					j++
				} else {
					swap(array, i, min)
					setMin = true
					document.getElementById(min).style.backgroundColor = 'lightskyblue'
					document.getElementById(i).style.backgroundColor = 'lightgreen'
					i++
				}
			}
		} else {
			document.getElementById(i).style.backgroundColor = 'lightgreen'
			clearInterval(interval)
		}
	}, speed)

}

const stopSelectionSort = () => {
	if (interval !== null) clearInterval(interval)
}

export { selectionSort, stopSelectionSort }