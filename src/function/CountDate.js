const isLeapYear = (year) => {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
};

export const countDay = (checkIn, checkOut) => {
  const dFirst = checkIn.split("-").map((val) => parseInt(val));
  const dLast = checkOut.split("-").map((val) => parseInt(val));
  let found = false;
  let result = 0;
  for (let y = dFirst[0]; y <= dLast[0]; y++) {
    for (let m = dFirst[1]; m <= 12; m++) {
      let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (isLeapYear(y) === true) {
        months[1] = 29;
      }
      for (let d = dFirst[2]; d <= months[m - 1]; d++) {
        result++;
        if (
          y + "-" + m + "-" + d ===
          dLast[0] + "-" + dLast[1] + "-" + dLast[2]
        ) {
          found = true;
          break;
        }
      }
      if (found === true) {
        break;
      } else {
        dFirst[2] = 1;
      }
    }
    if (found === true) {
      break;
    } else {
      dFirst[1] = 1;
    }
  }
  return result - 1;
};

export const dateByMonth = (startDate, month) => {
  const result = startDate.split("-");
  const dates = result.map((rec) => parseInt(rec));
  let months = month % 12;
  let year = parseInt(Math.floor(month / 12));
  year = year + dates[0];
  months = months + dates[1];
  if (months > 12) {
    ++year;
    months -= 12;
  }
  let monthYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(year) === true) {
    monthYear[1] = 29;
  }
  const date =
    dates[2] > monthYear[months - 1] ? monthYear[months - 1] : dates[2];
  return `${year}-${months < 10 ? "0" + months : months}-${
    date < 10 ? "0" + date : date
  }`;
};

export const dateNow = () => {
  const date = new Date();
  let month =
    date.getMonth() + 1 <= 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let dat = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return date.getFullYear() + "-" + month + "-" + dat;
};

export const dateByYear = (date, year) => {
  let dates = date.split("-");
  dates[0] = parseInt(dates[0]) + year;
  if (!isLeapYear(dates[0]) && dates[1] === "02" && dates[2] === "29") {
    return `${dates[0]}-${dates[1]}-28`;
  } else {
    return `${dates[0]}-${dates[1]}-${dates[2]}`;
  }
};

export const countByYear = (checkIn, checkOut) => {
  const checkin = checkIn.split("-");
  const checkout = checkOut.split("-");
  return parseInt(checkout[0]) - parseInt(checkin[0]);
};

export const countByMonth = (checkIn, checkOut) => {
  const checkin = checkIn.split("-");
  const checkout = checkOut.split("-");
  const diffYears = parseInt(checkout[0]) - parseInt(checkin[0]);
  const numMonth = diffYears * 12;
  const diffMonth = parseInt(checkout[1]) - parseInt(checkin[1]);
  return numMonth + diffMonth;
};

export const haveValue = (state) => {
  if (
    state !== "" &&
    state !== null &&
    state !== isNaN &&
    state !== 0 &&
    state !== undefined
  ) {
    return true;
  } else {
    return false;
  }
};
