module.exports = function(grunt) {

  grunt.initConfig({
    meta: {
      banner: "/*!\n" + " * backbone.cacheit.js v0.0.1\n" +
        " * Copyright 2012, Tim Branyen (@tbranyen)\n" +
        " * backbone.cacheit.js may be freely distributed under" +
        " the MIT license.\n */"
    },

    lint: {
      files: ["grunt.js", "backbone.cacheit.js"]
    },

    min: {
      "dist/backbone.cacheit.min.js": ["<banner>",
        "backbone.cacheit.js"]
    },

    watch: {
      files: "<config:lint.files>",
      tasks: "lint test"
    },

    jshint: {
      options: {
        boss: true,
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        node: true
      },
      globals: {}
    },

    qunit: {
      files: [ "test/**/*.html" ]
    }
  });

  // Default task.
  grunt.registerTask("default", "lint qunit min");

};
