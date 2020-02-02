exports.tConvert = function (time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}

exports.getFormattedDate = function (today) {
  let month = today.getMonth();
  if (month < 10) {
    month = `0${month}`
  }
  let day = today.getDate();
  if (day < 10) {
    day = `0${day}`
  }
  return `${today.getFullYear()}-${month}-${day}`;
}