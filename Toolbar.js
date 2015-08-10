function Toolbar(el, buffer) {
	this.element = el;
	this.buffer = buffer;

	this.showOnSelection();
	this.clickBoldToBold();
	this.clickItalicToItalic();
	this.clickStrikeToStrike();
}

Toolbar.prototype.showOnSelection = function() {
	selectionchange.start(this.buffer.doc);
	this.buffer.doc.addEventListener('selectionchange', this.showAtSelection.bind(this));
};

Toolbar.prototype.showAtSelection = function() {
	var rect = this.buffer.getSelectionPosition();
	if (!rect || rect.width == 0) {
		this.hide();
	} else {
		this.showAtRect(rect);
	}
};

Toolbar.prototype.showAtRect = function(rect) {
	var x = rect.left + rect.width/2;
	var y = rect.top;
	var pt = { x: x, y: y };
	this.showAtPoint(pt);
};

Toolbar.prototype.showAtPoint = function(pt) {
	var width = this.element.offsetWidth;
	console.log(width)
	var height = this.element.offsetHeight;
	var offset = this.buffer.offset();
	var left = Math.round(pt.x - width/2) + offset.left;
	var top = Math.round(pt.y - height) + offset.top;
	this.element.style.left = left + 'px';
	this.element.style.top = top + 'px';
	var el = this.element;
	setTimeout(function() {
		el.classList.add('is-active');
	}, 150);
};

Toolbar.prototype.hide = function() {
	this.element.classList.remove('is-active');
};

Toolbar.prototype.clickBoldToBold = function() {
	var bold = document.getElementById("bold");
	var self = this;
	bold.addEventListener("click", function(ev) {
		ev.preventDefault();
		self.buffer.execCommand("bold");
	});
};

Toolbar.prototype.clickItalicToItalic = function() {
	var italic = document.getElementById("italic");
	var self = this;
	italic.addEventListener("click", function(ev) {
		ev.preventDefault();
		self.buffer.execCommand("italic");
	});
};

Toolbar.prototype.clickStrikeToStrike = function() {
	var strike = document.getElementById("strike");
	var self = this;
	strike.addEventListener("click", function(ev) {
		ev.preventDefault();
		self.buffer.execCommand("strikeThrough");
	});
};
