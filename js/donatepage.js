
//<script src="https://cdn.blockspring.com/blockspring.js"></script>
//  blockspring.runParsed("read-worksheet-google-sheets", { "file_id": 1AQlGPgpH3CuxnM5JhClFTY9l6MzFqGyPXpWqYCzmzUQ, "worksheet_id": , "has_header": false}, { "api_key": "br_101994_945f0fe8a26ced0ae89c17b579a2ace81171d024" }, function(res){
//    console.log(res.params);
//  })

var currentDonationTotal;
var pending;
var budget;
//finding vars
var paypalFeeAlert = document.createElement("div")
paypalFeeAlert.setAttribute("id", "paypalFeeAlert")
var donationAmtContainer = document.querySelector("div.labeled");
var donationName = document.querySelector("input[name='name']");
var donationAmt = document.querySelector("input[name='amount']");
var butt = document.querySelector("button.primary");
var donFormBody = document.querySelector("form.donation");
// var checker = document.querySelector("div.payment-modal");

//httpGet("https://1ivxvsb9g2.execute-api.us-east-2.amazonaws.com/test/pets/",logger)

var body = document.querySelector("div.body");
var container = document.createElement('p');
var item = document.createElement('div');
var itemB = document.createElement('div');
container.classList.add('zdc-alert');
container.appendChild(item);
container.appendChild(itemB);
body.appendChild(container)

// GET MESSAGE FROM BACKGROUND LOADER
chrome.runtime.onMessage.addListener(function(inMessage, callback) {
  loadSounds(inMessage.sounds)
});
window.onload = function(){
  chrome.storage.sync.get(['defaultname'], function(result) {
    if(result.defaultname != null) {
      // donationName.value = result.defaultname
    }
  });
  chrome.storage.sync.get(['defaultamount'], function(result) {
    if(result.defaultamount != null) {
      // donationAmt.value = result.defaultamount
    }
  });
  chrome.storage.sync.get(['total'], function(result) {
    if(isNaN(result.total) || result.total == null) {
      chrome.storage.sync.set({total: 0}, function(){});
      currentDonationTotal = 0;
    } else {
      currentDonationTotal = result.total;
    }
    item.innerHTML = "You have donated $"+result.total;
  });
  chrome.storage.sync.get(['budget'], function(result) {
    if(isNaN(result.budget) || result.budget == null) {
      chrome.storage.sync.set({budget: -1}, function(){});
      budget = -1;
    } else {
      budget = result.budget;
    }
    if(budget == -1 || budget == undefined || budget == null){
      container.classList.add('ok');
      itemB.innerHTML = "No set budget";
    } else if(parseFloat(currentDonationTotal) < parseFloat(result.budget)) {
      container.classList.add('good');
      itemB.innerHTML = "You are within budget ($"+result.budget+")";
    } else if (parseFloat(currentDonationTotal) == parseFloat(result.budget)) {
      container.classList.add('ok');
      itemB.innerHTML = "You are at budget! ($"+result.budget+")";
    } else if(parseFloat(currentDonationTotal) > parseFloat(result.budget)) {
      container.classList.add('bad');
      itemB.innerHTML = "You are over budget! ($"+result.budget+")";
    }
  });
  chrome.storage.sync.get(['pendingaddition'], function(result) {
    if(isNaN(result.pendingaddition) || result.pendingaddition == null) {
      chrome.storage.sync.set({pendingaddition: -1}, function(){});
      pending = 0;
    } else {
      pending = result.pendingaddition;
    }
    check()
  });
  function check() {
    var checker = document.querySelector("div.payment-modal"); //payment-modal
    if(checker != null) {
      console.log("valid")
      chrome.storage.sync.set({pendingaddition: 0}, function() {
      });
      chrome.storage.sync.set({total: (parseFloat(currentDonationTotal) + parseFloat(pending)).toFixed(2)}, function() {
           item.innerHTML = "You have donated $"+((parseFloat(currentDonationTotal)+parseFloat(pending))).toFixed(2);
      });
    } else {
      httpGet("https://donate.zeldathon.net/total?unformatted=true",doTheThing)
	  donationAmt.addEventListener('focusout',paypalFeeCheck);
    donationAmtContainer.insertAdjacentHTML("afterend",paypalFeeAlert.outerHTML)
    }
  }
}
window.onbeforeunload = function() {
// butt.onclick = function(){
  if(donationAmt.value != "") {
    var amt = parseFloat(donationAmt.value);
    chrome.storage.sync.set({pendingaddition: amt}, function() {
         console.log('Pending Value is set to ' + amt);
    });
  }
}
function paypalFeeCheck() {
	var amount = donationAmt.value;
	if(amount < 4.99 && amount != "") {
		console.log("check")
		var paypalStraightFee = .3;
		var paypalPercentFee = .022;
		var actualDonateValue = (amount-paypalStraightFee-((amount - paypalStraightFee) * paypalPercentFee))
		if(amount < 1) {
			document.getElementById("paypalFeeAlert").innerHTML = "<b>This amount is too small to be donated</b>"
		} else if(amount < 2 && amount >= 1) {
			document.getElementById("paypalFeeAlert").innerHTML = "<b style='background-color:rgba(255,0,0,.4)'>This would equate to ~$"+(Math.round(actualDonateValue * 100) / 100)+" after <a href='https://www.paypal.com/us/webapps/mpp/paypal-fees'>paypal fees</a></b>"
		} else {
			document.getElementById("paypalFeeAlert").innerHTML = "This would equate to ~$"+(Math.round(actualDonateValue * 100) / 100)+" after <a href='https://www.paypal.com/us/webapps/mpp/paypal-fees'>paypal fees</a>"
		}
	} else {
		document.getElementById("paypalFeeAlert").innerHTML = ""
	}
}
var checker1 = document.querySelector("div.payment-modal"); //payment-modal
if(checker1 == null || checker1 == undefined) {
  var secretsoundsDropdown = document.createElement('select');
  secretsoundsDropdown.setAttribute("id", "dropdowns");
  donationAmt.style.width = "39%";
  secretsoundsDropdown.style.width = "60%";
  var secretsoundsBlankOption = document.createElement('option');
  secretsoundsBlankOption.setAttribute("value", "");
  secretsoundsBlankOption.setAttribute("selected", "selected");
  secretsoundsBlankOption.classList.add("special")
  secretsoundsBlankOption.insertAdjacentHTML("beforeend","Secret Sounds 🡇 || Donation Totals 🡅");
  var secretsoundsPalindrome = document.createElement('option');
  secretsoundsPalindrome.setAttribute("id", "pldon");
  secretsoundsPalindrome.classList.add("special")
  var secretsoundsFixers = document.createElement('option');
  secretsoundsFixers.setAttribute("id", "fxdon");
  secretsoundsFixers.classList.add("special")
  var secretsoundsStepdigitUp = document.createElement('option');
  secretsoundsStepdigitUp.setAttribute("id", "sudon");
  secretsoundsStepdigitUp.classList.add("special")
  var secretsoundsStepdigitDown = document.createElement('option');
  secretsoundsStepdigitDown.setAttribute("id", "sddon");
  secretsoundsStepdigitDown.classList.add("special")
  var secretsoundsRepdigit = document.createElement('option');
  secretsoundsRepdigit.setAttribute("id", "rddon");
  secretsoundsRepdigit.classList.add("special")
  var secretsoundsAltdigit = document.createElement('option');
  secretsoundsAltdigit.setAttribute("id", "aldon");
  secretsoundsAltdigit.classList.add("special")
  secretsoundsDropdown.insertAdjacentElement("afterBegin",secretsoundsPalindrome);
  secretsoundsDropdown.insertAdjacentElement("afterBegin",secretsoundsFixers);
  secretsoundsDropdown.insertAdjacentElement("afterBegin",secretsoundsStepdigitUp);
  secretsoundsDropdown.insertAdjacentElement("afterBegin",secretsoundsStepdigitDown);
  secretsoundsDropdown.insertAdjacentElement("afterBegin",secretsoundsRepdigit);
  secretsoundsDropdown.insertAdjacentElement("afterBegin",secretsoundsAltdigit);
  secretsoundsDropdown.insertAdjacentElement("beforeend",secretsoundsBlankOption);
  getDonationSounds();
  
  if(window.innerWidth > 767) {
    var ddContainer = document.createElement('div')
    ddContainer.classList.add("z-body")
    var header = document.createElement('h1')
    header.innerHTML = "Special Amounts"
    var search = document.createElement('input')
    search.setAttribute('type','text')
    search.setAttribute('placeholder','Search...')
    search.setAttribute('id','z-searchbox')
    secretsoundsDropdown.classList.add("z-sidebar")
    secretsoundsDropdown.style.width = "";
    secretsoundsDropdown.size = "15"
    ddContainer.insertAdjacentElement("afterbegin",secretsoundsDropdown);
    ddContainer.insertAdjacentElement("afterbegin",search)
    ddContainer.insertAdjacentElement("afterbegin",header)
    donFormBody.insertAdjacentHTML("afterend", ddContainer.outerHTML);
    search.addEventListener('keyup',filterFunction)
  } else {
    donationAmt.insertAdjacentHTML("afterend", secretsoundsDropdown.outerHTML);
  }
  
  document.getElementById('dropdowns').onchange= function setVal() {
     donationAmt.value = document.getElementById("dropdowns").value;
	 paypalFeeCheck();
  }
  
  document.getElementById('z-searchbox').onkeyup = function(){filterFunction()}
  
}

//PORTED code from 0rganics and Bell
//GLOBALS

var minimumDonation = 100;

//Locator

function locate(find, contents, name) {
  console.log(find)
  document.getElementById(find).innerHTML = formatMoney(toDollars(contents)) + " " + name;
  document.getElementById(find).value = toDollars(contents);
}

//Money Functions
function toCents(total) {
	total = Math.round(parseFloat(total.toString().replace(',', ''))*100);
	return total;
}

function toCentsByMult(total) {
	return total * 100;
}
function toDollars(total) {
	total = total / 100;
	return total;
}

// formatMoney() function copied from:
// http://www.josscrowcroft.com/2011/code/format-unformat-money-currency-javascript/
// Slight modification by Organics to allow blank thousand symbol.
function formatMoney(number, places, symbol, thousand, decimal) {
  number = number || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : '$';
  thousand = thousand !== undefined ? thousand : ',';
  decimal = decimal || '.';
  var negative = number < 0 ? '-' : '',
  i = parseInt(number = Math.abs( + number || 0).toFixed(places), 10) + '',
  j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2)  : '');
}

//Team Code

//Palindrome
function isPalindrome(total) {
total = total.toString();
if (total === total.split('').reverse().join(''))
	{
	return true;
	}
else
	{
	return false;
	}
}
function teamPalindrome(total) {
var holder = total;
while (true) {
	total++;
	if (isPalindrome(total) === true) {
		if (toDollars(total - holder) > 1.00) {
			locate("pldon",(total - holder),"Palindrome ("+formatMoney(toDollars(total))+")");
			break;
			}
		}
	}
}

//Team Fixers (rounds up a dollar)
function teamFixers(total) {
  var cents = 100 - (total % 100);

  locate("fxdon",parseInt(cents) + 100,"Fixer");
}


function altDigit(total) {
intTotal =  total;

var intAL = [parseInt(intTotMin.toString().substr(0,1)), parseInt(intTotMin.toString().substr(1,1))-1];
	var intAL1 = 1;
	var intAL2 = intAL[0];
	var intALlen = intTotMin.toString().length;
	while (intAL2 < intTotMin) {
		intAL[1] = intAL[1] + 1;
		if (intAL[1] == intAL[0]) {
		    intAL[1] = intAL[1] + 1;
		}
		if (intAL[1] >= 10) {
			intAL[0] = intAL[0] + 1;
			intAL[1] = 0;
			if (intAL[0] == 10) {
				intAL[0] = 1;
				intALlen = intALlen + 1;
			}
		}
		intAL2 = intAL[0];
		intAL1 = 1;
		while (intAL2.toString().length < intALlen) {
			intAL2 = parseInt(intAL2.toString().concat(intAL[intAL1]));
			intAL1 = 1 - intAL1;
		}
	}
	var intALTot = parseInt(intAL2);
	var intALDon = intALTot - intTotal;
	locate("aldon",(intALDon),"Alternating Digits ("+formatMoney(toDollars(intALTot))+")");
}

function stepdigitUp(total) {

intTotal =  total;

var intSUlen = intTotMin.toString().length;
var intSUstart = parseInt(intTotMin.toString().substr(0,1));
var intSU1 = 0;
var intSU2 = 0;
intSUstart = intSUstart - 1;
var booSUerr = false;
while ((intSU1 < intTotMin) && (booSUerr == false)) {
	intSUstart = intSUstart + 1;
	if ((intSUstart + intSUlen) > 10) {
		intSUstart = 1;
		intSUlen = intSUlen + 1;
	}
	if (intSUlen == 10) {
		booSUerr = true;
	}
	intSU2 = intSUstart;
	intSU1 = intSUstart;
	while (intSU1.toString().length < intSUlen) {
		intSU2 = intSU2 + 1;
	intSU1 = intSU1.toString().concat(intSU2);
	}
}
var intSUTot = intSU1;
var intSUDon = intSUTot - intTotal;
if (booSUerr == false) {
	locate("sudon",(intSUDon),"Stepdigit Up ("+formatMoney(toDollars(intSUTot))+")");
}
}

function stepdigitDown(total) {

intTotal =  total;

var intSDlen = intTotMin.toString().length;
var intSDstart = parseInt(intTotMin.toString().substr(0,1));
intSDstart = Math.max(intSDstart, (intSDlen - 1))
var intSD1 = 0;
var intSD2 = 0;
intSDstart = intSDstart - 1;
var booSDerr = false;
while ((intSD1 < intTotMin) && (booSDerr == false)) {
	intSDstart = intSDstart + 1;
	if (intSDstart >= 10) {
		intSDlen = intSDlen + 1;
		intSDstart = intSDlen - 1;
	}
	if (intSDlen > 10) {
		booSDerr = true;
	}
	intSD2 = intSDstart;
	intSD1 = intSDstart;
	while (intSD1.toString().length < intSDlen) {
		intSD2 = intSD2 - 1;
		intSD1 = intSD1.toString().concat(intSD2);
	}
}
var intSDTot = intSD1;
var intSDDon = intSDTot - intTotal;
if (booSDerr == false) {
	locate("sddon",(intSDDon),"Stepdigit Down ("+formatMoney(toDollars(intSDTot))+")");
	}
}

function repDigit(total) {

intTotal =  total;

var intRD1 = parseInt(intTotMin.toString().substr(0,1));
var intRDlen = intTotMin.toString().length
var intRD2 = intRD1;
while (intRD2.toString().length < intRDlen) {
	intRD2 = intRD2.toString().concat(intRD1);
}
while (parseInt(intRD2) < intTotMin) {
	intRD1 = intRD1 + 1;
	if (intRD1 == 10) {
		intRD1 = 1;
		intRDlen = intRDlen + 1;
	}
	intRD2 = intRD1;
	while (intRD2.toString().length < intRDlen) {
		intRD2 = intRD2.toString().concat(intRD1);
	}
}
intRDTot = parseInt(intRD2);
intRDDon = intRDTot - intTotal;
locate("rddon",(intRDDon),"Repeating ("+formatMoney(toDollars(intRDTot))+")");
}

//INITIALIZATION FOR ALL
function doTheThing(total) {

    total = toCents(total).toString();
    intTotMin = parseInt(total) + minimumDonation;
    teamPalindrome(total);
    teamFixers(total);
    stepdigitUp(total);
    stepdigitDown(total);
    repDigit(total);
    altDigit(total);

}

//SPECIAL POWER FUNCTIONS
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
function getDonationSounds() {
	console.log("yes")
	chrome.runtime.sendMessage({request: "donation-sounds"});
}

function loadSounds(response){
	console.log(response)
	var data = JSON.parse(response);
	data['feed']['entry'].forEach(function(x){
		var secretsoundsOption = document.createElement('option');
    secretsoundsOption.setAttribute("value", x['title']['$t']);
		secretsoundsOption.insertAdjacentHTML("beforeend","$"+x['title']['$t']+" "+x['gsx$name']['$t']);
		secretsoundsOption.classList.add("z-secrets")
		document.querySelector('select').insertAdjacentHTML("beforeend",secretsoundsOption.outerHTML);
	})
}

function filterFunction() {
  console.log("y")
  var input, filter, a, i;
  input = document.getElementById("z-searchbox");
  filter = input.value.toUpperCase();
  div = document.getElementById("dropdowns");
  a = div.getElementsByTagName("option");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function logger(str) {
	console.log(str)
}