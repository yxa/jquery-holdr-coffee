
(function($) {
  return $.fn.holdr = function(options) {
    var processors, providers, settings;
    settings = $.extend({
      'provider': 'flickholdr',
      'defaultWidth': '200',
      'defaultHeight': '300'
    }, options);
    processors = {
      defaultProcessor: function(callback) {
        var emptyNodes;
        emptyNodes = [];
        this.each(function() {
          var $this;
          $this = $(this);
          if ($this.is('img')) {
            if (!$this.attr('src')) {
              emptyNodes.push($this);
            }
          }
        });
        return callback.call(this, emptyNodes);
      }
    };
    providers = {
      flickholdr: function(emptyNodes) {
        return $(emptyNodes).each(function(index, item) {
          var height, keyword, src, width;
          keyword = item.attr('alt');
          width = item.width() ? item.width() : settings.defaultWidth;
          height = item.height() ? item.height() : settings.defaultHeight;
          src = ("http://" + settings.provider + ".com/") + width + "/" + height + "/" + (keyword ? keyword : "");
          item.attr('src', src);
        });
      },
      placekitten: function(emptyNodes) {
        return $(emptyNodes).each(function(index, item) {
          var height, src, width;
          width = item.width() ? item.width() : settings.defaultWidth;
          height = item.height() ? item.height() : settings.defaultHeight;
          src = ("http://" + settings.provider + ".com/") + width + "/" + height;
          item.attr('src', src);
        });
      },
      robohash: function(emptyNodes) {
        return $(emptyNodes).each(function(index, item) {
          var height, keyword, set, src, width;
          width = item.width() ? item.width() : settings.defaultWidth;
          height = item.height() ? item.height() : settings.defaultHeight;
          keyword = item.attr('alt');
          set = "set" + Math.floor(Math.random() * (3 - 1 + 1) + 1);
          src = ("http://" + settings.provider + ".org/") + (keyword ? keyword : "random" + ".png?set=" + set + "&size=" + width + "x" + height);
          item.attr('src', src);
        });
      }
    };
    if (providers[settings.provider]) {
      return processors.defaultProcessor.call(this, providers[settings.provider]);
    } else {
      settings.provider = 'flickholdr';
      return processors.defaultProcessor.call(this, providers.flickholdr);
    }
  };
})(jQuery);
