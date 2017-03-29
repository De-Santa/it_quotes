; var blockCounter = (function() {
	/*
		returns blockCounter.count(createdBlock, event) public method
			param: (createdBlock, 'creation') - analyze blocktype(createdBlock) on creation and counts it
			param: (createdBlock, 'deletion') - analyze blocktype(createdBlock) on deletion and counts it
			param: (createdBlock, 'selection') - analyze blocktype(createdBlock) on selection and counts it
	 */
	'use strict';
	//counters in html document
	var allCounter = document.querySelector('[data-counter = "allBlocks"]');
	var easyCounter = document.querySelector('[data-counter = "easyBlocks"]');
	var hardCounter = document.querySelector('[data-counter = "hardBlocks"]');
	var hardGreenCounter = document.querySelector('[data-counter = "greenState"]');
	var hardRedCounter = document.querySelector('[data-counter = "redState"]');
	var selectedAllCounter = document.querySelector('[data-counter = "selectedState"]');
	var selectedEasyCounter = document.querySelector('[data-counter = "selectedEasyState"]');
	var selectedHardCounter = document.querySelector('[data-counter = "selectedHardState"]');
	var selectedHardGreenCounter = document.querySelector('[data-counter = "selectedGreenState"]');
	var selectedHardRedCounter = document.querySelector('[data-counter = "selectedRedState"]');

	//block counters variables
	var totalBlocks = 0;
	var totalEasyBlk = 0;
	var totalHardBlk = 0;
	var totalHardGreenBlk = 0;
	var totalHardRedBlk = 0;
	var totalSelectedBlk = 0;
	var totalSelectedEasyBlk = 0;
	var totalSelectedHardBlk = 0;
	var totalSelectedHardGreenBlk = 0;
	var totalSelectedHardRedBlk = 0;

	/* =================== private methods ================= */
	var counter = (function () {
		/*
			returns counter.count(blkVar, direction) private method
			param: (blkVar, 'add-up') - adds +1 to block variable counter (blkVar)
			param: (blkVar, 'add-down') - adds -1 to block variable counter (blkVar)
		*/
		function count(blkVar, direction) {
			switch (direction) {
				case 'add-up':
					blkVar++;
					return blkVar;
					break;
				case 'add-down':
					blkVar--;
					return blkVar;
			}
		}
		return {
			count: count
		}
	}());

	//counts total blocks value
	function countTotalBlocks() {
		totalBlocks= totalEasyBlk + totalHardBlk;
		allCounter.innerHTML = totalBlocks;
	}

	//counts easy blocks
	function countEasyBlk(direction) {
		switch (direction) {
			case('increase'):
				totalEasyBlk = counter.count(totalEasyBlk, 'add-up');
				break;
			case('decrease'):
				totalEasyBlk = counter.count(totalEasyBlk, 'add-down');
		}
		countTotalBlocks();
		easyCounter.innerHTML = totalEasyBlk;
	}

	//count hard blocks
	function countHardBlk(direction) {
		switch (direction) {
			case 'increase':
				totalHardBlk = counter.count(totalHardBlk, 'add-up');
				break;
			case 'decrease':
				totalHardBlk = counter.count(totalHardBlk, 'add-down');
		}
		countTotalBlocks();
		hardCounter.innerHTML = totalHardBlk;
	}

	//count hard-green blocks
	function countHardGreenBlk(direction) {
		switch (direction) {
			case 'increase':
				totalHardGreenBlk = counter.count(totalHardGreenBlk, 'add-up');
				break;
			case 'decrease':
				totalHardGreenBlk = counter.count(totalHardGreenBlk, 'add-down');
		}
		hardGreenCounter.innerHTML = totalHardGreenBlk;
	}

	//count hard-red blocks
	function countHardRedBlk(direction) {
		switch (direction) {
			case 'increase':
				totalHardRedBlk = counter.count(totalHardRedBlk, 'add-up');
				break;
			case 'decrease':
				totalHardRedBlk = counter.count(totalHardRedBlk, 'add-down');
		}
		hardRedCounter.innerHTML = totalHardRedBlk;
	}

	//count selected blocks
	function countAllSelectedBlk() {
		totalSelectedBlk = totalSelectedEasyBlk + totalSelectedHardBlk;
		selectedAllCounter.innerHTML = totalSelectedBlk;
	}

	function countSelectedEasyBlk(direction) {
		switch (direction) {
			case 'increase':
				totalSelectedEasyBlk = counter.count(totalSelectedEasyBlk, 'add-up');
				break;
			case 'decrease':
				totalSelectedEasyBlk = counter.count(totalSelectedEasyBlk, 'add-down');
		}
		selectedEasyCounter.innerHTML = totalSelectedEasyBlk;
		countAllSelectedBlk()
	}
	function countSelectedHardBlk(direction) {
		switch (direction) {
			case 'increase':
				totalSelectedHardBlk = counter.count(totalSelectedHardBlk, 'add-up');
				break;
			case 'decrease':
				totalSelectedHardBlk = counter.count(totalSelectedHardBlk, 'add-down');
		}
		selectedHardCounter.innerHTML = totalSelectedHardBlk;
		countAllSelectedBlk()
	}
	function countSelectedHardGreenBlk(direction) {
		switch (direction) {
			case 'increase':
				totalSelectedHardGreenBlk = counter.count(totalSelectedHardGreenBlk, 'add-up');
				break;
			case 'decrease':
				totalSelectedHardGreenBlk = counter.count(totalSelectedHardGreenBlk, 'add-down');
		}
		selectedHardGreenCounter.innerHTML = totalSelectedHardGreenBlk;
	}
	function countSelectedHardRedBlk(direction) {
		switch (direction) {
			case 'increase':
				totalSelectedHardRedBlk = counter.count(totalSelectedHardRedBlk, 'add-up');
				break;
			case 'decrease':
				totalSelectedHardRedBlk = counter.count(totalSelectedHardRedBlk, 'add-down');
		}
		selectedHardRedCounter.innerHTML = totalSelectedHardRedBlk;
	}

	/* =================== public methods ================== */
	function count(createdBlock, event) {
		var easyBlock = createdBlock.classList.contains('m-textblock--easy');
		var greenBlock = createdBlock.classList.contains('m-textblock--hard--green');
		switch (event) {
			case 'creation':
				switch(easyBlock) {
					case true :
						countEasyBlk('increase');
						break;
					default:
						countHardBlk('increase');
						switch(greenBlock) {
							case true:
								countHardGreenBlk('increase');
								break;
							default:
								countHardRedBlk('increase');
						}
				}
				break;

			case 'deletion':
				switch(easyBlock) {
					case true :
						countEasyBlk('decrease');
						break;
					default:
						countHardBlk('decrease');
						switch(greenBlock) {
							case true:
								countHardGreenBlk('decrease');
								break;
							default:
								countHardRedBlk('decrease');
						}
				}
				break;

			case 'selection':
				switch(easyBlock) {
					case true:
						countSelectedEasyBlk('increase');
						break;
					default:
						countSelectedHardBlk('increase');
						switch(greenBlock) {
							case true:
								countSelectedHardGreenBlk('increase');
								break;
							default:
								countSelectedHardRedBlk('increase');
						}
				}
				break;

			case 'unselection':
				switch(easyBlock) {
					case true:
						countSelectedEasyBlk('decrease');
						break;
					default:
						countSelectedHardBlk('decrease');
						switch(greenBlock) {
							case true:
								countSelectedHardGreenBlk('decrease');
								break;
							default:
								countSelectedHardRedBlk('decrease');
						}
				}
				break;

			case 'typeSwitchRed':
				countHardGreenBlk('decrease');
				countHardRedBlk('increase');
				break;

			case 'typeSwitchGreen':
				countHardRedBlk('decrease');
				countHardGreenBlk('increase');
				break;

			case 'typeSwitchRedSelected':
				countSelectedHardGreenBlk('decrease');
				countSelectedHardRedBlk('increase');
				break;

			case 'typeSwitchGreenSelected':
				countSelectedHardRedBlk('decrease');
				countSelectedHardGreenBlk('increase');
				break;

		}
	}
	/* =============== export public methods =============== */
	return {
		count: count
	};
}());