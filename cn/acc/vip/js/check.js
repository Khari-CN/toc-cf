


function  hrefParam(key) {
    value="";
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) value= unescape(r[2]);
    return value;
}

function menu()
{
    var html="";
    if(hrefParam("app")!="")
    {
        html+='<div class="m-header" style=" background-color: rgb(35, 85, 120);border-bottom:none";padding-top:0.1rem;height:0.5rem; id="m-header">';
        html+='<div class="layout-1" style="padding:0;" >';
        html+='   <div class="item-1" onclick="history.go(-1)" style="  width: 1rem; height: 0.5rem;line-height: 0.5rem; padding-left: 0.15rem;">';
        html+='     <a href="javascript:;" class="left-4"></a>';
        html+='     <a href="javascript:;" class="left-3">返回</a>';
        html+='   </div>';
        html+=' </div>';
        html+=' </div>';
    }
    else
    {
        html+='<div class="m-header" id="m-header">';
        html+='  <div class="layout-1" style="padding-left: 0.15rem;">';
        html+='   <div class="item-1">';
        html+='     <a href="/" class="left-1"></a>';
        html+=' </div>';
        html+=' </div>';
        html+='	</div>';
    }
    document.write(html);
}



