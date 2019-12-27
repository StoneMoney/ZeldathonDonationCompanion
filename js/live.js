var testMode = false;
// The above flag forces test mode, which removes the time restriction for content appearing
if (document.readyState === 'complete') {
	pageLoaded()
}
var ready = false;
var scheduleReady = false;
var docsReady = false;
var blessRemover = false;
var possibleWindows = ['schedule', 'docs'];
// Options for the observer (which mutations to observe)
var config = { attributes: false, childList: true, subtree: false };
var zthonTeam = ["0rganics","8bitbrigadier","abra","ainkayes","animejessica","arcticlight","artsierosie","bestestcat","betsy7cat","brokensword9","brooky120","bushelofchewygoodness","captain_trina","choco","ctotheatherine","dannychipotle","darkdecay","daskippy","dinos","diredwarf","douggernaught","fartgarfunkle_","femtastic","fistyface","frosty10001","funnyman3595","gannon11","gemsmrt","greatscottlp","gymnast86","halfemptyetank","hipsterharbinger","insaneintherain","jacksonparodi","john_mackay13","justbluey","jyggy11","kainmoogle","kampydk","kellycelina","klinkit","kortraction","legosjedi","letsnarvik","lindsaypez","lizerdoo","lucarimew","lukethespoo","lyricofwisdom","marishkabob","marzakay","metalninjawolf","milotic","mojofibers","nytsura","oc1_","omgitsmonika","pandafloof","paulblart","phonic88","pingpong980","ppeach2010","retsam19","ridleypals","romscout","sab_irene","samanthanatalie","serperior","shado_temple","shoop631","silverdslite","simulatedgreg","smoople","soaringchris","starrlett20","stinusmeret","supermcgamer","surfimp","swchris","tbforgood","tekkirotaru","teracmusic","thatoneyetee","the8bitdrummer","thedivinebacon","thelyterage","thepurplesteph","thezwolfenstein","thunderscott","trainertrevino","tylinos","valor6","vidya","waluigi","zelda_queen","zeldathonbot","zeldathonmods","ztechdesk","first_bot","dynomation","flyingludicolo","slamb0b","blockheadstudios","jb2448","irisangel","math_effect","zic3","skootish","melvaker","loveshorsesgirl","drthrex","brittanysaturn","DylanHatesTwitch","ItsTheHutch","ptrbob","tabetaicooking","ynkebour","iylila"]

var ffz = false;
chrome.runtime.onMessage.addListener(function (inMessage, callback) {
	loadSchedule(JSON.parse(inMessage.schedule)[0][0]['items'])
});
// Callback function to execute when mutations are observed
var callback = function (mutationsList, observer) {
	for (var mutation of mutationsList) {
		if (mutation.type == 'childList') {
			var ffzDetector = document.querySelector("figure.ffz-i-zreknarf")
			if (ffzDetector != undefined || ffzDetector != null && ffz != true) {
				ffz = true;
			}
			var chatLine = mutation.addedNodes[0]
			if (chatLine != undefined) {
				if (chatLine.querySelectorAll('span.text-fragment').length > 0) {
					try {
						var username = chatLine.querySelector("span.chat-author__display-name").innerHTML.toLowerCase()
						var badgeCollection = chatLine.querySelector("span:not([class])")
						var text = chatLine.querySelector("span.text-fragment")
						if (text.innerHTML.toLowerCase().indexOf("bless") == 0 && blessRemover) {
							chatLine.parentNode.removeChild(chatLine);
						}
						if (username == "stonemoney533") {
							chatLine.querySelector("span.chat-author__display-name").classList.add("godglow")
						}
						if (zthonTeam.includes(username)) {
							if (!ffz) {
								badgeCollection.insertAdjacentElement("afterbegin", createChatBadge("https://i.imgur.com/9XxOpco.png", "Zeldathon Attendie"));
							} else {
								var ffzBadgeCollection = chatLine.querySelector("span.chat-line__message--badges")
								ffzBadgeCollection.insertAdjacentElement("afterBegin", createChatBadge("https://i.imgur.com/9XxOpco.png", "Zeldathon Attendie"));
							}
						}
					} catch (err) {
						console.log(err)
					}
				} else if (ffz && chatLine.querySelectorAll('span.message')[0].querySelectorAll('div:not(.text-fragment)').length > 0 && blessRemover) {
					var emote = chatLine.querySelectorAll('span.message')[0].querySelectorAll('div:not(.text-fragment)')[0]
					if (emote.querySelectorAll('img')[0].getAttribute('src') == "//cdn.frankerfacez.com/afcaff4970e20b9efe937b0a5ad65a4a.png") {
						chatLine.parentNode.removeChild(chatLine);
					}
				}
			}
		}
	}
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

window.onload = function () {
	pageLoaded()
}
function pageLoaded() {
	setTimeout(function () {
		chrome.storage.sync.get(['isBless'], function (result) {
			if (result.isBless != true && result.isBless != false) {
				chrome.storage.sync.set({ isBless: false }, function () { });
			}
			blessRemover = result.isBless;
		});
		var date = new Date();
		var chat = document.querySelector("div[role='log']");
		// Check if zeldathon is happening, then apply changes
		// Alternatively testMode set at line 1 will force changes to occur
		if (
			(Date.UTC(2019, 12, 25) < Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate())
			&& Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate()) < Date.UTC(2020, 1, 4)) 
			|| testMode
		   ) 
		{
			chrome.runtime.sendMessage({ request: "schedule" });
			loadDocs();
			document.querySelector("p[data-test-selector='chat-room-header-label']").innerHTML = "Zeldathon Forces"
			console.log('Zeldathon is happening!!')
			var injectionPoint = document.querySelector("div.channel-header__right")
			injectionPoint.insertAdjacentElement("beforeend", constructButton("Donate", "donate", false))
			var tablist = document.querySelector("ul[role='tablist']")
			tablist.insertAdjacentElement("beforeend", constructHeaderItem("Shirts", "http://theyetee.com"));
			tablist.insertAdjacentElement("beforeend", constructHeaderItem("Team", "http://zeldathon.net/team"));
			var schedule = constructHeaderItem("Schedule", "#");
			schedule.addEventListener('mouseup', toggleVisibility)
			tablist.insertAdjacentElement("beforeend", schedule);
			var docs = constructHeaderItem("Docs", "#")
			docs.addEventListener('mouseup', toggleVisibilityDocs);
			tablist.insertAdjacentElement("beforeend", docs);
			document.getElementById("donate").addEventListener("click", donatePage)
		}
		ready = true;
		observer.observe(chat, config);
		tabSize();
	}, 3000)
}
function donatePage() {
	var newwindow = window.open("http://donate.zeldathon.net/", 'name', 'height=600,width=400,titlebar=no,menubar=no,location=yes,left=10');
	if (window.focus) { newwindow.focus() }
}

//create a chat badge, matching the CSS of twitch
function createChatBadge(subimg, subtext) {
	var badge = document.createElement("a")
	badge.setAttribute("data-a-target", "chat-badge")
	var img = document.createElement("img")
	img.setAttribute("src", subimg);
	img.setAttribute("alt", subtext);
	img.classList.add("chat-badge")
	badge.insertAdjacentElement("beforeend", img)
	return badge;
}
//create a header item, matching the CSS of twitch
function constructHeaderItem(mainText, href) {
	var sContainer = document.createElement("li")
	sContainer.href = href;
	sContainer.setAttribute("id", mainText.replace(" ", "-"));
	sContainer.setAttribute("target", "_blank")
	sContainer.classList.add("tw-align-items-center")
	sContainer.classList.add("tw-c-text-base");
	sContainer.classList.add("tw-flex-grow-0");
	sContainer.classList.add("tw-full-height");
	sContainer.classList.add("tw-justify-content-center");
	sContainer.classList.add("tw-tabs__tab");
	var container = document.createElement("a")
	container.classList.add("tw-block")
	container.classList.add("tw-c-text-inherit");
	container.classList.add("tw-full-width");
	container.classList.add("tw-full-height");
	container.classList.add("tw-interactive");
	container.classList.add("tw-pd-l-1");
	container.classList.add("tw-pd-r-1");
	container.classList.add("tw-tab-item");
	container.href = href;
	var twitchStyleItem = document.createElement("span");
	twitchStyleItem.classList.add("tw-align-center");
	twitchStyleItem.classList.add("tw-flex");
	twitchStyleItem.classList.add("tw-flex-column");
	twitchStyleItem.classList.add("tw-full-height");
	twitchStyleItem.classList.add("tw-font-size-5");
	twitchStyleItem.classList.add("tw-regular");
	twitchStyleItem.insertAdjacentText('afterbegin', mainText);
	container.insertAdjacentElement("afterBegin", twitchStyleItem);
	sContainer.insertAdjacentElement("afterBegin", container)
	return sContainer;
}
//create a button, matching the CSS of twitch
function constructButton(mainText, id, pad) {
	var container = document.createElement("div");
	if (pad) {
		container.classList.add("tw-pd-x-1");
	}
	var twitchStyleButton = document.createElement("button");
	twitchStyleButton.classList.add("tw-interactive");
	twitchStyleButton.classList.add("tw-mg-l-1");
	twitchStyleButton.classList.add("tw-button");
	twitchStyleButton.classList.add("tw-core-button--primary");
	var twitchStyleButtonSubclass = document.createElement("span");
	twitchStyleButtonSubclass.classList.add("tw-button__text");
	var twitchStyleButtonSubclassText = document.createElement("div");
	twitchStyleButtonSubclassText.classList.add("tw-flex");
	twitchStyleButtonSubclassText.insertAdjacentHTML("afterBegin", "<span>" + mainText + "</span>");
	twitchStyleButton.setAttribute("id", id);
	twitchStyleButtonSubclass.insertAdjacentElement("afterBegin", twitchStyleButtonSubclassText);
	twitchStyleButton.insertAdjacentElement("afterBegin", twitchStyleButtonSubclass);
	container.insertAdjacentElement("afterBegin", twitchStyleButton)
	return container;
}

window.addEventListener('resize', tabSize);

// resize tabs
function tabSize() {
	var w = window.innerWidth;
	if (w > 1625) {
		document.getElementById("Shirts").hidden = false;
		document.getElementById("Docs").hidden = false;
		document.getElementById("Schedule").hidden = false;
		document.getElementById("Team").hidden = false;
	} else if (w > 1545) {
		document.getElementById("Shirts").hidden = true;
		document.getElementById("Docs").hidden = false;
		document.getElementById("Schedule").hidden = false;
		document.getElementById("Team").hidden = false;
	} else if (w > 1500) {
		document.getElementById("Shirts").hidden = true;
		document.getElementById("Docs").hidden = false;
		document.getElementById("Schedule").hidden = false;
		document.getElementById("Team").hidden = true;
	} else if (w > 1430) {
		document.getElementById("Shirts").hidden = true;
		document.getElementById("Docs").hidden = false;
		document.getElementById("Schedule").hidden = true;
		document.getElementById("Team").hidden = true;
	} else if (w > 1325) {
		document.getElementById("Shirts").hidden = true;
		document.getElementById("Docs").hidden = true;
		document.getElementById("Schedule").hidden = true;
		document.getElementById("Team").hidden = true;
	}
}
function toggleVisibility() {
	if (scheduleReady && docsReady) {
		document.getElementById('docs').style.opacity = 0;
		setTimeout(function () {
			document.getElementById('docs').style.visibility = 'hidden'
		}, 1000)
		var thing = document.getElementById('schedule');
		var tabitem = document.getElementById('Schedule').querySelector('span');
		if (thing.style.opacity == 0) {
			thing.style.opacity = .98;
			tabitem.classList.add('tw-bold');
			tabitem.classList.remove('tw-regular');
			thing.style.visibility = 'visible'
		} else {
			thing.style.opacity = 0;
			tabitem.classList.add('tw-regular');
			tabitem.classList.remove('tw-bold');
			setTimeout(function () {
				thing.style.visibility = 'hidden'
			}, 1000)
		}
	}
}
function toggleVisibilityDocs() {
	if (scheduleReady && docsReady) {
		document.getElementById('schedule').style.opacity = 0;
		setTimeout(function () {
			document.getElementById('schedule').style.visibility = 'hidden'
		}, 1000)
		var thing = document.getElementById('docs');
		var tabitem = document.getElementById('Docs').querySelector('span');
		if (thing.style.opacity == 0) {
			thing.style.opacity = .98;
			thing.style.visibility = 'visible'
			tabitem.classList.add('tw-bold');
			tabitem.classList.remove('tw-regular');
		} else {
			thing.style.opacity = 0;
			tabitem.classList.add('tw-regular');
			tabitem.classList.remove('tw-bold');
			setTimeout(function () {
				thing.style.visibility = 'hidden'
			}, 1000)
		}
	}
}
function loadSchedule(stuff) {
	var now = Date.now();
	var scheduleTableHeader = document.createElement("h3")
	scheduleTableHeader.classList.add("tw-c-background-base")
	scheduleTableHeader.insertAdjacentText("afterbegin", "[X] ZDC Quick Schedule (upcoming games)")
	scheduleTableHeader.addEventListener('mouseup', toggleVisibility)
	var scheduleTable = document.createElement("div")
	scheduleTable.setAttribute('id', 'schedule')
	scheduleTable.style.opacity = 0;
	scheduleTable.classList.add("schedule-box")
	scheduleTable.classList.add("tw-c-background-base")
	scheduleTable.classList.add("root-scrollable__wrapper")

	stuff.forEach(function (scheduleItem) {
		var scheduleRow = document.createElement("div")
		scheduleRow.classList.add("schedule-row")
		var scheduleTime = document.createElement("div")
		scheduleTime.classList.add("time")
		var date = new Date(scheduleItem.start_at)

		scheduleTime.insertAdjacentText("afterbegin", date.toLocaleString())

		var scheduleRunner = document.createElement("div")
		scheduleRunner.classList.add('runners')
		scheduleItem.players.forEach(function (player, i) {
			scheduleRunner.insertAdjacentText("beforeend", player)
			if (i + 1 !== scheduleItem.players.length) {
				scheduleRunner.insertAdjacentText("beforeend", ', ')
			}
		})

		var scheduleGame = document.createElement("div")
		scheduleGame.classList.add("game")
		scheduleGame.insertAdjacentText('afterbegin', scheduleItem.name)
		scheduleRow.classList.add("schedule-item")
		scheduleRow.insertAdjacentElement("afterbegin", scheduleRunner)
		scheduleRow.insertAdjacentElement("afterbegin", scheduleGame)
		scheduleRow.insertAdjacentElement("afterbegin", scheduleTime)
		if (now < date.getTime()) {
			scheduleTable.insertAdjacentElement("beforeend", scheduleRow)
		}
	})
	scheduleTable.insertAdjacentElement("afterbegin", scheduleTableHeader)
	scheduleTable.style.visibility = 'hidden';
	document.body.insertAdjacentElement('afterbegin', scheduleTable)
	scheduleReady = true;
}
function loadDocs() {
	var now = Date.now();
	var docsTableHeader = document.createElement("h3")
	docsTableHeader.classList.add("tw-c-background-base")
	docsTableHeader.insertAdjacentText("afterbegin", "[X] ZDC Docs Navigator")
	docsTableHeader.addEventListener('mouseup', toggleVisibilityDocs)
	var docsTable = document.createElement("div")
	docsTable.setAttribute('id', 'docs')
	docsTable.style.opacity = 0;
	docsTable.classList.add("docs-box")
	docsTable.classList.add("tw-c-background-base")
	docsBody = document.createElement('div')
	docsBody.innerHTML = ('<a href="https://docs.google.com/spreadsheets/d/1nT8vmOsvK4eLEaIJfeT-tU0cPVSQ1-Ue5JpFk5sMXS8/edit#gid=1609381904"><h4>Current Marathon</h4></a><ul>		<li>Secret Sounds</li>		<li>Clips & Event Logs</li>		<li>Per-Run Statistics</li>	</ul>	<a href="https://docs.google.com/spreadsheets/d/1mAhSDgMUySGB4rxwFX7DpGrnChZrUs58TbvKAX3fCto/edit#gid=608172957"><h4>Stat Archive</h4></a>	<ul>		<li>Past Marathon Stats</li>		<li>Filename History</li>		<li>Marathon Records</li>		<li>And More!</li>	</ul>	<a href="https://docs.google.com/spreadsheets/d/1z2Y_unhykpD4jmpKgRrXagad42Jl7EFRNm7JfqtQQ7c/edit#gid=964693497"><h4>Event Logs</h4></a>	<ul>		<li>Past Marathon Event Logs</li>		<li>Past Marathon Per-Run Stats</li>	</ul>        	<a href="https://docs.google.com/spreadsheets/d/13Zh1ovK_7zBIk_bCEMeTosv3jf9asegRTQyCTCC3O58/edit#gid=333803068"><h4>Donation Graphs</h4></a>	<ul>		<li>$/hr Chart</li>		<li>Donation/Donor Statistics</li>	</ul>')
	docsTable.insertAdjacentElement("afterbegin", docsBody)
	docsTable.insertAdjacentElement("afterbegin", docsTableHeader)
	docsTable.style.visibility = 'hidden';
	document.body.insertAdjacentElement('afterbegin', docsTable)
	docsReady = true;
}