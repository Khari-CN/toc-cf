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

// 步骤组件
!(function() {

    class Step {
        constructor(el, config) {
            if (!el) {
                console.log('请传入节点！')
                return
            }
            this.el = el
            this.config = config
  
            this.currentIndex = 0
            this.length = 0
            this.init()
        }
  
        init() {
            this.ulDom = this.el.getElementsByClassName('ipage-component-step-ul')[0]
            this.imgsDom = this.el.getElementsByClassName('ipage-component-step-images')[0]
  
            this.bindEvent()
            this.renderImage()
        }
  
        bindEvent() {
            const stepItemList = this.ulDom.getElementsByClassName('step-item-li')
            for (let i = 0; i < stepItemList.length; i++) {
                const step = stepItemList[i]
                step.addEventListener('click', ()=>{
                    if (i === this.currentIndex) {
                        return
                    } else {
                        stepItemList[this.currentIndex].classList.remove('active')
                        this.currentIndex = i
                        stepItemList[this.currentIndex].classList.add('active')
                        this.renderImage()
                    }
  
                }
                , false)
            }
        }
  
        renderImage() {
            const images = this.imgsDom.getElementsByClassName('step-item-image')
            for (let i = 0; i < images.length; i++) {
                if (i === this.currentIndex) {
                    images[this.currentIndex].style.display = 'block'
                } else {
                    images[i].style.display = 'none'
                }
            }
        }
    }
  
    const steps = document.querySelectorAll('.ipage-component-step')
    for (let i = 0; i < steps.length; i++) {
        const el = steps[i]
        new Step(el,{
            type: el.dataset.type
        })
    }
  
  }
  )()

  $('.CFD-ios').hover(function() {
    $(".ios-CFD").show();
  }, function() {
    $(".ios-CFD").hide();
  });
  $('.CFD-android').hover(function() {
    $(".android-CFD").show();
  }, function() {
    $(".android-CFD").hide();
  });

