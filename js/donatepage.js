var testMode = false;
//If the document loads before content script is injected, this is the failsafe
if (document.readyState === "complete") {
  pageLoaded();
}

var currentDonationTotal;
var pending;
var pastDonations;
var budget;
var tierStrings = [
  "Gerudo",
  "Korok",
  "Goron",
  "Zora",
  "Oracle",
  "Sage",
  "Hero",
  "Hylia",
  "Triforce",
];
var tierRequirements = [1, 5, 10, 25, 50, 100, 250, 500, 1000];
var lockAmnt = -1;
//finding vars
var paypalFeeAlert = document.createElement("div");
paypalFeeAlert.setAttribute("id", "paypalFeeAlert");
var donationAmtContainer;
var donationName = document.querySelector("input[name='name']");
var donationAmt;
// var butt = document.querySelector("button.primary");
// var checker = document.querySelector("div.payment-modal");

var body = document.querySelector("div.bg-dark-blue");
var container = document.createElement("p");
var item = document.createElement("div");
var itemB = document.createElement("div");
container.classList.add("zdc-alert");
container.appendChild(item);
container.appendChild(itemB);
body.appendChild(container);

window.onload = function () {
  pageLoaded();
};
function pageLoaded() {
  var checker1 = document.querySelector("div.bg-gradient-title"); //payment-modal
  chrome.storage.sync.get(["total"], function (result) {
    if (isNaN(result.total) || result.total == null) {
      chrome.storage.sync.set({ total: 0 }, function () {});
      currentDonationTotal = 0;
    } else {
      currentDonationTotal = result.total;
    }
    item.insertAdjacentText("afterbegin", "You have donated $" + result.total);
  });
  chrome.storage.sync.get(["budget"], function (result) {
    if (isNaN(result.budget) || result.budget == null) {
      chrome.storage.sync.set({ budget: -1 }, function () {});
      budget = -1;
    } else {
      budget = result.budget;
    }
    if (budget == -1 || budget == undefined || budget == null) {
      container.classList.add("ok");
      itemB.insertAdjacentText("afterbegin", "No set budget");
    } else if (parseFloat(currentDonationTotal) < parseFloat(result.budget)) {
      container.classList.add("good");
      itemB.insertAdjacentText(
        "afterbegin",
        "You are within budget ($" + result.budget + ")"
      );
    } else if (parseFloat(currentDonationTotal) == parseFloat(result.budget)) {
      container.classList.add("ok");
      itemB.insertAdjacentText(
        "afterbegin",
        "You are at budget! ($" + result.budget + ")"
      );
    } else if (parseFloat(currentDonationTotal) > parseFloat(result.budget)) {
      container.classList.add("bad");
      itemB.insertAdjacentText(
        "afterbegin",
        "You are over budget! ($" + result.budget + ")"
      );
    }
  });
  chrome.storage.sync.get(["pendingaddition"], function (result) {
    if (result.pendingaddition == null) {
      pending = { value: 0, name: "" };
      chrome.storage.sync.set(
        { pendingaddition: JSON.stringify(pending) },
        function () {}
      );
    } else {
      pending = JSON.parse(result.pendingaddition);
      console.log(pending);
    }
    chrome.storage.sync.get(["pastdonations"], function (result) {
      if (result.pastdonations == null) {
        pastDonations = new Map();
        chrome.storage.sync.set(
          {
            pastdonations: JSON.stringify(Array.from(pastDonations.entries())),
          },
          function () {}
        );
      } else {
        try {
          pastDonations = new Map(JSON.parse(result.pastdonations));
        } catch (e) {
          console.log(e);
          pastDonations = new Map();
        }
      }
      if (checker1 == null || checker1.innerText == "DONATE FORM") {
        donationAmt = document.querySelector("input[name='amount']");
        donationAmtContainer = donationAmt.parentNode
        check();
      } else {
        check();
      }
    });
  });
  function check() {
    var checker1 = document.querySelector("div.bg-gradient-title"); //payment-modal
    //EXECUTES ON THE DONATION RESULT PAGE
    if ((checker1 != null && checker1.innerText == "THANK YOU FOR DONATING!") || testMode) {
      console.log("Valid donation result page");
      var pClearValue = { value: 0, name: "" };
      chrome.storage.sync.set(
        { pendingaddition: JSON.stringify(pClearValue) },
        function () {}
      );
      //add the donation value to your total donation amount
      //TODO: Show tier progress
      chrome.storage.sync.set(
        {
          total: (
            parseFloat(currentDonationTotal) + parseFloat(pending.value)
          ).toFixed(2),
        },
        function () {
          item.innerHTML = "";
          item.insertAdjacentText(
            "afterbegin",
            "You have donated $" +
              (
                parseFloat(currentDonationTotal) + parseFloat(pending.value)
              ).toFixed(2)
          );
        }
      );
      var processedDonationMap = pastDonations;
      //check if there was already a value for this donation name, if so make it additive
      var initialValue = pastDonations.has(pending.name.toLowerCase())
        ? pastDonations.get(pending.name.toLowerCase())
        : 0;
      processedDonationMap.set(
        pending.name.toLowerCase(),
        parseFloat(
          parseFloat(initialValue) + parseFloat(pending.value)
        ).toFixed(2)
      );
      chrome.storage.sync.set({
        pastdonations: JSON.stringify(
          Array.from(processedDonationMap.entries())
        ),
      });
      //EXECUTES ON THE "MAKE A DONATION" PAGE
    } else {
      donationAmt.addEventListener("focusout", paypalFeeCheck);
      donationName.addEventListener("focusout", donationTierCheck);
      donationAmtContainer.insertAdjacentElement("afterend", paypalFeeAlert);
    }
  }
}
window.onbeforeunload = function () {
  if (donationAmt.value != "") {
    var amt = parseFloat(donationAmt.value);
    var data = { name: donationName.value, value: amt };
    chrome.storage.sync.set(
      { pendingaddition: JSON.stringify(data) },
      function () {
        console.log("Pending Value is set to " + JSON.stringify(data));
      }
    );
  }
};
function paypalFeeCheck() {
  var amount = donationAmt.value;
  if (amount < 5 && amount != "") {
    var paypalStraightFee = 0.49;
    var paypalPercentFee = 0.0199;
    var actualDonateValue =
      amount -
      paypalStraightFee -
      (amount - paypalStraightFee) * paypalPercentFee;
    if (amount < 1) {
      document.getElementById("paypalFeeAlert").innerHTML =
        "<b>This amount is too small to be donated</b>";
    } else if (amount < 2 && amount >= 1) {
      document.getElementById("paypalFeeAlert").innerHTML =
        "<b style='background-color:rgba(255,0,0,.4)'>This would equate to ~$" +
        (Math.round(actualDonateValue * 100) / 100).toFixed(2) +
        " after <a href='https://www.paypal.com/us/webapps/mpp/merchant-fees#:~:text=0.49%20USD-,Charity%20Transaction%20Rates,-Charity%20transaction%20rates'>paypal fees</a></b>";
    } else {
      document.getElementById("paypalFeeAlert").innerHTML =
        "This would equate to ~$" +
        (Math.round(actualDonateValue * 100) / 100).toFixed(2) +
        " after <a href='https://www.paypal.com/us/webapps/mpp/merchant-fees#:~:text=0.49%20USD-,Charity%20Transaction%20Rates,-Charity%20transaction%20rates'>paypal fees</a>";
    }
  } else {
    document.getElementById("paypalFeeAlert").innerHTML = "";
  }
}

function donationTierCheck() {
  var name = donationName.value.toLowerCase();
  if (document.querySelector("div.z-tier-box")) {
    document.querySelector("div.z-tier-box").remove();
  }
  if (pastDonations.has(name)) {
    var amnt = pastDonations.get(name);
    var tier = getTierID(amnt);
    var tierBox = document.createElement("div");
    tierBox.classList.add("z-tier-box");
    tierBox.classList.add("fade-in");
    tierBox.insertAdjacentText(
      "afterbegin",
      "**Personal donations to this name**"
    );
    //PROGRESS BAR
    if (tier != 8) {
      var tierBoxProgressBar = document.createElement("div");
      tierBoxProgressBar.classList.add("z-tier-progress");
      var currentTierImg = document.createElement("img");
      currentTierImg.src =
        "https://stonemoney.github.io/zdc/" + [tier + 1] + ".png";
      currentTierImg.classList.add("z-tier-img");
      currentTierImg.classList.add("z-tier-current");
      currentTierImg.style.opacity = "0";
      var goalTierImg = document.createElement("img");
      goalTierImg.src =
        "https://stonemoney.github.io/zdc/" + [tier + 2] + ".png";
      goalTierImg.classList.add("z-tier-img");
      goalTierImg.classList.add("z-tier-goal");
      goalTierImg.style.opacity = "0";
      var progressBar = document.createElement("div");
      progressBar.classList.add("z-tier-progressbar");
      var actualProgress = document.createElement("div");
      actualProgress.classList.add("z-tier-progressbar-actual");
      //                                                                           add 5 to account for roundedness of bar when below 75%
      var percentage =
        (amnt / tierRequirements[tier + 1]) * 100 < 75
          ? ((amnt / tierRequirements[tier + 1]) * 100 + 5).toFixed(2) + "%"
          : ((amnt / tierRequirements[tier + 1]) * 100).toFixed(2) + "%";
      actualProgress.style.width = "0%";
      progressBar.insertAdjacentElement("afterbegin", actualProgress);
      tierBoxProgressBar.insertAdjacentElement("beforeend", currentTierImg);
      tierBoxProgressBar.insertAdjacentElement("beforeend", progressBar);
      tierBoxProgressBar.insertAdjacentElement("beforeend", goalTierImg);
      //FINAL DATA
      var tierBoxCurrentLine = document.createElement("div");
      tierBoxCurrentLine.insertAdjacentText(
        "beforeend",
        "You are " + tierStrings[tier] + " level!"
      );
      var tierBoxGoalLine = document.createElement("div");
      tierBoxGoalLine.insertAdjacentText(
        "beforeend",
        "$" +
          (tierRequirements[tier + 1] - amnt).toFixed(2) +
          " away from " +
          tierStrings[tier + 1] +
          " ($" +
          amnt +
          "/$" +
          tierRequirements[tier + 1].toFixed(2) +
          ")"
      );
      tierBox.insertAdjacentElement("beforeend", tierBoxProgressBar);
      tierBox.insertAdjacentElement("beforeend", tierBoxCurrentLine);
      tierBox.insertAdjacentElement("beforeend", tierBoxGoalLine);
      donationName.parentElement.insertAdjacentElement("afterEnd", tierBox);
      setTimeout(function () {
        currentTierImg.style.opacity = "1";
      }, 250);
      setTimeout(function () {
        actualProgress.style.width = percentage;
      }, 50);
      setTimeout(function () {
        goalTierImg.style.opacity = "1";
      }, 500);
    } else {
      var tierBoxCurrentLine = document.createElement("div");
      tierBoxCurrentLine.insertAdjacentText(
        "beforeend",
        "You are " + tierStrings[tier] + " level! ($" + amnt + ")"
      );
      tierBox.insertAdjacentElement("beforeend", tierBoxCurrentLine);
      donationName.insertAdjacentElement("afterend", tierBox);
    }
  } else {
    var tierBox = document.createElement("div");
    tierBox.classList.add("z-tier-box");
    tierBox.insertAdjacentText(
      "afterbegin",
      "**No personal donations to this name**"
    );
    donationName.insertAdjacentElement("afterend", tierBox);
  }
}

function getTierID(amnt) {
  if (amnt < 5) {
    return 0;
  } else if (amnt < 10) {
    return 1;
  } else if (amnt < 25) {
    return 2;
  } else if (amnt < 50) {
    return 3;
  } else if (amnt < 100) {
    return 4;
  } else if (amnt < 250) {
    return 5;
  } else if (amnt < 500) {
    return 6;
  } else if (amnt < 1000) {
    return 7;
  }
  return 8;
}
