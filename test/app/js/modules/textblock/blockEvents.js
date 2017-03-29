; var blockEvents = (function () {
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

	/* ===================
		private methods
	================= */

	//bind block delete button
	function deleteEvent(createdBlock) {
		var delBtn = createdBlock.querySelector('.m-textblock__del-block');
		//prepare del popup buttons to bind
		var bindPopups = function(event) {
			event.preventDefault();
			event.stopPropagation();
			popups.closePopup();
			createdBlock.classList.add('block-delete-anim');
			setTimeout(function () {
				blockCounter.count(createdBlock, 'deletion');
				createdBlock.parentNode.removeChild(createdBlock);
				approveBtn.removeEventListener('click', bindPopups);//clear del popup buttons click-event after deletion
			},300);
		};

		delBtn.addEventListener('click', function (event) {//BIND CLICK ON DEL BUTTONS
			event.stopPropagation();
			//CHECK BUTTON PARENT BLOCK TYPE
			if (createdBlock.classList.contains('m-textblock--hard')) {//HARD-BLOCK CHECK
				popups.openPopup('delBlock');//IF ITS HARD-BLOCK - OPEN POPUP
				//BIND POPUP BUTTONS
				approveBtn.addEventListener('click', bindPopups);//BIND APPROVE HARD-TEXTBLOCK DELETION
//COUNT BLOCKS AFTER DEL
				cancelBtn.addEventListener('click', function (event) {//BIND CANCEL DELETION
					event.preventDefault();
					event.stopPropagation();
					popups.closePopup();
				});
			}

			else {//IF ITS EASY-BLOCK DELETE WITHOUT CONFIRM
				createdBlock.classList.add('block-delete-anim');
				setTimeout(function () {
					blockCounter.count(createdBlock, 'deletion');
					createdBlock.parentNode.removeChild(createdBlock);
				},300);
			}
		});
	}

	//block selection
	function selectBlock(createdBlock) {
		if (!createdBlock.classList.contains('m-textblock--selected')) {
			setTimeout(function() {
				createdBlock.classList.add('m-textblock--selected');
				blockCounter.count(createdBlock, 'selection');
			}, 150);
		}
		else {
			createdBlock.classList.remove('m-textblock--selected');
			blockCounter.count(createdBlock, 'unselection');
		}
	}

	//bind easy block click-selection
	function easyBlockClick(createdBlock) {
		if (createdBlock.classList.contains('m-textblock--easy')) {
			createdBlock.addEventListener('click', function (event) {
				event.stopPropagation();
				setTimeout(function() {
					selectBlock(createdBlock);
				}, 150);
			});
		}
	}

	//bind double-click event to hard block
	var clickCount = 0;
	var singleClickTimer;
	function doubleClick(createdBlock) {
		if (createdBlock.classList.contains('m-textblock--hard')) {
			createdBlock.addEventListener('click', function (event) {
				event.stopPropagation();
				clickCount++;
				if (clickCount === 1) {
					singleClickTimer = setTimeout(function () {
						clickCount = 0;
						singleClicked();
					}, 250);
				} else if (clickCount === 2) {
					clearTimeout(singleClickTimer);
					clickCount = 0;
					doubleClicked();
				}
			});
		}
		function singleClicked() {
			selectBlock(createdBlock);
		}

		function doubleClicked() {
			if (!createdBlock.classList.contains('m-textblock--hard--red')) {
				createdBlock.classList.add('m-textblock--hard--red');
				createdBlock.classList.remove('m-textblock--hard--green');
				blockCounter.count(createdBlock, 'typeSwitchRed');
				if(createdBlock.classList.contains('m-textblock--selected')) {
					blockCounter.count(createdBlock, 'typeSwitchRedSelected');
				}
			}
			else {
				createdBlock.classList.remove('m-textblock--hard--red');
				createdBlock.classList.add('m-textblock--hard--green');
				blockCounter.count(createdBlock, 'typeSwitchGreen');
				if(createdBlock.classList.contains('m-textblock--selected')) {
					blockCounter.count(createdBlock, 'typeSwitchGreenSelected');
				}
			}
		}
	}
	/* =================== PUBLIC METHODS ================= */
	//BIND EVENTS ON BLOCK
	function init(createdBlock) {
		deleteEvent(createdBlock);
		easyBlockClick(createdBlock);
		doubleClick(createdBlock);
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