
var calendar = new Vue({
    el:"#calendar",
    data:{
        date:new Date(),
        monday:'',
        filterFlags:[{
            name:"美国",
            imgUrl:"usa.png",
            id:"003"
        },
            {
                name:"欧洲",
                imgUrl:"eur.png",
                id:"002"
            },
            {
                name:"日本",
                imgUrl:"jan.png",
                id:"001"
            },
            {
                name:"英国",
                imgUrl:"eng.png",
                id:"002"
            },
            {
                name:"瑞士",
                imgUrl:"swi.png",
                id:"002"
            },
            {
                name:"澳大利亚",
                imgUrl:"ustr.png",
                id:"001"
            },
            {
                name:"加拿大",
                imgUrl:"cana.png",
                id:"003"
            },
            {
                name:"中国",
                imgUrl:"china.png",
                id:"001"
            },
            {
                name:"新西兰",
                imgUrl:"newz.png",
                id:"002"
            },
            {
                name:"香港",
                imgUrl:"hk.png",
                id:"001"
            },
        ],
        countryPart:[{
            imgUrl:"asia.png",
            name:"亚洲盘",
            countrys:"日本-澳大利亚-中国-新西兰-香港",
            id:"001"
        },{
            imgUrl:"europe.png",
            name:"欧洲盘",
            countrys:"欧洲-英国-瑞士",
            id:"002"
        },{
            imgUrl:"america.png",
            name:"美洲盘",
            countrys:"美国-加拿大",
            id:"003"
        }
        ],
        flags : {
            "新西兰": "New Zealand.png",
            "韩国": "South Korea.png",
            "澳大利亚": "Australia.png",
            "日本": "japan.png",
            "德国": "Germany.png",
            "瑞士": "Switzerland.png",
            "瑞典": "Sweden.png",
            "香港": "Hong Kong.png",
            "西班牙": "Spain.png",
            "英国": "UK.png",
            "意大利": "Italy.png",
            "加拿大": "Canada.png",
            "美国": "United States of America(USA).png",
            "中国": "China.png",
            "台湾": "Taiwan.png",
            "法国": "France.png",
            "欧元区": "European Union.png",
            "南非": "South Africa.png",
            "巴西": "Brazil.png",
            "印度": "India.png",
            "希腊": "Greece.png",
            "新加坡": "Singapore.png",
            "奥地利": "Austria.png",
            "菲律宾": "Philippines.png",
            "挪威": "Norway.png",
            "印尼": "Indonesia.png",
            "OECD": "OECD.png",
            "葡萄牙": "Portugal.png",
            "巴基斯坦":"Pakistan.png",
            "捷克斯洛伐克":"Czech Republic.png",
            "比利时":"Belgium.png",
            "俄罗斯":"Russian Federation.png"
        },
        currency:{
            "新西兰": "纽元",
            "韩国": "其它",
            "澳大利亚": "澳元",
            "日本": "日元",
            "德国": "欧元",
            "瑞士": "其它",
            "瑞典": "其它",
            "香港": "港元",
            "西班牙": "欧元",
            "英国": "英镑",
            "意大利": "欧元",
            "加拿大": "加元",
            "美国": "美元",
            "中国": "人民币",
            "台湾": "其它",
            "法国": "欧元",
            "欧元区": "欧元",
            "南非": "其它",
            "巴西": "其它",
            "印度": "其它",
            "希腊": "欧元",
            "新加坡": "其它",
            "奥地利": "其它",
            "菲律宾": "其它",
            "挪威": "其它",
            "印尼": "其它",
            "OECD": "其它",
            "葡萄牙": "其它",
            "巴基斯坦":"其它",
            "捷克斯洛伐克":"其它",
            "比利时":"其它",
            "俄罗斯":"其它"
        },
        importance:[],
        countrys:[],
        dayInWeek:[],
        calendarData:[],
        calendarEvent:[],
        calendarHoliday:[],
        filterBtn:true,
        loadStatusData:'',
        cancelStatus:0,
        loadStatusEvent:'',
        loadStatusHoliday:'',
        chineseDays :["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
        clicktimes_prev : 1,
        clicktimes_next : 1,
        current_date:'',
        change_date:'',
        select_date:''
    },
    methods:{
        init:function (date) {
            var monday = this.getMonday(date);
            this.getAllDate(monday)
        },
        getCaData:function(){
            this.init(this.date);
        },
        getAllDate:function(monday){
            for(var i=0;i<7;i++){
                //一周中的周一
                var newDate = new Date(monday);
                //遍历一次多加一天
                newDate.setTime(monday.getTime() + i*86400000);
                var cDate={date:newDate,chineseDay:this.chineseDays[i]} ;
                this.dayInWeek.push(cDate);

                // 遍历如果其中一天跟当天相同
                if(newDate.getDate() == this.date.getDate()){
                    //    获得当天的数据
                    this.changeDay(cDate);
                }
            }
        },
        changeDay:function(cday){
            this.current_date = this.formatterDate(cday.date);
            this.change_date = this.formatterDate(cday.date);
            this.select_date = cday
            this.getData(this.select_date);
        },
        countrystr:function(){
            var allCountry = [];
            var otherCountry = [];
            for(var i in this.currency){
                allCountry.push(i);
                if(this.currency[i] =="其他"){
                    otherCountry.push(i);
                }
            }
            return {
                allCountry:allCountry.join(","),
                otherCountry:otherCountry.join(",")
            }
        },
        formatterDate : function(date,splitChar) {
            if(!splitChar){
                splitChar='-';
            }
            if(!(date instanceof Date)){
                date=new Date(date);
            }
            if(date == "Invalid Date"){
                return "";
            }
            var datetime = date.getFullYear()
                + splitChar// "年"
                + ((date.getMonth() + 1) >=10 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))
                + splitChar// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())

            return datetime;
        },
        getMonday:function (date) {
            var d = new Date(date)
            var day = d.getDay();
            var diff = d.getDate() - day +(day == 0 ?-6:1)
            return new Date(d.setDate(diff))
        },
        getData:function (cDate) {
            var that = this;
            var level ='';
            var country ='';
            if(this.importance.length == 0){
                level ="1,2,3,4,5"
            }else{
                level = this.importance.join(',')
            };
            if(this.countrys.length ==0){
                country = this.countrystr().allCountry
            }else{
                country = this.countrys.join(",")
            }
            var data ={
                releaseTime:common.formatterDate(cDate.date, "-"),
                level:level,
                country:country,
                "_r":Math.random()
            };
            // console.log(data);
            common.getJson( m_url + '/news/finance',data,function (data) {
                // console.log(data)
                if(data.msg == "OK"){
                    that.calendarData = data.data.financeData;
                    if(that.calendarData == null || that.calendarData.length == 0){
                        that.loadStatusData ="暂无数据"
                    }
                    that.calendarEvent = data.data.financeEvent;
                    // console.log(data.data)
                    // console.log(data.data.financeEvent)
                    // console.log( that.calendarEvent)
                    if(that.calendarEvent == null || that.calendarEvent.length == 0){
                        that.loadStatusEvent ="暂无数据"
                    }
                    // console.log( that.calendarEvent)
                    that.calendarHoliday = data.data.financeVacation;
                    if(that.calendarHoliday == null || that.calendarHoliday.length == 0){
                        that.loadStatusHoliday ="暂无数据"
                    }

                }
            })
            for(var i in this.dayInWeek){
                this.dayInWeek[i].isActive = false;
            }
            cDate.isActive = true



        },

        prev_next:function (prevornext) {
            var currentDate = new Date(this.change_date);
            var nowDayOfWeek = currentDate.getDay();
            var nowDay = currentDate.getDate();
            var nowMonth = currentDate.getMonth();
            var nowYear = currentDate.getYear();
            nowYear +=(nowYear < 2000)?1900 :0;
            // 前一周 nowDay -7 ,下一周 +7
            var getUpWeekStartDate = new Date(nowYear,nowMonth,nowDay + prevornext);
            this.date  = new Date(getUpWeekStartDate);
            this.change_date = this.formatterDate(this.date);
            this.dayInWeek = [];
            var monday = this.getMonday(this.date);
            this.getAllDate(monday);
        },
        show_prev:function(){
            this.prev_next(-7);
            this.clicktimes_prev = this.clicktimes_prev + 1
        },
        show_next:function () {
            this.prev_next(7);
            this.clicktimes_next = this.clicktimes_next + 1
        },
        //选择单个国家
        countrySelect:function (event) {
            // this.cancelStatus = 1;
            var el = event.target;
            var country,li,activeName;
            // console.log(el);
            // console.log(el.parentElement);
            country = el.parentElement.getAttribute("country");
            li = el.parentElement;

            activeName = this.hasClass(li,"active");
            if(activeName == false){
                li.setAttribute("class","active");
                // console.log(this)
                this.countrys.push(country);
            }else{
                li.classList.remove("active");
                this.countrys.splice($.inArray(country,this.countrys),1);
            }
            this.getData(this.select_date);
        },
        //   选择多个国家
        countrysSelect:function (event) {
            // this.cancelStatus = 1;
            var el = event.target;
            var li = el.parentElement;
            var className = this.hasClass(li,"active");
            var country = li.getAttribute("country");
            var country_all =[];
            var idName =li.getAttribute("type");
            if(country != ''){
                country_all = country.split("-");
            }
            if(className == false){
                li.setAttribute("class","active");

                if(idName == "001"){
                    li.childNodes[0].src="/toc-cf/source/www/news/calendar/asia-h.png"
                }else if(idName == "002"){
                    li.childNodes[0].src="/toc-cf/source/www/news/calendar/europe-h.png"
                }else{
                    li.childNodes[0].src="/toc-cf/source/www/news/calendar/america-h.png"
                }
                $(".single-country ul li[typeName="+ idName+"]").addClass("active")

                for(var i in country_all){
                    if($.inArray(country_all[i],this.country) == -1) {
                        this.countrys.push(country_all[i])
                    }
                }
            }else{
                li.classList.remove("active");
                $(".single-country ul li[typeName="+ idName+"]").removeClass("active")
                for(var i in country_all){
                    this.countrys.splice($.inArray(country_all[i],this.countrys),1)
                }
            }
            this.getData(this.select_date);
        },
        //选择星级k
        selectStar:function(event){
            // this.cancelStatus = 1;
            var el = event.target;
            if($(el).is("li")){
                var li = el;
            }else{
                var li = el.parentElement;
            }
            var className = this.hasClass(li,"active");
            var star = li.getAttribute("star");
            var star_arr = new Array();
            if(star != ''){
                star_arr = star.split(",");
            }

            if(className == false){
                li.setAttribute("class","active");
                for(i=0;i<star_arr.length ;i++){
                    this.importance.push(star_arr[i]);
                }
            }else{
                li.classList.remove("active");
                for(i=0;i<star_arr.length ;i++){
                    this.importance.splice($.inArray(star_arr[i],this.importance),1);
                }
            }
            this.getData(this.select_date);
        },
        //显示隐藏
        filPart:function(){
            this.filterBtn = !this.filterBtn;

            if ($(".bottom-data").hasClass("active")) {
                $(".bottom-data").removeClass("active")
            }else{
                $(".bottom-data").addClass("active")
        }

        },
        hasClass:function (element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        }

    },
    mounted:function(){
        // this.init(this.date);
        var mySwiper = new Swiper ('.swiper-container', {
            // 如果需要前进后退按钮
            loop:true,
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
        })
    }
})
Vue.filter("formatTime",function(value,type){
    var dataTime ="";
    var data =new Date();
    data.setTime(new Date(value));
    var month = addZero(data.getMonth() + 1);
    var day = addZero(data.getDate());
    var hour = addZero(data.getHours());
    var minutes = addZero(data.getMinutes());

    if(type =="MD"){
        dataTime = month +"."+day
    }else if(type =="hm"){
        dataTime = hour +":"+ minutes
    }
    return dataTime;
})
function addZero(val){
    if(val <10){
        return "0" +val
    }else{
        return val
    }
}

