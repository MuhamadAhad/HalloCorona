class FormatDate {
  static getMonthName(month) {
    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthName[month];
  }

  static getDayName(day) {
    const dayName = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return dayName[day];
  }

  static convertDate = (iDate) => {
    const date = new Date(iDate);
    return `${date.getDate()} ${this.getMonthName(
      date.getMonth()
    )} ${date.getFullYear()}`;
  };
}

export default FormatDate;
