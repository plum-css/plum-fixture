'use strict';

var fs      = require('fs');
var should  = require('should');
var fixture = require('../lib/generator.js');
var cheerio = require('cheerio');


describe( "fixture", function () {

  var options = {
    stylesheets: ['test/fixtures/compiled/compiled.css'],
    files: [ 'test/fixtures/source' ],
    destination: 'test/tmp'
  };

  it('should create the fixture file', function(done) {
    fixture(options, function(err, res) {
      should(res).startWith('PLUM fixture(s) successfully created');
      done();
    });
  });

  it('should inject the sections title into the template.', function(done) {
    fixture(options, function(err, res) {
      var $     = cheerio.load(fs.readFileSync('test/tmp/source.html', 'utf8'));
      var title = $('.section h1').html();
      should(title).equal('source');
      done();
    })
  });

  it('should inject the sections description into the template.', function(done) {
    fixture(options, function(err, res) {
      var $           = cheerio.load(fs.readFileSync('test/tmp/source.html', 'utf8'));
      var description = $('.section p').html();
      should(description).equal('classes for the source file');
      done();
    })
  });

  it('should inject the sections markup into the template.', function(done) {
    fixture(options, function(err, res) {
      var $    = cheerio.load(fs.readFileSync('test/tmp/source.html', 'utf8'));
      var text = $('.section div').first().text().trim();
      should(text).equal('source content.');
      done();
    });
  });

});
