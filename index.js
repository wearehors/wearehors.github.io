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
showingDialog = false;

isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

function MirrorType(entry) {
	if (!isMobile) {
		entry = youTyping.value;
	}

	typed.innerHTML = entry;
	youTyping.focus();

	if (!pastIntro && typed.innerHTML.length > 0) {
		tutorial.style.display = "none";
	}
}

function AddLineBreak() {
	var linebreak = document.createElement("p");
	commandWindow.appendChild(linebreak);
}

function LogIn(name) {
	AddLineBreak();

	var response = document.createElement("h3");
	response.innerHTML = "Welcome, " + name + ".";
	commandWindow.appendChild(response);
	NewCommand();

	$("#mainContent").fadeIn("slow");
	$("#logo").addClass("accessed");
	fillInGlossary();

	pastIntro = true;

	if (isMobile) {
		$("#mainContent").click(function() {
			ResetPage();
		});
	}

}

function NewCommand() {
	AddLineBreak();

	var newtyped = document.createElement("span");
	newtyped.classname = "command";
	commandWindow.appendChild(newtyped);

	commandWindow.appendChild(fakeCursor);
	typed = newtyped;
	youTyping.value = "";
}

function EnterCommand() {

	if (!pastIntro) {
		LogIn(youTyping.value);
	} else {
		NewCommand();
	}
}

function fillInGlossary() {
	glossaryDom = document.getElementById("glossary");
	
	glossary.forEach(function(term) {
		termColor = colors[Math.floor(Math.random()*colors.length)];
    	var markup = "<a class='glossaryTerm' rel='nofollow' target='_blank' style='color: " + termColor + "' href='https://duckduckgo.com/?q=" + term + "'>" + term + "</a>";
    	glossaryDom.innerHTML = glossaryDom.innerHTML + markup;
	});
}

function showSubcontent($this) {
	$this.next().fadeIn();
	showingDialog = true;
}

function hideDialogs() {
	if (showingDialog) {
		$(".subcontent").fadeOut();
		showingDialog = false;
	}

	if (showingEmail) {
		hideEmail();
	}
}

showingEmail = false;
function showEmail() {
	if (!showingEmail) {
		$("#emailIcon").hide();
		$("#secretEmail").show();
		showingEmail = true;
	} else {
		hideEmail();
	}
}

function hideEmail() {
	$("#emailIcon").show();
	$("#secretEmail").hide();
	showingEmail = false;
}

function mobileEvents() {
	$("#login").hide();

	var person = prompt("New site, who dis?", "");

	if (person != null) {
		MirrorType(person);
    	LogIn(person);
	}
}

function desktopEvents() {
	youTyping = document.getElementById("youTyping");
	youTyping.oninput = MirrorType;
	youTyping.onpropertychange = youTyping.oninput;
	MirrorType();

	$("#login").submit(function(){ return false; });

	$("#youTyping").keyup(function(event){
    	if(event.keyCode == 13){
        	EnterCommand();
    	}
	});
}

function ResetPage() {
	if (pastIntro && (showingEmail || showingDialog)) {
		hideDialogs();
	} else if (!isMobile) {
		console.log("mirror");
    	MirrorType();
	}
}

$(document).ready(function() {
	fakeCursor = document.getElementById("fakeCursor");
	commandWindow = document.getElementById("commandWindow");
	typed = document.getElementById("typed");
	tutorial = document.getElementById("tutorial");

	$("body").css("min-height", $(document).height());
	$("body").click(function() {
		ResetPage();
	});

	$("#reveal_tour").click(function(e) {
		e.stopPropagation(); 
		showSubcontent($(this)); 
	});

	$("#reveal_email").click(function(e) { 
		e.stopPropagation();
		showEmail($(this)); 
	});

	$(".subcontent").click(function(e) {
    	e.stopPropagation(); // This is the preferred method.
    	return false;        // This should not be used unless you do not want
                         // any click events registering inside the div
	});

	if (isMobile) {
		mobileEvents();
	} else {
		desktopEvents();
	}

	
});
