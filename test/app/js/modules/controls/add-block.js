; var addBlock = (function () {
	/*
		returns addBlock.init() method
		binds addBlock button click event
	*/
	'use strict';
	var addBtn = document.querySelector('.m-btn--add');
	var easyAddBtn = document.querySelector('.m-btn--easy');
	var hardAddBtn = document.querySelector('.m-btn--hard');
	var randomAddBtn = document.querySelector('.m-btn--random');
	var heavyAddBtn = document.querySelector('.m-btn--heavy');
	var extraHeavyAddBtn = document.querySelector('.m-btn--extra-heavy');
	//var loader = document.querySelector('.m-popup__loader');

	/* =================== PRIVATE METHODS ================= */
	function addBlkBtnsBind() {
		addBtn.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			popups.openPopup('addBlock');
		});

		easyAddBtn.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			popups.closePopup();
			blockGenerator.renderBlock('easy');
		});

		hardAddBtn.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			popups.closePopup();
			blockGenerator.renderBlock('hard');
		});

		randomAddBtn.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			blockGenerator.renderBlock();
			popups.closePopup();
		});

		heavyAddBtn.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			var num = 1000;
			for(var i = 0; i < num; i++) {
				blockGenerator.renderBlock('');
			}
			popups.closePopup();
		});

		extraHeavyAddBtn.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			var num = 10000;
			for(var i = 0; i < num; i++) {
				blockGenerator.renderBlock('');
			}
			popups.closePopup();
		});

	}
	/* =================== PUBLIC METHODS ================= */
	//BIND ADD BUTTONS
	function init() {
		addBlkBtnsBind();
	}

	return {
		init: init
	};
}());