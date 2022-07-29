chrome.runtime.onMessage.addListener(function (inMessage, callback) {
  var theUrl;
  switch (inMessage.request) {
    case "sounds":
      theUrl = "https://api.bokoblin.com/?query={sounds{amount,description}}";
      break;
    case "people":
      theUrl =
        "https://api.bokoblin.com/?query={attendees{twitch_login,rank},tempsqhouses{id,name},tempsqhouseusers{name,house_id}}";
      break;
  }
  // if(inMessage.request == "sounds") {
  //   theUrl = "https://spreadsheets.google.com/feeds/list/1AQlGPgpH3CuxnM5JhClFTY9l6MzFqGyPXpWqYCzmzUQ/1/public/values?alt=json"
  // } else if (inMessage.request == "schedule") {
  //   theUrl = "https://zeldathon.net/api/Kinstone/schedules"
  // }
  console.log(theUrl);
  fetch(theUrl).then(function (response) {
    if (response.status === 200) {
      // console.log(xhr.responseText)
      response.json().then((data) => {
        console.log(data)
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            //SEND MESSAGE BACK TO ACTIVE TAB
            if (inMessage.request == "sounds") {
              chrome.tabs.sendMessage(tabs[0].id, { sounds: data.data.sounds });
            } else if (inMessage.request == "people") {
              chrome.tabs.sendMessage(tabs[0].id, { people: data.data });
            }
          }
        );
      });
    } else {
      console.error(response);
    }
  });
});
