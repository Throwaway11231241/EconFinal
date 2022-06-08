/* 
 * Header Related
*/
function makeImage(source, height, width) {
	img = document.createElement("img");
	img.src = source;
	img.style.height = height
	img.style.width = width
	return img;
}

function Headerfix() {
	temp = 0;
	parent = document.getElementById("header1");
	parent2 = document.getElementById("header2");

	//Remove Children
	while (parent.firstChild) { parent.removeChild(parent.firstChild); }
	while (parent2.firstChild) { parent2.removeChild(parent2.firstChild); }

	if (window.innerWidth > 600) {
		calc = window.innerWidth - 600;
		temp1 = Math.floor(calc/1080)+1;
		parent.style.gridTemplateColumns = "repeat(" + temp1 + ", 1080px)";
		for (i = 0; i < temp1; i++) {
			parent.appendChild(makeImage("./Images/RoadHeader1.png", "80px", "1080px"));
		}
		temp2 = Math.floor(calc/513)+1;
		parent2.style.gridTemplateColumns = "repeat(" + temp2 + ", 513px)";
		for (i = 0; i < temp2; i++) {
			parent2.appendChild(makeImage("./Images/Sidewalk.png", "40px", "513px"));
		}
	}
}
Headerfix();
window.addEventListener('resize', Headerfix);

/* 
 * Footer Related
*
function Footerfix() {
	temp = 0;
	parent = document.getElementById("Footer");

	//Remove Children
	while (parent.firstChild) { parent.removeChild(parent.firstChild); }

	calc = window.innerWidth;
	temp = Math.floor(calc/180);
	parent.style.gridTemplateColumns = "repeat(" + temp + ", 180px) " + (calc-(temp)*180) + "px";
	for (i = 0; i < temp+1; i++) {
		parent.appendChild(makeImage("./Images/ParkingLot.png", "80px", "180px"));
	}
}
Footerfix();
window.addEventListener('resize', Footerfix);*/

/* 
 * Arrow Related (in Header)
*/
spd = 0;
accel = 0;
gotoXpos = (document.getElementById("TOC1").getBoundingClientRect().left+document.getElementById("TOC1").getBoundingClientRect().right)/2-80;
storedGoToX = (document.getElementById("TOC1").getBoundingClientRect().left+document.getElementById("TOC1").getBoundingClientRect().right)/2-80;
startXpos = -100;
inc = true;
swap = false;
num = 0;

function moveArrow(x) {
	//var rect = document.getElementById("TOC1").getBoundingClientRect();
	//console.log(rect.top, rect.right, rect.bottom, rect.left);
	if (x == 0) {
		/*if (num == 1) {
			gotoXpos = document.getElementById("TOC4").getBoundingClientRect().right + 150;
		} else {
			gotoXpos = -100;
		}*/
		gotoXpos = storedGoToX;
		startXpos = document.getElementById("ArrowTOC").getBoundingClientRect().left;
	} else {
		var rect = document.getElementById("TOC" + x).getBoundingClientRect();
		gotoXpos = (rect.right + rect.left) / 2 - 80;
		startXpos = document.getElementById("ArrowTOC").getBoundingClientRect().left;
	}
	mv = true;
	swap = false;
	if (startXpos < gotoXpos) {
		inc = true;
		accel = (50-spd)/100;
		num = 1;
	} else {
		inc = false;
		accel = (-50+spd)/100;
		num = 0;
	}
}
function casualMoveArrow() {
	startXpos = storedGoToX;
	mv = true;
	swap = false;
	startXpos = document.getElementById("ArrowTOC").getBoundingClientRect().left;
	if (startXpos < gotoXpos) {
		inc = true;
		accel = (50-spd)/100;
		num = 1;
	} else {
		inc = false;
		accel = (-50+spd)/100;
		num = 0;
	}
}

setInterval(function() {
	temp = document.getElementById("ArrowTOC");
	temp2 = document.getElementById("ArrowTOC").getBoundingClientRect().left;
	if (accel != 0 && Math.abs(accel) != Infinity) {
		if (!swap) {
			spd += accel;
			if (inc && temp2 > (gotoXpos+startXpos)/2) {
				swap = true;
				inc = !inc;
			}
			if (!inc && temp2 < (gotoXpos+startXpos)/2) {
				swap = true;
				inc = !inc;
			}	
		}	
		if (swap) {
			spd -= spd*spd/(gotoXpos - temp2)/4;
			if (inc && temp2 <= gotoXpos+5) {
				accel = 0;
			}
			if (!inc && temp2 >= gotoXpos-5) {
				accel = 0;
			}
		}
		temp.style.left = "" + (temp2 + spd) + "px";

		if (temp2 < -102) {
			spd = 0;
			temp.style.left = "-100px";
		}
		if (temp2 >= document.getElementById("TOC4").getBoundingClientRect().right + 10) {
			spd = 0;
			temp.style.left = "" + (document.getElementById("TOC4").getBoundingClientRect().right + 9) + "px";
		}
	} else {
		temp.style.left = gotoXpos + "px";
		spd = 0;
		accel = 0;
	}
}, 20);

/*
 * Everything Scrolling Related
*/
topOffset = 0;

function TOCClick(x) {
	if (x != 0) {
		window.scrollTo({
			top: window.innerHeight*x*.95-10,
			left: 0,
			behavior: 'smooth'
		});
	} else {
		window.scrollTo({
			top: window.innerHeight*0.18,
			left: 0,
			behavior: 'smooth'
		});
	}
}
window.onscroll = function (e) {
	scrollBehaviorFunction();
}
function shortCutCauseImLazy2(id, top, down, left, right, shown) {
	shortCutCauseImLazy1(id, top, down, left, right)
	document.getElementById(id).style.visibility = shown;
}
function shortCutCauseImLazy1(id, top, down, left, right) {
	document.getElementById(id).style.top = top + "%";
	document.getElementById(id).style.bottom = down + "%";
	document.getElementById(id).style.left = left + "%";
	document.getElementById(id).style.right = right + "%";
}
function FinalPositions(pageNum) {
	if (pageNum == 1) {
		shortCutCauseImLazy1("Image1", 0, 0, 0, 0);
		shortCutCauseImLazy1("Text1", 0, 0, 0, 0);
		shortCutCauseImLazy1("Title1", 5, 0, 1, 0);
	} else if (pageNum == 2) {
		shortCutCauseImLazy1("Image22", 0, 0, 0, 0);
		shortCutCauseImLazy1("Text2", 0, 0, 0, 0);
		shortCutCauseImLazy1("Title2", 5, 0, 1, 0);
	}
}
function scrollBehaviorFunction() {
	winheight = window.innerHeight || (document.documentElement || document.body).clientHeight;
	scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
	percentage = scrollTop/winheight*100/3;
	//console.log(percentage);
	document.getElementById("Workaround1").style.top = scrollTop + "px";
	document.getElementById("DimOutBackground").style.top = scrollTop + "px";
	document.getElementById("InsideOfMeDaddy").style.top = scrollTop+topOffset + "px";
	//Arrow Moves to right spot
	moveArrow(0);
	
	storedGoToX = (document.getElementById("TOC1").getBoundingClientRect().left+document.getElementById("TOC1").getBoundingClientRect().right)/2-80;
	if (percentage >= 0 && percentage < 5) {
		shortCutCauseImLazy2("Page1", 0, 0, 0, 0, "visible");
		shortCutCauseImLazy1("Image1", 30 - 6*percentage, 0, 0, 0);
		shortCutCauseImLazy1("Text1", 35 - 7*percentage, 0, 0, 0);
		shortCutCauseImLazy1("Title1", 5, 0, 1, 0);

		shortCutCauseImLazy2("Page1.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page3", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page3.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page4", 0, 0, 0, 0, "hidden");
		storedGoToX -= 5*(5-percentage);
	} else if (percentage >= 5 && percentage < 10) {
		shortCutCauseImLazy2("Page1", 0, 0, 0, 0, "visible");
		FinalPositions(1);

		shortCutCauseImLazy2("Page1.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page3", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page3.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page4", 0, 0, 0, 0, "hidden");
	} else if (percentage >= 10 && percentage < 25) {		
		shortCutCauseImLazy2("Page1", 0, 0, -13.39*(percentage-10), 0, "visible");
		FinalPositions(1);
		shortCutCauseImLazy2("Page1.5", 0, 0, -13.39*(percentage-10)+100, 0, "visible");
		shortCutCauseImLazy2("Page2", 0, 0, -13.39*(percentage-10)+200, 0, "visible");
		FinalPositions(2);
		shortCutCauseImLazy2("Page2.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page3", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page3.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page4", 0, 0, 0, 0, "hidden");
		storedGoToX += 150*(percentage-10)/15;
	} else if (percentage >= 25 && percentage < 33) {
		shortCutCauseImLazy2("Page2", 0, 0, 0, 0, "visible");
		FinalPositions(2);

		shortCutCauseImLazy2("Page1", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page1.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2.5", 100, 0, 200, 0, "hidden");
		shortCutCauseImLazy2("Page3", 200, 0, 200, 0, "hidden");
		shortCutCauseImLazy2("Page3.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page4", 0, 0, 0, 0, "hidden");
		storedGoToX += 150;
	} else if (percentage >= 33 && percentage < 53) {
		shortCutCauseImLazy2("Page1", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page1.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2", -15*(percentage-33), 0, 0, 0, "visible");
		shortCutCauseImLazy2("Page2.5", 100-15*(percentage-33), 0, 0, 0, "visible");
		shortCutCauseImLazy2("Page3", 300-15*(percentage-33), 0, 0, 0, "visible");
		shortCutCauseImLazy2("Page3.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page4", 0, 0, 0, 0, "hidden");
		storedGoToX += 150+150*(percentage-33)/20;
	} else if (percentage >= 53 && percentage < 66) {
		shortCutCauseImLazy2("Page1", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page1.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page3", 0, 0, 0, 0, "visible");
		shortCutCauseImLazy2("Page3.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page4", 0, 0, 0, 0, "hidden");
		storedGoToX += 300;
	} else if (percentage >= 66 && percentage < 91) {
		shortCutCauseImLazy2("Page1", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page1.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page3", 8*(percentage-66), 0, 8*(percentage-66), 0, "visible");
		shortCutCauseImLazy2("Page3.5", -100+8*(percentage-66), 0, -100+8*(percentage-66), 0, "visible");
		shortCutCauseImLazy2("Page4", -200+8*(percentage-66), 0, -200+8*(percentage-66), 0, "visible");
		storedGoToX += 300+150*(percentage-66)/25;
	} else if (percentage >= 91 && percentage <= 100) {
		shortCutCauseImLazy2("Page1", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page1.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page2.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page3", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page3.5", 0, 0, 0, 0, "hidden");
		shortCutCauseImLazy2("Page4", 0, 0, 0, 0, "visible");
		storedGoToX += 450;
	} else {
		/*window.scrollTo({
			top: document.body.clientHeight-100,
			left: 0,
			behavior: 'auto'
		});*/
		window.scrollTo(0, document.body.clientHeight-100);
		storedGoToX += 450;
	}
}
scrollBehaviorFunction();


/* 
 * Footer Related and other smaller resize things
*/
//footerOffset = 16;

//console.log(document.body.clientHeight + "     " + window.innerHeight);
function Resized() {
	//Arrow Moves to right spot
	moveArrow(0);
	//Arrow Length to prevent scrollbar from appearing
	document.querySelector(':root').style.setProperty("--lengthOfHeader", (document.body.clientWidth-2) + "px");
	//Cool Kid Height size
	store1 = 717*(window.innerHeight/720)-125;
	store2 = 1160*(window.innerWidth/1280);
	document.querySelector(':root').style.setProperty("--heightOfCoolKid", store1 + "px");
	document.querySelector(':root').style.setProperty("--lengthOfCoolKid", store2 + "px");
	//keeping Scroll bar size consistent
	document.querySelector('body').style.setProperty("height", (window.innerHeight*4) + "px");
	//Font Size consistancy
	store = Math.min((window.innerHeight/1280), (window.innerWidth/720));
	document.querySelector(':root').style.setProperty("--fontSizeMultiplier", store);
	//Make Arrows right size
	document.getElementById("Arrow1").style.width = store2 + "px";
	document.getElementById("Arrow1").style.height = store2*1217/2068 + "px";
	document.getElementById("Arrow1").style.top = (store1-store2*1217/2068)/2 + "px";
	document.getElementById("Arrow2").style.height = store1*2 + "px";
	document.getElementById("Arrow2").style.width = store1*2*1217/2068 + "px";
	document.getElementById("Arrow2").style.left = (store2-store1*2*1217/2068)/2 + "px";
	document.getElementById("Arrow3").style.height = store1 + "px";
	document.getElementById("Arrow3").style.width = store1 + "px";

	//Unity Game Size adjustor
	document.getElementById("unityContainer").style.width = store2*0.7 + "px";
	document.getElementById("unityContainer").style.height = store1*0.7 + "px";
	document.getElementById("InsideOfMeDaddy").style.width = store2*0.8 + "px";
	document.getElementById("InsideOfMeDaddy").style.height = store1*0.8 + "px";

	document.getElementById("InsideOfMeDaddy").style.left = (window.innerWidth-store2*0.8)/2 + "px";
	topOffset = (window.innerHeight-store1*0.8)/2;
	//Image Size Adjuster
	easierOnMe = document.getElementById("Image1");
	if (store1*1.1 < store2)  {
		easierOnMe.style.height = (store1 - 100*store)*.7 + "px";
		easierOnMe.style.width = ((store1 - 100*store)*.7)*16/9 + "px";
	} else {
		easierOnMe.style.width = store2 * 0.8 + "px";
		easierOnMe.style.height = store2 * 0.8*9/16 + "px";
	}
	/*easierOnMe = document.getElementById("Image2");
	if (store1-125*store < store2*.55) {
		easierOnMe.style.height = store1*.7 + "px";
		easierOnMe.style.width = (store1*.7)*895/1032 + "px";
	} else {
		easierOnMe.style.width = store2*.4*0.9 + "px";
		easierOnMe.style.height = store2*.4*0.9*1032/895 + "px";
	}*/
	easierOnMe = document.getElementById("Image22");
	if (store1*1.3 < store2) {
		easierOnMe.style.height = store1*.6 + "px";
		easierOnMe.style.width = (store1*.6)*1485/787 + "px";
	} else {
		easierOnMe.style.width = store2*0.9 + "px";
		easierOnMe.style.height = store2*0.9*787/1485 + "px";
	}
	easierOnMe = document.getElementById("Image3");
	if (store1*0.9 < store2/2) {
		easierOnMe.style.height = store1*.75 + "px";
		easierOnMe.style.width = (store1*.75)*600/507 + "px";
	} else {
		easierOnMe.style.width = store2*0.5 + "px";
		easierOnMe.style.height = store2*0.5*507/600 + "px";
	}
	easierOnMe = document.getElementById("Image4");
	if (store1*0.9 < store2/4) {
		easierOnMe.style.height = store1*0.25 + "px";
		easierOnMe.style.width = (store1*0.25)*177/132 + "px";
	} else {
		easierOnMe.style.width = store2*0.25 + "px";
		easierOnMe.style.height = store2*0.25*132/177 + "px";
	}
	

	/*Footer
	if (document.documentElement.clientHeight > document.body.clientHeight + footerOffset) {
		footerOffset = 16;
		document.documentElement.style.setProperty('--FooterPlacement', 'fixed');
	} else {
		footerOffset = 0;
		document.documentElement.style.setProperty('--FooterPlacement', 'relative');
	}*/
}
Resized();
window.addEventListener('resize', Resized);

//Makes Unity Project Appear
document.getElementById("Unity").onclick = function() {
	document.getElementById("DimOutBackground").style.visibility = "visible";
	document.getElementById("InsideOfMeDaddy").style.visibility = "visible";
	document.getElementById("InsideOfMeDaddy").style.overflow = "hidden";
	document.getElementById("InsideOfMeDaddy2").style.visibility = "visible";
	document.getElementById("InsideOfMeDaddy1").style.visibility = "hidden";
}
document.getElementById("Unity2").onclick = function() {
	document.getElementById("DimOutBackground").style.visibility = "visible";
	document.getElementById("InsideOfMeDaddy").style.visibility = "visible";
	document.getElementById("InsideOfMeDaddy").style.overflow = "auto";
	document.getElementById("InsideOfMeDaddy2").style.visibility = "hidden";
	document.getElementById("InsideOfMeDaddy1").style.visibility = "visible";
}
function goback() {
	document.getElementById("InsideOfMeDaddy").scrollTo(0, 0);
	document.getElementById("DimOutBackground").style.visibility = "hidden";
	document.getElementById("InsideOfMeDaddy").style.visibility = "hidden";
	document.getElementById("InsideOfMeDaddy2").style.visibility = "hidden";
	document.getElementById("InsideOfMeDaddy1").style.visibility = "hidden";
}