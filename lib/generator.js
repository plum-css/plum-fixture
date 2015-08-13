/**
 * plum-fixture-generator
 * https://github.com/plum-css/plum-fixture-generator
 *
 * Copyright (c) 2015 Jason Bellamy
 * Licensed under the MIT license.
 */

"use strict";

var Promise  = require( 'bluebird' );

var fs       = Promise.promisifyAll(require( 'fs-extra' ));
var path     = Promise.promisifyAll(require( 'path' ));
var kss      = Promise.promisifyAll(require( 'kss' ));
var mustache = require( 'mustache' );


/*
 * Generates a PLUM compatible fixture useful for regression testing stylesheets that contain KSS meta data.
 *
 * @param {object.array} options.files - array of files and/or directories of stylesheets to parse KSS meta data from.
 * @param {object.array} options.stylesheets - array of files and/or directories of compiled stylesheets to inject into the fixture.
 * @param {object.string} [options.template] - path of the template to use to build the fixtures.
 * @param {object.string} [options.destination] - path where the compiled fixtures should be saved.
 * @param {function} cb - callback function.
 */
module.exports = function fixtureGenerator( options, cb ) {

  if ( !options.files || {}.toString.call( options.files ) !== "[object Array]" ) {
    throw new Error( "You must provide an array of files/directories to parse." );
    return;
  }

  var files       = options.files;
  var stylesheets = options.stylesheets.map( function( stylesheet ) { return { url: stylesheet } });
  var template    = options.template     || __dirname + '/template.html';
  var destination = options.destination  || '/tests/fixtures/';

  /**
   * Parses KSS meta data from stylesheets.
   *
   * @param {array} files - stylesheets to extract meta data from.
   * @returns {Promise.object} extracted meta data.
   */
  function parseKSS( files ) {
    return kss.traverseAsync( files );
  }

  /**
   * Finds and returns a list of folders that fixtures can created for.
   *
   * @param {array} files - a list stylesheets to search the KSS meta data from.
   * @return {array} a list of folders.
   */
  function findFolders( files ) {
    return parseKSS( files ).then( extractFolders );
  }

  /**
   * Parses retrieved KSS meta data and extracts a list of folders to create fixtures for.
   *
   * @param {array} files - a list of all the files retrieved from the KSS meta data.
   * @returns {array} a list of all the folders to create fixtures for.
   */
  function extractFolders( files ) {
    return files.data.files.map( function extractPath( file ) {
      return path.parse( file ).dir;
    }).filter( function extractUnique( path, index, array ) {
      return array.indexOf( path ) === index;
    });
  }

  /**
   * Parses a folder of stylesheets containing KSS meta data and creates and saves a fixture.
   *
   * @param {string} path - build and save a fixture for this path.
   */
  function createFixtures( path ) {
    return parseKSS( path )
      .then( extractFixturesData )
      .then( function( data ) {
        return saveFixture( data[0].name, data, path );
      })
  }

  /**
   * Builds an object out of KSS meta data that can be used to populate a template.
   *
   * @param {object} - kss meta data object
   * @returns {Promise.array} array of fixture data that can be used to populate a template.
   */
  function extractFixturesData( data ) {
    return Promise.map( data.section(), function( section ) {
      return Promise.props({
        header : section.header(),
        description : section.description(),
        markup : fs.readFileAsync( path.parse( data.data.files[0] ).dir + '/' + section.markup(), 'utf8' ).then( mustache.render ),
        name : path.basename( section.markup(), path.extname( section.markup() ) )
      });
    });
  }

  /**
   * Populates a template and saves it as a fixture file.
   *
   * @param {object} name - the name of the data sections.
   * @param {array} data  - template data array.
   * @param {string} directory - parent directory to save the fixture to.
   * @returns {Promise}
   */
  function saveFixture( name, data, directory ) {
    return fs.readFileAsync( template, 'utf8' )
      .then( function renderTemplate( template ) {
        return mustache.render( template, { stylesheets: stylesheets, sections: data } );
      }).then( function saveTemplate( templateData ) {
        return fs.outputFileAsync( destination + '/' + name + '.html', templateData );
      });
  }

  /**
  * @exports
  */
  return findFolders( files )
    .map( createFixtures )
    .then( function success( response ) {
      cb( null, 'PLUM fixture(s) successfully created for all stylesheets located under the ' + files + ' folder(s).' );
    })
    .catch( cb );

};
