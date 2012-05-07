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
    images = ($ 'img');
    expect(images).toExist
    expect(images.holdr()).toBeTruthy
