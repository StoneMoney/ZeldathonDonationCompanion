/*
** file: js/options.js
** description: javascript code for "html/options.html" page
*/
document.getElementById('btn').onclick = function() {
  if(document.getElementById('budget').value > 0) {
    chrome.storage.sync.set({budget: parseFloat(document.getElementById('budget').value).toFixed(2)}, function() {
         console.log('Value is set to ' + document.getElementById('budget').value);
    });
  }
  if(document.getElementById('total').value > 0) {
    chrome.storage.sync.set({total: parseFloat(document.getElementById('total').value).toFixed(2)}, function() {
         console.log('Value is set to ' + document.getElementById('total').value);
    });
  }
  if(document.getElementById('blessfilter').checked) {
    chrome.storage.sync.set({isBless: true }, function() {
         console.log('Bless Value is set to true');
    });
  } else {
    chrome.storage.sync.set({isBless: false }, function() {
      console.log('Value is set to false');
    });
  }
}
document.getElementById('destroyIt').onclick = function() {
  var r = confirm("Clear all data?")
  if(r) {
    chrome.storage.sync.set({total: null}, function() {
    });
    chrome.storage.sync.set({budget: null}, function() {
    });
    chrome.storage.sync.set({pending: null}, function() {
    });
    chrome.storage.sync.set({defaultname: null}, function() {
    });
    chrome.storage.sync.set({defaultamount: null}, function() {
    });
    chrome.storage.local.set({sounds: null}, function() {
    });
    chrome.storage.local.set({isBless: false}, function() {
    });
    alert("Data cleared")
  } else {
    alert("Did not clear data")
  }
}
