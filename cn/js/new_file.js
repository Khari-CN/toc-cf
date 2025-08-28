$(document).ready(function(){
  $(".clear").click(function(){
  $('.header').hide()
  $('.title').css("margin-top","0rem");
  });
  
  $(".about_btn").click(function(){
  $('.tc_list').toggle()
  });
  
});
