;(function($, App){
  "use strict";

  function timer() {
    var clock = {
      totalSeconds: 0,
      start: function () {
        var _this = this;

        this.interval = setInterval(function () {
          _this.totalSeconds += 1;

          var min = Math.floor(_this.totalSeconds / 60 % 60);
          var sec = ("00" + parseInt(_this.totalSeconds % 60)).substr(-2)

          $('#timer span').text(min + ":" + sec)
        }, 1000);
      },
      pause: function () {
        clearInterval(this.interval);
        delete this.interval;
      },
      resume: function () {
        if (!this.interval) this.start();
      }
    }

    clock.start();
    var isPause = false;
    $("#timer").on("click", function () {
        if (isPause) {
          clock.resume();
        } else {
          clock.pause();
        }
        isPause = !isPause;
        $(this).find('.icon').toggleClass('icon-pause icon-play');
    });

  }

  function init() {
    timer();
  };

  App.init = init;

}(jQuery, (window.App = window.App || {} )));
