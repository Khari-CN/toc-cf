var cf = cf || {};
cf.common = {
  openQQCustomer: function () {
    const left = screen.availLeft + screen.availWidth / 2 - 800 / 2;
    const top = screen.availTop + screen.availHeight / 2 - 800 / 2;
    window.open(
      qq_url,
      "qq_cs",
      `height=800,width=800,left=${left},top=${top},loction=no,toolbar=no,status=no`
    );
  },
  openLive800: function (queryString) {
    var left = screen.width / 2 - 800 / 2;
    var top = screen.height / 2 - 670 / 2;
    var domain = document.domain;
    if (domain != "www.cf860.com" && domain != "www.cf860.net") {
      // var url = live800_url + new Date().getTime();
      // if (queryString) {
      //   url = www_url + "/cn/live800.html?" + queryString;
      // }
      var url = "/cn/onlinecs.html";
      window.open(
        url,
        "DescriptiveWindowName",
        "resizable,scrollbars=yes,status=1,width=800, height=670, top=" +
          top +
          ", left=" +
          left
      );
    }
  },
};
