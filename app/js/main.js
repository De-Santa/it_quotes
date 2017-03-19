document.addEventListener("DOMContentLoaded", function(event) {

	//GLOBAL VARS
	var textblock = document.getElementsByClassName('m-textblock');
	var quotes = [
		{'quote': 'Те, кого беспокоит бесплатное ПО, обычно производят продукты, которые стоят и того меньше.', 'author': '-David Emery'},
		{'quote': 'Поставщики ПО постоянно пытаются сделать свои продукты более user-friendly. Пока что все попытки это сделать сводятся к написанию слов user-friendly на обложке документации.', 'author': '-Bill Gates'},
		{'quote': 'Программисты постоянно соревнуются со Вселенной: они пытаются создать всё более идиотоустойчивые программы, а Вселенная создаёт всё более совершенных идиотов. Пока что Вселенная побеждает', 'author': '-Rich Cook'},
		{'quote': 'Основная проблема программистов состоит в том, что их ошибки невозможно предугадать.', 'author': '-Seymour Cray'},
		{'quote': 'Два самых известных продукта, созданных в Университете Беркли — это UNIX и LSD. Это не может быть просто совпадением.', 'author': '-Jeremy S. Anderson'},
		{'quote': 'Для начала изучите теорию. Затем обретите собственный стиль программирования. И, наконец, забудьте об этой ерунде и просто пишите код.', 'author': '-George Carrette'},
		{'quote': 'Оценивать эффективность процесса программирования количеством написанных строк кода — то же самое, что оценивать процесс создания самолёта по его весу.', 'author': '-Bill Gates'},
		{'quote': 'Итерация свойственна человеку, рекурсия божественна.', 'author': '-L. Peter Deutsch'},
		{'quote': 'Существует только два вида языков программирования: те, которые всех раздражают, и те, которые никто не использует.', 'author': '-Bjarne Stroustrup'},
		{'quote': 'В мире нет такого языка программирования, на котором разработчики не смогли бы написать плохую программу.', 'author': '-Larry Flon'},
		{'quote': 'Создание языка программирования — это как прогулка по парку. По парку Юрского периода.', 'author': '-Larry Wall'},
		{'quote': 'Ходить по воде и разрабатывать программы, следуя спецификации, очень просто… если они заморожены.', 'author': '-Edward V Berard'},
		{'quote': 'Не волнуйтесь, если что-то не работает. Если бы всё работало, вас бы уволили.', 'author': '-Mosher’s Law of Software Engineering'},
		{'quote': 'Объектно-ориентированная версия «спагетти кода» — это, конечно, «лазанья код» (очень много слоев).', 'author': '-Roberto Waltman'},
		{'quote': 'Вы не можете создавать хорошие программы без хорошей команды, но большинство софтверных команд ведут себя как проблемная семья.', 'author': '-Jim McCarthy'},
		{'quote': 'Изучение программирования имеет такое же отношение к проектированию интерактивных систем, как обучение слепой печати к написанию стихов.', 'author': '-Ted Nelson'},
		{'quote': 'Иногда лучше остаться спать дома в понедельник, чем провести всю неделю отлаживая написанный в понедельник код.', 'author': '-Christopher Thompson'},
		{'quote': 'Многие из вас знакомы с достоинствами программиста. Их всего три, и разумеется это: лень, нетерпеливость и гордыня.', 'author': '-Larry Wall'},
		{'quote': 'Большинство хороших программистов делают свою работу не потому, что ожидают оплаты или признания, а потому что получают удовольствие от программирования.', 'author': '-Linus Torvalds'},
		{'quote': 'Всегда пишите код так, как будто сопровождать его будет психопат, который знает, где вы живёте.', 'author': '-Martin Golding'}
	];

	//QUOTES
		//GET RANDOM QUOTE
	function getQuote() {
		var randomQuote = Math.floor(Math.random() * (quotes.length));
		return randomQuote;
	}

		//FILL EXISTING BLOCKS WITH QUOTES
	(function fillQuotes() {
		var blockNum = textblock.length;
		for (var i = 0; i < blockNum; i++) {
			var quoteNum = getQuote();
			textblock[i].childNodes[1].innerHTML = quotes[quoteNum].quote;
			textblock[i].childNodes[3].innerHTML = '<svg class="m-textblock__del-block"><use xlink:href="#del-icon"></use></svg>' + quotes[quoteNum].author;
		}
	})();
	//*QUOTES


	//COUNTERS
	function countBlocks() {
		var counters =  document.getElementsByClassName('m-stats__counter-val');
		var counterNum = counters.length;
		for(var i = 0; i < counterNum; i++) {
			var counterType = counters[i].dataset;
			switch (counterType.counter) {
				case 'allBlocks':
					counters[i].innerHTML = textblock.length;
					break;
				case 'easyBlocks':
					counters[i].innerHTML = document.getElementsByClassName('m-textblock--easy').length;
					break;
				case 'hardBlocks':
					counters[i].innerHTML = document.getElementsByClassName('m-textblock--hard').length;
					break;
				case 'greenState':
					counters[i].innerHTML = document.getElementsByClassName('m-textblock--hard--green').length;
					break;
				case 'redState':
					counters[i].innerHTML = document.getElementsByClassName('m-textblock--hard--red').length;
					break;
				case 'selectedState':
					counters[i].innerHTML = document.getElementsByClassName('m-textblock--selected').length;
					break;
				case 'selectedEasyState':
					counters[i].innerHTML = document.getElementsByClassName('m-textblock--easy m-textblock--selected').length;
					break;
				case 'selectedHardState':
					counters[i].innerHTML = document.getElementsByClassName('m-textblock--hard m-textblock--selected').length;
					break;
				case 'selectedGreenState':
					counters[i].innerHTML = document.getElementsByClassName('m-textblock--hard--green m-textblock--selected').length;
					break;
				case 'selectedRedState':
					counters[i].innerHTML = document.getElementsByClassName('m-textblock--hard--red m-textblock--selected').length;
			}
		}
	}
	countBlocks();
	//*COUNTERS

	//POPUPS
		//POPUPS OPEN
	function openPopup(popupName) {
		if (popupName === 'delBlock') {
			var delPopup = document.querySelector('.m-popup--del-confirm');

			if (!delPopup.classList.contains('m-popup--active')) {
				delPopup.classList.add('m-popup--active');
				delPopup.children[0].classList.add('fadeInDown');
			}
			closePopup();

		}
		else if (popupName === 'addBlock') {
			var addPopup = document.querySelector('.m-popup--add-confirm');

			if (!addPopup.classList.contains('m-popup--active')) {
				addPopup.classList.add('m-popup--active');
				addPopup.children[0].classList.add('fadeInDown');
			}
			closePopup();
		}
	}
		//POPUPS CLOSE
	function closePopup() {
		var popups = document.getElementsByClassName('m-popup');
		var popupNum = popups.length;
		for(var i = 0; i < popupNum; i++) {
			popups[i].addEventListener('click', function () {
				if (this.classList.contains('m-popup--active')) {
					this.classList.remove('m-popup--active');
					this.children[0].classList.remove('fadeInDown');
				}
			});
		}
	}
	//*POPUPS

	//BLOCK SELECTION
	function selectBlock(block) {
		if (!block.classList.contains('m-textblock--selected')) {
			setTimeout(function() {
				block.classList.add('m-textblock--selected');
				countBlocks();
			}, 150);
		}
		else {
			block.classList.remove('m-textblock--selected');
		}
		countBlocks();
	}
	//*BLOCK SELECTION

	//EVENTS

		//BIND STATISTICS CLICK EVENT
	(function () {
		var statsPane = document.querySelector('.m-stats');
		statsPane.addEventListener('click', function () {
			if (!this.classList.contains('m-stats--active')) {
				this.classList.add('m-stats--active');
			}
			else {
				this.classList.remove('m-stats--active');
			}
		});
	})();
		//BIND BLOCK CLICK EVENT
	function blockClick() {
		var block = document.getElementsByClassName('m-textblock--easy');
		var blockNum = block.length;
		for (var i = 0; i < blockNum; i++) {
			block[i].addEventListener('click', function () {
				selectBlock(this);
			});
		}
		countBlocks();
	}
	blockClick();

		//BIND DOUBLECLICK EVENT ON HARD-BLOCK
	function doubleClick() {
		var hardBlock = document.getElementsByClassName('m-textblock--hard');
		var hBLength = hardBlock.length;
		var block;
		for(var i = 0; i < hBLength; i++) {
			function singleClicked() {
				selectBlock(block);
			}

			function doubleClicked() {
				if (!block.classList.contains('m-textblock--hard--red')) {
					block.classList.add('m-textblock--hard--red');
					block.classList.remove('m-textblock--hard--green');
				}
				else {
					block.classList.remove('m-textblock--hard--red');
					block.classList.add('m-textblock--hard--green');
				}
				countBlocks();
			}

			var clickCount = 0;
			hardBlock[i].addEventListener('click', function() {
				block = this;
				clickCount++;
				if (clickCount === 1) {
					singleClickTimer = setTimeout(function() {
						clickCount = 0;
						singleClicked();
					}, 250);
				} else if (clickCount === 2) {
					clearTimeout(singleClickTimer);
					clickCount = 0;
					doubleClicked();
				}
			})
		}
	}
	doubleClick();
		//PREVENT TEXT SELECTION ON DBLCLICK EVENT
	document.ondblclick = function() {
		if (window.getSelection)
			window.getSelection().removeAllRanges();
		else if (document.selection)
			document.selection.empty();
	};

		//BIND DEL-BLOCK BTN CLICK EVENT
	function delBlock() {
		var delBtn = document.getElementsByClassName('m-textblock__del-block');
		var approveBtn = document.querySelector('.m-btn--approve');
		var cancelBtn = document.querySelector('.m-btn--cancel');
		var delNum = delBtn.length;

		for(var i = 0; i < delNum; i++) {
			delBtn[i].addEventListener('click', function (event) {//BIND CLICK ON DEL BUTTONS
				event.stopPropagation();
				var btn = this;//PICK CLICKED BUTTON
				//CHECK BUTTON PARENT BLOCK TYPE
				if (btn.parentElement.parentElement.classList.contains('m-textblock--hard')) {//HARD-BLOCK CHECK
					openPopup('delBlock');//IF ITS HARD-BLOCK - OPEN POPUP
					//BIND POPUP BUTTONS
					approveBtn.addEventListener('click', function (event) {//BIND APPROVE HARD-TEXTBLOCK DELETION
						event.preventDefault();
						btn.parentElement.parentElement.remove();
						countBlocks();//COUNT BLOCKS AFTER DEL
					});

					cancelBtn.addEventListener('click', function (event) {//BIND CANCEL DELETION
						event.preventDefault();
						closePopup();
					});
				}
				else {//IF ITS EASY-BLOCK DELETE WITHOUT CONFIRM
					btn.parentElement.parentElement.remove();
				}
				countBlocks();
			});
		}
	}
	delBlock();
		//BIND DEL-BLOCK BTN CLICK EVENT

		//ADD BLOCK BTN EVENT
	function addBlock() {
		var addBtn = document.querySelector('.m-btn--add');
		var easyAddBtn = document.querySelector('.m-btn--easy');
		var hardAddBtn = document.querySelector('.m-btn--hard');
		var blocksList = document.querySelector('.m-textblocks__list');

		addBtn.addEventListener('click', function () {
			openPopup('addBlock');
		});

		easyAddBtn.addEventListener('click', function (event) {
			event.preventDefault();
			var quoteNum = getQuote();
			console.log(quoteNum);
			blocksList.innerHTML += '<li class="m-textblocks__list-item m-textblock m-textblock--easy">'
				+ '<p class="m-textblock__quote">' + quotes[quoteNum].quote + '</p>'
				+ '<p class="m-textblock__author">'
				+ '<svg class="m-textblock__del-block"><use xlink:href="#del-icon"></use></svg>' + quotes[quoteNum].author
				+ '</p>'
				+ '</li>';
			delBlock();
			blockClick();
			doubleClick();
			countBlocks();
		});

		hardAddBtn.addEventListener('click', function (event) {
			event.preventDefault();
			var quoteNum = getQuote();
			var blockType = [{'color': 'm-textblock--hard--green'},
							{'color': 'm-textblock--hard--red'}];
			var randomType = Math.floor(Math.random() * (blockType.length));

			blocksList.innerHTML += '<li class="m-textblocks__list-item m-textblock m-textblock--hard' + ' ' + blockType[randomType].color + '">'
				+ '<p class="m-textblock__quote">' + quotes[quoteNum].quote + '</p>'
				+ '<p class="m-textblock__author">'
				+ '<svg class="m-textblock__del-block"><use xlink:href="#del-icon"></use></svg>' + quotes[quoteNum].author
				+ '</p>'
				+ '</li>';
			delBlock();
			blockClick();
			doubleClick();
			countBlocks();
		});
	}
	addBlock();
});