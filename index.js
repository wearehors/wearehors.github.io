function MirrorType() {
	typed.innerHTML = youTyping.value;
	youTyping.focus();
}

function EnterCommand() {
	var newtyped = document.createElement("p");
	newtyped.classname = "command";
	commandWindow.appendChild(newtyped);
	typed = newtyped;
	youTyping.value = "";
}

$(document).ready(function() {
	commandWindow = document.getElementById("commandWindow");
	typed = document.getElementById("typed");
	youTyping = document.getElementById("youTyping");
	youTyping.oninput = MirrorType;
	youTyping.onpropertychange = youTyping.oninput;
	MirrorType();

	$(document).click(function() {
    	MirrorType();
	});

	$("#youTyping").keyup(function(event){
    	if(event.keyCode == 13){
        	EnterCommand();
    	}
	});
});
