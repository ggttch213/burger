var animation;
var $bgm = $("#bgmAudio");
var $loading = $("#loadingAudio");
var preover = new Boolean(false);
// while (preover == true) {
//   $(document).on("click", "#gifBlock.index", function () {});
// }
//首頁 => 開頭1

$(document).on("click", "#gifBlock.index", function () {
  // $bgm[0].muted = false;
  // $bgm[0].play();
  var $img = $(this);
  $img.fadeOut(300, "easeOutQuad", function () {
    $img
      .attr("src", "/ani/gif/op1.gif")
      .removeClass("index")
      .addClass("op1")
      .fadeIn(300, "easeOutQuad");
  });
});
//開頭1 => 開頭2
$(document).on("click", "#gifBlock.op1", function () {
  var $img = $(this);
  $img.fadeOut(300, "easeOutQuad", function () {
    $img
      .attr("src", "/ani/gif/op2.gif")
      .removeClass("op1")
      .addClass("op2")
      .fadeIn(300, "easeOutQuad");
  });
});
//開頭2 => Q0
$(document).on("click", "#gifBlock.op2", function () {
  var $img = $(this);
  var $lotties = $("#anim");
  animation = bodymovin.loadAnimation({
    container: document.getElementById("anim"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/ani/lotties/Q0.json",
  });
  $img.fadeOut(300, "easeOutQuad", function () {
    $img.hide();
    $lotties.show().fadeIn(300, "easeOutQuad");
    $lotties.removeClass().addClass("Q0");
  });
});

animation.addEventListener("DOMLoaded", function () {
  setTimeout(() => {
    $("#anim svg image").each(function () {
      let imgHref = $(this).attr("href") || $(this).attr("xlink:href");

      if (imgHref === "/ani/lotties/images/q0_a.png") {
        $(this).css("cursor", "pointer");
        $(this).on("click", function () {
          preover = true;
          var $lotties = $(this);
          console.log(preover);
          // 先淡出動畫，然後在 complete 回調中銷毀舊動畫並載入新動畫
          $lotties.fadeOut(300, "easeOutQuad", function () {
            animation.destroy(); // 確保動畫在淡出後才銷毀
            animation = bodymovin.loadAnimation({
              container: document.getElementById("anim"),
              renderer: "svg",
              loop: true,
              autoplay: true,
              path: "/ani/lotties/Q1.json",
            });

            // 重新顯示並淡入新動畫
            $lotties.show().fadeIn(300, "easeOutQuad", function () {
              $lotties.removeClass().addClass("Q1"); // 轉換 class
            });
          });
        });
      }
      if (imgHref === "/ani/lotties/images/q0_b.png") {
        $(this).css("cursor", "pointer");
        $(this).on("click", function () {
          preover = true;
          var $lotties = $(this);
          console.log(preover);
          // 先淡出動畫，然後在 complete 回調中銷毀舊動畫並載入新動畫
          $lotties.fadeOut(300, "easeOutQuad", function () {
            animation.destroy(); // 確保動畫在淡出後才銷毀
            animation = bodymovin.loadAnimation({
              container: document.getElementById("anim"),
              renderer: "svg",
              loop: true,
              autoplay: true,
              path: "/ani/lotties/Q2.json",
            });

            // 重新顯示並淡入新動畫
            $lotties.show().fadeIn(300, "easeOutQuad", function () {
              $lotties.removeClass().addClass("Q2"); // 轉換 class
            });
          });
        });
      }
    });
  }, 500);
});
//(Q0) => Q1;
$(document).on("click", "#anim.Q0", function () {
  preover = true;
  var $lotties = $(this);
  console.log(preover);
  // 先淡出動畫，然後在 complete 回調中銷毀舊動畫並載入新動畫
  $lotties.fadeOut(300, "easeOutQuad", function () {
    animation.destroy(); // 確保動畫在淡出後才銷毀
    animation = bodymovin.loadAnimation({
      container: document.getElementById("anim"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/ani/lotties/Q1.json",
    });

    // 重新顯示並淡入新動畫
    $lotties.show().fadeIn(300, "easeOutQuad", function () {
      $lotties.removeClass().addClass("Q1"); // 轉換 class
    });
  });
});

//Q1 =>   感性愛路線Q2
$(document).on("click", "#anim.Q1", function () {
  // $bgm[0].muted = true;
  var $lotties = $(this);
  $lotties.fadeOut(300, "easeOutQuad", function () {
    animation.destroy();
    animation = bodymovin.loadAnimation({
      container: document.getElementById("anim"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/ani/lotties/Q2.json",
    });
    $lotties.show().fadeIn(300, "easeOutQuad");
    $lotties.removeClass().addClass("Q2");
  });
});
//感性愛路線Q2 =>   感性愛路線Q3-1
$(document).on("click", "#anim.Q2", function () {
  // $bgm[0].muted = true;
  var $lotties = $(this);
  $lotties.fadeOut(300, "easeOutQuad", function () {
    animation.destroy();
    animation = bodymovin.loadAnimation({
      container: document.getElementById("anim"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/ani/lotties/Q3-1.json",
    });
    $lotties.show().fadeIn(300, "easeOutQuad");
    $lotties.removeClass().addClass("Q3-1");
  });
});
//感性愛路線Q3-1 => 跳舞頁
$(document).on("click", "#anim.Q3-1", function () {
  var $lotties = $(this);
  var $img = $("#gifBlock");

  // 先淡出 Lottie 動畫
  $lotties.fadeOut(300, "easeOutQuad", function () {
    animation.destroy(); // 淡出完成後銷毀 Lottie
    $lotties.hide();

    // 確保 GIF 顯示，並設置新的 GIF 檔案
    $img
      .attr("src", "/ani/gif/p5Dance.gif")
      .css("display", "block") // 確保它顯示
      .removeClass() // 先清除不必要的 class
      .addClass("p5Dance") // 設定新的 class
      .hide() // 先隱藏，準備淡入
      .fadeIn(300, "easeOutQuad");
  });
});
//跳舞頁=> Q4-1-set1
$(document).on("click", "#gifBlock.p5Dance", function () {
  // $bgm[0].muted = true;
  var $lotties = $("#anim");
  var $img = $(this);

  animation = bodymovin.loadAnimation({
    container: document.getElementById("anim"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/ani/lotties/Q4-1set1.json",
  });
  $img.fadeOut(300, "easeOutQuad", function () {
    $img.hide();
    $lotties.show().fadeIn(300, "easeOutQuad");
    $lotties.removeClass().addClass("Q4-1set1");
  });
});
//Q4-1-set1=> Q4-2-set1
$(document).on("click", "#anim.Q4-1set1", function () {
  // $bgm[0].muted = true;
  var $lotties = $(this);
  $lotties.fadeOut(300, "easeOutQuad", function () {
    animation.destroy();
    animation = bodymovin.loadAnimation({
      container: document.getElementById("anim"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/ani/lotties/Q4-2set1.json",
    });
    $lotties.show().fadeIn(300, "easeOutQuad");
    $lotties.removeClass().addClass("Q4-2set1");
  });
});

//Q4-2-set1=> END1
$(document).on("click", "#anim.Q4-2set1", function () {
  var $lotties = $(this);
  var $img = $("#gifBlock");

  // 先淡出 Lottie 動畫
  $lotties.fadeOut(300, "easeOutQuad", function () {
    animation.destroy(); // 淡出完成後銷毀 Lottie
    $lotties.hide();

    // 確保 GIF 顯示，並設置新的 GIF 檔案
    $img
      .attr("src", "/ani/gif/end1.gif")
      .css("display", "block") // 確保它顯示
      .removeClass() // 先清除不必要的 class
      .addClass("end1") // 設定新的 class
      .hide() // 先隱藏，準備淡入
      .fadeIn(300, "easeOutQuad");
  });
});

//end1 => loading
$(document).on("click", "#gifBlock.end1", function () {
  var $img = $(this);
  var $lotties = $("#anim");
  animation = bodymovin.loadAnimation({
    container: document.getElementById("anim"),
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "/ani/lotties/loading.json",
  });
  $img.fadeOut(300, "easeOutQuad", function () {
    $img.hide();
    $lotties.show().fadeIn(300, "easeOutQuad");
    $lotties.removeClass().addClass("loading");
  });

  //Loading => Box
  // 當動畫播放完畢，切換到 Box.gif
  animation.addEventListener("complete", function () {
    if ($("#anim").hasClass("loading")) {
      var $lotties = $("#anim");
      var $img = $("#gifBlock");

      // 先淡出 Lottie，然後顯示 Box.gif
      $lotties.fadeOut(300, "easeOutQuad", function () {
        $lotties.hide();
        $img
          .show()
          .attr("src", "/ani/gif/box.gif")
          .removeClass()
          .addClass("box")
          .fadeIn(300, "easeOutQuad");
      });
    }
  });
});

//Box => PinkA
$(document).on("click", "#gifBlock.box", function () {
  var $img = $(this);
  var $lotties = $("#anim");
  $lotties.hide();
  //替換為 <video>
  var $video = $("<video>", {
    id: "videoBlock",
    src: "/ani/gif/粉紅泡泡堡.mp4",
    width: $img.width(), // 繼承原本圖片的寬度
    autoplay: true,
    playsinline: true,
    muted: false, // 如果要靜音播放可設為 true
  }).addClass("PinkA");
  // 移除圖片，加入影片
  $img.replaceWith($video);
});

// //PinkA => PinkB
// $(document).on("click", "#gifBlock.PinkA", function () {
//   var $img = $(this);
//   var $lotties = $("#anim");
//   $("#showUserName").show();
//   $("#showUserName textPath").text(userName);
//   $lotties.hide();
//   $img
//     .show()
//     .attr("src", "/ani/gif/18_pinkBurger_B.gif")
//     .removeClass("PinkA")
//     .addClass("PinkB");
// });

// $(document).on("click", "#anim.Name", function (event) {
//   var envelope = document.querySelector(".lottie-envelope");
//   if (envelope) {
//     envelope.addEventListener("click", function () {
//       console.log("點擊了 Lottie 內的信封！");
// 執行動畫切換
//座標寫法
// var container = $(this).get(0).getBoundingClientRect(); // 取得 Lottie 容器的邊界
// var x = event.clientX - container.left; // 計算相對於 Lottie 的點擊 X 座標
// var y = event.clientY - container.top; // 計算相對於 Lottie 的點擊 Y 座標

// console.log("點擊座標:", x, y); // Debugging: 查看點擊座標

// // 設定信封的點擊範圍（根據提供的四個角座標）
// var envelopeArea = { xMin: 342, xMax: 782, yMin: 362, yMax: 634 };

// if (
//   x >= envelopeArea.xMin &&
//   x <= envelopeArea.xMax &&
//   y >= envelopeArea.yMin &&
//   y <= envelopeArea.yMax
// ) {
//   var $lotties = $(this);

//   // 銷毀當前動畫，然後載入 Q0.json
//   animation.destroy();
//   animation = bodymovin.loadAnimation({
//     container: document.getElementById("anim"),
//     renderer: "svg",
//     loop: true,
//     autoplay: true,
//     path: "/ani/lotties/Q0.json",
//   });
// });
// 淡出當前動畫後顯示新動畫
//     $lotties.fadeOut(300, "easeOutQuad", function () {
//       $lotties.hide();
//       $lotties.show().fadeIn(300, "easeOutQuad");
//       $lotties.removeClass().addClass("Q0"); // 轉換 class
//     });
//   }
// });

// (Name) => Loading;
// $(document).on("click", "#anim.Name", function () {
//   var $lotties = $(this);
//   var container = $(this).get(0).getBoundingClientRect(); // 取得 Lottie 動畫的邊界座標
//   var x = event.clientX - container.left; // 計算相對於 Lottie 的點擊 X 座標
//   var y = event.clientY - container.top; // 計算相對於 Lottie 的點擊 Y 座標

//   console.log("點擊座標:", x, y); // 在 Console 顯示座標
// $loading[0].muted = false;
// $loading[0].play();
// userName = $("#userName").val();
// $("#userName").hide();
// animation.destroy();
// animation = bodymovin.loadAnimation({
//   container: document.getElementById("anim"),
//   renderer: "svg",
//   loop: false,
//   autoplay: true,
//   path: "/ani/lotties/loading.json",
// });
//   $lotties.fadeOut(300, "easeOutQuad", function () {
//     $lotties.hide();
//     $lotties.show().fadeIn(300, "easeOutQuad");
//     $lotties.removeClass();
//     $lotties.addClass("Loading");
// });
// });
