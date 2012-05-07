
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
              return emptyNodes.push($this);
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
          width = item.width();
          height = item.height();
          keyword = item.attr('alt');
          src = ("http://" + settings.provider + ".com") + "/" + (width ? width : settings.defaultWidth + "/" + (height ? height : settings.defaultHeight + "/" + (keyword ? keyword : "")));
          item.attr('src', src);
        });
      },
      placekitten: function(emptyNodes) {
        return $(emptyNodes).each(function(index, item) {
          var height, src, width;
          width = item.width();
          height = item.height();
          src = ("http://" + settings.provider + ".com/") + (width ? width : settings.defaultWidth + "/" + (height ? height : settings.defaultHeight + "/"));
          item.attr('src', src);
        });
      },
      robohash: function(emptyNodes) {
        return $(emptyNodes).each(function(index, item) {
          var height, keyword, set, src, width;
          width = item.width();
          height = item.height();
          keyword = item.attr('alt');
          set = "set" + Math.floor(Math.random() * (3 - 1 + 1)(+1));
          src = ("http://" + settings.provider + ".org/") + (keyword ? keyword : "random" + ".png?set=" + set + "&size=" + (width ? width : settings.defaultWidth + "x" + (height ? height : settings.defaultHeight)));
          item.attr('src', src);
        });
      }
    };
    if (providers[settings.provider]) {
      return processors.defaultProcessor.call(this, providers[settings.provider]);
    } else {
      return processors.defaultProcessor.call(this, providers['flickholdr']);
    }
  };
})(jQuery);
