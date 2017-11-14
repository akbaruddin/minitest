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

    var isPause = true;
    $("#timer").on("click", function () {
        if (isPause) clock.resume();
        else clock.pause();

        isPause = !isPause;
        $(this).find('.icon').toggleClass('icon-pause icon-play');
    });
  }

  function boxes() {
    var box = $('.box').not('.box-black');

    box.on('click', function(){
      box.removeClass('isActive');
      $(this).addClass('isActive');
    });
  }

  function init() {
    timer();
    boxes();
  };

  App.init = init;

}(jQuery, (window.App = window.App || {} )));
