; var statsEvents = (function () {
	/*
	 returns statsEvents.init() method
	 binds statistic panel on click event
	 */
	'use strict';
	var statsPane = document.querySelector('.m-stats');

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
	/* =================== PUBLIC METHODS ================= */
	//BIND STATS PANEL EVENTS
	function init() {
		statsPanelBind()
	}

	return {
		init: init
	};
}());