function timeElapse(c) {
    var e = new Date();
    var year = e.getFullYear()-c.getFullYear();
    var month =(e.getMonth()+1)-(c.getMonth());
    var day = e.getDate()-c.getDate();
    var hour = e.getHours()-c.getHours();
    var second = (Date.parse(e) - Date.parse(c)) / 1000;
    if (hour < 10) {
        hour = "0" + hour
    }
    second = second % 3600;
    var minute = Math.floor(second / 60);
    if (minute < 10) {
        minute = "0" + minute
    }
    second = second % 60;
    if (second < 10) {
        second = "0" + second
    }
    var num_list = '' +
        '<p><span>'+ year +'</span></p>' +
        '<p class="center">年</p>' +
        '<p><span>' + month + '</span></p>' +
        '<p class="center">月</p>' +
        '<p><span>' + day + '</span></p>' +
        '<p class="center">日</p>' +
        '<p><span>' + hour + '</span></p>' +
        '<p class="center">时</p>' +
        '<p><span>' + minute + '</span></p>' +
        '<p class="center">分</p>' +
        '<p><span>' + second + "</span></p>" +
        '<p class="center">秒</p>';
    $(".data-time").html(num_list)
}