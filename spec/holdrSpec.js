
describe('holdr jquery plugin, coffee version', function() {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'fixtures';
    loadFixtures('imgfixture.html');
    return this.addMatchers({
      toBeModified: function() {
        return this.actual.find("img[src='']").length === 0;
      }
    });
  });
  afterEach(function() {
    return ($('#images')).remove();
  });
  return it('should be chainable', function() {
    var images;
    images = $('img');
    expect(images).toExist;
    return expect(images.holdr()).toBeTruthy;
  });
});
