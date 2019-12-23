var testMode = false;

var currentDonationTotal;
var pending;
var pastDonations;
var budget;
var tierStrings = ['Gerudo','Kokiri','Goron','Zora','Oracle','Sage','Hero','Hylia','Triforce']
var tierRequirements = [1,5,10,25,50,100,250,500,1000]
var lockAmnt = -1;
//finding vars
var paypalFeeAlert = document.createElement("div")
paypalFeeAlert.setAttribute("id", "paypalFeeAlert")
var donationAmtContainer = document.querySelector("div.labeled");
var donationName = document.querySelector("input[name='name']");
var donationAmt = document.querySelector("input[name='amount']");
var donationComment = document.querySelector("textarea[name='comments']");
// var butt = document.querySelector("button.primary");
var donFormBody = document.querySelector("form.donation");
// var checker = document.querySelector("div.payment-modal");

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
  chrome.storage.sync.get(['total'], function(result) {
    if(isNaN(result.total) || result.total == null) {
      chrome.storage.sync.set({total: 0}, function(){});
      currentDonationTotal = 0;
    } else {
      currentDonationTotal = result.total;
    }
    item.insertAdjacentText('afterbegin',"You have donated $"+result.total);
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
      itemB.insertAdjacentText('afterbegin',"No set budget");
    } else if(parseFloat(currentDonationTotal) < parseFloat(result.budget)) {
      container.classList.add('good');
      itemB.insertAdjacentText('afterbegin',"You are within budget ($"+result.budget+")")
    } else if (parseFloat(currentDonationTotal) == parseFloat(result.budget)) {
      container.classList.add('ok');
      itemB.insertAdjacentText('afterbegin',"You are at budget! ($"+result.budget+")")
    } else if(parseFloat(currentDonationTotal) > parseFloat(result.budget)) {
      container.classList.add('bad');
      itemB.insertAdjacentText('afterbegin',"You are over budget! ($"+result.budget+")")
    }
  });
  chrome.storage.sync.get(['pendingaddition'], function(result) {
    if(result.pendingaddition == null) {
      pending = {value:0,name:''}
      chrome.storage.sync.set({pendingaddition: JSON.stringify(pending)}, function(){});
    } else {
      pending = JSON.parse(result.pendingaddition);
      console.log(pending)
    }
    chrome.storage.sync.get(['pastdonations'], function(result) {
      if(result.pastdonations == null) {
        pastDonations = new Map()
        chrome.storage.sync.set({pastdonations: JSON.stringify(Array.from(pastDonations.entries()))}, function(){});
      } else {
        try {
          pastDonations = new Map(JSON.parse(result.pastdonations));
        } catch (e) {
          console.log(e)
          pastDonations = new Map();
        }
      }
      check()
    });
  });
  function check() {
    var checker = document.querySelector("div.payment-modal"); //payment-modal
    //EXECUTES ON THE DONATION RESULT PAGE
    if(checker != null || testMode) {
      console.log("Valid donation result page")
      var pClearValue = {value:0,name:''}
      chrome.storage.sync.set({pendingaddition: JSON.stringify(pClearValue)}, function() {
      });
      //add the donation value to your total donation amount
      //TODO: Show tier progress
      chrome.storage.sync.set({total: (parseFloat(currentDonationTotal) + parseFloat(pending.value)).toFixed(2)}, function() {
        item.innerHTML = '';
        item.insertAdjacentText('afterbegin',"You have donated $"+((parseFloat(currentDonationTotal)+parseFloat(pending.value))).toFixed(2))
      });
      var processedDonationMap = pastDonations;
      //check if there was already a value for this donation name, if so make it additive
      var initialValue = (pastDonations.has(pending.name.toLowerCase()) ? pastDonations.get(pending.name) : 0)
      processedDonationMap.set(pending.name.toLowerCase(),parseFloat(parseFloat(initialValue)+parseFloat(pending.value)).toFixed(2))
      chrome.storage.sync.set({pastdonations: JSON.stringify(Array.from(processedDonationMap.entries()))})
    //EXECUTES ON THE "MAKE A DONATION" PAGE
    } else {
      httpGet("https://donate.zeldathon.net/total?unformatted=true",doTheThing)
      donationAmt.addEventListener('focusout',paypalFeeCheck);
      donationAmt.addEventListener('input',resetLockAmount);
      donationName.addEventListener('input',keepAmntLocked);
      donationComment.addEventListener('input',keepAmntLocked);
      donationName.addEventListener('focusout',donationTierCheck);
      donationAmtContainer.insertAdjacentElement("afterend",paypalFeeAlert)
    }
  }
}
window.onbeforeunload = function() {
  if(donationAmt.value != "") {
    var amt = parseFloat(donationAmt.value);
    var data = {name: donationName.value, value: amt}
    chrome.storage.sync.set({pendingaddition: JSON.stringify(data)}, function() {
         console.log('Pending Value is set to ' + JSON.stringify(data));
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
//Because something on kinstone's end resets the amount box if programattically adjusted,
//this is the workaround
function keepAmntLocked() {
  console.log('g '+lockAmnt)
  if(lockAmnt > -1) {
    donationAmt.value = lockAmnt;
  }
}
function resetLockAmount() {
  lockAmnt = donationAmt.value;
  console.log("reset "+lockAmnt)
}
function donationTierCheck() {
  var name = donationName.value.toLowerCase();
  if(document.querySelector('div.z-tier-box')){
    document.querySelector('div.z-tier-box').remove()
  }
  if(pastDonations.has(name)) {
    var amnt = pastDonations.get(name)
    var tier = getTierID(amnt)
    var tierBox = document.createElement('div')
    tierBox.classList.add('z-tier-box')
    tierBox.insertAdjacentText('afterbegin','**Personal donations to this name**')
    //PROGRESS BAR
    if(tier != 8) {
      var tierBoxProgressBar = document.createElement('div')
      tierBoxProgressBar.classList.add('z-tier-progress')
      var currentTierImg = document.createElement('img')
      currentTierImg.src = "https://stonemoney.github.io/zdc/"+[tier+1]+'.png'
      currentTierImg.classList.add("z-tier-img")
      currentTierImg.classList.add("z-tier-current")
      currentTierImg.style.opacity = '0'
      var goalTierImg = document.createElement('img')
      goalTierImg.src = "https://stonemoney.github.io/zdc/"+[tier+2]+'.png'
      goalTierImg.classList.add("z-tier-img")
      goalTierImg.classList.add("z-tier-goal")
      goalTierImg.style.opacity = '0'
      var progressBar = document.createElement('div')
      progressBar.classList.add('z-tier-progressbar')
      var actualProgress = document.createElement('div')
      actualProgress.classList.add('z-tier-progressbar-actual')
      //                                                                           add 5 to account for roundedness of bar when below 75%
      var percentage = ((amnt/tierRequirements[tier+1])*100 < 75 ? ((amnt/tierRequirements[tier+1])*100+5)+"%" : ((amnt/tierRequirements[tier+1])*100)+"%")
      actualProgress.style.width = '0%'
      progressBar.insertAdjacentElement('afterbegin',actualProgress)
      tierBoxProgressBar.insertAdjacentElement('beforeend',currentTierImg)
      tierBoxProgressBar.insertAdjacentElement('beforeend',progressBar)
      tierBoxProgressBar.insertAdjacentElement('beforeend',goalTierImg)
      //FINAL DATA
      var tierBoxCurrentLine = document.createElement('div');
      tierBoxCurrentLine.insertAdjacentText('beforeend','You are '+tierStrings[tier]+' level!')
      var tierBoxGoalLine = document.createElement('div');
      tierBoxGoalLine.insertAdjacentText('beforeend','$'+(tierRequirements[tier+1]-amnt)+' away from '+tierStrings[tier+1]+' ($'+amnt+'/$'+tierRequirements[tier+1].toFixed(2)+')')
      tierBox.insertAdjacentElement('beforeend',tierBoxProgressBar)
      tierBox.insertAdjacentElement('beforeend',tierBoxCurrentLine)
      tierBox.insertAdjacentElement('beforeend',tierBoxGoalLine)
      donationName.insertAdjacentElement("afterend",tierBox)
      setTimeout(function(){
        currentTierImg.style.opacity = '1'
      },250)
      setTimeout(function(){
        actualProgress.style.width = percentage
      },50)
      setTimeout(function(){
        goalTierImg.style.opacity = '1'
      },500)
    } else {
      var tierBoxCurrentLine = document.createElement('div');
      tierBoxCurrentLine.insertAdjacentText('beforeend','You are '+tierStrings[tier]+' level! ($'+amnt+')')
      tierBox.insertAdjacentElement('beforeend',tierBoxCurrentLine)
      donationName.insertAdjacentElement("afterend",tierBox)
    }
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
  secretsoundsBlankOption.insertAdjacentText("beforeend","Secret Sounds 🡇 || Donation Totals 🡅");
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
    header.insertAdjacentText('afterbegin',"Special Amounts")
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
    donFormBody.insertAdjacentElement("afterend", ddContainer);
    search.addEventListener('keyup',filterFunction)
  } else {
    donationAmt.insertAdjacentElement("afterend", secretsoundsDropdown);
  }
  
  document.getElementById('dropdowns').onchange= function setVal() {
    donationAmt.value = document.getElementById("dropdowns").value;
    lockAmnt = document.getElementById("dropdowns").value;
	  paypalFeeCheck();
  }
  
  document.getElementById('z-searchbox').onkeyup = function(){filterFunction()}
  
}

//PORTED code from 0rganics and Bell
//GLOBALS

var minimumDonation = 100;

//Locator

function locate(find, contents, name) {
  document.getElementById(find).insertAdjacentText('afterbegin',formatMoney(toDollars(contents)) + " " + name)
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
	chrome.runtime.sendMessage({request: "sounds"});
}

function loadSounds(response){
	var data = JSON.parse(response);
	data['feed']['entry'].forEach(function(x){
		var secretsoundsOption = document.createElement('option');
    secretsoundsOption.setAttribute("value", x['title']['$t']);
		secretsoundsOption.insertAdjacentText("beforeend","$"+x['title']['$t']+" "+x['gsx$name']['$t']);
		secretsoundsOption.classList.add("z-secrets")
		document.querySelector('select').insertAdjacentElement("beforeend",secretsoundsOption);
	})
}

function filterFunction() {
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

function getTierID(amnt) {
  if(amnt < 5) {
    return 0
  } else if(amnt < 10) {
    return 1
  } else if(amnt < 25) {
    return 2
  } else if(amnt < 50) {
    return 3
  } else if(amnt < 100) {
    return 4
  } else if(amnt < 250) {
    return 5
  } else if(amnt < 500) {
    return 6
  } else if(amnt < 1000) {
    return 7
  }
  return 8
}