backbone.cacheit v0.0.1
=======================

Created by Tim Branyen [@tbranyen](http://twitter.com/tbranyen).

This is useful for when you have Models and Collections that once data is
fetched you can operate with the same dataset throughout the lifetime of your
application.  Whatever route your application starts with can safely call the
`fetch` method to get the data into the instances.

Tested with Underscore, Backbone and jQuery. You can swap out jQuery with a
custom configuration or substitute Underscore with Lo-Dash.

## Documentation ##

Every `fetch` method is patched to return a Deferred, instead of the `jqXHR`
object in `jQuery.ajax`.  If you call `fetch` multiple times while it is
fetching or after it's fetched, you will always get the same Deferred and it
will not make additional requests.

Cancelling is super simple, just add the `reload` option:

``` javascript
fetch({ reload: true });
```

optionally you can make a Model or Collection always `reload` by doing the
following (works with Models too):

``` javascript
Backbone.Collection.extend({
  reload: true
}):
```

Since you're getting a brand new deferred and nothing ever happens to the old
one you can be assured that fetch callbacks will only trigger after the most
recent `fetch` has completed.

If you want use `underscore.deferred` or some other implementation you can
specify an override to swap out that dependency.

``` javascript
Backbone.Collection.prototype.fetch.deferred = function() {
  return _.Deferred();
};
```

## Release notes ##

### 0.0.1 ###

* Initial beta release.
