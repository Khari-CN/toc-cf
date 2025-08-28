jQuery(function() {

  $( document ).ready(function() {

    if (location.hash) {
      var hash = location.hash;
      window.scrollTo(0, 0);
      setTimeout(function() {
        scrollto(hash, 1000);
      }, 100);
    }

    setTimeout(function(){
      $('#loading').fadeOut(600, function() {
        // Animation complete.
      });
    }, 500);
    
    setTimeout(function(){
      new WOW({mobile:false}).init();
    }, 100);
    
    setTimeout(function(){
      var thisAnim = $('.graphic.ani');
      thisAnim.removeClass('wow fadeInUp');
      thisAnim.attr('style','');
      thisAnim.addClass('anim-bounce');
    }, 1800);

    $('.scrollTo').click(function(e){
      e.preventDefault();
      e.stopPropagation();
      var hash = $(this).attr('scrollTo');
      scrollto(hash, 1000);
    });

    menuBgColorAdd();
    checkSectionIn();

    $('.toggleLoginPopup').click(function(e){
      $('#login-popup').toggleClass('show');
    });
    
    /**
    * Replace all SVG images with inline SVG
    */
      //  jQuery('img.svg').each(function(){
      //      var $img = jQuery(this);
      //      var imgID = $img.attr('id');
      //      var imgClass = $img.attr('class');
      //      var imgURL = $img.attr('src');

      //      jQuery.get(imgURL, function(data) {
      //          // Get the SVG tag, ignore the rest
      //          var $svg = jQuery(data).find('svg');

      //          // Add replaced image's ID to the new SVG
      //          if(typeof imgID !== 'undefined') {
      //              $svg = $svg.attr('id', imgID);
      //          }
      //          // Add replaced image's classes to the new SVG
      //          if(typeof imgClass !== 'undefined') {
      //              $svg = $svg.attr('class', imgClass+' replaced-svg');
      //          }

      //          // Remove any invalid XML tags as per http://validator.w3.org
      //          $svg = $svg.removeAttr('xmlns:a');

      //          // Replace image with new SVG
      //          $img.replaceWith($svg);

      //      }, 'xml');

      //  });

  });

  $(window).scroll(function() {
    menuBgColorAdd();
    checkSectionIn();
  });

  $( window ).resize(function() {

    var windowSize = $(window).outerWidth();

    if (windowSize >= 992) { // desktop close menu or login popup
      // close login popup
      $('#login-popup').removeClass('show');
      // close navbar
      $('#navbarMain').removeClass('show');
      $('#navbarMain').addClass('collapsed');
    }

  });

  function menuBgColorAdd(){
    if ( $(window).scrollTop() != 0 ) {
      $("header").addClass("scrolled");
    } else {
      $("header").removeClass("scrolled");
    }
  }

  function scrollto(hash, animateTime) { // click scroll to function

    if ($('body').hasClass('main-page')) {

      var windowSize = $(window).outerWidth();
      var scrollToPosition = $(hash).offset().top;
      
      if (windowSize < 992) { // mobile action

        var paddingAdd = 75;

        // menu click close navbar
        $('#navbarMain').removeClass('show');
        $('#navbarMain').addClass('collapsed');

        // if not home section add sapce;
        if (hash!="#home") scrollToPosition = scrollToPosition - paddingAdd;

      } else { // desktop actioin

        var paddingAdd = 250,
            sectionPT = parseInt($(hash).css('padding-top')),
            newSectionPT = paddingAdd - sectionPT;

        // if not home section add sapce;
        if (hash!="#home") scrollToPosition = scrollToPosition - newSectionPT;
        
      }

      $('html,body').animate({
        scrollTop: scrollToPosition},
        animateTime, function() {
          //attach the hash (#jumptarget) to the pageurl
      });

    } else {

      var urlBase = location.href.substring(0, location.href.lastIndexOf("/")+1)

      location.href= urlBase + "index.html" + hash;
      // console.log( urlBase + "index.html" + hash );
      
    }

  }

  function checkSectionIn(){ //check current postion

    if ($('body').hasClass('main-page')) {

      var windowSize = $(window).outerWidth();
      var scrollDistance = $(window).scrollTop();

      $('.scrollTo').each(function(index, value) {

        var idName = $(this).attr("scrollTo"),
            idTop = $(idName).offset().top,
            idBottom = $(idName).offset().top + $(idName).height();

        if (windowSize < 992) { // mobile action
          var paddingAdd = 75;
          if (idName!="#home") idTop = idTop - paddingAdd - 1;
          if (idName!="#home") idBottom = idBottom + paddingAdd;
        } else { // desktop actioin
          //
          var paddingAdd = 250,
              sectionPT = parseInt($(idName).css('padding-top')),
              newSectionPT = paddingAdd - sectionPT;
          if (idName!="#home") idTop = idTop - newSectionPT -1;
          if (idName!="#home") idBottom = idBottom - newSectionPT;
        }

        if ( (idTop <= scrollDistance) && ( idBottom > scrollDistance ) ) {
          $('.scrollTo.active').removeClass('active');
          $(this).addClass('active'); // active nav class
          window.history.pushState(null, null, idName);// replace link with # name
        }

      });

    }
  }

  // function goToHash(){ // when have # in link go to section
  //   var url = window.location.href;
  //   var hash = url.substring(url.indexOf('#'));
  //   scrollto(hash, 0);
  // }

});