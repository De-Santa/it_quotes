var addBlock = (function () {
	/*
		returns addBlock.init() method
		binds addBlock button click event
	*/
	'use strict';
	var addBtn = document.querySelector('.m-btn--add');
	var easyAddBtn = document.querySelector('.m-btn--easy');
	var hardAddBtn = document.querySelector('.m-btn--hard');
	var randomAddBtn = document.querySelector('.m-btn--random');

	/* =================== PRIVATE METHODS ================= */
	function addBlkBtnsBind() {
		addBtn.addEventListener('click', function (event) {
			event.preventDefault();
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
			popups.closePopup();
			blockGenerator.renderBlock();
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