; var statsEvents = (function () {
	/*
	 returns statsEvents.init() method
	 binds statistic panel on click event
	 */
	'use strict';
	var statsPane = document.querySelector('.m-stats');
	var themeBtnGreen = document.querySelector('.m-stats__theme-changer--green');
	var themeBtnBlue = document.querySelector('.m-stats__theme-changer--blue');
	/* =================== PRIVATE METHODS ================= */
	function statsPanelBind() {
		var panelActive = false;
		statsPane.addEventListener('click', function (event) {
			event.stopPropagation();
			if (!this.classList.contains('m-stats--active')) {
				this.classList.add('m-stats--active');
				panelActive = true;
			}
			else {
				this.classList.remove('m-stats--active');
				panelActive = false
			}
			document.addEventListener('click', function () {
				if (panelActive === true) {
					statsPane.classList.remove('m-stats--active');
				}
			})
		});
	}

	function changeTheme(cssFile) {
		var newlink = document.createElement("link");
		newlink.setAttribute("rel", "stylesheet");
		newlink.setAttribute("type", "text/css");
		newlink.setAttribute("href", cssFile);
		var a = document.getElementsByTagName("head");
		console.log(a);
		document.getElementsByTagName("head").item(0).appendChild(newlink);
	}

	function bindThemeBtns() {
		themeBtnGreen.addEventListener('click', function (e) {
			e.stopPropagation();
			if (!this.classList.contains('m-stats__theme-changer--chosen')) {
				document.getElementsByTagName("head").item(0).lastChild.remove();
				this.classList.add('m-stats__theme-changer--chosen');
				themeBtnBlue.classList.remove('m-stats__theme-changer--chosen');
			}
		});

		themeBtnBlue.addEventListener('click', function (e) {
			e.stopPropagation();
			if (!this.classList.contains('m-stats__theme-changer--chosen')) {
				this.classList.add('m-stats__theme-changer--chosen');
				changeTheme('css/theme-blue.min.css');
				themeBtnGreen.classList.remove('m-stats__theme-changer--chosen');
			}
		});
	}

	/* =================== PUBLIC METHODS ================= */
	//BIND STATS PANEL EVENTS
	function init() {
		statsPanelBind();
		bindThemeBtns();
	}

	return {
		init: init
	};
}());