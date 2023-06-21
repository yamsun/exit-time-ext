function addTime(timeString) {
  // Split the time string into hours, minutes, seconds, and meridian (am/pm)
  const [time, meridian] = timeString.split(" ");
  const [hoursStr, minutesStr, secondsStr] = time.split(":");

  // Convert the hours and minutes to numbers
  let hours = parseInt(hoursStr);
  let minutes = parseInt(minutesStr);

  // Adjust the hours based on the meridian (am/pm)
  if (meridian === "pm" && hours !== 12) {
    hours += 12;
  } else if (meridian === "am" && hours === 12) {
    hours = 0;
  }

  // Add 8 hours and 30 minutes to the time
  hours += 8;
  minutes += 30;

  // Handle carry-over of minutes to hours if necessary
  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  // Format the time back into a string
  const newHours = hours % 12 === 0 ? 12 : hours % 12;
  const newMeridian = hours >= 12 ? "pm" : "am";

  const newTimeString = `${padZero(newHours)}:${padZero(
    minutes
  )}:${secondsStr} ${newMeridian}`;
  return newTimeString;
}

// Helper function to pad a number with leading zeros if necessary
function padZero(num) {
  return num.toString().padStart(2, "0");
}

// Retrieve the desired data from the current web page
function getDataFromPage() {
  // Add your code here to extract the data from the web page
  // You can use DOM manipulation or any other suitable method

  // For example, let's extract the title of the current page
  let allTimes = [...document.getElementsByClassName("text-5 text-regular")]
    .filter((i) => i.textContent.includes("am") || i.textContent.includes("pm"))
    .map((i) => i.textContent);
  let allTimeText = allTimes.join(", ");
  //   const newTime = addTime(inputTime);
  let entryExitTime = allTimes?.map((i) => {
    const newTime = addTime(i);
    return `${i} -> ${newTime}`;
  });
  return entryExitTime?.join("\n");
  //   return document.title;
}

// Send the data to the popup script
function sendDataToPopup(data) {
  chrome.runtime.sendMessage({ action: "showData", data: data });
}

// Retrieve the data and send it to the popup
const data = getDataFromPage();
sendDataToPopup(data);
