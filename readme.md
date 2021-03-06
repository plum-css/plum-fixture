# plum-fixture [![Build Status](https://travis-ci.org/plum-css/plum-fixture.png?branch=master)](https://travis-ci.org/plum-css/plum-fixture)

> Parses your PLUM stylesheets for KSS meta-data and builds HTML fixtures.


## Getting Started

- Install with [NPM](https://www.npmjs.org/) - `npm install --save plum-fixture`


## Usage

```javascript
var fixture = require( 'plum-fixture' );

var options = {
  stylesheets: ['paths/to/compiled/stylesheets'],
  files: [ 'modules/', 'units/', 'pages/' ],
  destination: 'path/to/save/fixtures/to'
};

fixture( options, function( err, response ) {
  if ( err ) {
    return err;
  }

  return response;
});
```


## API

### fixture( options )

Name                | Type     | Argument     | Description
--------------------|----------|--------------|------------
options.stylesheets | `array`  | `<required>` | paths to the compiled stylesheets to inject into the fixtures.
options.files       | `array`  | `<required>` | files and/or directories of stylesheets to parse kss meta-data from.
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
