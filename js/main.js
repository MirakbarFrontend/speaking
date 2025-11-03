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

function startTimer(duration, display) {
	let timer = duration,
		minutes,
		seconds;
	const interval = setInterval(() => {
		minutes = String(Math.floor(timer / 60)).padStart(2, '0');
		seconds = String(timer % 60).padStart(2, '0');
		display.textContent = `${minutes}:${seconds}`;

		if (--timer < 0) {
			clearInterval(interval);
		}
	}, 1000);
}

window.onload = () => {
	const display = document.getElementById('timer');

	// Restart animation
	display.style.animation = 'none';
	display.offsetHeight; // Trigger reflow
	display.style.animation = null;

	const twoMinutes = 60 * 2;
	startTimer(twoMinutes, display);
};
document.addEventListener('DOMContentLoaded', () => {
	const modal = document.getElementById('myModal');
	const nameInput = document.getElementById('name');
	const phoneInput = document.getElementById('phone');
	const nameError = document.getElementById('nameError');
	const phoneError = document.getElementById('phoneError');
	const formAlert = document.getElementById('formAlert');
	const body = document.querySelector('body');

	// Modalni ochish
	window.openModal = () => {
		modal.style.display = 'flex';
		body.style.overflow = 'hidden';
		modal.classList.add('fade-in');
		clearForm();
	};

	// Modalni yopish
	window.closeModal = () => {
		modal.classList.remove('fade-in');
		modal.style.display = 'none';
		body.style.overflow = 'auto';
		clearForm();
	};

	// Tashqi joyga bosilganda yopish
	window.addEventListener('click', e => {
		if (e.target === modal) closeModal();
	});

	// ESC tugmasi bilan yopish
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && modal.style.display === 'flex') {
			closeModal();
		}
	});

	// Formani tozalash
	function clearForm() {
		[nameInput, phoneInput].forEach(input => {
			input.classList.remove('error');
			input.value = '';
		});
		nameError.style.display = 'none';
		phoneError.style.display = 'none';
		formAlert.style.display = 'none';
	}

	// Formani validatsiya qilish
	window.validateForm = () => {
		const nameValue = nameInput.value.trim();
		const phoneValue = phoneInput.value.trim();
		let isValid = true;

		// Ismni tekshirish
		if (!nameValue || /\d/.test(nameValue)) {
			showError(nameInput, nameError, "Ism raqam bo'lmasligi kerak");
			isValid = false;
		} else {
			hideError(nameInput, nameError);
		}

		// Telefonni tekshirish
		const phonePattern = /^\d{2}-\d{3}-\d{2}-\d{2}$/;
		if (!phonePattern.test(phoneValue)) {
			showError(phoneInput, phoneError, "To'g'ri format: 99-999-99-99");
			isValid = false;
		} else {
			hideError(phoneInput, phoneError);
		}

		// Umumiy alert
		formAlert.style.display = isValid ? 'none' : 'block';

		// Yuborish
		if (isValid) {
			document.querySelector('#submitButton').setAttribute('href', 'a.html');
			closeModal();
		}
	};

	// Xato ko‘rsatish
	function showError(input, errorEl, message) {
		input.classList.add('error');
		errorEl.innerText = message;
		errorEl.style.display = 'block';
	}

	// Xato yashirish
	function hideError(input, errorEl) {
		input.classList.remove('error');
		errorEl.style.display = 'none';
	}

	// Telefon raqamni avtomatik formatlash
	phoneInput.addEventListener('input', e => {
		let digits = e.target.value.replace(/\D/g, '').slice(0, 9);
		let formatted = '';

		if (digits.length >= 1) formatted += digits.slice(0, 2);
		if (digits.length >= 3) formatted += '-' + digits.slice(2, 5);
		if (digits.length >= 6) formatted += '-' + digits.slice(5, 7);
		if (digits.length >= 8) formatted += '-' + digits.slice(7, 9);

		e.target.value = formatted;
	});
});
