AOS.init({
  offset: 100,
  easing: "ease",
  duration: 800,
  delay: 100,
  once: false,
});

// for bg05
// Function to check age of customers
// Function to check age of customers
function checkAge() {
  var error = $(".madlib-error");
  $("#age").focusout(function (event) {
    var age = $("#age").val();
    if (age && age >= 18 && age <= 70) {
      error.hide();
    } else {
      error.show();
    }
  });
}

// function checkIncome() {
//     var error = $(".income-error");
//     $("#income").focusout(function(event) {
//         if($(this).val()) {
//             error.hide();
//         } else {
//             error.show();
//         }
//     });
// }

function goSubmit() {
  $("#get-result").click(function (e) {
    e.preventDefault();
    if (validate()) {
      $.cookie("accessAssessment", "true", { path: "/" });
      var url =
        "/cn/platform/assessment-result.html#/?age=" +
        $("#age").val() +
        "&income=" +
        $("#income .current").html() +
        "&risk=" +
        $("#job").val() +
        "&invest=" +
        $("#investYear .current").html();
      window.location.href = url;
    }
  });
}

function validate() {
  if ($(".madlib-error").is(":visible") || $(".income-error").is(":visible")) {
    return false;
  }

  if (
    !$("#age").val() ||
    !$("#income .current").html() ||
    !$("#investYear .current").html()
  ) {
    if (!$("#income").val()) {
      $(".income-error").show();
    }
    if (!$("#age").val()) {
      $(".madlib-error").show();
    }
    return false;
  }
  return true;
}

$(document).ready(function () {
  checkAge();
  goSubmit();
  $("#job").niceSelect();
  $("#pay").niceSelect();
  $("#invest").niceSelect();
});

//for bg06
// 步骤组件
!(function () {
  class Step {
    constructor(el, config) {
      if (!el) {
        console.log("请传入节点！");
        return;
      }
      this.el = el;
      this.config = config;

      this.currentIndex = 0;
      this.length = 0;
      this.init();
    }

    init() {
      this.ulDom = this.el.getElementsByClassName("ipage-component-step-ul")[0];
      this.imgsDom = this.el.getElementsByClassName(
        "ipage-component-step-images"
      )[0];

      this.bindEvent();
      this.renderImage();
    }

    bindEvent() {
      const stepItemList = this.ulDom.getElementsByClassName("step-item-li");
      for (let i = 0; i < stepItemList.length; i++) {
        const step = stepItemList[i];
        step.addEventListener(
          "click",
          () => {
            if (i === this.currentIndex) {
              return;
            } else {
              stepItemList[this.currentIndex].classList.remove("active");
              this.currentIndex = i;
              stepItemList[this.currentIndex].classList.add("active");
              this.renderImage();
            }
          },
          false
        );
      }
    }

    renderImage() {
      const images = this.imgsDom.getElementsByClassName("step-item-image");
      for (let i = 0; i < images.length; i++) {
        if (i === this.currentIndex) {
          images[this.currentIndex].style.display = "block";
        } else {
          images[i].style.display = "none";
        }
      }
    }
  }

  const steps = document.querySelectorAll(".ipage-component-step");
  for (let i = 0; i < steps.length; i++) {
    const el = steps[i];
    new Step(el, {
      type: el.dataset.type,
    });
  }
})();

$(".CFD-ios").hover(
  function () {
    $(".ios-CFD").show();
  },
  function () {
    $(".ios-CFD").hide();
  }
);
$(".CFD-android").hover(
  function () {
    $(".android-CFD").show();
  },
  function () {
    $(".android-CFD").hide();
  }
);

$("#age").on("blur", function () {
  console.log("blur");
  checkAge();
});

(function a() {
  // e.preventDefault();
  new Swiper("#swiper5", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      disableOnInteraction: false,
      enabled: true,
    },
    autoplay: false,
    slidesPerView: "auto",
    centeredSlides: true,
    slideToClickedSlide: true,
    spaceBetween: 50,
    autoHeight: true,
  });
})();
