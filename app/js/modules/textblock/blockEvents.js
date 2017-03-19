var blockEvents = (function () {
	/*
		returns blockEvents.init() method
			binds delete button on textblock
			binds click-selection on easyblock
			binds double-click on hardblock

		returns blockEvents.noTextSelectionOnDblClick() method
			param: '' - prevents text selection on dblclick
	*/
	'use strict';
	var approveBtn = document.querySelector('.m-btn--approve');
	var cancelBtn = document.querySelector('.m-btn--cancel');
	/* =================== PRIVATE METHODS ================= */
	//bind block delete button
	function deleteEvent() {
		var delBtn = document.getElementsByClassName('m-textblock__del-block');
		var delNum = delBtn.length;
		for(var i = 0; i < delNum; i++) {
			delBtn[i].addEventListener('click', function (event) {//BIND CLICK ON DEL BUTTONS
				event.stopPropagation();
				var btn = this;//PICK CLICKED BUTTON
				//CHECK BUTTON PARENT BLOCK TYPE
				if (btn.parentElement.parentElement.classList.contains('m-textblock--hard')) {//HARD-BLOCK CHECK
					popups.openPopup('delBlock');//IF ITS HARD-BLOCK - OPEN POPUP
					//BIND POPUP BUTTONS
					approveBtn.addEventListener('click', function (event) {//BIND APPROVE HARD-TEXTBLOCK DELETION
						event.preventDefault();
						event.stopPropagation();
						popups.closePopup();
						btn.parentElement.parentElement.remove();
						blockCounter.count();//COUNT BLOCKS AFTER DEL
					});

					cancelBtn.addEventListener('click', function (event) {//BIND CANCEL DELETION
						event.preventDefault();
						event.stopPropagation();
						popups.closePopup();
					});
				}
				else {//IF ITS EASY-BLOCK DELETE WITHOUT CONFIRM
					btn.parentElement.parentElement.remove();
					blockCounter.count();
				}
			});
		}
	}



	//block selection
	function selectBlock(block) {
		if (!block.classList.contains('m-textblock--selected')) {
			setTimeout(function() {
				block.classList.add('m-textblock--selected');
				blockCounter.count('states');
			}, 150);
		}
		else {
			block.classList.remove('m-textblock--selected');
			blockCounter.count('states');
		}
	}

	//bind easy block click-selection
	function easyBlockClick() {
		var easyBlock = document.getElementsByClassName('m-textblock--easy');
		var blockNum = easyBlock.length;
		var block;
		for (var i = 0; i < blockNum; i++) {
			easyBlock[i].addEventListener('click', function () {
				block = this;
				console.log(block);
				setTimeout(function() {
					console.log(block);
					selectBlock(block);
				}, 150);
			});
		}
	}

	//bind double-click event to hard block
	function doubleClick() {
		var hardBlock = document.getElementsByClassName('m-textblock--hard');
		var hBLength = hardBlock.length;
		var block;
		var clickCount = 0;
		var singleClickTimer;

		function singleClicked() {
			selectBlock(block);
			blockCounter.count('states');
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
			blockCounter.count('type');
			blockCounter.count('states');
		}

		for(var i = 0; i < hBLength; i++) {
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
	/* =================== PUBLIC METHODS ================= */
	//BIND EVENTS ON BLOCK
	function init() {
		deleteEvent();
		easyBlockClick();
		doubleClick();
	}

	//PREVENT TEXT SELECTION ON DBLCLICK EVENT
	function noTextSelectionOnDblClick() {
		document.ondblclick = function() {
			if (window.getSelection)
				window.getSelection().removeAllRanges();
			else if (document.selection)
				document.selection.empty();
		};
	}

	return {
		init: init,
		noTextSelectionOnDblClick: noTextSelectionOnDblClick
	};
}());