; var blockGenerator = (function() {
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
	//randomize hard block state
	//returns string (classname)
	function randomizeHBState() {
		var stateNum = Math.floor(Math.random() * (hardBlockStates.length));
		return hardBlockStates[stateNum];
	}

	//randomize block type
	//returns string (classname)
	function randomizeBlockType() {
		var typeNum = Math.floor(Math.random() * (blockTypes.length));//gets random number based on length of blockTypes array
		var blockType = blockTypes[typeNum];//gets random blockType Object
		var blockClass;

		if(blockType.hasOwnProperty('easy')) {
			blockClass = blockType['easy'];
			return blockClass;
		}
		else {
			blockClass = blockType['hard'];
			return blockClass + ' ' + randomizeHBState();
		}
	}

	//generates block content
	//returns string(html)
	function generateBlockContent() {
		var quote = quoteGenerator.randomQuote();
		var blockContent = '<p class="m-textblock__quote">' + quote['quote'] + '</p>'
			+ '<p class="m-textblock__author">'
			+ '<svg class="m-textblock__del-block"><use xlink:href="#del-icon"></use></svg>' + quote['author']
			+ '</p>';
		return blockContent;
	}

	//creates new block template
	//returns element
	function createBlock(type) {
		var newBlock = document.createElement('div');
		newBlock.className = 'm-textblocks__list-item' + ' ' + 'm-textblock' + /*' ' + 'block-appear-anim' +*/ ' ';//create element and add base class to it
		switch (type) {//adds specific classname to chosen blocks(type)
			case 'easy':
				newBlock.className += ' ' + blockTypes[0].easy;// adds easy classname
				break;
			case 'hard':
				newBlock.className += ' ' + blockTypes[1].hard + ' ' + randomizeHBState();// adds hard classname and random statename
				break;
			default:
				newBlock.className += randomizeBlockType();//adds random type classname
		}
		newBlock.innerHTML = generateBlockContent();//fills new block with content
		return newBlock;
	}

	/* =================== public methods ================== */
	//block render
	function renderBlock(blocktype) {
		var createdBlock;
		switch (blocktype) {
			case 'easy':
				createdBlock = createBlock('easy');
				break;
			case 'hard':
				createdBlock = createBlock('hard');
				break;
			default:
				createdBlock = createBlock();
		}
		blocksContainer.appendChild(createdBlock);
		blockEvents.init(createdBlock);
		blockCounter.count(createdBlock, 'creation');
		console.log('block created');
		/*setTimeout(function () {
			createdBlock.classList.remove('block-appear-anim');
		},400)*/
	}

	/* =============== export public methods =============== */
	return {
		renderBlock: renderBlock
	};
}());