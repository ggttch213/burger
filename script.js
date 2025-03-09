
var animation;
var pass="";
var burger="";
// 記錄故事的流程：GIF → GIF 或 Lottie → Lottie / GIF
const storyFlow = {
  index: { type: "gifToGif", next: "./ani/gif/op1.gif", nextClass: "op1" },
  op1: { type: "gifToGif", next: "./ani/gif/op2.gif", nextClass: "op2" },
  op2: { type: "gifToLottie", next: "./ani/lotties/Q0.json", nextClass: "Q0" },
  q0_a: {type: "lottieToLottie",next: "./ani/lotties/Q1.json",nextClass: "Q1"},
  q0_b: {type: "lottieToLottie",next: "./ani/lotties/Q1.json",nextClass: "Q1"},
   q1_a: {type: "lottieToLottie",next: "./ani/lotties/Q2.json",nextClass: "Q2"},
  q1_b: {type: "lottieToLottie",next: "./ani/lotties/Q1_5.json",nextClass: "Q1_5"},
  q2_a: {type: "lottieToLottie",next: "./ani/lotties/Q3-1.json",nextClass: "Q3-1",},
  q2_b: {type: "lottieToLottie",next: "./ani/lotties/Q3-2.json",nextClass: "Q3-2",},
  q3_a: {type: "lottieToGif",next: "./ani/gif/p5Dance.gif",nextClass: "p5Dance",pass:"Q4-1set1"},
  q3_b: {type: "lottieToGif",next: "./ani/gif/p5Dance.gif",nextClass: "p5Dance",pass:"Q4-1set2"},
  p5Dance:{type: "gifToLottie"},
  q4_1set1_a: {type: "lottieToLottie",next: "./ani/lotties/Q4-2set1.json",nextClass: "Q4-2set1"},
  q4_1set1_b: {type: "lottieToLottie",next: "./ani/lotties/Q4-2set1.json",nextClass: "Q4-2set1"},
  q4_1set1_c: {type: "lottieToLottie",next: "./ani/lotties/Q4-2set1.json",nextClass: "Q4-2set1"},
  q4_2_a: {type: "lottieToGif",next: "./ani/gif/end1.gif",nextClass: "end1",burger:"pink"},
  q4_2_b: {type: "lottieToGif",next: "./ani/gif/end1.gif",nextClass: "end1",burger:"spicy"},
  q4_2_c: {type: "lottieToGif",next: "./ani/gif/end1.gif",nextClass: "end1",burger:"charm"},
  end1: { type: "gifToLottie", next: "./ani/lotties/loading.json", nextClass: "loading" },
};
$(document).ready(function () {
  var $indexAudio = $("#indexAudio")[0];
  var $bgmAudio = $("#bgmAudio")[0];
  var $loadingAudio = $("#loadingAudio")[0];

  // 【首頁】播放 `indexAudio`
  $indexAudio.play().catch(() => {
    console.log("瀏覽器阻擋自動播放，等待用戶互動");
  });
//  監聽 GIF 點擊事件
$(document).on("click", "#gifBlock", function () {
  var currentClass = $(this).attr("class"); // 取得 GIF 當前 class

  if (storyFlow[currentClass]) {
    var nextStep = storyFlow[currentClass];

 // **當進入一般 BGM 場景，播放 `bgm.mp3`**
 if (nextStep.type === "gifToGif" || nextStep.type === "gifToLottie") {
  switchToBGM();
}

if (nextStep.type === "gifToLottie" && nextStep.nextClass === "loading") {
  switchToLoading();
}


    if (nextStep.pass) {
      console.log(`記錄 pass: ${nextStep.pass}`);
      pass = nextStep.pass;
    }

    if (nextStep.type === "gifToGif") {
      gifToNext(nextStep.next, nextStep.nextClass);
    } else if (nextStep.type === "gifToLottie") {
      gifToLottie(nextStep.next, nextStep.nextClass);
    }
  }
});
 //  切換至 BGM（停止 index 音樂）
 function switchToBGM() {
  console.log(" 切換到 BGM");
  $indexAudio.pause();
  $indexAudio.currentTime = 0;
  $loadingAudio.pause();
  $loadingAudio.currentTime = 0;

  if ($bgmAudio.paused) {
    $bgmAudio.play().catch(() => {
      console.log("瀏覽器阻擋 BGM 播放，等待用戶互動");
    });
  }
}

//  切換至 Loading（停止所有音樂）
function switchToLoading() {
  console.log(" 切換到 Loading 音樂");
  $indexAudio.pause();
  $indexAudio.currentTime = 0;
  $bgmAudio.pause();
  $bgmAudio.currentTime = 0;

  if ($loadingAudio.paused) {
    $loadingAudio.play().catch(() => {
      console.log("瀏覽器阻擋 Loading 音樂播放，等待用戶互動");
    });
  }
}
});

// GIF → GIF
function gifToNext(nextGif, nextClass) {
  var $img = $("#gifBlock");
  $img.fadeOut(300, "easeOutQuad", function () {
    $img
      .attr("src", nextGif)
      .removeClass()
      .addClass(nextClass)
      .fadeIn(300, "easeOutQuad");
  });
}

//  GIF → Lottie //若到loading時直接跑最後幾張
function gifToLottie(nextLottie, nextClass) {
  var $img = $("#gifBlock");
  var $lotties = $("#anim");
if(nextClass==="loading")
{
  console.log("切換到 loading 頁面");
      // 先銷毀舊動畫

      if (animation) {
        animation.destroy();
      }

    animation = bodymovin.loadAnimation({
      container: document.getElementById("anim"),
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "./ani/lotties/loading.json",
    });
    $img.fadeOut(300, "easeOutQuad", function () {
      $img.hide();
      $lotties.show().fadeIn(300, "easeOutQuad");
      $lotties.removeClass().addClass("loading");
    });
    $(document).on("click", "#videoBlock", function () {
      console.log("影片被點擊，回首頁");
      window.location.href = "index.html"; //  設定首頁連結
    });
    //Loading => Box
    // 當動畫播放完畢，切換到 Box.gif
    animation.addEventListener("complete", function () {
      if ($("#anim").hasClass("loading")) {
        var $lotties = $("#anim");
        var $img = $("#gifBlock");
  
        // 先淡出 Lottie，然後顯示 Box.gif
        $lotties.fadeOut(300, "easeOutQuad", function () {
            // ** 先暫時隱藏 GIF，確保舊 GIF 不會瞬間出現**
  $img.hide().removeClass().addClass("box");

  // **確保新 GIF 加載完畢後再顯示**
  $img.attr("src", "./ani/gif/box.gif").on("load", function () {
    $(this).fadeIn(300, "easeOutQuad"); // 淡入新 GIF
  });
          
        });
      }
    });

  //Box => PinkA
  $(document).on("click", "#gifBlock.box", function () {
    var $img = $(this);
    var $lotties = $("#anim");
    $lotties.hide();
    //替換為 <video>
    var $video = $("<video>", {
      id: "videoBlock",
      src: "./ani/gif/"+burger+".mp4",
      width: $img.width(), // 繼承原本圖片的寬度
      autoplay: true,
      playsinline: true,
      muted: false, // 如果要靜音播放可設為 true
    }).addClass(burger);
    // 移除圖片，加入影片
    $img.replaceWith($video);
    $("#returnHome").fadeIn(300);
    $(document).on("click", "#returnHome", function () {
      console.log("回首頁");
      window.location.href = "index.html"; //  設定首頁連結
    });
    burger="";
  });
}
else{


  if (pass) {    
    nextLottie = "./ani/lotties/" + pass + ".json"; // 這裡動態設定 Lottie 路徑
    nextClass = pass;
  }
  console.log(`載入 Lottie: ${nextLottie}`);

  $img.fadeOut(300, "easeOutQuad", function () {
    $img.hide();
    // **先銷毀舊動畫**
    if (animation) {
      animation.destroy();
    }
    animation = bodymovin.loadAnimation({
      container: document.getElementById("anim"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: nextLottie,
    });
    initializeLottieClickEvents();
    $lotties
      .show()
      .removeClass() // 移除舊 class
      .addClass(nextClass) // 新 class
      .fadeIn(300, "easeOutQuad");
      pass="";
  });

}
}

// 監聽 Lottie 載入事件，並綁定點擊事件
function initializeLottieClickEvents() {
  if (!animation) return; // 確保 animation 存在

  animation.addEventListener("DOMLoaded", function () {
    console.log("Lottie 動畫已載入，綁定選項點擊事件");

    $("#anim svg image").each(function () {
      let imgHref = $(this).attr("href") || $(this).attr("xlink:href");
      let imgName = imgHref.split("/").pop().split(".")[0]; // 取得圖片名稱 (去除路徑與副檔名)
   
      if (storyFlow[imgName]) {
        var nextStep = storyFlow[imgName];
       
    
        // 先移除舊的點擊事件，避免多次綁定
        $(this).off("click").css("cursor", "pointer");

        // 綁定新的點擊事件
        $(this).on("click", function () {
          console.log(`點擊了 ${imgName}`);
    //  記錄選擇的 `pass` 值
    if (storyFlow[imgName].pass) {
      console.log(`記錄 pass: ${storyFlow[imgName].pass}`);
      pass = storyFlow[imgName].pass;
    }
    if (storyFlow[imgName].burger) {
      console.log(`記錄 burger: ${storyFlow[imgName].burger}`);
      burger = storyFlow[imgName].burger;
    }
          if (nextStep.type === "lottieToLottie") {
            lottieToNext(nextStep.next, nextStep.nextClass);
          } else if (nextStep.type === "lottieToGif") {
            lottieToGif(nextStep.next, nextStep.nextClass);
          }
        });
      }
    });
  });
}

//  Lottie → Lottie
function lottieToNext(nextLottie, nextClass) {
  var $lotties = $("#anim");
  $lotties.fadeOut(300, "easeOutQuad", function () {
       //  **先銷毀舊動畫**
       if (animation) {
        animation.destroy();
      }
    animation = bodymovin.loadAnimation({
      container: document.getElementById("anim"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: nextLottie,
    });
    initializeLottieClickEvents();
    $lotties
      .show()
      .removeClass() // 移除舊 class
      .addClass(nextClass) // 新 class
      .fadeIn(300, "easeOutQuad");
  });
}
//  Lottie → GIF
function lottieToGif(nextGif, nextClass) {
  var $lotties = $("#anim");
  var $img = $("#gifBlock");
  $lotties.fadeOut(300, "easeOutQuad", function () {
  
  // ** 先暫時隱藏 GIF，確保舊 GIF 不會瞬間出現**
  $img.hide().removeClass().addClass(nextClass);

  // **確保新 GIF 加載完畢後再顯示**
  $img.attr("src", nextGif).on("load", function () {
    $(this).fadeIn(300, "easeOutQuad"); // 淡入新 GIF
  });
});
};