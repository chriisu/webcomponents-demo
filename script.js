document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("code").addEventListener("keyup", function (event) {
        var text = this.value;
        document.getElementById("target").innerHTML = text;
    });
    var text = document.getElementById("code").value;
    document.getElementById("target").innerHTML = text;
});