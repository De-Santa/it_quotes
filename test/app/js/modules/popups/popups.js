; var popups = (function () {
	/*
		returns popups.init() method
			param '' - binds popup close on click

		returns popups.openPopup() method
			param: '' - does nothing
			param: 'addBlock' - opens add block popup
			param: 'delBlock' - opens delete block popup

		returns popups.closePopup() method
			param: '' - close all popups
	 */

	'use strict';
	var popups = document.getElementsByClassName('m-popup');
	var popupNum = popups.length;
	var addBlkPopup = document.querySelector('.m-popup--add-confirm');
	var delBlkPopup = document.querySelector('.m-popup--del-confirm');

	/* =================== PRIVATE METHODS ================= */
	function addBlkPopupOpen() {
		if (!addBlkPopup.classList.contains('m-popup--active')) {
			addBlkPopup.classList.add('m-popup--active');
			addBlkPopup.children[0].classList.add('fadeInDown');
		}
	}
	function delBlkPopupOpen() {
		if (!delBlkPopup.classList.contains('m-popup--active')) {
			delBlkPopup.classList.add('m-popup--active');
			delBlkPopup.children[0].classList.add('fadeInDown');
		}
	}

	function closePopupOnClick() {
		for(var i = 0; i < popupNum; i++) {
			popups[i].addEventListener('click', function (event) {
				event.stopPropagation();
				if (this.classList.contains('m-popup--active')) {
					this.classList.remove('m-popup--active');
					this.children[0].classList.remove('fadeInDown');
				}
			});
		}
	}

	/* =================== PUBLIC METHODS ================= */
	function init() {
		closePopupOnClick();
	}

	function openPopup(popupType) {
		switch (popupType) {
			case 'addBlock':
				addBlkPopupOpen();
				break;
			case 'delBlock':
				delBlkPopupOpen();
		}
	}

	function closePopup() {
		for(var i = 0; i < popupNum; i++) {
			if (popups[i].classList.contains('m-popup--active')) {
				popups[i].classList.remove('m-popup--active');
				popups[i].children[0].classList.remove('fadeInDown');
			}
		}
	}

	return {
		init: init,
		openPopup: openPopup,
		closePopup: closePopup
	};
}());