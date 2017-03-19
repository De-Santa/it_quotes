document.addEventListener("DOMContentLoaded", function(event) {
	(function () {
		var num = 5 + (Math.floor(Math.random() * 15));	//generate from 5 to 14 blocks
		for(var i = 0; i < num; i++) {
			blockGenerator.renderBlock();
		}
		statsEvents.init();
		blockCounter.count();
		blockEvents.noTextSelectionOnDblClick();
		popups.init();
		addBlock.init();
	}());
});