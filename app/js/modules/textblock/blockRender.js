var blockGenerator = (function() {
	/*
		returns blockGenerator.renderBlock() method
			param: '' - render random block
			param: 'easy' - render easy block
			param: 'hard' - render hard block
	*/

	'use strict';
	var blocksContainer = document.querySelector('.m-textblocks__list');
	var hardBlockStates = ['m-textblock--hard--green', 'm-textblock--hard--red'];
	var blockTypes = [
		{'easy': 'm-textblock--easy'},
		{'hard': 'm-textblock--hard'}
	];

	/* =================== private methods ================= */
	//randomize hard block state returns string
	function randomizeHBState() {
		var stateNum = Math.floor(Math.random() * (hardBlockStates.length));
		return hardBlockStates[stateNum];
	}

	//randomize block type returns string
	function randomizeBlockType() {
		var typeNum = Math.floor(Math.random() * (blockTypes.length));
		var type = Object.keys(blockTypes[typeNum])[0];
		var blockClass = Object.values(blockTypes[typeNum])[0];
		//check random block type if its hard- add random state to it
		switch (type) {
			case 'hard':
				return blockClass + ' ' + randomizeHBState();
				break;
			default:
				return blockClass;
		}
	}

	//generate block content
	function generateBlockContent() {
		var quote = quoteGenerator.randomQuote();
		return '<p class="m-textblock__quote">' + quote.quote + '</p>'
			+ '<p class="m-textblock__author">'
			+ '<svg class="m-textblock__del-block"><use xlink:href="#del-icon"></use></svg>' + quote.author
			+ '</p>';
	}

	/* =================== public methods ================== */
	//block render
	function renderBlock(blocktype) {
		switch (blocktype) {
			case 'easy':
				blocksContainer.innerHTML +='<li class="m-textblocks__list-item m-textblock' + ' ' + blockTypes.easy + '">'
					+ generateBlockContent()
					+ '</li>';
				blockCounter.count('easy');
				break;
			case 'hard':
				blocksContainer.innerHTML +='<li class="m-textblocks__list-item m-textblock' + ' ' + blockTypes.hard + ' ' + randomizeHBState() + '">'
					+ generateBlockContent()
					+ '</li>';
				blockCounter.count('hard');
				doubleClick();
				break;
			default:
				blocksContainer.innerHTML +='<li class="m-textblocks__list-item m-textblock' + ' ' + randomizeBlockType() + '">'
											+ generateBlockContent()
											+ '</li>';
				blockCounter.count();
		}
		blockEvents.init();
	}

	/* =============== export public methods =============== */
	return {
		renderBlock: renderBlock
	};
}());