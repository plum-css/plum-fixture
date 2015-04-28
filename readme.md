# plum-fixture-generator [![Build Status](https://travis-ci.org/plum-css/plum-fixture-generator.png?branch=master)](https://travis-ci.org/plum-css/plum-fixture-generator)

> Parses your PLUM stylesheets for KSS meta-data and builds fixtures for use in regression testing.


## Getting Started

- Install with [NPM](https://www.npmjs.org/) - `npm install --save plum-fixture-generator`


## Usage

```javascript
var fixtureGenerator = require( 'plum-fixture-generator' );

var options = {
  files: [ 'modules/', 'units/', 'pages/' ]
};


var createFixtures = fixtureGenerator( options );

createFixtures( function( err, response ) {
  if ( err ) {
    return err;
  }

  return response;
});
```


## API

### fixtureGenerator( options )

Name   | Type     | Argument     | Description
-------|----------|--------------|------------
path   | `string` | `<required>` | the path of the file to be modified.

#### callback( error, results )

Name     | Type       | Argument     | Description
---------|------------|--------------|------------
error    | `error`    | `<required>` | any errors that may have occured.
response | `string`   | `<required>` | success message.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.


## License
Copyright (c) 2015 [Jason Bellamy ](http://jasonbellamy.com)  
Licensed under the MIT license.
