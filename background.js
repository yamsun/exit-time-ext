// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getData") {
    const data = getDataFromPage();
    sendResponse({ data: data });
  }
  return true; // Add this line to fix the connection issue
});

// Retrieve the desired data from the current web page
function getDataFromPage() {
  // Add your code here to extract the data from the web page
  // You can use DOM manipulation or any other suitable method

  // For example, let's extract the title of the current page
  return document.title;
}
