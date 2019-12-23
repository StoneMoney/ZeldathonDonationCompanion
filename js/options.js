/*
** file: js/options.js
** description: javascript code for "html/options.html" page
*/
var pastDonations;
chrome.storage.sync.get(['isBless'], function (result) {
  if (result.isBless != true && result.isBless != false) {
    chrome.storage.sync.set({ isBless: false }, function () { });
  }
  document.getElementById('blessfilter').checked = result.isBless;
});
chrome.storage.sync.get(['pastdonations'], function (result) {
  if (result.pastdonations == null || result.pastdonations.length < 0) {
    document.getElementById('TEMP-DATA1').innerHTML = 'unset'
    chrome.storage.sync.set({ pastdonations: [] }, function () { });
  } else {
    try {
      pastDonations = new Map(JSON.parse(result.pastdonations));
    } catch (e) {
      console.log(e)
      pastDonations = new Map();
    }
    document.getElementById('TEMP-DATA1').innerHTML = result.pastdonations;
    processPastDonations()
  }
});
chrome.storage.sync.get(['pendingaddition'], function (result) {
  if (result.pendingaddition == null) {
    var pending = { value: 0, name: '' }
    document.getElementById('TEMP-DATA2').innerHTML = JSON.stringify({ value: 0, name: '' });
    chrome.storage.sync.set({ pendingaddition: JSON.stringify(pending) }, function () { });
  } else {
    document.getElementById('TEMP-DATA2').innerHTML = result.pendingaddition;
  }
});
document.getElementById('btn').onclick = function () {
  if (document.getElementById('budget').value > 0) {
    chrome.storage.sync.set({ budget: parseFloat(document.getElementById('budget').value).toFixed(2) }, function () {
      console.log('Value is set to ' + document.getElementById('budget').value);
    });
  }
  if (document.getElementById('total').value > 0) {
    chrome.storage.sync.set({ total: parseFloat(document.getElementById('total').value).toFixed(2) }, function () {
      console.log('Value is set to ' + document.getElementById('total').value);
    });
  }
  if (document.getElementById('blessfilter').checked) {
    chrome.storage.sync.set({ isBless: true }, function () {
      console.log('Bless Value is set to true');
    });
  } else {
    chrome.storage.sync.set({ isBless: false }, function () {
      console.log('Value is set to false');
    });
  }
}
document.getElementById('destroyIt').onclick = function () {
  var r = confirm("Clear all data?")
  if (r) {
    chrome.storage.sync.set({ total: null, budget: null, pending: null, isBless: false, pastdonations: null, pendingaddition: null }, function () {
    });
    alert("Data cleared")
  } else {
    alert("Did not clear data")
  }
}

function processPastDonations() {
  container = document.getElementById('pastdonations')
  var map = pastDonations.entries()
  console.log(map)
  for (var i = 0; i < pastDonations.size; i++) {
    sect = map.next().value
    console.log(sect)
    var subContainer = document.createElement('div')
    subContainer.classList.add('pd-subcontainer')
    var nameField = document.createElement('div')
    nameField.classList.add('pd-name')
    nameField.insertAdjacentText('beforeend', (sect[0] == "" ? '<ANONYMOUS>' : sect[0]))
    var amountField = document.createElement('input')
    amountField.classList.add('pd-value')
    amountField.setAttribute('type', 'number')
    amountField.value = sect[1]
    var submitButton = document.createElement('button')
    submitButton.classList.add('pd-submit')
    submitButton.setAttribute('value',i)
    submitButton.insertAdjacentText('afterbegin','SAVE')
    submitButton.addEventListener('click', function() {
      updatePastDonation(this)
    })
    subContainer.insertAdjacentElement('beforeend', nameField)
    subContainer.insertAdjacentElement('beforeend', amountField)
    subContainer.insertAdjacentElement('beforeend', submitButton)
    container.insertAdjacentElement('beforeend', subContainer)
  }
}
function updatePastDonation(i) {
  console.log(i.value)
  var name = document.querySelectorAll("div[class='pd-name'")[i.value].innerHTML
  var value = document.querySelectorAll("input[class='pd-value']")[i.value].value

  if (pastDonations.has(name)) {
    pastDonations.set(name, value)
    console.log(pastDonations)
    chrome.storage.sync.set({ pastdonations: JSON.stringify(Array.from(pastDonations.entries())) }, function () {
      i.style.backgroundColor = 'green'
      setTimeout(function () {
        i.style.backgroundColor = 'rgba(80, 160, 69,.25)'
      }, 1000)
      console.log('Value is set');
    });
  }
}