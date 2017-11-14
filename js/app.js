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
    var _boxesClass = {
      horizontal: function(element) {
        $('.box-light').removeClass('box-light');
        var _parent = $(element).parent();
        this.boxSelect(_parent.find('.box'));
      },
      vertical: function(element) {
        $('.box-light').removeClass('box-light');
        var _index = $(element).index() + 1;
        this.boxSelect($('.row-box .box:nth-child(' + _index + ')'))
      },
      boxSelect: function (el) {
        el.not('.box-black, .isActive').addClass('box-light')
      }
    }

    var $box = $('.box').not('.box-black');
    var horizon = "horizontal";

    $box.on('click', function(){

      if ($(this).hasClass('isActive')) {
        horizon = horizon == "horizontal" ? "vertical" : "horizontal";
      }

      $box.removeClass('isActive');
      $(this).addClass('isActive');
      _boxesClass[horizon](this);
    });
  }

  function init() {
    timer();
    boxes();
  };

  App.init = init;

}(jQuery, (window.App = window.App || {} )));
