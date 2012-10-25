/*!
* backbone.cacheit.js v0.1.0
* Copyright 2012, Tim Branyen (@tbranyen)
* backbone.cacheit.js may be freely distributed under the MIT license.
*/
(function(window) {

"use strict";

// Localize global dependency references.
var Backbone = window.Backbone;
var $ = window.$;
var _ = window._;

// Retain a copy of the original fetch method, since we are overidding it.
var oldFetch = Backbone.Collection.prototype.fetch;

// Patch the fetch method to retain a reference.
_.each(["Model", "Collection"], function(ctor) {
  // Override both Model and Collection `fetch` methods.
  var newFetch = Backbone[ctor].prototype.fetch = function(options) {
    options = options || {};

    // Save a reference to the original deferred.
    var oldDef = this._def;

    // Return early.
    if (this._def && !options.reload && !this.reload) {
      return this._def;
    }

    // If a deferred doesn't exist, create one.  If the clear flag is provided,
    // jump in to create a new deferred.
    this._def = newFetch.deferred();

    // If the clear was provided and there is an existing deferred, resolve it
    // once this has resolved.
    if (options.reload && oldDef) {
      this._def.done(oldDef.resolve);
    }

    // Call the original `fetch` method and store its return value (jqXHR).
    var req = oldFetch.apply(this, arguments);

    // Once the request has finished, resolve this deferred.
    req.done(_.bind(function() {
      this._def.resolveWith(this, [this]);
    }, this));

    // Return the deferred to wait with.
    return this._def;
  };

  // Allow the jQuery dependency to be swapped out to use this in other
  // enviornments.
  Backbone[ctor].prototype.fetch.deferred = function() {
    return $.Deferred();
  };
});

})(this);
