$(function () {
  function nowDate() {
    Number.prototype.pad = function (digits) {
      for (var n = this.toString(); n.length < digits; n = 0 + n);
      return n;
    };
    let now = new Date();
    let yr = now.getFullYear();
    let mo = now.getMonth();
    let dnum = now.getDate();
    let months = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];
    let month = months[mo];
    let dNum = dnum.pad(2);

    let dateValue = document.querySelector(".date_input");
    dateValue.value = `${yr}.${month}.${dNum}`;
  }

  nowDate();
});
