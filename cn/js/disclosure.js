/**
 *
 * @param {(0|1|2|-1)} remindRisk
 * -1: error
 * 0: 不需閱讀
 * 1: 未閱讀
 * 2: 已閱讀
 */
let disclosureProgressValue = 0;
let initSource = false;
let disclosurePlaybackRate = 1;
const checkReadDisclosure = () => {
  // if (remindRisk !== "1") return;
  if (initSource) return;
  const disclosureWrapper = document.querySelector("#disclosure-agreement");
  const audioSource = document.querySelector("#disclosure-audio-source");
  const audioProgress = document.querySelector("#audio-progress");
  const loadingText = document.querySelector("#text-audio-loading");
  const speedButton = document.querySelector("#button-audio-speed");
  // const label = document.querySelector("#label-read-disclosure");
  // const checkBox = document.querySelector("#checkbox-read-disclosure");
  const audioTotalTime = document.querySelector("#audio-total-time");
  const audioCurrenTime = document.querySelector("#audio-current-time");
  audioSource.setAttribute(
    "src",
    "https://sc.cfygxz.com/source/material/disclosure.mp3"
  );
  audioSource.addEventListener("loadeddata", () => {
    loadingText.classList.add("is-remove");
    audioProgress.classList.add("is-active");
    audioProgress.setAttribute("value", 0);
    audioProgress.setAttribute("max", audioSource.duration);
    speedButton.disabled = false;
    audioTotalTime.innerHTML = convertSecondToMinsFormat(audioSource.duration);
  });
  audioSource.addEventListener("ended", () => {
    // audioProgress.setAttribute("value", 0);
    // setTimeout(() => {
    audioProgress.value = 0;
    disclosureProgressValue = 0;
    audioCurrenTime.innerHTML = "00:00";
    const button = document.querySelector("#button-listen-audio");
    button.innerHTML = "收听录音";
    // }, 1000);
  });
  // label.addEventListener("click", confirmReadFromLabel);
  // checkBox.addEventListener("click", confirmRead);
  disclosureWrapper.classList.add("is-active");
  initSource = true;
};

const playSourceButtonClicked = () => {
  const audioSource = document.querySelector("#disclosure-audio-source");
  const button = document.querySelector("#button-listen-audio");
  if (audioSource.paused) {
    audioSource.play();
    button.innerHTML = "暂停";
    updateProgress();
  } else {
    audioSource.pause();
    button.innerHTML = "收听录音";
  }
};

const swapSpeed = () => {
  const audioSource = document.querySelector("#disclosure-audio-source");
  const button = document.querySelector("#button-audio-speed");
  const rate = Number(audioSource.playbackRate);
  if (rate === 1.5) {
    button.innerHTML = "快速";
  } else {
    button.innerHTML = "正常";
  }
  audioSource.playbackRate = rate === 1.5 ? 1 : 1.5;
  disclosurePlaybackRate = rate === 1.5 ? 1 : 1.5;
};

const updateProgress = () => {
  setTimeout(() => {
    const audioProgress = document.querySelector("#audio-progress");
    const audioSource = document.querySelector("#disclosure-audio-source");
    if (audioSource.paused) return;
    const audioCurrenTime = document.querySelector("#audio-current-time");
    const value =
      // Number(audioProgress.value) + Number(audioSource.playbackRate);
      Number(audioProgress.value) + 1;
    // audioProgress.setAttribute("value", value);
    if (value > audioSource.duration) return;
    disclosureProgressValue = value;
    audioProgress.value = disclosureProgressValue;
    audioCurrenTime.innerHTML = convertSecondToMinsFormat(
      disclosureProgressValue
    );
    if (!audioSource.paused) updateProgress();
  }, 1000 / disclosurePlaybackRate);
};

const changeProgressPointer = (obj) => {
  const audioSource = document.querySelector("#disclosure-audio-source");
  if (audioSource.paused) {
    playSourceButtonClicked();
  }
  const value = Number(obj.value);
  disclosureProgressValue = value;
  audioSource.currentTime = disclosureProgressValue;
};

const confirmRead = () => {
  const button = document.querySelector("#button-confirm-disclosure");
  const check = document.querySelector("#checkbox-read-disclosure");
  if (check.checked) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
};

const confirmReadFromLabel = () => {
  const button = document.querySelector("#button-confirm-disclosure");
  const check = document.querySelector("#checkbox-read-disclosure");
  check.checked = !check.checked;
  if (check.checked) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
};

const convertSecondToMinsFormat = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const second = Math.round(seconds % 60);
  return `${("0" + mins).slice(-2)}:${("0" + second).slice(-2)}`;
};

const submitRead = () => {
  const url = cfvn_url + "/person/updateRemindRisk";
  $.newAjax({
    url: url,
    type: "POST",
    data: { remindRisk: "2" },
    success: function (data) {
      if (data.code === 200) {
        layer.open({
          type: 1,
          title: "风险披露声明",
          skin: "layer-popup",
          closeBtn: 0,
          scrollbar: false,
          move: false,
          area: ["280px", "160px"],
          content: `<span>${data.data}</span>`,
          btn: ["知道了"],
          yes: function (index) {
            const disclosureWrapper = document.querySelector(
              "#disclosure-agreement"
            );
            disclosureWrapper.parentElement.removeChild(disclosureWrapper);
            layer.close(index);
          },
        });
      } else {
        //fail
        layer.open({
          type: 1,
          title: "风险披露声明",
          skin: "layer-popup",
          closeBtn: 0,
          scrollbar: false,
          move: false,
          area: ["280px", "160px"],
          content: `<span>状态更新失败，请联络客服！${data.data}</span>`,
          btn: ["知道了", "联络客服"],
          yes: function (index) {
            const disclosureWrapper = document.querySelector(
              "#disclosure-agreement"
            );
            disclosureWrapper.parentElement.removeChild(disclosureWrapper);
            layer.close(index);
          },
          btn2: function (index) {
            const disclosureWrapper = document.querySelector(
              "#disclosure-agreement"
            );
            disclosureWrapper.parentElement.removeChild(disclosureWrapper);
            layer.close(index);
            window.open("/cn/onlinecs.html", "_blank");
          },
        });
      }
    },
    error: function (err) {
      layer.open({
        type: 1,
        title: "风险披露声明",
        skin: "layer-popup",
        closeBtn: 0,
        scrollbar: false,
        move: false,
        area: ["280px", "160px"],
        content: `<span>网络发生错误，请联络客服！${err}</span>`,
        btn: ["知道了", "联络客服"],
        yes: function (index) {
          const disclosureWrapper = document.querySelector(
            "#disclosure-agreement"
          );
          disclosureWrapper.parentElement.removeChild(disclosureWrapper);
          layer.close(index);
        },
        btn2: function (index) {
          const disclosureWrapper = document.querySelector(
            "#disclosure-agreement"
          );
          disclosureWrapper.parentElement.removeChild(disclosureWrapper);
          layer.close(index);
          window.open("/cn/onlinecs.html", "_blank");
        },
      });
    },
  });
};
