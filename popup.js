chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "showData") {
    var dataDiv = document.getElementById("data");
    dataDiv.innerText = request.data || "No data available.";
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    { file: "contentScript.js" },
    function (result) {
      if (chrome.runtime.lastError) {
        var dataDiv = document.getElementById("data");
        dataDiv.innerText = "Error retrieving data.";
      }
    }
  );
});
