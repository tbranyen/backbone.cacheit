/* 
 * Test Module: Basic
 * Ensures that CacheIt can do its basic tasks.
 *
 */
module("basic", {
  setup: function() {
    Backbone.sync = function(method, model, options) {
      // Create a new count or reuse and increment.
      var count = model._count = model._count ? model._count++ : 1;
      var def = $.Deferred();

      // Simulate asynchronous traffic.
      window.setTimeout(function() {
        // Call success with the increment.
        if (model instanceof Backbone.Model) {
          def.resolve({ count: count });
          return options.success({ count: count });
        }

        // This is a Collection.
        options.success([{ count: count }]);
        def.resolve([{ count: count }]);
      }, (Math.random()*100)+100);

      return def;
    };

    this.Collection = Backbone.Collection.extend({
      url: "notused"
    });
  }
});

asyncTest("Basic behaviors work correctly.", function() {
  var c = new this.Collection();

  c.fetch().then(function(c) {
    equal(c.length, 1, "Length is correct");
    ok(c.at(0) instanceof Backbone.Model, "First element is a Backbone.Model");
    equal(c.at(0).get("count"), 1, "Only called once.");

    c.fetch().then(function() {
      equal(c.length, 1, "Length is correct");
      equal(c.at(0).get("count"), 1, "Only called once.");

      start();
    });
  });
});
