var ready = false;
var blessRemover = false;
chrome.storage.sync.get(['isBless'], function(result) {
    if(result.isBless != true || result.isBless != false) {
      chrome.storage.sync.set({isBless: false}, function(){});
    }
	blessRemover = result.isBless;
});
// Options for the observer (which mutations to observe)
var config = { attributes: false, childList: true, subtree: false };
var zthonTeam = ["0rganics", 
"8bitbrigadier", 
"abra", 
"ainkayes", 
"animejessica", 
"arcticlight", 
"artsierosie", 
"bestestcat", 
"betsy7cat", 
"brokensword9", 
"brooky120", 
"bushelofchewygoodness", 
"captain_trina", 
"choco", 
"ctotheatherine", 
"dannychipotle", 
"darkdecay", 
"daskippy", 
"dinos", 
"diredwarf", 
"douggernaught", 
"fartgarfunkle_", 
"femtastic", 
"fistyface", 
"frosty10001", 
"funnyman3595", 
"gannon11", 
"gemsmrt", 
"greatscottlp", 
"gymnast86", 
"halfemptyetank", 
"hipsterharbinger", 
"insaneintherain", 
"jacksonparodi",
"john_mackay13", 
"justbluey", 
"jyggy11", 
"kainmoogle", 
"kampydk", 
"kellycelina", 
"klinkit", 
"kortraction", 
"legosjedi", 
"letsnarvik", 
"lindsaypez", 
"lizerdoo", 
"lucarimew", 
"lukethespoo", 
"lyricofwisdom", 
"marishkabob", 
"marzakay", 
"metalninjawolf", 
"milotic", 
"mojofibers", 
"nytsura", 
"oc1_", 
"omgitsmonika", 
"pandafloof", 
"paulblart", 
"phonic88", 
"pingpong980", 
"ppeach2010", 
"retsam19", 
"ridleypals", 
"romscout", 
"sab_irene", 
"samanthanatalie", 
"serperior", 
"shado_temple", 
"shoop631", 
"silverdslite", 
"simulatedgreg", 
"smoople", 
"soaringchris", 
"starrlett20", 
"stinusmeret", 
"supermcgamer", 
"surfimp", 
"swchris", 
"tbforgood", 
"tekkirotaru", 
"teracmusic", 
"thatoneyetee", 
"the8bitdrummer",
"thedivinebacon", 
"thelyterage", 
"thepurplesteph", 
"thezwolfenstein", 
"thunderscott", 
"trainertrevino", 
"tylinos", 
"valor6", 
"vidya", 
"waluigi", 
"zelda_queen", 
"zeldathonbot", 
"zeldathonmods",
"ztechdesk",
"first_bot",
"dynomation",
"flyingludicolo",
"slamb0b",
"blockheadstudios",
"jb2448",
"irisangel",
"math_effect",
"zic3",
"skootish",
"melvaker",
"loveshorsesgirl",
"drthrex",
"brittanysaturn"
]
var shirts = [
	{
		"name":"Heals Event Tee",
		"author":"test",
		"price":14,
		"link":"https://theyetee.com/collections/zeldathon/products/zeldathon-heals-event-tee",
		"pic":"https://cdn.shopify.com/s/files/1/2292/0133/products/A_heal_640x.jpg"
	},{
		"name":"Great Demon King",
		"author":"test",
		"price":14,
		"link":"https://theyetee.com/collections/zeldathon/products/great-demon-king",
		"pic":"https://cdn.shopify.com/s/files/1/2292/0133/products/A_ganon_640x640.jpg"
	},{
		"name":"Bow Wow",
		"author":"test",
		"price":14,
		"link":"https://theyetee.com/collections/zeldathon/products/bow-wow",
		"pic":"https://cdn.shopify.com/s/files/1/2292/0133/products/A_bow_7738d272-8ab2-401f-b0c4-4e2277e11966_640x.jpg"
	},{
		"name":"Beasts of the Wild",
		"author":"test",
		"price":14,
		"link":"https://theyetee.com/collections/zeldathon/products/beasts-of-the-wild",
		"pic":"https://cdn.shopify.com/s/files/1/2292/0133/products/A_wild_640x640.jpg"
	},{
		"name":"Guru Guru",
		"author":"test",
		"price":14,
		"link":"https://theyetee.com/collections/zeldathon/products/guru-guru",
		"pic":"https://cdn.shopify.com/s/files/1/2292/0133/products/A_jaime_b861497a-11b8-4a10-ad0e-0fc67824e06b_640x640.jpg"
	},{
		"name":"Happy Farm Girl",
		"author":"test",
		"price":14,
		"link":"https://theyetee.com/collections/zeldathon/products/happy-farm-girl",
		"pic":"https://cdn.shopify.com/s/files/1/2292/0133/products/A_farm_640x.jpg"
	},{
		"name":"Her Majesty",
		"author":"test",
		"price":14,
		"link":"https://theyetee.com/collections/zeldathon/products/her-majesty",
		"pic":"https://cdn.shopify.com/s/files/1/2292/0133/products/A_zelda_640x.jpg"
	},
]
var ffz = false;
// Callback function to execute when mutations are observed
var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
			var ffzDetector = document.querySelector("figure.ffz-i-zreknarf")
			if(ffzDetector != undefined || ffzDetector != null) {
				ffz = true;
				console.log("ffz exists")
			}
			var chatLine = mutation.addedNodes[0]
			if(chatLine != undefined) {
				if(chatLine.querySelectorAll('span.text-fragment').length > 0) {
					try {
						var username = chatLine.querySelector("span.chat-author__display-name").innerHTML.toLowerCase()
						var badgeCollection = chatLine.querySelector("span:not([class])")
						var text = chatLine.querySelector("span.text-fragment")
						console.log(text.innerHTML.toLowerCase().indexOf("bless"))
						if(text.innerHTML.toLowerCase().indexOf("bless") == 0 && blessRemover) {
							chatLine.parentNode.removeChild(chatLine);
						}
						if(username == "stonemoney533") {
							chatLine.querySelector("span.chat-author__display-name").classList.add("godglow")
						}
						if(zthonTeam.includes(username)) {
							if(!ffz) {
								badgeCollection.insertAdjacentHTML("afterbegin",createChatBadge("https://i.imgur.com/9XxOpco.png","Zeldathon Attendie").outerHTML);
							} else {
								var ffzBadgeCollection = chatLine.querySelector("span.chat-line__message--badges")
								ffzBadgeCollection.insertAdjacentHTML("afterBegin",createChatBadge("https://i.imgur.com/9XxOpco.png","Zeldathon Attendie").outerHTML);
							}
						}
					} catch (err) {
						console.log(error)
					}
				} else if(ffz && chatLine.querySelectorAll('span.message')[0].querySelectorAll('span:not(.text-fragment)').length > 0 && blessRemover) {
					var emote = chatLine.querySelectorAll('span.message')[0].querySelectorAll('span:not(.text-fragment)')[0]
					if(emote.querySelectorAll('img')[0].getAttribute('src') == "//cdn.frankerfacez.com/afcaff4970e20b9efe937b0a5ad65a4a.png") {
						chatLine.parentNode.removeChild(chatLine);
					}
				}
			}
        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

window.onload = function(){
	var date = new Date();
	var chat = document.querySelector("div[role='log']");
	var shirtBox = document.createElement("div")
	shirtBox.classList.add("shirt-box")
	var shirtBoxHeader = document.createElement("h2")
	shirtBoxHeader.insertAdjacentText("afterbegin","Zeldathon Shirts")
	closeButton.classList.add("shirt-h")
	var shirtBoxSubHeader = document.createElement("p")
	shirtBoxSubHeader.insertAdjacentText("afterbegin","Powered by The Yetee. $5 from every shirt sale is donated to Help Hope Live")
	closeButton.classList.add("shirt-subh")
	var closeButton = document.createElement("div")
	closeButton.insertAdjacentText("afterbegin","X")
	closeButton.classList.add("shirt-close")
	shirts.forEach(function(shirt) {
		var shirtContainer = document.createElement("div")
		shirtContainer.classList.add("shirt")
		var buyButton = constructButton("Buy - $"+shirt.price,shirt.name,false)
		buyButton.addEventListener('mouseup',function(){window.open(shirt.link,"__blank")})
		
		var shirtPreview = document.createElement("img")
		shirtPreview.classList.add("shirt-img")
		shirtPreview.src = shirt.pic

		var shirtDescription = document.createElement("p")
		shirtDescription.classList.add("shirt-text")
		shirtDescription.insertAdjacentText('afterbegin',shirt.name+" by "+shirt.author)

		shirtContainer.insertAdjacentElement("afterbegin",buyButton)
		shirtContainer.insertAdjacentElement("afterbegin",shirtDescription)
		shirtContainer.insertAdjacentElement("afterbegin",shirtPreview)
		shirtBox.insertAdjacentElement("afterbegin",shirtContainer)
	})
	if(Date.UTC(2019,6,1) < Date.UTC(date.getFullYear(),date.getMonth()+1,date.getDate()) && Date.UTC(date.getFullYear(),date.getMonth()+1,date.getDate()) < Date.UTC(2019,6,22)) {
		document.querySelector("p[data-test-selector='chat-room-header-label']").innerHTML = "Zeldathon Heals"
		console.log('lets go')
		var injectionPoint = document.querySelector("div.channel-header__right")
		injectionPoint.insertAdjacentHTML("afterBegin",constructButton("Donate","donate",false).outerHTML)
		var videosButton = document.querySelector("a[data-a-target='videos-channel-header-item']")
		videosButton.insertAdjacentHTML("afterend",constructHeaderItem("Shirts","http://theyetee.com").outerHTML);
		videosButton.insertAdjacentHTML("afterend",constructHeaderItem("Team","http://zeldathon.net/team").outerHTML);
		videosButton.insertAdjacentHTML("afterend",constructHeaderItem("Schedule","http://zeldathon.net/schedule").outerHTML);
		videosButton.insertAdjacentHTML("afterend",constructHeaderItem("Doc","http://bokoblin.com").outerHTML);
		//videosButton.insertAdjacentElement("beforebegin",shirtBox)
		document.getElementById("donate").addEventListener("click",donatePage)
	}
	ready = true;
	observer.observe(chat, config);
	tabSize();
}
function donatePage() {
	newwindow=window.open("http://donate.zeldathon.net/",'name','height=600,width=400,titlebar=no,menubar=no,location=yes,left=10');
	if (window.focus) {newwindow.focus()}
}

//create a chat badge, matching the CSS of twitch
function createChatBadge(subimg,subtext) {
	var badge = document.createElement("a")
	badge.setAttribute("data-a-target","chat-badge")
	var img = document.createElement("img")
	img.setAttribute("src",subimg);
	img.setAttribute("alt",subtext);
	img.classList.add("chat-badge")
	badge.insertAdjacentHTML("beforeend",img.outerHTML)
	return badge;
}
//create a header item, matching the CSS of twitch
function constructHeaderItem(mainText,href) {
	console.log("construct header " + mainText)
	var sContainer = document.createElement("a")
	sContainer.href = href;
	//sContainer.setAttribute("data-target","channel-header-item")
	//sContainer.setAttribute("data-a-target",mainText.replace(" ","-")+"-channel-header-item");
	//sContainer.setAttribute("data-test-selector",mainText.replace(" ","-")+"-channel-header-item");
	sContainer.setAttribute("id",mainText.replace(" ","-"));
	sContainer.setAttribute("target","_blank")
	sContainer.classList.add("tw-interactive")
	sContainer.classList.add("channel-header__item");
	sContainer.classList.add("tw-align-items-center");
	sContainer.classList.add("tw-flex-shrink-0");
	sContainer.classList.add("tw-link");
	sContainer.classList.add("tw-link--hover-underline-none");
	var container = document.createElement("div")
	container.classList.add("tw-flex")
	container.classList.add("tw-pd-x-2")
	container.classList.add("tw-pd-y-05")
	var twitchStyleItem = document.createElement("span");
	twitchStyleItem.classList.add("tw-font-size-5");
	twitchStyleItem.innerHTML = mainText;
	container.insertAdjacentHTML("afterBegin",twitchStyleItem.outerHTML);
	sContainer.insertAdjacentHTML("afterBegin",container.outerHTML)
	return sContainer;
}
//create a button, matching the CSS of twitch
function constructButton(mainText, id, pad) {
	var container = document.createElement("div");
	if(pad) {
		container.classList.add("tw-pd-x-1");
	}
	var twitchStyleButton = document.createElement("button");
	twitchStyleButton.classList.add("tw-interactive");
	twitchStyleButton.classList.add("tw-button");
	twitchStyleButton.classList.add("tw-core-button--primary");
	var twitchStyleButtonSubclass = document.createElement("span");
	twitchStyleButtonSubclass.classList.add("tw-button__text");
	var twitchStyleButtonSubclassText = document.createElement("div");
	twitchStyleButtonSubclassText.classList.add("tw-flex");
	twitchStyleButtonSubclassText.insertAdjacentHTML("afterBegin","<span>"+mainText+"</span>");
	twitchStyleButton.setAttribute("id", id);
	twitchStyleButtonSubclass.insertAdjacentHTML("afterBegin",twitchStyleButtonSubclassText.outerHTML);
	twitchStyleButton.insertAdjacentHTML("afterBegin",twitchStyleButtonSubclass.outerHTML);
	container.insertAdjacentHTML("afterBegin",twitchStyleButton.outerHTML)
	return container;
}
var optimizedResize = (function() {
	
    var callbacks = [],
        running = false;
    // fired on resize event
    function resize() {
        if (!running) {
            running = true;
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(runCallbacks);
            } else {
                setTimeout(runCallbacks, 600);
            }
        }
    }
    // run the actual callbacks
    function runCallbacks() {
		var date = new Date()
		if(Date.UTC(2018,12,26) < Date.UTC(date.getFullYear(),date.getMonth()+1,date.getDate()) && Date.UTC(date.getFullYear(),date.getMonth()+1,date.getDate()) < Date.UTC(2019,1,3)) {
        callbacks.forEach(function(callback) {
            callback();
        });
		}
        running = false;
    }
    // adds callback to loop
    function addCallback(callback) {
        if (callback) {
            callbacks.push(callback);
        }
    }
    return {
        // public method to add additional callback
        add: function(callback) {
            if (!callbacks.length) {
                window.addEventListener('resize', resize);
            }
            addCallback(callback);
        }
    }
}());
// start process
optimizedResize.add(function() {
    console.log('Resource conscious resize callback!')
	if(ready) {
		tabSize();
	}
});

// resize tabs
function tabSize() {
	var w = window.innerWidth;
	if(w > 940) {
		document.getElementById("Shirts").classList.remove("channel-header__item--hide");
		document.getElementById("Doc").classList.remove("channel-header__item--hide");
		document.getElementById("Schedule").classList.remove("channel-header__item--hide");
		document.getElementById("Team").classList.remove("channel-header__item--hide");
	} else if (w > 820) {
		document.getElementById("Shirts").classList.add("channel-header__item--hide");
		document.getElementById("Doc").classList.remove("channel-header__item--hide");
		document.getElementById("Schedule").classList.remove("channel-header__item--hide");
		document.getElementById("Team").classList.remove("channel-header__item--hide");
	} else if (w > 720) {
		document.getElementById("Shirts").classList.add("channel-header__item--hide");
		document.getElementById("Doc").classList.remove("channel-header__item--hide");
		document.getElementById("Schedule").classList.remove("channel-header__item--hide");
		document.getElementById("Team").classList.add("channel-header__item--hide");
	} else if (w > 650) {
		document.getElementById("Shirts").classList.add("channel-header__item--hide");
		document.getElementById("Doc").classList.remove("channel-header__item--hide");
		document.getElementById("Schedule").classList.add("channel-header__item--hide");
		document.getElementById("Team").classList.add("channel-header__item--hide");
	} else if (w > 500) {
		document.getElementById("Shirts").classList.add("channel-header__item--hide");
		document.getElementById("Doc").classList.add("channel-header__item--hide");
		document.getElementById("Schedule").classList.add("channel-header__item--hide");
		document.getElementById("Team").classList.add("channel-header__item--hide");
	}
}