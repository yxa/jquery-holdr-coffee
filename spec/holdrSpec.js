
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
  it('should be able to handle set default placeholder site when no site specified', function() {
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
  it('should be able to handle robohash as a placeholder site', function() {
    var defaultProvider, emptyImages;
    defaultProvider = 'http://robohash.org';
    emptyImages = $("img[src='']");
    emptyImages.holdr({
      provider: 'robohash'
    });
    expect(emptyImages).toBeModified;
    return emptyImages.each(function(index, item) {
      return expect($(item).attr('src')).toEqual(defaultProvider + '/random.png?set=1&size=200x300');
    });
  });
  it('should be able to handle flickholdr as a placeholder site', function() {
    var defaultProvider, emptyImages;
    defaultProvider = 'http://flickholdr.com';
    emptyImages = $("img[src='']");
    emptyImages.holdr({
      provider: 'flickholdr'
    });
    expect(emptyImages).toBeModified;
    return emptyImages.each(function(index, item) {
      return expect($(item).attr('src')).toEqual(defaultProvider + '/' + 200 + '/' + 300 + '/');
    });
  });
  return describe('should be able to handle different width and height settings', function() {
    it('should be able to handle flickholdr width and height settings', function() {
      var defaultProvider, emptyImages;
      defaultProvider = 'http://flickholdr.com';
      emptyImages = $("img[src='']");
      emptyImages.holdr({
        provider: 'flickholdr',
        defaultWidth: 600,
        defaultHeight: 700
      });
      expect(emptyImages).toBeModified;
      return emptyImages.each(function(index, item) {
        return expect($(item).attr('src')).toEqual(defaultProvider + '/' + 600 + '/' + 700 + '/');
      });
    });
    it('should be able to handle placekitten width and height settings', function() {
      var defaultProvider, emptyImages;
      defaultProvider = 'http://placekitten.com';
      emptyImages = $("img[src='']");
      emptyImages.holdr({
        provider: 'placekitten',
        defaultWidth: 600,
        defaultHeight: 700
      });
      expect(emptyImages).toBeModified;
      return emptyImages.each(function(index, item) {
        return expect($(item).attr('src')).toEqual(defaultProvider + '/' + 600 + '/' + 700);
      });
    });
    return it('should be able to handle robohash width and height settings', function() {
      var defaultProvider, emptyImages;
      defaultProvider = 'http://robohash.org';
      emptyImages = $("img[src='']");
      emptyImages.holdr({
        provider: 'robohash',
        defaultWidth: 600,
        defaultHeight: 700
      });
      expect(emptyImages).toBeModified;
      return emptyImages.each(function(index, item) {
        return expect($(item).attr('src')).toEqual(defaultProvider + '/random.png?set=1&size=' + 600 + 'x' + 700);
      });
    });
  });
});
