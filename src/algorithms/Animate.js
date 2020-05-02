let speed = 1
let interval = null
let animationFunction = null

const updateSpeed = (newSpeed) => {
	speed = newSpeed
	console.log(speed)
}

const loopAnimation = (animate) => {
	animationFunction = animate
	loop()
}

const loop = () => {
	if (animationFunction())
		interval = setTimeout(loop, speed)
}

const stopAnimation = () => {
	if (interval === null) return
	clearInterval(interval)
}

export { updateSpeed, loopAnimation, stopAnimation }