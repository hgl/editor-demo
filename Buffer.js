function Buffer(editor) {
	this.editor = editor;
	this.container = editor.getContentAreaContainer();
	this.iframe = $(this.container).children('iframe')[0];
	this.win = editor.getWin();
	this.doc = editor.getDoc();
	this.body = editor.getBody();
}

Buffer.prototype.getSelectionRange = function() {
	var sel = this.win.getSelection();
	if (!sel.rangeCount) return;
	return sel.getRangeAt(0);
};

Buffer.prototype.execCommand = function(cmd) {
	this.editor.execCommand(cmd);
};

Buffer.prototype.isCommandActive = function(cmd) {
	return this.getSelectionRange() &&
		this.scribe.getCommand(cmd).queryState();
};

Buffer.prototype.isCommandApplicable = function(cmd) {
	return this.getSelectionRange() &&
		this.scribe.getCommand(cmd).queryEnabled();
};

Buffer.prototype.getSelectionPosition = function() {
	var range = this.getSelectionRange();
	if (!range) return;
	var rect = range.getBoundingClientRect();
	if (
		rect.left === 0  &&
		rect.top === 0 &&
		rect.width === 0 &&
		rect.height === 0
	) {
		var probe = this.doc.createElement('span');
		range.insertNode(probe);
		rect = probe.getBoundingClientRect();
		[probe.nextSibling, probe.previousSibling].forEach(function(node) {
			if (
				node &&
				node.nodeType === Node.TEXT_NODE &&
				node.data === ''
			) {
				node.parentNode.removeChild(node);
			}
		});
		probe.parentNode.removeChild(probe);
	}
	return rect;
};

Buffer.prototype.offset = function() {
	return $(this.container).offset();
}
