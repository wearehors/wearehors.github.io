pastIntro = false;

function MirrorType() {
	typed.innerHTML = youTyping.value;
	youTyping.focus();

	if (!pastIntro && typed.innerHTML.length > 0) {
		tutorial.style.display = "none";
	}
}

function AddLineBreak() {
	var linebreak = document.createElement("p");
	commandWindow.appendChild(linebreak);
}

function EnterCommand() {

	if (!pastIntro) {
		AddLineBreak();

		var response = document.createElement("h3");
		response.innerHTML = "Welcome, " + youTyping.value + ".";
		commandWindow.appendChild(response);

		$("#mainContent").fadeIn("slow");
		$("#logo").addClass("accessed");

		pastIntro = true;
	}

	AddLineBreak();

	var newtyped = document.createElement("span");
	newtyped.classname = "command";
	commandWindow.appendChild(newtyped);

	commandWindow.appendChild(fakeCursor);
	typed = newtyped;
	youTyping.value = "";
}

$(document).ready(function() {
	tutorial = document.getElementById("tutorial");
	fakeCursor = document.getElementById("fakeCursor");
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
