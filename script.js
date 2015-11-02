var buttons = [
    {id: "btn-googlemap", code: "<google-map latitude=\"37.77493\" longitude=\"-122.41942\"></google-map>"}
]

function updateCode() {
    var text = document.getElementById("code").value;
    document.getElementById("target").innerHTML = text;
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("code").addEventListener("keyup", updateCode);

    for (var i in buttons) {
        var element = document.getElementById(buttons[i].id);
        element.hiddenCode = buttons[i].code;
        element.addEventListener("click", function (event) {
            document.getElementById("code").value += "\n" + this.hiddenCode;
            updateCode();
        });
    }

    updateCode();
});