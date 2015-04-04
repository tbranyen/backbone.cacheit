backbone.cacheit
================

> Fetch caching made super simple in Backbone.

**v0.1.0** [![Build
Status](https://travis-ci.org/tbranyen/backbone.cacheit.png?branch=master)](https://travis-ci.org/tbranyen/backbone.cacheit)

Maintained by Tim Branyen [@tbranyen](http://twitter.com/tbranyen) with help
from [awesome
contributors](https://github.com/tbranyen/backbone.cacheit/contributors)!

This is useful for when you have Models and Collections that once data is
fetched you can operate with the same dataset throughout the lifetime of your
application.  Whatever route your application starts with can safely call the
`fetch` method to get the data into the instances.

Tested with Underscore, Backbone and jQuery. You can swap out jQuery with a
custom configuration or substitute Underscore with Lo-Dash.

## Getting started ##

Include into existing Backbone application:

``` html
<!-- Optional dependencies. -->
<script src="jquery.js"></script>
<script src="underscore.js"></script>
<script src="backbone.js"></script>

<!-- Load the Backbone.cacheit plugin library. -->
<script src="backbone.cacheit.js"></script>
```

Compatibility: Everything Backbone and jQuery supports? Let me know if you find
issues.

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

### Notes on SafeSync ###

It's entirely possible that requests will come back out of order if you use the
`{ reload: true }` option.  This is most likely not your intention.  If you
agree, you should put the following plugin into your project.  CacheIt will
work seamlessly.

https://github.com/amccloud/backbone-safesync

## Release notes ##

### 0.1.0-pre ###

* Bringing it to the `tbranyen` project standard.  Just added a bunch of files
  and compatibility with AMD, Grunt 0.4, etc.
* Integrated a fix by @LoonyPandora to reject the deferred if the request
  fails.

### 0.0.1 ###

* Initial beta release.
