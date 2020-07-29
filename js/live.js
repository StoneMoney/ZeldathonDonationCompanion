var testMode = true;
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
var zthonTeam = ["StoneMoney533","0rganics","8bitbrigadier","abra","ainkayes","animejessica","arcticlight","artsierosie","bestestcat","betsy7cat","brokensword9","brooky120","bushelofchewygoodness","captain_trina","choco","ctotheatherine","dannychipotle","darkdecay","daskippy","dinos","diredwarf","douggernaught","fartgarfunkle_","femtastic","fistyface","frosty10001","funnyman3595","gannon11","gemsmrt","greatscottlp","gymnast86","halfemptyetank","hipsterharbinger","insaneintherain","jacksonparodi","john_mackay13","justbluey","jyggy11","kainmoogle","kampydk","kellycelina","klinkit","kortraction","legosjedi","letsnarvik","lindsaypez","lizerdoo","lucarimew","lukethespoo","lyricofwisdom","marishkabob","marzakay","metalninjawolf","milotic","mojofibers","nytsura","oc1_","omgitsmonika","pandafloof","paulblart","phonic88","pingpong980","ppeach2010","retsam19","ridleypals","romscout","sab_irene","samanthanatalie","serperior","shado_temple","shoop631","silverdslite","simulatedgreg","smoople","soaringchris","starrlett20","stinusmeret","supermcgamer","surfimp","swchris","tbforgood","tekkirotaru","teracmusic","thatoneyetee","the8bitdrummer","thedivinebacon","thelyterage","thepurplesteph","thezwolfenstein","thunderscott","trainertrevino","tylinos","valor6","vidya","waluigi","zelda_queen","zeldathonbot","zeldathonmods","ztechdesk","first_bot","dynomation","flyingludicolo","slamb0b","blockheadstudios","jb2448","irisangel","math_effect","zic3","skootish","melvaker","loveshorsesgirl","drthrex","brittanysaturn","DylanHatesTwitch","ItsTheHutch","ptrbob","tabetaicooking","ynkebour","iylila"]

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
			(Date.UTC(2020, 8, 6) < Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate())
			&& Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate()) < Date.UTC(2020, 8, 12)) 
			|| testMode
		   ) 
		{
			chrome.runtime.sendMessage({ request: "schedule" });
			loadDocs();
			document.getElementById("chat-room-header-label").innerHTML = "Zeldathon: Side Quest"
			console.log('Zeldathon is happening!!')
			var socialsBox = document.querySelector("div[data-a-target='about-panel']").parentElement;
			var zeldathonBox = document.createElement('div');
			socialsBox.insertAdjacentElement("beforebegin",zeldathonBox);
			zeldathonBox.outerHTML = '<div class="tw-flex tw-justify-content-center"> <div data-a-target="about-panel" data-id="63a375dc525e" class="social-media-space tw-full-width"> <div class="ZDC-PANEL social-media-space--content tw-c-background-base tw-flex tw-mg-b-3 tw-pd-3"> <div class="tw-flex tw-flex-row tw-full-width"> <div class="tw-flex tw-flex-column tw-full-width tw-pd-y-1 tw-xs-pd-l-3 tw-xs-pd-r-1 tw-xs-pd-y-1"> <div class="tw-mg-b-1"> <h3 class="tw-font-size-3 tw-line-height-heading tw-semibold tw-title">Zeldathon: Side Quest </h3> </div> <p class="tw-font-size-6"><b>Benefitting Direct Relief</b></p> <p class="tw-font-size-5">Direct Relief is a humanitarian aid organization, active in all 50 states and more than 80 countries, with a mission to improve the health and lives of people affected by poverty or emergencies – without regard to politics, religion, or ability to pay.</p> <button class="donate-button tw-align-items-center tw-align-left tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--primary tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative tw-mg-t-1" aria-label="Donate" width="250px" id="ZDC-DONATE-BUTTON"> <div class="tw-align-items-center tw-core-button-label tw-core-button-label--dropdown tw-core-button-label--icon tw-flex tw-flex-grow-1"> <div class="tw-align-items-center tw-flex tw-mg-r-05"> <div class="tw-align-items-center tw-core-button-icon tw-inline-flex"> <div data-a-selector="tw-core-button-icon" class="ScIconLayout-sc-1bgeryd-0 krdRbW tw-align-items-center tw-icon tw-inline-flex"> <div class="tw-aspect tw-aspect--align-top"> <div class="tw-aspect__spacer" style="padding-bottom: 100%;"></div><svg width="100%" height="100%" version="1.1" viewBox="0 0 512 512" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 cMQeyU"> <path fill="currentColor" d="M256 416c114.9 0 208-93.1 208-208S370.9 0 256 0 48 93.1 48 208s93.1 208 208 208zM233.8 97.4V80.6c0-9.2 7.4-16.6 16.6-16.6h11.1c9.2 0 16.6 7.4 16.6 16.6v17c15.5.8 30.5 6.1 43 15.4 5.6 4.1 6.2 12.3 1.2 17.1L306 145.6c-3.8 3.7-9.5 3.8-14 1-5.4-3.4-11.4-5.1-17.8-5.1h-38.9c-9 0-16.3 8.2-16.3 18.3 0 8.2 5 15.5 12.1 17.6l62.3 18.7c25.7 7.7 43.7 32.4 43.7 60.1 0 34-26.4 61.5-59.1 62.4v16.8c0 9.2-7.4 16.6-16.6 16.6h-11.1c-9.2 0-16.6-7.4-16.6-16.6v-17c-15.5-.8-30.5-6.1-43-15.4-5.6-4.1-6.2-12.3-1.2-17.1l16.3-15.5c3.8-3.7 9.5-3.8 14-1 5.4 3.4 11.4 5.1 17.8 5.1h38.9c9 0 16.3-8.2 16.3-18.3 0-8.2-5-15.5-12.1-17.6l-62.3-18.7c-25.7-7.7-43.7-32.4-43.7-60.1.1-34 26.4-61.5 59.1-62.4zM480 352h-32.5c-19.6 26-44.6 47.7-73 64h63.8c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8h63.8c-28.4-16.3-53.3-38-73-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32z"> </path> </svg> </div> </div> </div> </div> <div data-a-target="tw-core-button-label-text" class="tw-flex-grow-1">Donate</div> </div> </button> </div> <div class="tw-flex-shrink-0 tw-pd-y-1 tw-xs-pd-l-3 tw-xs-pd-y-1"> <div class="tw-flex tw-flex-column tw-flex-wrap tw-pd-t-1"> <!-- LINK 1 --> <div class="tw-align-items-center tw-flex tw-flex-nowrap tw-pd-b-1 tw-pd-r-05"> <div class="social-media-link__container tw-align-items-center tw-flex tw-flex-nowrap"><a href="https://zeldathon.net/store" rel="noopener noreferrer" target="_blank" class="tw-interactive tw-link tw-link--hover-underline-none tw-link--inherit" role="link"> <div class="tw-align-items-center tw-flex tw-flex-nowrap"> <div class="tw-align-items-center tw-flex tw-pd-r-05"><span class="tw-align-items-center tw-c-text-base tw-flex"> <figure class="tw-svg"><svg class="tw-svg__asset tw-svg__asset--discord tw-svg__asset--inherit" width="20px" height="20px" version="1.1" viewBox="0 0 640 512" x="0px" y="0px"> <path fill="currentColor" d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z"> </path> </svg></figure> </span></div> <p class="tw-word-break-word">Merch</p> </div> </a></div> <div class="social-media-link__external-link-icon tw-align-items-center tw-flex tw-pd-l-05"> <div class="ScIconLayout-sc-1bgeryd-0 bxKQYm tw-align-items-center tw-icon tw-inline-flex"> <div class="tw-aspect tw-aspect--align-top"> <div class="tw-aspect__spacer" style="padding-bottom: 100%;"></div><svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 cMQeyU"> <g> <path d="M6 8h5.293L5 14.293l1.414 1.414 6.293-6.293V15h2V6H6v2z"> </path> </g> </svg> </div> </div> </div> </div> <!-- END LINK 1--> <!-- LINK 2 --> <div class="tw-align-items-center tw-flex tw-flex-nowrap tw-pd-b-1 tw-pd-r-05"> <div class="social-media-link__container tw-align-items-center tw-flex tw-flex-nowrap"><a href="https://zeldathon.net/schedule" rel="noopener noreferrer" target="_blank" class="tw-interactive tw-link tw-link--hover-underline-none tw-link--inherit" role="link"> <div class="tw-align-items-center tw-flex tw-flex-nowrap"> <div class="tw-align-items-center tw-flex tw-pd-r-05"><span class="tw-align-items-center tw-c-text-base tw-flex"> <figure class="tw-svg"><svg class="tw-svg__asset tw-svg__asset--discord tw-svg__asset--inherit" width="20px" height="20px" version="1.1" viewBox="0 0 448 512" x="0px" y="0px"> <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"> </path> </svg></figure> </span></div> <p class="tw-word-break-word">Schedule</p> </div> </a></div> <div class="social-media-link__external-link-icon tw-align-items-center tw-flex tw-pd-l-05"> <div class="ScIconLayout-sc-1bgeryd-0 bxKQYm tw-align-items-center tw-icon tw-inline-flex"> <div class="tw-aspect tw-aspect--align-top"> <div class="tw-aspect__spacer" style="padding-bottom: 100%;"></div><svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 cMQeyU"> <g> <path d="M6 8h5.293L5 14.293l1.414 1.414 6.293-6.293V15h2V6H6v2z"> </path> </g> </svg> </div> </div> </div> </div> <!-- END LINK 2--> <!-- LINK 3 --> <div class="tw-align-items-center tw-flex tw-flex-nowrap tw-pd-b-1 tw-pd-r-05"> <div class="social-media-link__container tw-align-items-center tw-flex tw-flex-nowrap"><a href="https://docs.google.com/spreadsheets/d/1nT8vmOsvK4eLEaIJfeT-tU0cPVSQ1-Ue5JpFk5sMXS8/edit#gid=1609381904" rel="noopener noreferrer" target="_blank" class="tw-interactive tw-link tw-link--hover-underline-none tw-link--inherit" role="link"> <div class="tw-align-items-center tw-flex tw-flex-nowrap"> <div class="tw-align-items-center tw-flex tw-pd-r-05"><span class="tw-align-items-center tw-c-text-base tw-flex"> <figure class="tw-svg"><svg class="tw-svg__asset tw-svg__asset--discord tw-svg__asset--inherit" width="20px" height="20px" version="1.1" viewBox="0 0 512 512" x="0px" y="0px"> <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"> </path> </svg></figure> </span></div> <p class="tw-word-break-word">Docs</p> </div> </a></div> <div class="social-media-link__external-link-icon tw-align-items-center tw-flex tw-pd-l-05"> <div class="ScIconLayout-sc-1bgeryd-0 bxKQYm tw-align-items-center tw-icon tw-inline-flex"> <div class="tw-aspect tw-aspect--align-top"> <div class="tw-aspect__spacer" style="padding-bottom: 100%;"></div><svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 cMQeyU"> <g> <path d="M6 8h5.293L5 14.293l1.414 1.414 6.293-6.293V15h2V6H6v2z"> </path> </g> </svg> </div> </div> </div> </div> <!-- END LINK 3--> </div> </div> </div> </div> </div> </div> '
			// var injectionPoint = document.querySelector("div.channel-header__right")
			// injectionPoint.insertAdjacentElement("beforeend", constructButton("Donate", "donate", false))
			// var tablist = document.querySelector("ul[role='tablist']")
			// tablist.insertAdjacentElement("beforeend", constructHeaderItem("Shirts", "http://theyetee.com"));
			// tablist.insertAdjacentElement("beforeend", constructHeaderItem("Team", "http://zeldathon.net/team"));
			// var schedule = constructHeaderItem("Schedule", "#");
			// schedule.addEventListener('mouseup', toggleVisibility)
			// tablist.insertAdjacentElement("beforeend", schedule);
			// var docs = constructHeaderItem("Docs", "#")
			// docs.addEventListener('mouseup', toggleVisibilityDocs);
			// tablist.insertAdjacentElement("beforeend", docs);
			// document.getElementById("donate").addEventListener("click", donatePage)
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