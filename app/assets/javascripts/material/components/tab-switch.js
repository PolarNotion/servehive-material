function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * tab indicator animation
 * requires bootstrap's (v4.0.0-alpha.6) tab.js
 */

var TabSwitch = function ($) {

  // constants >>>
  var DATA_KEY = 'md.tabswitch';
  var NAME = 'tabswitch';
  var NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 390;

  var ClassName = {
    ANIMATE: 'animate',
    DROPDOWN_ITEM: 'dropdown-item',
    INDICATOR: 'nav-tabs-indicator',
    MATERIAL: 'nav-tabs-material',
    SCROLLABLE: 'nav-tabs-scrollable',
    SHOW: 'show'
  };

  var Event = {
    SHOW_BS_TAB: 'show.bs.tab'
  };

  var Selector = {
    DATA_TOGGLE: '.nav-tabs [data-toggle="tab"]',
    DROPDOWN: '.dropdown',
    NAV: '.nav-tabs'
  };
  // <<< constants

  var TabSwitch = function () {
    function TabSwitch(nav) {
      _classCallCheck(this, TabSwitch);

      if (typeof $.fn.tab === 'undefined') {
        throw new Error('Material\'s JavaScript requires Bootstrap\'s tab.js');
      }

      this._nav = nav;
      this._navindicator = null;
    }

    TabSwitch.prototype.switch = function _switch(element, relatedTarget) {
      var _this = this;

      var navLeft = $(this._nav).offset().left;
      var navScrollLeft = $(this._nav).scrollLeft();
      var navWidth = $(this._nav).outerWidth();
      var supportsTransition = Util.supportsTransitionEnd();

      if (!this._navindicator) {
        this._createIndicator(navLeft, navScrollLeft, navWidth, relatedTarget);
      }

      if ($(element).hasClass(ClassName.DROPDOWN_ITEM)) {
        element = $(element).closest(Selector.DROPDOWN);
      }

      var elLeft = $(element).offset().left;
      var elWidth = $(element).outerWidth();

      $(this._navindicator).addClass(ClassName.SHOW);
      Util.reflow(this._navindicator);

      if (supportsTransition) {
        $(this._nav).addClass(ClassName.ANIMATE);
      }

      $(this._navindicator).css({
        left: elLeft + navScrollLeft - navLeft,
        right: navWidth - (elLeft + navScrollLeft - navLeft + elWidth)
      });

      var complete = function complete() {
        $(_this._nav).removeClass(ClassName.ANIMATE);
        $(_this._navindicator).removeClass(ClassName.SHOW);
      };

      if (!supportsTransition) {
        complete();
        return;
      }

      $(this._navindicator).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    TabSwitch.prototype._createIndicator = function _createIndicator(navLeft, navScrollLeft, navWidth, relatedTarget) {
      this._navindicator = document.createElement('div');

      $(this._navindicator).addClass(ClassName.INDICATOR).appendTo(this._nav);

      if (relatedTarget !== undefined) {
        if ($(relatedTarget).hasClass(ClassName.DROPDOWN_ITEM)) {
          relatedTarget = $(relatedTarget).closest(Selector.DROPDOWN);
        }

        var relatedLeft = $(relatedTarget).offset().left;
        var relatedWidth = $(relatedTarget).outerWidth();

        $(this._navindicator).css({
          left: relatedLeft + navScrollLeft - navLeft,
          right: navWidth - (relatedLeft + navScrollLeft - navLeft + relatedWidth)
        });
      }

      $(this._nav).addClass(ClassName.MATERIAL);
    };

    TabSwitch._jQueryInterface = function _jQueryInterface(relatedTarget) {
      return this.each(function () {
        var nav = $(this).closest(Selector.NAV)[0];

        if (!nav) {
          return;
        }

        var data = $(nav).data(DATA_KEY);

        if (!data) {
          data = new TabSwitch(nav);
          $(nav).data(DATA_KEY, data);
        }

        data.switch(this, relatedTarget);
      });
    };

    return TabSwitch;
  }();

  $(document).on(Event.SHOW_BS_TAB, Selector.DATA_TOGGLE, function (event) {
    TabSwitch._jQueryInterface.call($(event.target), event.relatedTarget);
  });

  $.fn[NAME] = TabSwitch._jQueryInterface;
  $.fn[NAME].Constructor = TabSwitch;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = NO_CONFLICT;
    return TabSwitch._jQueryInterface;
  };

  return TabSwitch;
}(jQuery);