'use strict';

var gulp = require('gulp'),
    replace = require('gulp-replace'),
    insert = require('gulp-insert');

gulp.task('blockly', function () {
  return gulp.src('blockly/blockly_compressed.js')
      .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global=that;'))
      .pipe(insert.wrap('var DOMParser = require("xmldom").DOMParser; module.exports = (function(){  var that = {}; that.navigator=""; ', ' return Blockly;})()'))
      .pipe(gulp.dest('lib'))
});

gulp.task('blocks', function () {
  return gulp.src('blockly/blocks_compressed.js')
      .pipe(insert.wrap('module.exports = function(Blockly){Blockly.Blocks={};', 'return Blockly.Blocks;}'))
      .pipe(gulp.dest('lib'))
});

gulp.task('js', function () {
  return gulp.src('blockly/javascript_compressed.js')
      .pipe(insert.wrap('module.exports = function(Blockly){', 'return Blockly.JavaScript;}'))
      .pipe(gulp.dest('lib'))
});

gulp.task('en', function () {
  return gulp.src('blockly/msg/js/en.js')
      .pipe(replace(/goog\.[^\n]+/g, ''))
      .pipe(insert.wrap('var Blockly = {}; Blockly.Msg={};  module.exports = function(){ ', 'return Blockly.Msg;}'))
      .pipe(gulp.dest('lib/i18n/'))
});

gulp.task('build', ['blocks', 'blockly', 'en', 'js']);




