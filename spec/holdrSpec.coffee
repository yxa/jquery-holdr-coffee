describe 'holdr jquery plugin, coffee version', ->
  beforeEach ->
    jasmine.getFixtures().fixturesPath = 'fixtures'
    loadFixtures 'imgfixture.html'
    @.addMatchers
      toBeModified: ->  
        @.actual.find("img[src='']").length == 0

  afterEach ->
    ($ '#images').remove()
  
  it 'should be chainable', ->
    images = ($ 'img')
    expect(images).toExist
    expect(images.holdr()).toBeTruthy

  it 'should only replace images with empty src attributes', ->
    images = ($ "img[src!='']")
    expect(images.length).toBe 1
    url = images.attr 'src'
    allImages = ($ "img")
    allImages.holdr()
    expect($("img[src='#{url}']").length).toBe 1
    
  it 'should be able to replace more than one image with empty src attribute', ->
    emptyImages = ($ "img[src='']")
    expect(emptyImages.length).toBe 2
    allImages = ($ "img")
    expect(allImages.length).toBe 3
    allImages.holdr()
    emptyImages = ($ "img[src='']")
    expect(emptyImages.length).toBe 0

  it 'should be able to handle default or no placeholder site specified', ->
    defaultProvider = 'http://flickholdr.com'
    emptyImages = ($ "img[src='']")
    emptyImages.holdr()
    expect(emptyImages).toBeModified
    emptyImages.each (index,item) ->
      expect($(item).attr('src')).toEqual(defaultProvider + '/' + 200 + '/' + 300 + '/')


  it 'should be able to handle placekitten as a placeholder site', ->
    defaultProvider = 'http://placekitten.com'
    emptyImages = ($ "img[src='']")
    emptyImages.holdr({provider: 'placekitten'})
    expect(emptyImages).toBeModified
    emptyImages.each (index,item) ->
      expect($(item).attr('src')).toEqual(defaultProvider + '/' + 200 + '/' + 300)


  it 'should be able to handle robohash as a placeholder site', ->
