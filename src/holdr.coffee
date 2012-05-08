( ($) ->
  $.fn.holdr = (options) ->
    settings = $.extend 
      'provider':     'flickholdr'
      'defaultWidth':  '200'
      'defaultHeight': '300'
    , options 
    
    processors =
      defaultProcessor: (callback) ->
        emptyNodes = []
        @.each ->
          $this = $(this)
          if $this.is 'img'
            if !$this.attr 'src'
              emptyNodes.push $this
              return
        callback.call @, emptyNodes
        
    providers =
      flickholdr: (emptyNodes) ->
        $(emptyNodes).each (index,item) ->
          keyword =   item.attr 'alt'
          width = if item.width() then item.width() else settings.defaultWidth
          height = if item.height() then item.height() else settings.defaultHeight
          src     =   "http://#{settings.provider}.com/" + width + "/" + height + "/" + if keyword then keyword else ""
                                                        
          item.attr 'src',src
          return

      placekitten: (emptyNodes) ->
        $(emptyNodes).each (index, item) ->
          width = if item.width() then item.width() else settings.defaultWidth
          height = if item.height() then item.height() else settings.defaultHeight
          src     =   "http://#{settings.provider}.com/" + width + "/" + height
          item.attr 'src', src
          return
      
      robohash: (emptyNodes) ->
        $(emptyNodes).each (index, item) ->
          width = if item.width() then item.width() else settings.defaultWidth
          height = if item.height() then item.height() else settings.defaultHeight
          keyword =   item.attr 'alt'
          set     =   "set" + Math.floor Math.random() * (3 - 1 + 1) + 1 
          src     =   "http://#{settings.provider}.org/" +
                                                        if keyword then keyword else "random" +
                                                        ".png?set=" + set +
                                                        "&size=" +
                                                        width + "x" + height
          item.attr 'src', src
          return

    
    if providers[settings.provider]
      processors.defaultProcessor.call @, providers[settings.provider] 
    else
      settings.provider = 'flickholdr'
      processors.defaultProcessor.call @, providers.flickholdr
) jQuery
