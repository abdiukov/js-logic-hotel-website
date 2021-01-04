var cal = {
  /*  */
  /** [PROPERTIES] 
   *   data: null - Events for the selected period
   *   sDay: 0, - Current selected day
   *   sMth: 0, - Current selected month
   *   sYear: 0, - Current selected year
   *   mName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] - Month Names in the calendar
  */
  mName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  data: null,
  sDay: 0,
  sMth: 0,
  sYear: 0,
  sMon: false,

  /**
   *   [FUNCTIONS] 
   */
  list: function () {

    /**
     * BASIC CALCULATIONS
     * Jan is 0 & Dec is 11.
     * Sun is 0 & Sat is 6
     * cal.sMth = parseInt(document.getElementById("cal-mth").value); - selected month
     * cal.sYear = parseInt(document.getElementById("cal-yr").value); - selected year
     * var daysInMth = new Date(cal.sYear, cal.sMth + 1, 0).getDate(), - number of days in selected month
     * startDay = new Date(cal.sYear, cal.sMth, 1).getDay(), - first day of the month
     * endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDay(); - last day of the month
     */

    cal.sMth = parseInt(document.getElementById("cal-mth").value);
    cal.sYear = parseInt(document.getElementById("cal-yr").value);
    var daysInMth = new Date(cal.sYear, cal.sMth + 1, 0).getDate(),
      startDay = new Date(cal.sYear, cal.sMth, 1).getDay(),
      endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDay();

    /**
     * LOAD DATA FROM LOCALSTORAGE
     */
    cal.data = localStorage.getItem("cal-" + cal.sMth + "-" + cal.sYear);
    if (cal.data == null) {
      localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, "{}");
      cal.data = {};
    } else {
      cal.data = JSON.parse(cal.data);
    }
    /**
     * DRAWING CALCULATIONS
     * Determine the number of blank squares before start of month
     */

    var squares = [];
    if (cal.sMon && startDay != 1) {
      var blanks = startDay == 0 ? 7 : startDay;
      for (var i = 1; i < blanks; i++) { squares.push("b"); }
    }
    if (!cal.sMon && startDay != 0) {
      for (var i = 0; i < startDay; i++) { squares.push("b"); }
    }

    /**
     * Populate the days of the month
     */
    for (var i = 1; i <= daysInMth; i++) { squares.push(i); }

    /**
     * Determine the number of blank squares after end of month
     */
    
    if (cal.sMon && endDay != 0) {
      var blanks = endDay == 6 ? 1 : 7 - endDay;
      for (var i = 0; i < blanks; i++) { squares.push("b"); }
    }
    if (!cal.sMon && endDay != 6) {
      var blanks = endDay == 0 ? 6 : 6 - endDay;
      for (var i = 0; i < blanks; i++) { squares.push("b"); }
    }

    /**
     * DRAW HTML
     * Container & Table
     */
    var container = document.getElementById("cal-container"),
      cTable = document.createElement("table");
    cTable.id = "calendar";
    container.innerHTML = "";
    container.appendChild(cTable);

    /**
     * First row - Days
     */
    var cRow = document.createElement("tr"),
      cCell = null,
      days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    if (cal.sMon) { days.push(days.shift()); }
    for (var d of days) {
      cCell = document.createElement("td");
      cCell.innerHTML = d;
      cRow.appendChild(cCell);
    }
    cRow.classList.add("head");
    cTable.appendChild(cRow);

    /**
     * Days in Month
     */
    var total = squares.length;
    cRow = document.createElement("tr");
    cRow.classList.add("day");
    for (var i = 0; i < total; i++) {
      cCell = document.createElement("td");
      if (squares[i] == "b") { cCell.classList.add("blank"); }
      else {
        cCell.innerHTML = "<div class='dd'>" + squares[i] + "</div>";
        if (cal.data[squares[i]]) {
          cCell.innerHTML += "<div class='evt'>" + cal.data[squares[i]] + "</div>";
        }
        cCell.addEventListener("click", function () {
          cal.show(this);
        });
      }
      cRow.appendChild(cCell);
      if (i != 0 && (i + 1) % 7 == 0) {
        cTable.appendChild(cRow);
        cRow = document.createElement("tr");
        cRow.classList.add("day");
      }
    }

    /**
     * REMOVE ANY ADD/EDIT EVENT DOCKET
     */
    cal.close();

    /**
     * ADDING
     */
    document.getElementById("total").innerText = localStorage.getItem("total");
  },


      /**
     * @param el Reference back to cell clicked
     */

  show: function (el) {

    /**
     * Fethces existing data
     */
    cal.sDay = el.getElementsByClassName("dd")[0].innerHTML;


    /**
     * Calculates the price for each month.
     * For december there is price from 1st to 18th Dec, and then there is price for 18th to 31st
     */
    switch (cal.sMth) {
      case 0:
        price = 250;
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        price = 220;
        break;
      case 5:
      case 6:
      case 7:
        price = 200;
        break;
      case 8:
      case 9:
      case 10:
        price = 220;
        break;
      case 11:
        if (cal.sDay > 18) {
          price = 250;
        } else {
          price = 220;
        }
        break;
    }

    var tForm = "<h1>" + (cal.data[cal.sDay] ? "Edit" : "Add") + " Hotel Booking</h1>";
    tForm += "<div id='evt-date'>" + cal.sDay + " " + cal.mName[cal.sMth] + " " + cal.sYear + "</div>";
    tForm += "<label>Booking Fees = </label>";
    tForm += "<label id='evt-details' required>" + price + "</label><br />";
    tForm += "<input type='button' value='Close' onclick='cal.close()'/>";
    if (cal.data[cal.sDay]) {
      tForm += "<input type='button' value='Delete' onclick='cal.del()'/>";
    }
    else {
      tForm += "<input type='submit' value='Save'/>";
    }

    /**
     * ATTACH
     */
    var eForm = document.createElement("form");
    eForm.addEventListener("submit", cal.save);
    eForm.innerHTML = tForm;
    var container = document.getElementById("cal-event");
    container.innerHTML = "";
    container.appendChild(eForm);
  },

  close: function () {

    document.getElementById("cal-event").innerHTML = "";
  },

  /**
   * 
   * @param {*} evt stores information in local storage 
   */
  save: function (evt) {

    evt.stopPropagation();
    evt.preventDefault();
    cal.data[cal.sDay] = document.getElementById("evt-details").innerText;
    localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, JSON.stringify(cal.data));

    localStorage.setItem("total", parseInt(localStorage.getItem("total")) + parseInt(cal.data[cal.sDay]));

    cal.list();
  },

  del: function () {

    if (confirm("Remove booking?")) {
      localStorage.setItem("total", parseInt(localStorage.getItem("total")) - parseInt(cal.data[cal.sDay]));
      delete cal.data[cal.sDay];
      localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, JSON.stringify(cal.data));
      cal.list();
    }
  }
};

/**
 * INIT - DRAW MONTH & YEAR SELECTOR
 */
window.addEventListener("load", function () {
  /**
   * Current date
   */
  var now = new Date(),
    nowMth = now.getMonth(),
    nowYear = parseInt(now.getFullYear());

  /**
   * Selecting the month
   */
  var month = document.getElementById("cal-mth");
  for (var i = 0; i < 12; i++) { 
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = cal.mName[i];
    if (i == 0) { opt.selected = true; }
    month.appendChild(opt);
  }

  /**
   * Year selector - from 2020 to 2025
   */
  var year = document.getElementById("cal-yr");
  for (var i = 2020; i <= 2025; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = i;
    if (i == nowYear) { opt.selected = true; }
    year.appendChild(opt);
  }


  if (!localStorage.getItem("total")) {
    localStorage.setItem("total", 0);
    document.getElementById("total").innerText = 0;
  }

  /**
   * Drawing the calendar
   */
  document.getElementById("cal-set").addEventListener("click", cal.list);
  cal.list();
});
