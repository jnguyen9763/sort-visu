import React from 'react'
import { updateSpeed } from '../../algorithms/Animate.js'
import styles from './NavBar.module.css'


function NavBar(props) {
	return (
		<nav className={styles.navbar} style={{ height: `${props.navHeight}vh` }}>
			<div className={styles.sliders}>
				<label htmlFor='speed'>fast</label>
				<input id='speed' type='range' min={1} max={1000} step={1} ref={props.speed}
					onChange={(e) => updateSpeed(e.target.value)} />
				<label htmlFor='speed'>slow</label>
			</div>
			<div>
				<input id='arraySize' type='range' min={75} max={95} step={1} ref={props.arraySize} />
			</div>
			<button onClick={() => props.generate()}>Generate</button>
			<button onClick={() => props.sortCurrentArray()}>Sort</button>
			<button onClick={() => props.reverseSortCurrentArray()}>Reverse Sort</button>
			<button onClick={() => props.runBubbleSort()}>Bubble Sort</button>
			<button onClick={() => props.runInsertionSort()}>Insertion Sort</button>
			<button onClick={() => props.runSelectionSort()}>Selection Sort</button>
			<button onClick={() => props.runQuickSort()}>Quick Sort</button>
			<button onClick={() => props.runMergeSort()}>Merge Sort</button>
		</nav>
	)
}

export default NavBar