$(() => {
	var mode = 0
	var timeCounter = 0
	var lapCounter = 0
	var action
	var lapNumber = 0
	var startDate = new Date()
	var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds

	hideShowButtons('#start-button', '#lap-button')
	$('#start-button').click(() => {
		mode = 1
		hideShowButtons('#stop-button', '#lap-button')
		startAction()
	})

	$('#stop-button').click(() => {
		hideShowButtons('#resume-button', '#reset-button')
		clearInterval(action)
	})

	$('#resume-button').click(() => {
		hideShowButtons('#stop-button', '#lap-button')
		startAction()
	})

	$('#reset-button').click(() => { location.reload() })

	$('#lap-button').click(() => {
		if(mode) {
			clearInterval(action)
			lapCounter = 0
			addLap()
			startAction()
		}
	})

	// Functions
	function hideShowButtons(x, y) {
		$('.control').hide()
		$(x).show()
		$(y).show()
	}

	function startAction() {
		startDate = new Date()
		action = setInterval(() => {
			lapMinutes = Math.floor(lapCounter / 6000)
			lapSeconds = Math.floor(lapCounter % 6000 / 100)
			lapCentiseconds = lapCounter % 6000 % 100

			$('#lap-minute').text(lapMinutes < 10 ? '0' + lapMinutes : lapMinutes)
			$('#lap-second').text(lapSeconds < 10 ? '0' + lapSeconds : lapSeconds)
			$('#lap-centisecond').text(lapCentiseconds < 10 ? '0' + lapCentiseconds : lapCentiseconds)

			timeMinutes = Math.floor(timeCounter  / 6000)
			timeSeconds = Math.floor(timeCounter % 6000 / 100)
			timeCentiseconds = timeCounter % 6000 % 100

			$('#time-minute').text(timeMinutes < 10 ? '0' + timeMinutes : timeMinutes)
			$('#time-second').text(timeSeconds < 10 ? '0' + timeSeconds : timeSeconds)
			$('#time-centisecond').text(timeCentiseconds < 10 ? '0' + timeCentiseconds : timeCentiseconds)

			timeCounter += 1
			lapCounter += 1
		}, 10)
	}

	function addLap() {
		fmt = arg => arg < 10 ? '0' + arg : arg
		fmt2  = (arg, len = 3) => arg.length < len ? '0'.repeat(len - arg.length) + arg : arg

		date = new Date()
		var h = fmt(date.getHours()), m = fmt(date.getMinutes()), s = fmt(date.getSeconds())
		var sH = fmt(startDate.getHours()), sM = fmt(startDate.getMinutes()), sS = fmt(startDate.getSeconds())
		var mS = fmt2(date.getMilliseconds().toString()), sMS = fmt2(startDate.getMilliseconds().toString())

		var myLapDetails = `<div class="lap"><div class="laptime-title">Lap${++lapNumber}</div>` +
			`<div class="system-time">(${sH}:${sM}:${sS}:${sMS} - ${h}:${m}:${s}:${mS})</div>` +
			'<div class="laptime">' +
				'<span>' + fmt(lapMinutes) + '</span>:' +
				'<span>' + fmt(lapSeconds) + '</span>:' +
				'<span>' + fmt(lapCentiseconds) + '</span>' +
			'</div></div><br>'

		$(myLapDetails).prependTo('#lapses')
	}
})
