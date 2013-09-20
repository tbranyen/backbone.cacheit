/*!
 * backbone.cacheit.js v0.1.0-pre
 * Copyright 2013, Tim Branyen (@tbranyen)
 * backbone.cacheit.js may be freely distributed under the MIT license.
 */
(function(window) { 
"use strict";

// Normalize the `define` and `require` calls.
var require = window.require || function() {};
// Call the exports function or the crafted one with the Node.js `require`.
var define = window.define || function(cb) { cb.call(this, require); };

// Define the module contents.
define(function(require) {

// Localize global dependency references.
var Backbone = window.Backbone || require("backbone");
var _ = window._ || require("underscore");
var $ = Backbone.$ || require("jquery");

// Patch the fetch method to retain a reference.
_.each(["Model", "Collection"], function(ctor) {
  // Retain a copy of the original fetch method, since we are overidding it.
  var oldFetch = Backbone[ctor].prototype.fetch;

  // Override both Model and Collection `fetch` methods.
  var newFetch = Backbone[ctor].prototype.fetch = function(options) {
    options = options || {};

    // Save a reference to the original deferred.
    var oldDef = this._def;

    // Return early.
    if (this._def && !options.reload && !this.reload) {
      return this._def.promise();
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

    // Once the request has finished, resolve / reject this deferred as needed
    req.done(_.bind(function() {
      this._def.resolveWith(this, [this]);
    }, this)).fail(_.bind(function() {
      this._def.rejectWith(this, [this]);
    }, this));

    // Return the deferred to wait with.
    return this._def.promise();
  };

  // Allow the jQuery dependency to be swapped out to use this in other
  // enviornments.
  Backbone[ctor].prototype.fetch.deferred = function() {
    return $.Deferred();
  };
});

});

})(typeof global === "object" ? global : this);
