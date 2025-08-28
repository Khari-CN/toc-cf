var data_type="gold";
var type="all";
var data_impt="all";
var area="all";
// var wH = document.documentElement.clientHeight;
// var mth = wH-$(".side_menu_box").outerHeight()+$(".main_change").outerHeight();
// $(".main_data").css("height",mth)
 //筛选
	var pd = true;
	//$(".main_choose").click(function(){



//  $('body').children().on("click", '.tixing', function(){
//		$(".opacity3").fadeToggle();
//		$(".tixing_pop").fadeToggle();
//	})
//  $('body').children().on("click", '.tixing_pop span', function(){
//		$(".opacity3").fadeToggle();
//		$(".tixing_pop").fadeToggle();
//	})
	//重要性
//	//$("#data_impt li").click(function(){
//	$('body').children().on("click", '#data_impt li', function(){
//		if($(this).find("a").attr("nature")=="all"){
//			if($(this).hasClass("cur")){
//				false;
//			}
//			else{
//				$("#data_impt li").removeClass("cur");
//				$(this).toggleClass("cur");
//			}
//		}
//		else{
//			var cflag=true;			
//			if($(this).hasClass("cur"))
//			{
//				$(this).removeClass("cur");
//				cflag=false;
//			}
//			var curs=$("#data_impt li.cur");
//			if(curs.length>1 || curs.length ==0)
//			{
//				$("#data_impt li").removeClass("cur");
//				$("#data_impt li a[nature=all]").parent().addClass("cur");
//			}
//			else{
//				$("#data_impt li a[nature=all]").parent().removeClass("cur");
//				if(cflag)
//				$(this).toggleClass("cur");
//			}		
//		}
//		var curs=$("#data_impt li.cur a");
//		var data_imptc=new Array();
//		for(var i=0;i<curs.length;i++)
//		{
//			data_imptc[i]=$(curs[i]).attr('nature');
//		}
//		data_impt=data_imptc.join('_');
//	})
	//$("#data_type li").click(function(){
	$('body').children().on("click", '#data_type li', function(){
		$(this).toggleClass("cur");
		
		if($("#data_type li.cur").length==0)
		{
			alert("至少选择一个");
			$(this).toggleClass("cur");
		}     
		var curs=$("#data_type li.cur a");
		var data_typec=new Array();
		for(var i=0;i<curs.length;i++)
		{
			data_typec[i]=$(curs[i]).attr('nature');
		}
		if(curs.length<10){
			var curr=$("#data_type a.zero.curr")
			if(curr.length==0){
                $("#data_type a.zero").toggleClass("curr");
			}
		}else if(curs.length==10){
            $("#data_type a.zero").toggleClass("curr");
		}
		data_type=data_typec.join('_');

	})
		$('body').children().on("click", '#data_type .zero', function(){
			if($("#data_type a.zero.curr").length>0){
                 $("#data_type a.zero.curr").removeClass("curr");
			 }

	      $("#data_type li").addClass("cur");
	})
$('body').children().on("click", '#data_impt li', function(){
		$(this).toggleClass("cur");
		
		if($("#data_impt li.cur").length==0)
		{
			alert("至少选择一个");
			$(this).toggleClass("cur");
		}     
		var curs=$("#data_impt li.cur a");
		var data_typec=new Array();
		for(var i=0;i<curs.length;i++)
		{
			data_typec[i]=$(curs[i]).attr('nature');
		}
		if(curs.length<3){
			var curr=$("#data_impt a.one.curr")
			if(curr.length==0){
				$("#data_impt a.one").toggleClass("curr");
			}
		}else if(curs.length==3){
            $("#data_impt a.one").toggleClass("curr");
		}

		data_type=data_typec.join('_');
		
	})
		$('body').children().on("click", '#data_impt .one', function(){
            if($("#data_impt a.one.curr").length>0){
                $("#data_impt a.one").removeClass("curr");
            }
	      $("#data_impt li").addClass("cur");

	})

        
