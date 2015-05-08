# plum-fixture [![Build Status](https://travis-ci.org/plum-css/plum-fixture.png?branch=master)](https://travis-ci.org/plum-css/plum-fixture)

> Parses your PLUM stylesheets for KSS meta-data and builds HTML fixtures.


## Getting Started

- Install with [NPM](https://www.npmjs.org/) - `npm install --save plum-fixture`


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

Name                | Type     | Argument     | Description
--------------------|----------|--------------|------------
options.files       | `array`  | `<required>` | files and/or directories of stylesheets to parse.
options.template    | `string` | `<optional>` | path of the template to use for fixtures.
options.destination | `string` | `<optional>` | path where the compiled fixtures should be saved.

#### callback( error, response )

Name     | Type       | Argument     | Description
---------|------------|--------------|------------
error    | `error`    | `<required>` | any errors that may have occured.
response | `string`   | `<required>` | success message.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.


## License
Copyright (c) 2015 [Jason Bellamy ](http://jasonbellamy.com)  
Licensed under the MIT license.
