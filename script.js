var buttons = [
    { id: "btn-googlemap", code: "<google-map latitude=\"37.77493\" longitude=\"-122.41942\"></google-map>" },
    { id: "btn-paperbutton", code: "<paper-button raised style=\"background: #88f\">Button</paper-button>" },
    { id: "btn-qr-code", code: "<qr-code data=\"hello world!\" format=\"html\"></qr-code>" }
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

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("code").addEventListener("keyup", callUpdate);


    for (var i in buttons) {
        var element = document.getElementById(buttons[i].id);
        element.hiddenCode = buttons[i].code;
        element.addEventListener("click", function (event) {
            document.getElementById("code").value += "\n" + this.hiddenCode;
            callUpdate({keyCode:13});
        });
    }

    callUpdate();
});