chrome.runtime.onMessage.addListener(function(inMessage, callback) {
  var theUrl;
  if(inMessage.request == "sounds") {
    theUrl = "https://spreadsheets.google.com/feeds/list/1AQlGPgpH3CuxnM5JhClFTY9l6MzFqGyPXpWqYCzmzUQ/1/public/values?alt=json"
  } else if (inMessage.request == "schedule") {
    theUrl = "https://zeldathon.net/api/Kinstone/schedules"
  }
	console.log("yeet")
	var xhr = new XMLHttpRequest();
    xhr.open("GET", theUrl, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
			console.log(xhr.responseText)
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        //SEND MESSAGE BACK TO ACTIVE TAB
        if(inMessage.request == "sounds") {
          chrome.tabs.sendMessage(tabs[0].id, { sounds : xhr.responseText});  
        } else if (inMessage.request == "schedule") {
          chrome.tabs.sendMessage(tabs[0].id, { schedule : xhr.responseText});
        }
			});
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
	//chrome.runtime.sendMessage({message: inMessage});
});