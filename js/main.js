const btn = document.querySelector('.speaking__wrapper-left-btn');
let time = 60; // 1 daqiqa = 60 soniya

function startCountdown() {
	setInterval(() => {
		// daqiqa va soniyalarni hisoblash
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;

		// format: 1:00
		btn.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

		time--;

		// vaqt tugasa qayta 1 daqiqadan boshlash
		if (time < 0) {
			time = 60;
		}
	}, 1000);
}

// sahifa yuklanganda avtomatik sanashni boshlaydi
startCountdown();
