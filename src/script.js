var mode = timeCounter = lapCounter = lapNumber = 0
var timeDate = stoppedDate = lapDate = new Date()
var lapMinutes, lapSeconds, lapMilliseconds, action

hideShowButtons('start-button', 'lap-button')

document.getElementById('start-button').onclick = () => {
	mode = 1
	timeDate = new Date()
	lapDate = new Date()
	hideShowButtons('stop-button', 'lap-button')
	startAction()
}

document.getElementById('stop-button').onclick = () => {
	hideShowButtons('resume-button', 'reset-button')
	clearInterval(action)
	stoppedDate = new Date()
}

document.getElementById('resume-button').onclick = () => {
	hideShowButtons('stop-button', 'lap-button')
	timeDate.setMilliseconds( timeDate.getMilliseconds() - (stoppedDate - new Date()) )
	lapDate.setMilliseconds( lapDate.getMilliseconds() - (stoppedDate - new Date()) )
	startAction()
}

document.getElementById('reset-button').onclick = () => { location.reload() }

document.getElementById('lap-button').onclick = () => {
	if(mode) {
		clearInterval(action)
		addLap()
		lapDate = new Date()
		startAction()
	}
}

// Functions
function hideShowButtons(...el) {
	for(i of document.getElementsByClassName('control')) i.style.display = 'none'
	for(i of el) document.getElementById(i).style.display = 'grid'
}

function fmt2(arg, len = 3) {
	argLength = arg.toString().length
	return argLength < len ? '0'.repeat(len - argLength) + arg : arg
}

function startAction() {
	action = setInterval(() => {
		let currentDate = new Date()

		lapCounter = currentDate - lapDate
		timeCounter = currentDate - timeDate

		lapMinutes = Math.floor(lapCounter / 60000)
		lapSeconds = Math.floor(lapCounter % 60000 / 1000)
		lapMilliseconds = lapCounter % 60000 % 1000

		document.getElementById('lap-minute').innerHTML = lapMinutes < 10 ? '0' + lapMinutes : lapMinutes
		document.getElementById('lap-second').innerHTML = lapSeconds < 10 ? '0' + lapSeconds : lapSeconds
		document.getElementById('lap-millisecond').innerHTML = fmt2(lapMilliseconds)

		let timeMinutes = Math.floor(timeCounter / 60000)
		let timeSeconds = Math.floor(timeCounter % 60000 / 1000)
		let timeMilliseconds = timeCounter % 60000 % 1000

		document.getElementById('time-minute').innerHTML = timeMinutes < 10 ? '0' + timeMinutes : timeMinutes
		document.getElementById('time-second').innerHTML = timeSeconds < 10 ? '0' + timeSeconds : timeSeconds
		document.getElementById('time-millisecond').innerHTML = fmt2(timeMilliseconds)
	}, 10)
}

function addLap() {
	fmt = arg => arg < 10 ? '0' + arg : arg

	let date = new Date(), lapses = document.getElementById('lapses')
	let h = fmt(date.getHours()), m = fmt(date.getMinutes()), s = fmt(date.getSeconds())
	let sH = fmt(lapDate.getHours()), sM = fmt(lapDate.getMinutes()), sS = fmt(lapDate.getSeconds())
	let mS = fmt2(date.getMilliseconds()), sMS = fmt2(lapDate.getMilliseconds())

	lapses.innerHTML = `<div class="lap"><div class="laptime-title">Lap${++lapNumber}</div>` +
		`<div class="system-time">(${sH}:${sM}:${sS}:${sMS} - ${h}:${m}:${s}:${mS})</div>` +
		'<div class="laptime">' + '<span>' + fmt(lapMinutes) + '</span>:' + '<span>' + fmt(lapSeconds) +
		'</span>:' + '<span>' + fmt(lapMilliseconds) + '</span>' + '</div></div><br>' + lapses.innerHTML
}
