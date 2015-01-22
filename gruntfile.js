var assemble = require('assemble');
var ext = require('gulp-extname');
var tap = require('gulp-tap');

module.exports = function(grunt) {

  grunt.registerTask('assemble', 'Assemble', function() {

    console.log('running assemble');

    var done = this.async();
    var site = assemble.init();

    site.partials('src/core/templates/partials/**/*.hbs');
    site.layouts('src/core/templates/layouts/*.hbs');

    // console.log('partials', site.views.partials);
    // console.log('layouts', site.views.layouts);
    site.option('layout', 'default');

    // Dummy helpers to stop errors being thrown for the moment
    site.helper('author', function() {return 'here'});
    site.helper('button', function() {return 'here'});
    site.helper('byline', function() {return 'here'});
    site.helper('compile', function() {return 'here'});
    site.helper('debug', function() {return 'here'});
    site.helper('icon', function() {return 'here'});
    site.helper('ifCond', function() {return true});
    site.helper('image', function() {return 'here'});
    site.helper('loadArticle', function() {return []});
    site.helper('loadAuthorArticles', function() {return []});
    site.helper('navigation', function() {return 'here'});
    site.helper('panel', function() {return 'here'});
    site.helper('parseJSON', function() {return []});
    site.helper('render', function() {return 'here'});
    site.helper('renderJSON', function() {return 'here'});
    site.helper('teamFiller', function() {return ''});

    // Build the pattern library
    site.task('demo', function() {
      console.log('running demo');
      return site
        .src('src/sites/demo/pages/**/*.hbs')
        .on('error', function (err) {
          // console.log('demo error', err);
        })
        .pipe(tap(function (file) {
          // console.log('demo file', file);
        }))
        .pipe(ext())
        .pipe(site.dest('converted-html/demo'));
    });

    // Build the main site
    site.task('main', function() {
      console.log('running main');
      return site
        .src('src/sites/main/pages/**/*.hbs')
        .on('error', function (err) {
          // console.log('main error', err);
        })
        .pipe(tap(function (file) {
          // console.log('main file', file);
        }))
        .pipe(ext())
        .pipe(site.dest('converted-html/main'));
    });

    site.run(['demo', 'main'], function () {
      console.log('done');
      done();
    });

  });

};
