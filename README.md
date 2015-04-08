# VCF / vCard
[![npm](http://img.shields.io/npm/v/vcf.svg?style=flat-square)](https://npmjs.com/vcf)
[![npm downloads](http://img.shields.io/npm/dm/vcf.svg?style=flat-square)](https://npmjs.com/vcf)
[![build status](http://img.shields.io/travis/jhermsmeier/node-vcf.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-vcf)

## Install via [npm](https://npmjs.com)

```sh
$ npm install vcf
```

## Usage

```javascript
var vCard = require( 'vcf' )
```

Parsing a string or buffer:
```javascript
// 'data' being either a string or a buffer
// or something that can be turned into a string
// and represents vcard data
var card = new vCard( data )
// OR
var card = vCard.parse( data )
```

Stringify:
```javascript
var str = card.toString()
// OR with version number (doesn't work, yet)
var str = card.toString( '4.0' )
```

Example output:
```javascript
{
  version: '4.0',
  n: {
    data: 'Gump;Forrest;;;'
  },
  fn: 'Forrest Gump',
  org: {
    data: 'Bubba Gump Shrimp Co.'
  },
  title: {
    data: 'Shrimp Man'
  },
  photo: {
    data: 'http://www.example.com/dir_photos/my_photo.gif'
  },
  tel: [{
    type: ['work', 'voice'],
    value: 'uri',
    data: 'tel:+1-111-555-1212'
  }, {
    type: ['home', 'voice'],
    value: 'uri',
    data: 'tel:+1-404-555-1212'
  }],
  adr: {
    type: 'work',
    label: '42 Plantation St.\\nBaytown, LA 30314\\nUnited States of America',
    data: ';;42 Plantation St.;Baytown;LA;30314;United States of America'
  },
  email: {
    data: 'forrestgump@example.com'
  }
}
```
