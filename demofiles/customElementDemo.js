// Create a new prototype based on 'HTMLElement'
var superParagraphProto = Object.create(HTMLElement.prototype);

// Callback for customizing prototype after instance inserted into DOM
superParagraphProto.createdCallback = function() {
	// create shadow root as in shadow-demo
	var shadow = this.createShadowRoot();
	var replicate = document.createElement('p');
	replicate.textContent = this.textContent;
	var newElement = document.createElement('div');
	newElement.setAttribute("style", "padding:10px;background:#F0F0F0;color:#FF33CC;font:bold 22px ‘Palatino Linotype’, ‘Book Antiqua’, Palatino, serif;border-radius:10px;width:300px;margin:20px;text-align:center;");
	newElement.appendChild(replicate);
	shadow.appendChild(newElement);
};

// Declare new custom element using the customized prototype
var superParagraph = document.registerElement('super-paragraph', {
	prototype: superParagraphProto
});