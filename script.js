var buttons = [
    { tag: "googlemap", code: "<google-map latitude=\"37.77493\" longitude=\"-122.41942\"></google-map>", src: "bower_components/google-map/google-map.html" },
    { tag: "paperbutton", code: "<paper-button raised style=\"background: #88f\">Button</paper-button>", src: "bower_components/paper-button/paper-button.html" },
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

    for (var i in boxes) {
        var checkBox = boxes[i];
        if (checkBox.checked) {
            var newImport = buttons[checkBox.componentNumber];
            var linkElement = document.createElement("LINK");
            linkElement.setAttribute("rel", "import");
            linkElement.setAttribute("href", newImport.src);
            document.querySelector("head").appendChild(linkElement);
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
        //var element = document.getElementById(buttons[i].id);
        //element.hiddenCode = buttons[i].code;
        //element.addEventListener("click", function (event) {
        //    document.getElementById("code").value += "\n" + this.hiddenCode;
        //    callUpdate({keyCode:13});
        //});
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