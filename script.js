const fromText = document.querySelector('.text').firstElementChild,
	toText = document.querySelector('.text').lastElementChild,
	selectTag = document.querySelectorAll('select'),
	controls = document.querySelectorAll('.options li'),
	translate = document.querySelector('.btn');

translate.addEventListener('click', translateText);
controls[0].addEventListener('click', () => {
	voices(fromText.value, 0);
});
controls[1].addEventListener('click', () => {
	cliping(fromText.value);
});
controls[3].addEventListener('click', () => {
	exchange();
});
controls[6].addEventListener('click', () => {
	cliping(toText.value);
});

controls[5].addEventListener('click', () => {
	voices(toText.value, 1);
});

selectTag.forEach((element, index) => {
	for (var i in countries) {
		let selected =
			(!index && countries[i] == 'English') ||
			(index && countries[i] == 'Hindi')
				? 'selected'
				: '';

		let option = `<option value='${i}' ${selected}>${countries[i]}</option>`;
		element.insertAdjacentHTML('beforeend', option);
	}
});

async function translateText() {
	if (fromText.value != '') {
		let response = await fetch(
			`https://api.mymemory.translated.net/get?q=${fromText.value}!&langpair=${selectTag[0].value}|${selectTag[1].value}`
		);
		let data = await response.json();
		toText.value = data.matches[0].translation;
	}
}

function voices(content, id) {
	if (content != '') {
		const utterance = new SpeechSynthesisUtterance(content);
		utterance.lang = selectTag[id].value;
		speechSynthesis.speak(utterance);
	}
}
function cliping(content) {
	navigator.clipboard.writeText(content);
}
function exchange() {
	[fromText.value, toText.value] = [toText.value, fromText.value];
	[selectTag[0].value, selectTag[1].value] = [
		selectTag[1].value,
		selectTag[0].value,
	];
}
