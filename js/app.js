;(function($, App){
  "use strict";

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
  };

  function timer() {

    var isPause = true;
    $("#timer").on("click", function () {
        if (isPause) clock.resume();
        else clock.pause();

        isPause = !isPause;
        $(this).find('.icon').toggleClass('icon-pause icon-play');
    });
  }

  var _boxesClass = {
    horizon: "horizontal",
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
    boxSelect: function (element) {
      element.not('.box-black, .isActive').addClass('box-light')
    },
    currentBox: function(element, container) {
      if ($(element).hasClass('isActive')) {
        this.horizon = this.horizon == "horizontal" ? "vertical" : "horizontal";
      }

      container.removeClass('isActive');
      $(element).addClass('isActive');
      this[this.horizon](element);
    },
    nextBox: function(element, box) {
      var _index = $(element).index();
      var nextElement = $(element).parent().children().eq(_index >= 4 ? 0 : _index + 1);
      debugger;
      if (nextElement.text().length) {
        this.nextBox(nextElement, box)
      } else {
        this.currentBox(nextElement, box);
      }
    }
  };

  function boxes() {

    var $box = $('.box').not('.box-black');

    $box.on('click', function(){
      _boxesClass.currentBox(this, $box);
    });
  }

  function keyboardEvnt () {
    var $box = $('.box').not('.box-black');

    $('.keyboard span').on('click', function() {
      var char = $(this).text();
      var curElement = $('.isActive');

      curElement.text(char);
      _boxesClass.nextBox(curElement, $box);
    });
  }

  function init() {
    timer();
    boxes();
    keyboardEvnt();
  };

  App.init = init;

}(jQuery, (window.App = window.App || {} )));
