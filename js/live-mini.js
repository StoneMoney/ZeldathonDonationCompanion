var ready=!1;var config={attributes:!1,childList:!0,subtree:!1};var zthonTeam=["0rganics","8bitbrigadier","abra","ainkayes","animejessica","arcticlight","artsierosie","bestestcat","betsy7cat","brokensword9","brooky120","bushelofchewygoodness","captain_trina","choco","copperdragon","ctotheatherine","dannychipotle","darkdecay","daskippy","dinos","diredwarf","douggernaught","fartgarfunkle_","femtastic","fistyface","frosty10001","funnyman3595","gannon11","gemsmrt","greatscottlp","gymnast86","halfemptyetank","hipsterharbinger","insaneintherain","jacksonparodi","john_mackay13","justbluey","jyggy11","kainmoogle","kampydk","kellycelina","klinkit","knight_of_hylia","kortraction","legosjedi","letsnarvik","lindsaypez","lizerdoo","lucarimew","lukethespoo","lyricofwisdom","marishkabob","marzakay","metalninjawolf","milotic","mojofibers","nytsura","oc1_","omgitsmonika","pandafloof","paulblart","phonic88","pingpong980","ppeach2010","retsam19","ridleypals","romscout","sab_irene","samanthanatalie","serperior","shado_temple","shoop631","silverdslite","simulatedgreg","smoople","soaringchris","starrlett20","stinusmeret","supermcgamer","surfimp","swchris","tbforgood","tekkirotaru","teracmusic","thatoneyetee","thedivinebacon","thelyterage","thepurplesteph","thezwolfenstein","thunderscott","trainertrevino","tylinos","valor6","vidya","waluigi","zelda_queen","zeldathonbot","zeldathonmods","ztechdesk","first_bot"]
var marathonDay=new Date('December 20, 2018 00:00:00')
var marathonEnd=new Date('January 3, 2019 00:00:00')
var ffz=!1;var callback=function(mutationsList,observer){for(var mutation of mutationsList){if(mutation.type=='childList'){var ffzDetector=document.querySelector("figure.ffz-i-zreknarf")
if(ffzDetector!=undefined||ffzDetector!=null){ffz=!0}
var chatLine=mutation.addedNodes[0]
console.log(chatLine)
if(chatLine!=undefined){if(chatLine.querySelectorAll('span.message').length>0){try{var username=chatLine.querySelector("span.chat-author__display-name").innerHTML.toLowerCase()
var badgeCollection=chatLine.querySelector("span:not([class])")
if(username=="stonemoney533"){chatLine.querySelector("span.chat-author__display-name").classList.add("godglow")}
if(zthonTeam.includes(username)){if(!ffz){badgeCollection.insertAdjacentHTML("afterbegin",createChatBadge("https://i.imgur.com/bPIyQkA.png","test badge").outerHTML,!1)}else{var ffzBadgeCollection=chatLine.querySelector("span.chat-line__message--badges")
ffzBadgeCollection.insertAdjacentHTML("afterBegin",createChatBadge("https://i.imgur.com/bPIyQkA.png","test badge").outerHTML,!0)}}}catch(err){console.log(error)}}}}}};var observer=new MutationObserver(callback);window.onload=function(){var date=new Date();var chat=document.querySelector("div[role='log']");if(Date.UTC(2018,12,26)<Date.UTC(date.getFullYear(),date.getMonth()+1,date.getDate())&&Date.UTC(date.getFullYear(),date.getMonth()+1,date.getDate())<Date.UTC(2019,1,3)){console.log('lets go')
var injectionPoint=document.querySelector("div.channel-header__right")
injectionPoint.insertAdjacentHTML("afterBegin",constructButton("Donate","donate",!1).outerHTML)
var videosButton=document.querySelector("a[data-a-target='videos-channel-header-item']")
var ffzDetector=document.querySelector("figure.ffz-i-zreknarf")
if(ffzDetector!=undefined||ffzDetector!=null){ffz=!0}
videosButton.insertAdjacentHTML("afterend",constructHeaderItem("Shirts","http://theyetee.com").outerHTML);videosButton.insertAdjacentHTML("afterend",constructHeaderItem("Team","http://zeldathon.net/team").outerHTML);videosButton.insertAdjacentHTML("afterend",constructHeaderItem("Schedule","http://zeldathon.net/schedule").outerHTML);videosButton.insertAdjacentHTML("afterend",constructHeaderItem("Doc","http://bokoblin.com").outerHTML);document.getElementById("donate").addEventListener("click",donatePage)}
ready=!0;observer.observe(chat,config)}
function donatePage(){var win=window.open("http://donate.zeldathon.net/",'_blank');win.focus()}
function createChatBadge(subimg,subtext,isFFZ){if(isFFZ){var badge=document.createElement("span");badge.setAttribute('data-badge','attendie');badge.setAttribute('data-provider','zdc');badge.style.backgroundImage=url(subimg)}else{var badge=document.createElement("a")
badge.setAttribute("data-a-target","chat-badge")
var img=document.createElement("img")
img.setAttribute("src",subimg);img.setAttribute("alt",subtext);img.classList.add("chat-badge")
badge.insertAdjacentHTML("beforeend",img.outerHTML)
return badge}}
function constructHeaderItem(mainText,href){var sContainer=document.createElement("a")
sContainer.href=href;sContainer.setAttribute("id",mainText.replace(" ","-"));sContainer.setAttribute("target","_blank")
sContainer.classList.add("tw-interactive")
sContainer.classList.add("channel-header__item");sContainer.classList.add("tw-align-items-center");sContainer.classList.add("tw-flex-shrink-0");sContainer.classList.add("tw-link");sContainer.classList.add("tw-link--hover-underline-none");var container=document.createElement("div")
container.classList.add("tw-flex")
container.classList.add("tw-pd-x-2")
container.classList.add("tw-pd-y-05")
var twitchStyleItem=document.createElement("span");twitchStyleItem.classList.add("tw-font-size-5");twitchStyleItem.innerHTML=mainText;container.insertAdjacentHTML("afterBegin",twitchStyleItem.outerHTML);sContainer.insertAdjacentHTML("afterBegin",container.outerHTML)
return sContainer}
function constructButton(mainText,id,pad){var container=document.createElement("div");if(pad){container.classList.add("tw-pd-x-1")}
var twitchStyleButton=document.createElement("button");twitchStyleButton.classList.add("tw-interactive");twitchStyleButton.classList.add("tw-button");var twitchStyleButtonSubclass=document.createElement("span");twitchStyleButtonSubclass.classList.add("tw-button__text");var twitchStyleButtonSubclassText=document.createElement("div");twitchStyleButtonSubclassText.classList.add("tw-flex");twitchStyleButtonSubclassText.insertAdjacentHTML("afterBegin","<span>"+mainText+"</span>");twitchStyleButton.setAttribute("id",id);twitchStyleButtonSubclass.insertAdjacentHTML("afterBegin",twitchStyleButtonSubclassText.outerHTML);twitchStyleButton.insertAdjacentHTML("afterBegin",twitchStyleButtonSubclass.outerHTML);container.insertAdjacentHTML("afterBegin",twitchStyleButton.outerHTML)
return container}
var optimizedResize=(function(){var callbacks=[],running=!1;function resize(){if(!running){running=!0;if(window.requestAnimationFrame){window.requestAnimationFrame(runCallbacks)}else{setTimeout(runCallbacks,600)}}}
function runCallbacks(){var date=new Date()
if(Date.UTC(2018,12,26)<Date.UTC(date.getFullYear(),date.getMonth()+1,date.getDate())&&Date.UTC(date.getFullYear(),date.getMonth()+1,date.getDate())<Date.UTC(2019,1,3)){callbacks.forEach(function(callback){callback()})}
running=!1}
function addCallback(callback){if(callback){callbacks.push(callback)}}
return{add:function(callback){if(!callbacks.length){window.addEventListener('resize',resize)}
addCallback(callback)}}}());optimizedResize.add(function(){console.log('Resource conscious resize callback!')
if(ready){tabSize()}});function tabSize(){var w=window.innerWidth;if(w>940){document.getElementById("Shirts").classList.remove("channel-header__item--hide");document.getElementById("Doc").classList.remove("channel-header__item--hide");document.getElementById("Schedule").classList.remove("channel-header__item--hide");document.getElementById("Team").classList.remove("channel-header__item--hide")}else if(w>820){document.getElementById("Shirts").classList.add("channel-header__item--hide");document.getElementById("Doc").classList.remove("channel-header__item--hide");document.getElementById("Schedule").classList.remove("channel-header__item--hide");document.getElementById("Team").classList.remove("channel-header__item--hide")}else if(w>720){document.getElementById("Shirts").classList.add("channel-header__item--hide");document.getElementById("Doc").classList.remove("channel-header__item--hide");document.getElementById("Schedule").classList.remove("channel-header__item--hide");document.getElementById("Team").classList.add("channel-header__item--hide")}else if(w>650){document.getElementById("Shirts").classList.add("channel-header__item--hide");document.getElementById("Doc").classList.remove("channel-header__item--hide");document.getElementById("Schedule").classList.add("channel-header__item--hide");document.getElementById("Team").classList.add("channel-header__item--hide")}else if(w>500){document.getElementById("Shirts").classList.add("channel-header__item--hide");document.getElementById("Doc").classList.add("channel-header__item--hide");document.getElementById("Schedule").classList.add("channel-header__item--hide");document.getElementById("Team").classList.add("channel-header__item--hide")}}