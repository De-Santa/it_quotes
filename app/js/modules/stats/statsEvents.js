var statsEvents = (function () {
	/*
	 returns statsEvents.init() method
	 binds statistic panel on click event
	 */
	'use strict';
	var statsPane = document.querySelector('.m-stats');

	/* =================== PRIVATE METHODS ================= */
	function statsPanelBind() {
		statsPane.addEventListener('click', function () {
			if (!this.classList.contains('m-stats--active')) {
				this.classList.add('m-stats--active');
			}
			else {
				this.classList.remove('m-stats--active');
			}
		});
	}
	/* =================== PUBLIC METHODS ================= */
	//BIND STATS PANEL EVENTS
	function init() {
		statsPanelBind()
	}

	return {
		init: init
	};
}());