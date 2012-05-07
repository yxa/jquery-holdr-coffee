( ($) ->
  $.fn.holdr = (options) ->
    settings = $.extend {
      'provider':     'flickholdr',
      'defaultWidth':  '200',
      'defaultHeight': '300'
    }, options 
    
    processors =
      defaultProcessor: (callback) ->
        emptyNodes = []
        @.each ->
          $this = $(this)
          if $this.is 'img'
            if !$this.attr 'src'
              emptyNodes.push $this
        callback.call @, emptyNodes
        
    providers =
      flickholdr: (emptyNodes) ->
        $(emptyNodes).each (index,item) ->
          width   =   item.width()
          height  =   item.height()
          keyword =   item.attr 'alt'
          src     =   "http://#{settings.provider}.com" + 
                                                    "/" + 
                                                    if width then width else settings.defaultWidth +
                                                    "/" +
                                                    if height then height else settings.defaultHeight +
                                                    "/" +
                                                    if keyword then keyword else ""
                                                        
          item.attr 'src',src
          return

      placekitten: (emptyNodes) ->
        $(emptyNodes).each (index, item) ->
          width   =   item.width()
          height  =   item.height()
          src     =   "http://#{settings.provider}.com/" +
                                                        if width then width else settings.defaultWidth +
                                                        "/" +
                                                        if height then height else settings.defaultHeight +
                                                        "/"
          item.attr 'src', src
          return
      
      robohash: (emptyNodes) ->
        $(emptyNodes).each (index, item) ->
          width   =   item.width()
          height  =   item.height()
          keyword =   item.attr 'alt'
          set     =   "set" + Math.floor(Math.random() * (3 - 1 + 1) +1)
          src     =   "http://#{settings.provider}.org/" +
                                                        if keyword then keyword else "random" +
                                                        ".png?set=" + set +
                                                        "&size=" +
                                                        if width then width else settings.defaultWidth + "x" +                                                        if height then height else settings.defaultHeight
                                                          
          item.attr 'src', src
          return

    
    if providers[settings.provider] then return processors.defaultProcessor.call @, providers[settings.provider] else processors.defaultProcessor.call @, providers['flickholdr']                                       
) jQuery
