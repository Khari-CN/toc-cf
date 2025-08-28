


        var t =$(".barrage-line");
        function a(t, a) {
            var s = t.width();
            if (0 != s) {
                var d = 0.1 * ((s + g) * n[a - 1])
                    , r = 1e3 * (0.1 * (s * n[a - 1]));
                // console.log(d)
                // console.log(r)
                $("body").append($("<style>" + ("\n        @-webkit-keyframes barrageAnimation" + a + " {\n          0% {\n            -webkit-transform: translate3d(0, 0, 0);\n          }\n          100% {\n            -webkit-transform: translate3d(-" + (s + g) + "px, 0, 0);\n          }\n        }\n        @keyframes barrageAnimation" + a + " {\n          0% {\n            transform: translate3d(0, 0, 0);\n          }\n          100% {\n            transform: translate3d(-" + (s + g) + "px, 0, 0);\n          }\n        }\n      ") + "</style>")),
                    t.css({
                        animation: "barrageAnimation" + a + " " + d + "s linear"
                    }),
                    t.on("animationend", i),
                    setTimeout(function() {
                        e(t, a, d, r)
                    }, r)
            }
        };
        function e(a, s, n, d) {
            var r = a.clone(!0);
            $(".review_group").find(".barrage-inner").append(r),
                r.css({
                    animation: "barrageAnimation" + s + " " + n + "s linear"
                }),
                r.on("animationend", i),
                setTimeout(function() {
                    e(a, s, n, d)
                }, d)
        };
        function i() {
            $(this).off().remove()
        };
        var  n = [0.2, 0.12, 0.1],
            r = t.find("[zk-tag=\"barrage_item\"][data-line=\"1\"]")
            , l = t.find("[zk-tag=\"barrage_item\"][data-line=\"2\"]")
            , o = t.find("[zk-tag=\"barrage_item\"][data-line=\"3\"]")
            , c = $(r)
            ,p = $(l)
            , _ = $(o)

        t.html("");
        var g = $(".barrage-inner").width()
            , m = $(".barrage-line1")
            , u = $(".barrage-line2")
            , b = $(".barrage-line3");
        $(".barrage-line1").css("left", g );
        $(".barrage-line2").css("left", g );
        $(".barrage-line3").css("left", g );
        m.append(c),
            u.append(p),
            b.append(_),
        0 != r.length && y.append(m),
        0 != l.length && y.append(u),
        0 != o.length && y.append(b);
        // window.onload = function() {
            setTimeout(function() {
                a(m, 1)
                    ,a(u, 2),
                    a(b, 3)
            }, 1e3)
        // };


