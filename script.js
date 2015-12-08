var buttons = [
    { tag: "google-map", code: "<google-map latitude=\"37.77493\" longitude=\"-122.41942\"></google-map>", src: "bower_components/google-map/google-map.html" },
    { tag: "paper-button", code: "<paper-button raised style=\"background: #88f\">Button</paper-button>", src: "bower_components/paper-button/paper-button.html" },
    { tag: "qr-code", code: "<qr-code data=\"hello world!\" format=\"html\"></qr-code>", src: "bower_components/qr-code/src/qr-code.html" },
    { tag: "paper-color-circle", code: "<paper-color-circle></paper-color-circle>", src: "bower_components/paper-color-picker/paper-color-circle.html" },
    { tag: "paper-color-input", code: "<paper-color-input></paper-color-input>", src: "bower_components/paper-color-picker/paper-color-input.html" },
    { tag: "paper-date-picker", code: "<paper-date-picker></paper-date-picker>", src: "bower_components/paper-date-picker/paper-date-picker.html" },
    { tag: "paper-slider", code: "<paper-slider></paper-slider>", src: "bower_components/paper-slider/paper-slider.html" },
    { tag: "paper-toast", code: "<paper-toast text=\"Hello world!\" opened></paper-toast>", src: "bower_components/paper-toast/paper-toast.html" },
    { tag: "gold-email-input", code: "<gold-email-input></gold-email-input>", src: "bower_components/gold-email-input/gold-email-input.html" },
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
    for (var i in boxes) {
        var checkBox = boxes[i];
        if (checkBox.checked && !checkBox.disabled) {
            checkBox.disabled = true;
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

    //demobutton eventlistener
    document.getElementById("shadowDemo").addEventListener("click", function() {
        document.getElementById('code').value += "\r\n\r\n<p>I'm a normal paragraph</p>\r\n<p id='paragraph'>I'm a paragraph tuned with Shadow Root</p>";
        updateCode();
        importScript('shadowDemo.js');
    });

    var list = document.getElementById("import-list");
    for (var i in buttons) {
        var element = document.createElement("LI");
        var checkBox = document.createElement("INPUT");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("id", "import-box-" + i);
        checkBox.componentNumber = i;
        if (buttons[i].tag == "paper-button") {
            checkBox.checked = true;
        }
        element.appendChild(checkBox);
        var text = document.createElement("LABEL");
        text.textContent = buttons[i].tag + ": " + buttons[i].src;
        text.setAttribute("for", "import-box-" + i);
        element.appendChild(text);
        list.appendChild(element);
    }

    menuClose();

    document.getElementById("choose-import").addEventListener("click", menuOpen);
    document.getElementById("confirm-import").addEventListener("click", menuClose);

    callUpdate();
});




function importScript(scriptPath) {
    var newScript = document.createElement("script");
    newScript.type = "application/javascript";
    newScript.src = 'demofiles/' + scriptPath;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(newScript);
    importVerboseText(scriptPath);
}

function importVerboseText(path) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("import").value += xhttp.responseText;
        }
    };
    xhttp.open("GET", "demofiles/" + path, true);
    xhttp.send();
}