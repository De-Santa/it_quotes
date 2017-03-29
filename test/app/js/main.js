document.addEventListener("DOMContentLoaded", function(event) {
	(function () {
		var num = 13 + Math.floor(Math.random() * 13);
		//var num = 4;
		for(var i = 0; i < num; i++) {
			blockGenerator.renderBlock('');
		}
		statsEvents.init();
		blockEvents.noTextSelectionOnDblClick();
		popups.init();
		addBlock.init();
		svgSprite.init();
	}());
});