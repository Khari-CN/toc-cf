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