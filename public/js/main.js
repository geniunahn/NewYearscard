// date
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

// update
$(function () {
  let textareaAttr = {
    type: "text",
    name: "textUpdate",
    rows: 4,
    cols: 50,
    placeholder: "여기에 수정할 글을 작성해 주세요.",
    maxlength: 255,
    required: "",
  };

  let pwdAttr = {
    type: "password",
    name: "pwd_update",
    placeholder: "비밀번호",
    maxlength: 4,
    required: "",
  };

  $(".list_update .up_button").on("click", function () {
    $(this).empty();
    $(this).prev().empty();
    $(this).next().prepend("<textarea></textarea>");
    $(this).next().find("textarea").attr(textareaAttr);
    $(this).next().find("div").prepend("<input></input>");
    $(this).next().find("div input").attr(pwdAttr);
    $(this).next().addClass("active");
  });
});

// delete

$(function () {
  let pwdAttr = {
    type: "password",
    name: "pwd_delete",
    placeholder: "비밀번호",
    maxlength: 4,
    required: "",
  };

  $(".delete_icon").on("click", function () {
    $(this).addClass("active");
    $(this).next().addClass("active");
    $(this).next().prepend("<input/>");
    $(this).next().find("input").attr(pwdAttr);
  });
});
