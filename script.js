var buttons = [
    { tag: "google-map", code: "<google-map latitude=\"37.77493\" longitude=\"-122.41942\"></google-map>", src: "bower_components/google-map/google-map.html" },
    { tag: "paper-button", code: "<paper-button raised style=\"background: #88f\">Button</paper-button>", src: "bower_components/paper-button/paper-button.html" },
    { tag: "qr-code", code: "<qr-code data=\"hello world!\" format=\"html\"></qr-code>", src: "bower_components/qr-code/src/qr-code.html" }
];

var timeout = false;

function updateCode() {
    var text = document.getElementById("code").value;
    document.getElementById("target").innerHTML = text;
}

function callUpdate(event) {
	if (event) {
		var key = event.which || event.keyCode;	
	    if (key === 13) { // 13 is enter
	    	updateCode();
	    	return;
	    }
    }    
    if (timeout) {
        window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(updateCode, 1000);
	
}

function clickTagButton(event) {
    document.getElementById("code").value += "\n" + this.hiddenCode;
    callUpdate({keyCode:13});
}

function checkImports() {
    var boxes = document.querySelectorAll("#import-list li > input");

    var imports = document.querySelectorAll("head > link[rel='import']");
    for (var i = 0; i < imports.length; i++) {
         imports[i].remove();
    }
    var styles = document.querySelectorAll("head > style");
    for (var i = 0; i < styles.length; i++) {
        styles[i].remove();
    }
    var but = document.querySelectorAll("#buttons > button");
    for (var i = 0; i < but.length; i++) {
        but[i].remove();
    }

    document.getElementById("import").value = "";

    for (var i in boxes) {
        var checkBox = boxes[i];
        if (checkBox.checked) {
            var newImport = buttons[checkBox.componentNumber];
            var linkElement = document.createElement("LINK");
            linkElement.setAttribute("rel", "import");
            linkElement.setAttribute("href", newImport.src);
            document.getElementById("import").value += linkElement.outerHTML + "\r\n";
            var button = document.createElement("BUTTON");
            button.textContent = newImport.tag;
            button.hiddenCode = newImport.code;
            button.addEventListener("click", clickTagButton);
            document.querySelector("head").appendChild(linkElement);
            document.getElementById("buttons").appendChild(button);
        }
    }
}

function menuOpen(e) {
    document.getElementById("floating-menu").style.display = "block";
}

function menuClose(e) {
    document.getElementById("floating-menu").style.display = "none";
    checkImports();
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("code").addEventListener("keyup", callUpdate);

    var list = document.getElementById("import-list");
    for (var i in buttons) {
        var element = document.createElement("LI");
        var checkBox = document.createElement("INPUT");
        checkBox.setAttribute("type", "checkbox");
        checkBox.componentNumber = i;
        element.appendChild(checkBox);
        var text = document.createElement("SPAN");
        text.textContent = buttons[i].tag + ": " + buttons[i].src;
        element.appendChild(text);
        list.appendChild(element);
    }

    document.getElementById("choose-import").addEventListener("click", menuOpen);
    document.getElementById("confirm-import").addEventListener("click", menuClose);

    callUpdate();
});