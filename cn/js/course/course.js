window.document.onkeydown = function(e) {
    if (!e) {
      e = event;
    }
    if (e.keyCode == 27) {
      lightbox_close();
    }
  }
  
  function lightbox_open() {
    var lightBoxVideo = document.getElementById("VisaChipCardVideo");
    window.scrollTo(0, 0);
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
    lightBoxVideo.play();
  }
  
  function lightbox_close() {
    var lightBoxVideo = document.getElementById("VisaChipCardVideo");
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
    lightBoxVideo.pause();
  }
  
function secondsToHms(d) {
    d = Number(d);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    if (m < 10) {
        m = '0' + String(m);
    }

    if (s < 10) {
        s = '0' + String(s);
    }

    var mDisplay = m + ":";
    var sDisplay = s;

    return mDisplay + sDisplay;
}


function checkVideoDuration(){
    // const boxes = document.querySelectorAll('#V01,#V02,#V03,#V04,#V05,#V06,#V07,#V08,#V09,#V10,#V11,#V12,#V13,#V14,#V15,#V16,#V17,#V18,#V19');
    // var timeline = document.querySelectorAll('.lengththumbnail');
    // let i = 0;
    // while (i < boxes.length) { 
    // const box = boxes[i]

    // console.log(box)
    // console.log("test")
    // box.onloadedmetadata = function() {
    //     console.log("test2")
    //     // var time = box.duration;
    //     // tl.textContent  = secondsToHms(this.duration); 
    // }
    // i++;
    // }
    const videos = document.querySelectorAll('.all > .video-play > video')
    const durations = document.querySelectorAll('.all > .video-play > .popup-youtube > .lengththumbnail')

    for (var i = 0; i < videos.length; i++) {
        const duration = durations[i]
        videos[i].onloadedmetadata = (e) => {
            duration.innerText = isNaN(e.target.duration) ? '00:00' : secondsToHms(e.target.duration)
        }
        duration.innerText = isNaN(videos[i].duration) ? '00:00' : secondsToHms(videos[i].duration)
        }

}

checkVideoDuration()

function initPlayer() {
    const playButton = document.getElementById("play_button");
    const mainVideo = document.querySelector(".main-video-player > video");
  
    mainVideo.onplay = () => {
      console.log("onplay");
      $("#play_button").hide();
      removeVideoEventListener();
    };
  
    mainVideo.onpause = () => {
      console.log("onpause");
      $("#play_button").show();
    };

    playButton.onclick = () => {
        if (mainVideo.currentTime > 0 && !mainVideo.paused && !mainVideo.ended) {
          // Pause the video
          console.log("pausing");
          // mainVideo.pause();
          $("#play_button").show();
          removeVideoEventListener();
        } else {
          console.log("playing");
          // Play the video
          mainVideo.play();
          removeVideoEventListener();
          $("#play_button").hide();
        }
      };
  
    addVideoEventListener();
  }
  
  function onMouseEnter() {
    $("#play_button").fadeIn();
    // setTimeout(function() {
    // $("#play_button").fadeOut();
    // }, 3000);
  }
  
  function onMouseLeave() {
    $("#play_button").fadeOut();
  }

  function addVideoEventListener() {
    const videoContainer = document.querySelector(".main-video-player");
  
    videoContainer.addEventListener("mouseenter", onMouseEnter);
    videoContainer.addEventListener("mouseleave", onMouseLeave);
  }
  
  function removeVideoEventListener() {
    const videoContainer = document.querySelector(".main-video-player");
  
    videoContainer.removeEventListener("mouseenter", onMouseEnter);
    videoContainer.removeEventListener("mouseleave", onMouseLeave);
  }
  
  initPlayer();
