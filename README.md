# VCF / vCard
[![npm](https://img.shields.io/npm/v/vcf.svg?style=flat-square)](https://npmjs.com/package/vcf)
[![npm license](https://img.shields.io/npm/l/vcf.svg?style=flat-square)](https://npmjs.com/package/vcf)
[![npm downloads](https://img.shields.io/npm/dm/vcf.svg?style=flat-square)](https://npmjs.com/package/vcf)
[![build status](https://img.shields.io/travis/jhermsmeier/node-vcf.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-vcf)

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save vcf
```

## Index

* [Usage](#usage)
  - [Parsing](#parsing-a-vcard)
* [Formats](#formats)
  - [jCard](#format-jcard)
  - [vCard](#format-vcf)
* [API Documentation](#api)
* [Benchmarks](#benchmarks)

## Usage

```javascript
var vCard = require( 'vcf' )
```

### Parsing a vCard

```js
var card = vCard.parse( string )
```

```js
vCard {
  version: '4.0',
  data: {
    version: [String: '4.0'],
    n: [String: 'Gump;Forrest;;;'],
    fn: [String: 'Forrest Gump'],
    org: [String: 'Bubba Gump Shrimp Co.'],
    title: [String: 'Shrimp Man'],
    photo: { [String: 'http://www.example.com/dir_photos/my_photo.gif'] mediatype: 'image/gif' },
    tel: [
      { [String: 'tel:+11115551212'] type: [ 'work', 'voice' ], value: 'uri' },
      { [String: 'tel:+14045551212'] type: [ 'home', 'voice' ], value: 'uri' }
    ],
    adr: [
      { [String: ';;100 Waters Edge;Baytown;LA;30314;United States of America']
        type: 'work',
        label: '"100 Waters Edge\\nBaytown, LA 30314\\nUnited States of America"' },
      { [String: ';;42 Plantation St.;Baytown;LA;30314;United States of America']
        type: 'home',
        label: '"42 Plantation St.\\nBaytown, LA 30314\\nUnited States ofAmerica"' }
    ],
    email: [String: 'forrestgump@example.com'],
    rev: [String: '20080424T195243Z']
  }
}
```

## Formats

### Format: jCard

```js
var card = vCard.fromJSON( data )
```

```js
var jcard = card.toJSON()
```

```json
[ "vcard",
  [
    [ "version", {}, "text", "4.0" ],
    [ "n", {}, "text", [ "Gump", "Forrest", "", "", "" ] ],
    [ "fn", {}, "text", "Forrest Gump" ],
    [ "org", {}, "text", "Bubba Gump Shrimp Co." ],
    [ "title", {}, "text", "Shrimp Man" ],
    [
      "photo", { "mediatype": "image/gif" },
      "text", "http://www.example.com/dir_photos/my_photo.gif"
    ],
    [ "tel", { "type": [ "work", "voice" ], "value": "uri" }, "uri", "tel:+11115551212" ],
    [ "tel", { "type": [ "home", "voice" ], "value": "uri" }, "uri", "tel:+14045551212" ],
    [
      "adr", { "type": "work", "label":"\"100 Waters Edge\\nBaytown, LA 30314\\nUnited States of America\"" },
      "text", [ "", "", "100 Waters Edge", "Baytown", "LA", "30314", "United States of America" ]
    ],
    [
      "adr", { "type": "home", "label": "\"42 Plantation St.\\nBaytown, LA 30314\\nUnited States ofAmerica\"" },
      "text", [ "", "", "42 Plantation St.", "Baytown", "LA", "30314", "United States of America" ]
    ],
    [ "email", {}, "text", "forrestgump@example.com" ],
    [ "rev", {}, "text", "20080424T195243Z" ]
  ]
]
```

### Format: VCF

```js
var vcf = card.toString()
var vcf = card.toString( '4.0' )
```

```vcf
BEGIN:VCARD
VERSION:4.0
N:Gump;Forrest;;;
FN:Forrest Gump
ORG:Bubba Gump Shrimp Co.
TITLE:Shrimp Man
PHOTO;MEDIATYPE=image/gif:http://www.example.com/dir_photos/my_photo.gif
TEL;TYPE=work,voice;VALUE=uri:tel:+11115551212
TEL;TYPE=home,voice;VALUE=uri:tel:+14045551212
ADR;TYPE=work;LABEL="100 Waters Edge\nBaytown, LA 30314\nUnited States
  of America":;;100 Waters Edge;Baytown;LA;30314;United States of America
ADR;TYPE=home;LABEL="42 Plantation St.\nBaytown, LA 30314\nUnited
  States ofAmerica":;;42 Plantation St.;Baytown;LA;30314;United States of
 America
EMAIL:forrestgump@example.com
REV:20080424T195243Z
END:VCARD
```

## API



## Benchmarks

| Method              | op/s       |
| :------------------ | ---------: |
| vCard.normalize()   |    379,662 |
| vCard.isSupported() | 15,612,641 |
| vCard#parse()       |     12,309 |
| vCard#toString()    |     45,715 |
| vCard#toJSON()      |    159,824 |

For more detail, run
```
npm run benchmark
```
