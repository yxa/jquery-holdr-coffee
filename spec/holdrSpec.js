
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
  it('should be chainable', function() {
    var images;
    images = $('img');
    expect(images).toExist;
    return expect(images.holdr()).toBeTruthy;
  });
  it('should only replace images with empty src attributes', function() {
    var allImages, images, url;
    images = $("img[src!='']");
    expect(images.length).toBe(1);
    url = images.attr('src');
    allImages = $("img");
    allImages.holdr();
    return expect($("img[src='" + url + "']").length).toBe(1);
  });
  it('should be able to replace more than one image with empty src attribute', function() {
    var allImages, emptyImages;
    emptyImages = $("img[src='']");
    expect(emptyImages.length).toBe(2);
    allImages = $("img");
    expect(allImages.length).toBe(3);
    allImages.holdr();
    emptyImages = $("img[src='']");
    return expect(emptyImages.length).toBe(0);
  });
  it('should be able to handle default or no placeholder site specified', function() {
    var defaultProvider, emptyImages;
    defaultProvider = 'http://flickholdr.com';
    emptyImages = $("img[src='']");
    emptyImages.holdr();
    expect(emptyImages).toBeModified;
    return emptyImages.each(function(index, item) {
      return expect($(item).attr('src')).toEqual(defaultProvider + '/' + 200 + '/' + 300 + '/');
    });
  });
  it('should be able to handle placekitten as a placeholder site', function() {
    var defaultProvider, emptyImages;
    defaultProvider = 'http://placekitten.com';
    emptyImages = $("img[src='']");
    emptyImages.holdr({
      provider: 'placekitten'
    });
    expect(emptyImages).toBeModified;
    return emptyImages.each(function(index, item) {
      return expect($(item).attr('src')).toEqual(defaultProvider + '/' + 200 + '/' + 300);
    });
  });
  return it('should be able to handle robohash as a placeholder site', function() {});
});
