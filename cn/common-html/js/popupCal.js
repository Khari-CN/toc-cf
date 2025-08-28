const cal = {
  priceValue: "",
  recommendValue: "",
  directMoney: 10,
  priceTop: 400,
  init() {
    this.setEvent();
  },
  setEvent() {
    $("#calculate").click(() => {
      $("#priceResult").html(this.verifyPrice());
      $("#recommendResult").html(this.verifyRecommend());
      $("#totalMoney").html(this.verifyPrice() + this.verifyRecommend());
    });
    $(".server-cal").click(() => {
      this.openLive800();
    });
    $(".cal-open").click(() => {
      $("#priceResult,#recommendResult,#price,#recommend").val("");
      $("#totalMoney").html("0");
      $(".cal-content").show();
      $(".cal-popup").hide();
    });
    $(".cal-account").attr(
      "href",
      "/cn/pc/rcfd_account" +
        window.location.search
    );
  },
  verifyPrice() {
    let val = Number($("#price").val().trim());
    if (val) {
      if (val < 200) {
        return 0;
      } else if (val < 500 && val >= 200) {
        return 200;
      } else if (val < 1000 && val >= 500) {
        return 500;
      } else if (val < 3000 && val >= 1000) {
        return 1000;
      } else if (val < 5000 && val >= 3000) {
        return 3000;
      } else if (val >= 5000) {
        return 5000;
      }
    } else {
      return 0;
    }
  },
  verifyRecommend() {
    let val = Number($("#recommend").val().trim());
    if (val) {
      return (this.directMoney + this.priceTop) * val;
    } else {
      return 0;
    }
  },
  openLive800() {
    var url = "/cn/onlinecs.html";
    var left = screen.width / 2 - 600 / 2;
    var top = screen.height / 2 - 400 / 2;
    window.open(
      url,
      "DescriptiveWindowName",
      "resizable,scrollbars=yes,status=1,width=800, height=550, top=" +
        top +
        ", left=" +
        left
    );
  },
};
