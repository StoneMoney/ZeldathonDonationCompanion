/*
** file: js/main.js
** description: javascript code for "html/main.html" page
*/
var nf = new Intl.NumberFormat();
var currentDonationTotal = 0;
window.onload = function(){
  httpGet("https://zeldathon.net/api/Kinstone/total",setTotal);
  // httpGet("https://zeldathon.net/api/teamhousecup",setPoints);
  
  //chrome.storage.sync.get(['defaultname'], function(result) {
  //  if(result.defaultname == null) {
  //    chrome.storage.sync.set({defaultname: ""}, function(){});
  //  }
  //  document.getElementById('defaultname').innerHTML = result.defaultname;
  //});
  //chrome.storage.sync.get(['defaultamount'], function(result) {
  //  if(result.defaultamount == null) {
  //    chrome.storage.sync.set({defaultamount: ""}, function(){});
  //  }
  //  document.getElementById('defaultamount').innerHTML = "("+result.defaultamount+")";
  //});
  chrome.storage.sync.get(['total'], function(result) {
    if(isNaN(result.total) || result.total == null) {
      chrome.storage.sync.set({total: 0}, function(){});
    }
    document.getElementById('totaldonated').innerHTML = "$"+nf.format(result.total);
  });
  chrome.storage.sync.get(['budget'], function(result) {
      if(isNaN(result.budget) || result.budget == null) {
        chrome.storage.sync.set({budget: -1}, function(){});
      }
      if(result.budget == -1) {
        document.getElementById('budget').innerHTML = "none";
      } else {
        document.getElementById('budget').innerHTML = "$"+nf.format(result.budget);
      }
  });

	// function setPoints(data) {
	//   var points = JSON.parse(data);
	//   document.getElementById('courage').innerHTML = points[0]['points'];
	//   document.getElementById('power').innerHTML = points[1]['points'];
	//   document.getElementById('wisdom').innerHTML = points[2]['points'];	
	// }
	function setTotal(data) {
		var marathontotal = JSON.parse(data);
		document.getElementById('marathontotal').innerHTML = marathontotal[0];
	}
}
document.getElementById('options').onclick = function() {
  chrome.tabs.create({'url': "html/options.html" } )
}
function httpGet(theUrl, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", theUrl, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            callback(xhr.responseText)
        } else {
          console.error(xhr.statusText);
          return 0
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
}
//bind events to dom elements
