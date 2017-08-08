glossary = ["3d printing",
			"additivism",
			"computer vision",
			"cryptocurrency",
			"cyberfeminism", 
			"cybersecurity",
			"cybersurveillance",
			"encryption",
			"ether",
			"facial recognition",
			"gynepunk",
			"hacktivism",
			"open source",
			"phishing",
			"pirate radio",
			"poetic terrorism",
			"private key",
			"monkeywrenching",
			"reproductive justice", 
			"remote access trojan",
			"social engineering",
			"sousveillance",
			"speculative design",
			"tunneling protocol"
			];

colors = ["rgba(87,186,225,1)", 
			"rgba(192,210,64,1)", 
			"rgba(228,65,70,1)", 
			"rgba(145,41,141,1)", 
			"rgba(87,186,225,1)"];

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
		fillInGlossary();

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

function fillInGlossary() {
	glossaryDom = document.getElementById("glossary");
	
	glossary.forEach(function(term) {
		termColor = colors[Math.floor(Math.random()*colors.length)];
    	var markup = "<a class='glossaryTerm' rel='nofollow' style='color: " + termColor + "' href='https://duckduckgo.com/?q=" + term + "'>" + term + "</a>";
    	glossaryDom.innerHTML = glossaryDom.innerHTML + markup;
	});
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
