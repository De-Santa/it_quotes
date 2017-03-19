var blockCounter = (function() {
	/*
		returns blockCounter.count() method
			param: '' - count all blocks and states
			param: 'easy' - counts easy blocks
			param: 'hard' - counts hard blocks and its types
			param: 'type' - counts hard block types only
			param: 'states' - counts only states
	 */
	'use strict';
	var counters =  document.getElementsByClassName('m-stats__counter-val');
	var counterAll = counters[0];
	var counterNum = counters.length;
	//BLOCK COUNTERS
	var textblock = document.getElementsByClassName('m-textblock');
	var easyBlk = document.getElementsByClassName('m-textblock--easy');
	var hardBlk = document.getElementsByClassName('m-textblock--hard');
	//TYPE COUNTERS
	var greenType = document.getElementsByClassName('m-textblock--hard--green');
	var redType = document.getElementsByClassName('m-textblock--hard--red');
	//STATE COUNTERS
	var selectedSt = document.getElementsByClassName('m-textblock--selected');
	var selectedEasyBlkSt = document.getElementsByClassName('m-textblock--easy m-textblock--selected');
	var selectedHardBlkSt = document.getElementsByClassName('m-textblock--hard m-textblock--selected');
	var selectedGreenTypeSt = document.getElementsByClassName('m-textblock--hard--green m-textblock--selected');
	var selectedRedTypeSt = document.getElementsByClassName('m-textblock--hard--red m-textblock--selected');


	/* =================== private methods ================= */

	function countAll() {
		counterAll.innerHTML = textblock.length;
	}

	function countEasyBlk() {
		for(var i = 0; i < counterNum; i++) {
			var counterType = counters[i].dataset;
			switch (counterType.counter) {
				case 'easyBlocks':
					counters[i].innerHTML = easyBlk.length;
			}
		}
	}
	function countHardBlk() {
		for(var i = 0; i < counterNum; i++) {
			var counterType = counters[i].dataset;
			switch (counterType.counter) {
				case 'hardBlocks':
					counters[i].innerHTML = hardBlk.length;
			}
		}
	}
	function countTypes() {
		for(var i = 0; i < counterNum; i++) {
			var counterType = counters[i].dataset;
			switch (counterType.counter) {
				case 'greenState':
					counters[i].innerHTML = greenType.length;
					break;
				case 'redState':
					counters[i].innerHTML = redType.length;
			}
		}
	}

	function countStates() {
		for(var i = 0; i < counterNum; i++) {
			var counterType = counters[i].dataset;
			switch (counterType.counter) {
				case 'selectedState':
					counters[i].innerHTML = selectedSt.length;
					break;
				case 'selectedEasyState':
					counters[i].innerHTML = selectedEasyBlkSt.length;
					break;
				case 'selectedHardState':
					counters[i].innerHTML = selectedHardBlkSt.length;
					break;
				case 'selectedGreenState':
					counters[i].innerHTML = selectedGreenTypeSt.length;
					break;
				case 'selectedRedState':
					counters[i].innerHTML = selectedRedTypeSt.length;
			}
		}
	}

	/* =================== public methods ================== */
	function count(type) {
		switch (type) {
			case 'easy'://COUNTS EASYBLOCKS
				countAll();
				countEasyBlk();
				break;
			case 'hard'://COUNTS HARDBLOCKS
				countAll();
				countHardBlk();
				countTypes();
				break;
			case 'type'://COUNTS TYPES OF HARDBLOKS
				countTypes();
				break;
			case 'states'://COUNTS STATES
				countStates();
				break;
			default://COUNTS ALL
				countAll();
				countEasyBlk();
				countHardBlk();
				countTypes();
				countStates();
		}
	}

	/* =============== export public methods =============== */
	return {
		count: count
	};
}());