// Create Shadow root on paragraph id='paragraph':
var host = document.querySelector('#paragraph');
var shadow = host.createShadowRoot();

// Replicate the paragraph:
var replicate = document.createElement('p');
replicate.textContent = host.textContent;

// Create a new div element with CSS styling:
var newElement = document.createElement('div');
newElement.setAttribute("style", "padding:10px;background:#F0F0F0;color:#FF33CC;font:bold 22px ‘Palatino Linotype’, ‘Book Antiqua’, Palatino, serif;border-radius:10px;width:300px;margin:50px;text-align:center;");

// Append the replicate into the new div element:
newElement.appendChild(replicate);

// Append the new div element to Shadow root:
shadow.appendChild(newElement);