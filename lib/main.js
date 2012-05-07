require(["jquery", "../jquery.holdr"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
      console.log("loaded OK!");
      $('img').holdr();
    });
});
